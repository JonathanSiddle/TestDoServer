import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resolveReflectiveProviders } from '../../../../node_modules/@angular/core/src/di/reflective_provider';
import { BaseUrlService } from './baseUrl.service';

@Injectable()
export class DataService <T> {

  private baseUrl = 'http://localhost:3000/';
  private fullUrl = '';

  constructor(
    public baseUrlService: BaseUrlService,
    protected endPoint: string,
    protected http: HttpClient) {
      this.baseUrl = baseUrlService.baseUrl;
      this.fullUrl = this.baseUrl + endPoint;
  }

  getAll(): Observable<Array<T>> {
    const headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({headers: headers});
    console.log(`Getting all data with full URl: '${this.fullUrl}'`);
    return this.http.get<Array<T>>(this.fullUrl);
  }

  getOne(id: number): Observable<T> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // const options = new RequestOptions({headers: headers});
    console.log('Making request: ' + this.fullUrl + '/' + id);
    return this.http.get<T>(this.fullUrl + '/' + id);
  }

  create(resource: T): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // const options = new RequestOptions({headers: headers});
    console.log(`Creating using URL: ${this.fullUrl}`);
    return this.http.post<T>(this.fullUrl, JSON.stringify(resource), httpOptions);
  }

  update(resource: T, rID: number): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.put<T>(this.fullUrl + '/' + rID, JSON.stringify(resource), httpOptions);
  }

  delete(id: number): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.delete<T>(this.fullUrl + '/' + id);
  }

  // handleError(error: Response, dataService: DataService) {

  //   console.log("in error handler");
  //   // console.dir(error);
  //   // console.dir(error);

  //   // unautherised
  //   if (error.status === 401) {
  //       console.log('Unauth error');
  //   }

  //   if (error.status === 400) {
  //     return Observable.throw(new BadInput(error.json()));
  //   }
  //   if (error.status === 404)
  //     return Observable.throw(new NotFoundError());
  //   return Observable.throw(new AppError(error));
  // }
}
