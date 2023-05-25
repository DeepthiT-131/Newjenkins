import {HelperService} from '../helper/helper.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env.service';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private baseUrl: any;


 

 private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public http: HttpClient, private env: EnvService) { 
    this.baseUrl=env.apiUrl;

  }

  get(url) {
    return this
      .http
      .get(this.baseUrl + url);
  }
  post(url: string, data: any) {
 
    return this
      .http
      .post(this.baseUrl + url, data);
  }

  Postwithdownload(url: string, data: any,response:any) {
    return this
      .http
      .post(this.baseUrl + url, data,response);
  }

  


  put(url: string, data: any) {
    return this
      .http
      .put(this.baseUrl + url, JSON.stringify(data));
  }

  delete(url: string, data?: any) {
    return this
      .http
      .post(this.baseUrl + url, data);
  }
}
