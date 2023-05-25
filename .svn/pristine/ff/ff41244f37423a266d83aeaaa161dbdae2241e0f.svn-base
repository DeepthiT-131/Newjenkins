import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { ToasterService } from 'src/app/helper/toaster.service';
import { Router } from '@angular/router';
import { NoWhitespaceValidator } from 'src/app/helper/no-whitespace.validator';
import { Dropdown } from 'src/app/helper/dropdown.validator';
import { CategoryService } from 'src/app/services/category.service';

import { HelperService } from 'src/app/helper/helper.service';

import { CommonService } from 'src/app/services/common.service';
import { IDivision } from 'src/app/interfaces/common';
import { Iedit, IGetcategory } from 'src/app/interfaces/icategory';
import { Iaddsubcategory, Igetsubcategory, IeditSubCategory, ISubGetcategorydelete, InsertLangauge, IgetLangauge } from 'src/app/interfaces/isub-category';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  modalReference: NgbModalRef;
  SubCategoryForm: FormGroup;
  submitClick = false;
  categorydetails: any;
  submitted = false;
  deletevalue: any;
  subcategorydetails: any;
  checkeditsubdetails: any;
  SubCode: any;
  Code: any;
  languagedetails: any;
  categorycode: any;
  SubCa_ID: any;
  checkCategoryEditDetails: any;
  CategoryName: any;
  loginInfo: any;
  divisionList: any;
  ngbModalOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
    keyboard: false
  };
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering

  isMeridian = false;
  readonly = true;
  Time = new Date();
  //categoryCode:any;
  languagelist = [];
  LanguageID: any;
  constructor(private formBuilder: FormBuilder, private subcategoryservice: SubCategoryService, private toaster: ToasterService,
    private cateService: CategoryService, private helper: HelperService, private commonService: CommonService,
    private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.loginInfo = this.helper.getValue('LoginInfo');
    this.LanguageID = this.helper.getValue('LanguageID');
    this.cateService.subcategoryData.subscribe(data => this.categorycode = data)
    this.getLanguage();

    this.Divisiondata();
    this.getAllSubCategory();
    this.getCategoryCode();
    this.SubCategoryForm = this.formBuilder.group({
      SubCategoryName: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      SubCategoryDescription: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      SubCategoryDivision: ['', [Validators.required, Dropdown]],
      CategoryCode: [],
      users: this.formBuilder.array([this.addOtherSkillFormGroup()]),
    });
    //this.Getcategory();

  }
  get subform() { return this.SubCategoryForm.controls; }

  addOtherSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      language_name: ['', []],
      subcatagory_Name: ['', []]
    });
  }

  addGroup() {

    var dynFormArray = (<FormArray>this.SubCategoryForm.get('users'));
    dynFormArray.push(this.addOtherSkillFormGroup());

  }

  removeGroup(index: number): void {
    if (!((<FormArray>this.SubCategoryForm.get('users')).length == 1)) {
      (<FormArray>this.SubCategoryForm.get('users')).removeAt(index);
    }
  }

  Divisiondata() {
    const getdiv: IDivision = {
      RoleId: "0"
    };
    this.commonService.getdivision(getdiv).subscribe(
      (response) => {
        this.divisionList = response;

      });
  }
  /*------ Modal Pop-Up -----*/
  showModal(content) {
    this.SubCa_ID = 0;
    this.SubCategoryForm.reset();
    //  this.myModal.show();
    //this.modalReference =  this.modalService.open(content,this.ngbModalOptions);
    //this.subform.CategoryName.setValue(this.CategoryName);
    this.SubCode = "";
    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
  }
  /*------ end ------*/
  public getCategoryCode() {
    const category: IGetcategory = {
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    };

    // getall category
    this.cateService.getcategorydetails(category).subscribe(
      (response) => {

        this.categorydetails = response;
      },
      error => {
        //this.toaster.error("Error while getting seamer details", "Error!");
      });
  }

  FormDetails() {
    this.router.navigate(['/FormDetails']);
  }

  /*------ Adding Data ----------*/
  onSubmit(getdata) {


    this.submitted = true;
    // stop here if form is invalid
    if (this.SubCategoryForm.invalid) {
      return;
    }

    const Insertsubcategory: Iaddsubcategory = {
      SubCa_ID: this.SubCa_ID > 0 ? this.SubCa_ID : 0,
      SubCategoryName: getdata.SubCategoryName,
      SubCategoryDesc: getdata.SubCategoryDescription,
      CategoryCode: getdata.CategoryCode,
      SubCategoryDivision: getdata.SubCategoryDivision,
      SubCode: this.SubCode,
      CreatedBY: this.loginInfo.UserId,
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId

    };


    this.subcategoryservice.addUpdateSubCategory(Insertsubcategory).subscribe(
      (response) => {


        this.SubCategoryForm.reset();
        this.getAllSubCategory();
        this.toaster.success("Data Added Successfully", "Success");
        this.submitted = false;
        this.modalReference.close();

      },

      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");
        //this.submitted = false;
        //this.myModal.hide();

      });

  }
  /*------ ENd ----*/


  getAllSubCategory() {

    const subcategory: Igetsubcategory = {
      CategoryCode: null,
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    };

    // getall users
    this.subcategoryservice.getsubcategorydetails(subcategory).subscribe(
      (response) => {

        this.subcategorydetails = response;

      },
      error => {
        this.toaster.error("Error while getting Subcategory details", "Error!");
      });
  }
  /*------ End ------*/


  /*---- Edit Section ------*/
  onedit(SubCode, content) {
    this.SubCode = SubCode;
    this.Editdetails(content);
  }
  Editdetails(content) {
    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
    const editsubcategory: IeditSubCategory = {

      SubCode: this.SubCode

    };
    this.subcategoryservice.editcategorydetails(editsubcategory).subscribe(
      (response) => {
        this.checkeditsubdetails = response;

        this.SubCa_ID = this.checkeditsubdetails[0].SubCa_ID;
        // this.categorycode=this.checkeditsubdetails[0].CategoryCode;

        this.subform.SubCategoryName.setValue(this.checkeditsubdetails[0].SubCategoryName);
        this.subform.SubCategoryDescription.setValue(this.checkeditsubdetails[0].SubCategoryDesc);
        this.subform.SubCategoryDivision.setValue(this.checkeditsubdetails[0].SubCategoryDivision);
        this.subform.CategoryCode.setValue(this.checkeditsubdetails[0].CategoryCode);
      });
  }
  /*------ End --------*/


  /*------ Delete section -------*/
  Deletesubcategory(value, content1) {

    this.deletevalue = value;
    this.modalReference = this.modalService.open(content1, this.ngbModalOptions);

  }
  DeleteTableDetails() {

    const delSubCategory: ISubGetcategorydelete = {

      SubCa_ID: this.deletevalue

    };

    this.subcategoryservice.deletesubcategory(delSubCategory).subscribe(
      (response) => {


        this.getAllSubCategory();
        this.toaster.success("Deleted Successfully", "Success");
        this.modalReference.close();
      });

  }
  /*------ end --------*/
  getLanguage() {

    let fieldInfo = this.helper.getValue('languagelist');
    if (fieldInfo == '') {
      this.subcategoryservice.getAllLanguage().subscribe(
        (response) => {

          this.languagelist = response;
          this.helper.setValue('languagelist', this.languagelist);

        },
        error => {
        });
    }
    else {

      this.languagelist = fieldInfo;
    }

  }


  onlanguage(SubCode, content2) {
    this.Code = SubCode;
    this.getLangauge(content2);
  }
  getLangauge(content2) {
    this.modalReference = this.modalService.open(content2, this.ngbModalOptions);
    const getlang: IgetLangauge = {

      Code: this.Code

    };

    this.subcategoryservice.getLanguage(getlang).subscribe(
      (response) => {
        this.languagedetails = response;

        this.SubCategoryForm.setControl('users', this.setExistingLanguage(this.languagedetails));
      });
  }
  setExistingLanguage(LanguageDetails): FormArray {
    const formArray = new FormArray([]);
    if (this.languagedetails != null && this.languagedetails != undefined && this.languagedetails != "") {
      LanguageDetails.forEach(s => {
        formArray.push(this.formBuilder.group({
          language_name: s.LanguageId,
          subcatagory_Name: s.LanguageText
        }));
      });
    }
    else {
      formArray.push(this.addOtherSkillFormGroup());
    }
    return formArray;
  }
  LangaugeDetails(getlang) {
    this.submitted = true;
    if (this.SubCategoryForm.get('users').invalid) {
      return;
    }
    let subcatagoryValue = this.subform;
    let inputArray = [];
    let dynamicFormArr = (<FormArray>subcatagoryValue.users.value) as FormArray;
    if (dynamicFormArr && dynamicFormArr.length > 0) {
      for (let i = 0; i < dynamicFormArr.length; i++) {
        let formGrpDtl = dynamicFormArr[i] as FormGroup;
        const InsertLanguage: InsertLangauge = {

          LanguageId: formGrpDtl['language_name'],
          LanguageText: formGrpDtl['subcatagory_Name'],
          Code: this.Code,
          CreatedBy: this.loginInfo.UserId,

        };
        inputArray.push(InsertLanguage);
      }


      this.subcategoryservice.addLanguage(inputArray).subscribe(
        (response) => {


          this.SubCategoryForm.reset();
          this.getAllSubCategory();
          this.toaster.success("Data Added Successfully", "Success");
          this.submitted = false;
          this.modalReference.close();

        },

        error => {
          this.toaster.error("Some error occurred.Please try again", "Error");
        });


    }
  }
}
