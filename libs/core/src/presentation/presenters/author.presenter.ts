import { Injectable } from '@angular/core';

import { GetAuthorsUseCase } from '../../domain/usecases/GetAuthorsUseCase';
import { BaseView } from '../views/base.view';
import { BasePresenter } from './base.presenter';

@Injectable({
  providedIn: "root"
})
export class AuthorPresenter implements BasePresenter {

  private baseView: BaseView;

  constructor(private _useCase: GetAuthorsUseCase) {

  }

  setView(component: any) {
    this.baseView = component as BaseView;
  }

  getAuthors() {
    
    this._useCase.getAuthors().then((res) => {
      this.baseView.setValues(res);
      
    }).catch((exception) => {
     console.log(exception) });
  }
}