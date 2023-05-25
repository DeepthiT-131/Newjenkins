import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';

import { CategoryService } from 'src/app/services/category.service';
import { ToasterService } from 'src/app/helper/toaster.service';

import { HelperService } from 'src/app/helper/helper.service';
import { Igetsubcategory, Igetsubcategoryview } from 'src/app/interfaces/isub-category';
import { SubCategoryService } from 'src/app/services/sub-category.service';

import { RolepermissionService } from 'src/app/services/rolepermission.service';
import { ImoduleFilter } from '../interfaces/icategory';



@Component({
  selector: 'app-sub-category-view',
  templateUrl: './sub-category-view.component.html',
  styleUrls: ['./sub-category-view.component.css']
})
export class SubCategoryViewComponent implements OnInit {
  categoryForm: FormGroup;
    submitClick = false;
    submitted = false;
    deletevalue:any;
    categorydetails: any;
    CategoryCode: any;
    checkeditdetails:any;
    Ca_ID: any;
    loginInfo:any;
    subcategorydetails:any;
    loginservice:any;
    formname:any;
    mySubscription:any;
    subcategoryviewdetails:any;
    moduleTransferData: ImoduleFilter;

  constructor(private formBuilder: FormBuilder, private categoryservice: CategoryService,private toaster:ToasterService,private helper:HelperService,
    private router: Router,private subcategoryservice:SubCategoryService,
    private rolepermissionservice:RolepermissionService) { 
   
    }

  ngOnInit() {
    this.loginInfo = this.helper.getValue('LoginInfo');
    this.categoryservice.moduleTransferData.subscribe(data =>

      this.moduleTransferData = data
    );
  
    this.CategoryCode = this.moduleTransferData.CategoryCode;
    //this.getAllSubCategory();
    this.getAllSubCategoryView();
   

  }

  
    getAllSubCategoryView()
    {
      
      const subcategory: Igetsubcategoryview = {
        RoleID:this.loginInfo.RoleID,
        CategoryCode:this.CategoryCode,
       };

      // getall users
      this.subcategoryservice.getsubcategoryviewdetails(subcategory).subscribe(
        (response) => {
   

          this.subcategoryviewdetails = response;
    
        },
        error => {
          this.toaster.error("Error while getting Subcategory details", "Error!");
        });
    }
    ShowForm(formcode)
    {
      this.helper.removeValue('DefaultLink');
      this.formname=formcode;
    
      this.loginservice={
     
        ModuleURL:'',
        ParentMenu:formcode,
        RoleID:this.loginInfo.RoleID
    
      }
      this.helper.setValue('DefaultLink', this.loginservice);
      this.router.navigate(["/header"]);
    }






/*------ End ------*/
}