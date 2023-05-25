import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/base/base.service';
import { BehaviorSubject } from 'rxjs';
import { IRole, Icommon, Iedit, IGetrole } from '../interfaces/irole';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roleIdData:any;
  public roleIdSource = new BehaviorSubject<IRole>({
    RoleID: 0,
    RoleName: "",

  });

    constructor(private base: BaseService) { 
      this.roleIdData = this.roleIdSource.asObservable();
    }

    getroledetails(common: Icommon) {
      return this.base.post('Role/RolesSelect', common).pipe(map((response: any) => {
        return response;
      }));
    }

    editroledetails(editrole: Iedit) {
      return this.base.post('Role/RolesEdit', editrole).pipe(map((response: any) => {
        return response;
      }));
    }

  
    addUpdateRole(Insertrole: IRole) {
      return this.base.post('Role/RolesInsertUpdate', Insertrole).pipe(map((response: any) => {
          return response;
      }));
  }

  deleterole(delRole:IGetrole) {
    return this.base.post('Role/RolesDelete', delRole).pipe(map((response: any) => {
        return response;
    }));
  }
  showPermission(getrole: IRole) {
    this.roleIdSource.next(getrole);
}


}
