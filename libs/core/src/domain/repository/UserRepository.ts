import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
export interface UserRepository {
  getAuthors: () => Observable<any>;
}

export const USER_REPOSITORY = new InjectionToken('UserRepository');
