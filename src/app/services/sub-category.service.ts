import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/base/base.service';
import { BehaviorSubject } from 'rxjs';
import { Igetsubcategory, IeditSubCategory, Iaddsubcategory, ISubGetcategorydelete, Igetsubcategoryview, Igetcategoryview, InsertLangauge, IgetLangauge} from '../interfaces/isub-category';


@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  FormSource = new BehaviorSubject<string>('');
  FormData: any;
  constructor(private base: BaseService) { 
    this.FormData = this.FormSource.asObservable();
  }

  getsubcategorydetails(subcategory: Igetsubcategory) {
    return this.base.post('CanSubCategory/GetCanSubCategory', subcategory).pipe(map((response: any) => {
      return response;
    }));
  }

  getsubcategoryviewdetails(subcategory: Igetsubcategoryview) {
    return this.base.post('CanSubCategory/SelectCanSubCategory', subcategory).pipe(map((response: any) => {
      return response;
    }));
  }
  getcategoryviewdetails(category: Igetcategoryview) {
    return this.base.post('CanCategory/SelectCanCategory', category).pipe(map((response: any) => {
      return response;
    }));
  }
  editcategorydetails(editsubcategory: IeditSubCategory) {
    return this.base.post('CanSubCategory/GetCanSubCategoryEdit', editsubcategory).pipe(map((response: any) => {
      return response;
    }));
  }


  addUpdateSubCategory(Insertsubcategory: Iaddsubcategory) {
    return this.base.post('CanSubCategory/CanSubCategoryInsertOrUpdate', Insertsubcategory).pipe(map((response: any) => {
        return response;
    }));
}

deletesubcategory(delSubCategory:ISubGetcategorydelete) {
  return this.base.post('CanSubCategory/GetCanSubCategoryDelete', delSubCategory).pipe(map((response: any) => {
      return response;
  }));
}
LoadForm(FormCode: string) {
  this.FormSource.next(FormCode);
}

getAllLanguage() {
  return this.base.post('DBDetails/GetLanguage', '').pipe(map((response: any) => {
    return response;
  }));
}

addLanguage(Insertlanguage: any ) {
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
