import { Injectable } from '@angular/core';
import { IGetTenant, IinsertTenant } from '../interfaces/itenant';
import { IDeleteTenant } from '../interfaces/itenant';

import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private base: BaseService) { }

  getAllcompanydetails(lines: IGetTenant) {
    return this.base.post('CompanyDetail/CompanyDetailSelect', lines).pipe(map((response: any) => {
      return response;
    }));
  }
  deletecompany(delcompany:IDeleteTenant) {
    return this.base.post('CompanyDetail/CompanyDetailsDelete', delcompany).pipe(map((response: any) => {
        return response;
    }));
  }
  addUpdateCompany(Insertcompany: IinsertTenant) {
    return this.base.post('CompanyDetail/CompanyDetailsInsertUpdate', Insertcompany).pipe(map((response: any) => {
        return response;
    }));
  }
 
  postFile(caption: string, fileToUpload: File) {

    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('Attachment', caption);
   return this.base.post('Admin/Postimg', formData)
  }
}
