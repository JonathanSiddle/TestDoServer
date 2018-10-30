import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseUrlService } from './baseUrl.service';
import { AccessTokenModel } from '../models/accessTokenModel';

@Injectable()
export class AccessTokenService {
    public accessToken: string;

    constructor(
        public http: HttpClient, public baseUrlService: BaseUrlService) {}
    /*
    * handle getting new refresh token
    */
   refreshToken(): Observable<AccessTokenModel> {
        const headers = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
          }
        // console.log(`Rrefreshing Access Token!`);
        const urlWithOutApi = this.baseUrlService.baseUrl.toString().replace('', '');

        // console.log(`RefreshUrl: ${urlWithOutApi}User/RefreshToken`);
        return this.http.post<AccessTokenModel>(`${urlWithOutApi}User/RefreshToken`,
                `{ TestData : 'testData'} ` , headers);
    }
}
