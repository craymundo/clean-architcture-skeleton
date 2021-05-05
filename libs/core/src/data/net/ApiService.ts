import { Injectable } from '@angular/core';

import { environment } from '../../../../../libs/core/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public _REMOTE_END_POINTS = {
    URL_GET_ACCOUNT_PARAMS: `${environment.baseRoutePath}/author`,
  };
  
}
