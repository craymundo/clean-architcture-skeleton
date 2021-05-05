import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserRepository } from '../domain/repository/UserRepository';
import { ApiService } from './net/ApiService';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    private apiService: ApiService,
    private httpClient: HttpClient,
  ) {}
  getAuthors(): Observable<any> {
    return this.httpClient.get<any>(
      this.apiService._REMOTE_END_POINTS.URL_GET_ACCOUNT_PARAMS
    );
  }

}
