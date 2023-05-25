
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseService } from '../base/base.service';
import { HelperService } from '../helper/helper.service';

import { HttpClientModule} from '@angular/common/http';
import { ILogin, ILoginuser } from '../interfaces/ilogin';
@Injectable({
    providedIn: 'root'
  })
  
export class AuthenticationService {
    constructor(public http: HttpClient,
        private Helper: HelperService,private base:BaseService) {}

       
 logout() {
 // remove user from local storage to log user out
 this.Helper.removeValue('LoginInfo');

 }

 UserLogin(login: ILoginuser) {
    return this.base.post('User/UserLogin', login).pipe(map((response: any) => {
      return response;
    }));
  }

}