import { Injectable } from '@angular/core';
import { Iloginconfig, IThemeconfig, ITableconfig, Iconfig, ILoginuser } from '../interfaces/iloginconfig';
import { BaseService } from 'src/app/base/base.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginconfigService {

  constructor(private base: BaseService) { }

  AddloginConfigdetails(config: Iloginconfig) {
    return this.base.post('LoginConfigSetting/LoginConfigSettingInsertUpdate', config).pipe(map((response: any) => {
      return response;
    }));
  }


  postConfig(caption: string, fileToUpload: File) {

    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('Attachment', caption);

    return this.base.post('User/Postimg', formData)
    // return this.base.post('SignUp/UploadProfileImage', formData)

  }
  postFiles(caption: string, fileToUpload: File) {

    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('Attachment', caption);

    return this.base.post('FormBuilder/UploadFile', formData)
  }

  AddThemeConfigdetails(config: IThemeconfig) {
    return this.base.post('ThemeConfigSettings/ThemeConfigSettingsInsertOrUpdate', config).pipe(map((response: any) => {
      return response;
    }));
  }

  AddTableConfigdetails(config: ITableconfig) {
    return this.base.post('TableConfiguration/TableConfigurationInsertOrUpdate', config).pipe(map((response: any) => {
      return response;
    }));
  }
  GetLoginConfigdetails(configdata: Iconfig) {
    return this.base.post('LoginConfigSetting/GetLoginConfigSetting', configdata).pipe(map((response: any) => {
      return response;
    }));
  }
  GetThemeConfigdetails(configdata: Iconfig) {
    return this.base.post('ThemeConfigSettings/GetThemeConfigSettings', configdata).pipe(map((response: any) => {
      return response;
    }));
  }
  GetTableConfigdetails(configdata: Iconfig) {
    return this.base.post('TableConfiguration/GetTableConfiguration', configdata).pipe(map((response: any) => {
      return response;
    }));
  }
  UserLogin(login: ILoginuser) {
    return this.base.post('User/UserLogin', login).pipe(map((response: any) => {
      return response;
    }));
  }

}
