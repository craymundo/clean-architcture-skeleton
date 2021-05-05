import { Injectable } from '@angular/core';
import { CanActivate, NavigationExtras, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) {
  }

  async canActivate(): Promise<boolean> {
    return false;
  }
}
