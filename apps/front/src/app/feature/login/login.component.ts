import { Component, OnInit } from '@angular/core';
import { AuthorPresenter } from '../../../../../../libs/core/src/presentation/presenters/author.presenter';
import { BaseView } from '../../../../../../libs/core/src/presentation/views/base.view';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit , BaseView {


  constructor(private _presenter: AuthorPresenter) {

  }

  showLoading: () => void;
  hideLoading: () => void;
  showError: () => void;
  hideError: () => void;
  
  setValues(res: any) {
    console.log(res);
  }

  ngOnInit() {
    this._presenter.setView(this);
    this._presenter.getAuthors();
  }

}