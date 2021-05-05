import { Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent }
    ],
  },
];
