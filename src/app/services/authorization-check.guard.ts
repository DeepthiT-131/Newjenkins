import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {HelperService}from '../helper/helper.service';
import { HttpClientModule} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationCheckGuard implements CanActivate {
 
  constructor(private router: Router,private helper:HelperService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.helper.getValue('LoginInfo')) {
        let url= state.url;
        let modulePermit = this.helper.getValue('RolePermission');
        if (modulePermit) {
          if(modulePermit.indexOf(url)>-1){
            return true;
          }
        }
        else{
          return true;
        }
        return true;
      }
      // otherwise redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
      
  }
}
