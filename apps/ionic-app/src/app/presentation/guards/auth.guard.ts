import { Injectable } from '@angular/core';
import { CanActivate, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';


@Injectable()
export class AuthGuard implements CanActivate {
  readonly IS_LOGIN = 'IS_LOGIN';
  isLogin = false;

  constructor(
    private navCtrl: NavController
  ) {}

  async canActivate(): Promise<boolean> {
    return false;
  }
}
