import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import {Observable} from 'rxjs';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

//import { ToasterService } from '../helper/toaster.service';
import { catchError } from 'rxjs/operators';
@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private Helper: HelperService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: any = this.Helper.getValue('token');
    if (token || this.router.url === '/login') {
      const authReq = req.clone({ headers: req.headers.set('Content-Type', 'application/json').set('Authorization', token) });
      return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => 
      {
        if (err instanceof HttpErrorResponse) {
          // if (err.status === 401) {
          //   this.router.navigate(['/login']);
          // } else if (err.status === 400) {
          //   this.toaster.error(err.error.Message, 'Error');
          // } else if (err.status === 500) {
          //   this.toaster.error(err.error.Message, 'Error');
          // } else if (err.status === 404) {
          //   this.toaster.error('Resource not found');
          // } else {
          //   this.toaster.error('Unexpected Error', 'Error');
          // }
        }
        
        return Observable.throw(new Error(err.message));

      }));
    } else {
      this.router.navigate(['/login']);
    }
  }
}