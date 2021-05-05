import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

// Modules
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing.module';
import { SharedModule } from 'src/app/features/shared/shared.module';

// Guards

import { AuthGuard } from '../../guards/auth.guard';

// Components

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


import { Keyboard } from '@ionic-native/keyboard/ngx';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  providers: [CallNumber, Keyboard, AuthGuard],
  imports: [
    SharedModule,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
