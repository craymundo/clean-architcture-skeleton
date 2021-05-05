export interface BaseModalCallbacks {
  onOkClick?: () => void;
  onCancelClick?: () => void;
}

export interface BaseView {
  setValues: (res) => void;
}
