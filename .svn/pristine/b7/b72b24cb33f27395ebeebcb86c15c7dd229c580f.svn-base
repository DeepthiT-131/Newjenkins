import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import {TreeNode} from '../interfaces/itreetable';
import {TreeNode, IGettreetable, Iaddtreetable, Iedit, Itreetabledelete } from '../interfaces/itreetable';


@Injectable({
  providedIn: 'root'
})
export class TreetableService {

  constructor(private base: BaseService,private http: HttpClient) { }

  getFilesystem() {
    return this.http.get<any>('assets/showcase/data/filesystem.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data)
      .then(data => { return data; });
  }

  getdatadetails(treetable: IGettreetable) {
    return this.base.post('CanCategory/GetCanCategory', treetable).pipe(map((response: any) => {
    
      return response;

    }));
  }

  editdetails(edittreetable: Iedit) {
    return this.base.post('CanCategory/GetCanCategoryEdit', edittreetable).pipe(map((response: any) => {
      return response;
    }));
  }


 

  addUpdatedetails(Inserttreetable: Iaddtreetable) {
    return this.base.post('CanCategory/CanCategoryInsertOrUpdate', Inserttreetable).pipe(map((response: any) => {
        return response;
    }));
}

  Deletedetails(deltreetable:Itreetabledelete) {
    return this.base.post('CanCategory/GetCanCategoryDelete', deltreetable).pipe(map((response: any) => {
        return response;
    }));
  }
}
