import { Injectable } from '@angular/core';
import {IGetuser, Icommon, IDeleteuser, IUser, IGetroleUser } from '../interfaces/iuser';
import { BaseService } from '../base/base.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private base:BaseService) { }

  
  getAllUsers(lines: Icommon) {
    return this.base.post('User/GetUserSelect', lines).pipe(map((response: any) => {
      return response;
    }));
  }
  getUserbyId(getuser:IGetuser){
    return this.base.post('User/GetUserSelect',getuser).pipe(map((response: any) => {
        return response;
    }));
}
deleteuser(delUser:IDeleteuser) {
  return this.base.post('User/UserDelete', delUser).pipe(map((response: any) => {
      return response;
  }));
}
addUpdateUser(Insertuser: IUser) {
  return this.base.post('User/PostUserRegisterInsertUpdate', Insertuser).pipe(map((response: any) => {
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
