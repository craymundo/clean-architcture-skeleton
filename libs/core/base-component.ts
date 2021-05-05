import { LoadingController, ToastController } from '@ionic/angular';

import { Logger } from '../core/logger/logger.manager';
import { BaseView, BaseModalCallbacks } from '../core/src/presentation/views/base.view';
import { dismissLoading, presentLoading } from '../utils';

export abstract class BaseComponent implements BaseView {
  modalParams = {};
  modalActions: BaseModalCallbacks = {};
  modalVisible = false;
  public readonly loadingIndicatorId = 'MainLoadingIndicator';

  log = Logger.create(this.constructor.name);

  constructor(
    public loadingController?: LoadingController,
    public toastController?: ToastController
  ) {
    this.resetModalCallbacks();
  }
  showError: () => void;
  setValues: (res: any) => void;

  /***************************************************************
   ********************* Modal events ****************************
   ***************************************************************/

  /**
   *
   */
  openModal(): void {
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
  }

  /**
   *
   */
  clickCancelModal(): void {
    this.closeModal();
    const { onCancelClick } = this.modalActions;
    if (onCancelClick) {
      onCancelClick();
    }
  }

  /**
   *
   */
  clickOkModal(): void {
    this.closeModal();
    const { onOkClick } = this.modalActions;
    if (onOkClick) {
      onOkClick();
    }
  }

  /***************************************************************
   ********************* Loader events ****************************
   ***************************************************************/

  //base view implementation
  async showLoading(): Promise<void> {
    await presentLoading(this.loadingController);
   
  }

  hideLoading(): void {
    dismissLoading(this.loadingController);
  }



  hideError(): void {
    this.resetModalCallbacks();
    this.closeModal();
  }

  private setModalCallbacks(callbacks: BaseModalCallbacks): void {
    ({
      onOkClick: this.modalActions.onOkClick,
      onCancelClick: this.modalActions.onCancelClick,
    } = callbacks);
  }

  private resetModalCallbacks(): void {
    this.setModalCallbacks({ onOkClick: null, onCancelClick: null });
  }

}
