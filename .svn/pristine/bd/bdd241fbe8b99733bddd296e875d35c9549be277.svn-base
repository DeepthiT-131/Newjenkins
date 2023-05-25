import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { BaseService } from '../base/base.service';
import { TreeNode } from 'primeng/api';
import { Http } from '@angular/http';
import { IgetModules, IsavePermission, IgetModuleonLoad, IgetallMenu } from '../interfaces/irolepermission';

@Injectable({
  providedIn: 'root'
  
})
export class RolepermissionService {

  constructor(private base: BaseService,private http: Http) { }

  getFiles() {
    return this.http.get('assets/showcase/data/files.json')
                .toPromise()
                .then(res => <TreeNode[]> res.json().data);
}

  getmoduledetails(getmodule: IgetModules) {
    return this.base.post('RoleManagement/GetCanPermissions', getmodule).pipe(map((response: any) => {
        return response;
    }));
  }
  SavePermission(save: IsavePermission) {
    return this.base.post('RoleManagement/InsertUpdRoleManagementTVP', save).pipe(map((response: any) => {
        return response;
    }));
  }
  GetModuleonLoad(getdata: IgetModuleonLoad) {
    return this.base.post('RoleManagement/GetRoleManagementCDM', getdata).pipe(map((response: any) => {
        return response;
    }));
  }

  GetAllMenuDetails(getdata: IgetallMenu) {
    return this.base.post('RoleManagement/GetSubCategoryFormList', getdata).pipe(map((response: any) => {
        return response;
    }));
  }
  GetLeftMenuDetails(getdata: IgetallMenu) {
    return this.base.post('RoleManagement/GetLeftMenuCategory', getdata).pipe(map((response: any) => {
        return response;
    }));
  }
  
}


