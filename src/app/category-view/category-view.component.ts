import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';

import { CategoryService } from 'src/app/services/category.service';
import { ToasterService } from 'src/app/helper/toaster.service';

import { HelperService } from 'src/app/helper/helper.service';
import { Igetsubcategory, Igetcategoryview } from 'src/app/interfaces/isub-category';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { ImoduleFilter } from 'src/app/interfaces/icategory';
import { RolepermissionService } from 'src/app/services/rolepermission.service';
@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  categoryForm: FormGroup;
  submitClick = false;
  submitted = false;
  deletevalue: any;
  categorydetails: any;
  CategoryCode: any;
  checkeditdetails: any;
  Ca_ID: any;
  loginInfo: any;
  subcategorydetails: any;
  loginservice: any;
  formname: any;
  mySubscription: any;
  categoryviewdetails: any;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  public dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  constructor(private formBuilder: FormBuilder, private categoryservice: CategoryService, private toaster: ToasterService, private helper: HelperService,
    private router: Router, private subcategoryservice: SubCategoryService,
    private rolepermissionservice: RolepermissionService) {

    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
  }

  ngOnInit() {
    this.loginInfo = this.helper.getValue('LoginInfo');

    this.getAllCategory();


  }

  // ngOnDestroy() {
  //   if (this.mySubscription) {
  //     this.mySubscription.unsubscribe();
  //   }
  // }
  getAllCategory() {

    const category: Igetcategoryview = {
      RoleID: this.loginInfo.RoleID
    };

    // getall users
    this.subcategoryservice.getcategoryviewdetails(category).subscribe(
      (response) => {
     

        this.categoryviewdetails = response;
   

      },
      error => {
        this.toaster.error("Error while getting Subcategory details", "Error!");
      });
  }

  ShowForm(formcode)
  {
    // this.helper.removeValue('DefaultCategory');
    this.formname=formcode;
   
    // this.helper.setValue('DefaultCategory', formcode);
 

    let moduleTransferValue: ImoduleFilter = {
      CategoryCode: formcode,
    }

    this.categoryservice.checkmoduledata(moduleTransferValue);
  
    this.router.navigate(["/theme/SubCategoryView"]);
  }






  /*------ End ------*/
}
