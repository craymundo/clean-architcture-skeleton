import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { AuthorPresenter } from '../../../../../../libs/core/src/presentation/presenters/author.presenter';
import { GetAuthorsUseCase } from '@app-workspace/core/src/domain/usecases/GetAuthorsUseCase';
import { UserRepository } from '../../../../../../libs/core/src/domain/repository/UserRepository';
import { UserRepositoryImpl } from '../../../../../../libs/core/src/data/UserRepositoryImpl';




const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  providers: [AuthorPresenter, GetAuthorsUseCase, UserRepositoryImpl],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule {
}
