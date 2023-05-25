import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/base/base.service';
import { Igetformdetails, IaddUpdateformdetails, Ieditformdetails, Iformdetailsdelete, IRoles, InsertLangauge, IgetLangauge, Igetallisform, IgetFormCode } from '../interfaces/iform-details';
import { BehaviorSubject } from 'rxjs';
import { ImoduleTransferSubject, ISubmoduleTransferSubject } from '../interfaces/ibuilder-creation';


@Injectable({
  providedIn: 'root'
})
export class FormDetailsService {



  FormSource = new BehaviorSubject<ISubmoduleTransferSubject>({

    ModuleURL: "",
    ModuleName: "",
    IsChild: 0,
    ParentCode: "",
    GroupName: "",
    ParentTable: ""
  });
  formcode: any;
  constructor(private base: BaseService) {
    this.formcode = this.FormSource.asObservable();
  }

  getFormDetails(getformdetails: Igetformdetails) {
    return this.base.post('CanFormDetails/GetCanFormDetails', getformdetails).pipe(map((response: any) => {
      return response;
    }));
  }

  addUpdateFormDetails(addUpdateformdetails: IaddUpdateformdetails) {
    return this.base.post('CanFormDetails/CanFormDetailsInsertOrUpdate', addUpdateformdetails).pipe(map((response: any) => {
      return response;
    }));
  }

  editFormdetails(editformdetails: Ieditformdetails) {
    return this.base.post('CanFormDetails/GetCanFormDetailsEdit', editformdetails).pipe(map((response: any) => {
      return response;
    }));
  }

  deleteFormDetails(formdetailsdelete: Iformdetailsdelete) {
    return this.base.post('CanFormDetails/GetCanFormDetailsDelete', formdetailsdelete).pipe(map((response: any) => {
      return response;
    }));
  }

  getrole(common: IRoles) {
    return this.base.post('Role/RolesSelect', common).pipe(map((response: any) => {
      return response;
    }));
  }

  CheckFormCode(moduleTransferValue: ISubmoduleTransferSubject) {
    this.FormSource.next(moduleTransferValue);
  }


  getAllLanguage() {
    return this.base.post('DBDetails/GetLanguage', '').pipe(map((response: any) => {
      return response;
    }));
  }

  addLanguage(Insertlanguage: any) {
    return this.base.post('Template/FormLanguageInsertAndUpdate', Insertlanguage).pipe(map((response: any) => {
      return response;
    }));
  }

  getLanguage(getlanguage: IgetLangauge) {
    return this.base.post('Template/SubCategoryLanguageSelect', getlanguage).pipe(map((response: any) => {
      return response;
    }));
  }
  getIsFormDetails(getformdetails: Igetallisform) {
    return this.base.post('CanFormDetails/GetIsFormDetails', getformdetails).pipe(map((response: any) => {
      return response;
    }));
  }
  getIsChildFormDetails(getFormCode: IgetFormCode) {
    return this.base.post('CanFormDetails/GetIsChildFormDetails', getFormCode).pipe(map((response: any) => {
      return response;
    }));
  }

}
