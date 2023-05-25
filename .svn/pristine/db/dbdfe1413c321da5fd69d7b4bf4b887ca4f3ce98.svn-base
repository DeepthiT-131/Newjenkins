import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/base/base.service';
import { BehaviorSubject } from 'rxjs';
import { IGetcategory, Iedit, Iaddcategory, ICatdelete, InsertLangauge, IgetLangauge, ImoduleFilter } from '../interfaces/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  SubcategorySource = new BehaviorSubject<string>('');
  subcategoryData: any;
  FormSource = new BehaviorSubject<string>('');
  FormData: any;
  moduleurlsource = new BehaviorSubject<ImoduleFilter>({

    CategoryCode: "",

  });
  moduleTransferData: any;
  constructor(private base: BaseService) {
    this.subcategoryData = this.SubcategorySource.asObservable();
    this.FormData = this.FormSource.asObservable();
    this.moduleTransferData = this.moduleurlsource.asObservable();
   }

  getcategorydetails(category: IGetcategory) {
    return this.base.post('CanCategory/GetCanCategory', category).pipe(map((response: any) => {
    
      return response;

    }));
  }
  checkmoduledata(moduleTransferValue: ImoduleFilter) {
    this.moduleurlsource.next(moduleTransferValue);
  }
  editcategorydetails(editcategory: Iedit) {
    return this.base.post('CanCategory/GetCanCategoryEdit', editcategory).pipe(map((response: any) => {
      return response;
    }));
  }


 

  addUpdateCategory(Insertcategory: Iaddcategory) {
    return this.base.post('CanCategory/CanCategoryInsertOrUpdate', Insertcategory).pipe(map((response: any) => {
        return response;
    }));
}

DeleteCategory(delCategory:ICatdelete) {
  return this.base.post('CanCategory/GetCanCategoryDelete', delCategory).pipe(map((response: any) => {
      return response;
  }));
}
checkSubcategory(categoryCode: string) {
  this.SubcategorySource.next(categoryCode);
}

getAllLanguage() {
  return this.base.post('DBDetails/GetLanguage', '').pipe(map((response: any) => {
    return response;
  }));
}

addLanguage(Insertlanguage: any) {
  return this.base.post('Template/SubCategoryLanguageInsertAndUpdate', Insertlanguage).pipe(map((response: any) => {
      return response;
  }));
}

getLanguage(getlanguage: IgetLangauge) {
  return this.base.post('Template/SubCategoryLanguageSelect', getlanguage).pipe(map((response: any) => {
      return response;
  }));
}

}
