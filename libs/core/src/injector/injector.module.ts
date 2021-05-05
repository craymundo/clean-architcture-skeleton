import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { USER_REPOSITORY } from '../domain/repository/UserRepository';
import { UserRepositoryImpl } from '../data/UserRepositoryImpl';

@NgModule({
  declarations: [],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
  ],
  imports: [
    CommonModule
  ]
})

export class InjectorModule { }
