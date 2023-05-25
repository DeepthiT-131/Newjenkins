import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ToasterService } from 'src/app/helper/toaster.service';
import { HelperService } from 'src/app/helper/helper.service';
import { NoWhitespaceValidator } from 'src/app/helper/no-whitespace.validator';
import { IGetcategory, Iaddcategory, Iedit, ICatdelete, InsertLangauge, IgetLangauge } from 'src/app/interfaces/icategory';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Dropdown } from 'src/app/helper/dropdown.validator';

// export interface AbstractControlWarn extends AbstractControl { warnings: any; }

// export function tooBigAgeWarning(c: AbstractControlWarn) {

//   if (!c.value) { return null; }
//   let val = +c.value;
//   c.warnings = val > 90 && val <= 120 ? { tooBigAge: {val}  } : null;

//   return null;
// }
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  modalReference: NgbModalRef;
  categoryForm: FormGroup;
  submitClick = false;
  submitted = false;
  deletevalue: any;
  categorydetails: any;
  CategoryCode: any;
  checkeditdetails: any;
  Ca_ID: any;
  loginInfo: any;
  ngbModalOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
    keyboard: false
  };
  languagelist = [];
  Code: any;
  languagedetails: any;
  LanguageID: any;
  constructor(private formBuilder: FormBuilder, private categoryservice: CategoryService, private toaster: ToasterService, private helper: HelperService,
    private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.loginInfo = this.helper.getValue('LoginInfo');
    this.LanguageID = this.helper.getValue('LanguageID');
    this.getAllCategory();
    this.getLanguage();

    this.categoryForm = this.formBuilder.group({
      CategoryName: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      CategoryDesc: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      users: this.formBuilder.array([this.addOtherSkillFormGroup()]),

    });

    ;
  }

  addOtherSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      language_name: ['', []],
      catagory_Name: ['', []]
    });
  }

  get category() { return this.categoryForm.controls; }




  addGroup() {

    var dynFormArray = (<FormArray>this.categoryForm.get('users'));
    dynFormArray.push(this.addOtherSkillFormGroup());


  }

  removeGroup(index: number): void {

    if (!((<FormArray>this.categoryForm.get('users')).length == 1)) {
      (<FormArray>this.categoryForm.get('users')).removeAt(index);
    }
  }
  /*------ Modal Pop-Up -----*/
  showModal(content) {

    this.submitted = false;
    this.categoryForm.reset();
    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
    this.Ca_ID = 0;
    this.CategoryCode = "";

  }
  /*------ end ------*/


  SubcategoryList(Category) {

    this.categoryservice.checkSubcategory(Category);
    this.router.navigate(['/theme/SubCategory']);
  }


  getAllCategory() {

    const category: IGetcategory = {
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId

    };

    // getall category
    this.categoryservice.getcategorydetails(category).subscribe(
      (response) => {

        this.categorydetails = response;
      },
      error => {
        //this.toaster.error("Error while getting seamer details", "Error!");
      });
  }




  /*------ Adding Data ----------*/
  onSubmit(categoryFormvalue) {

    this.submitted = true;
    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      return;
    }

    const InsertCategory: Iaddcategory = {
      Ca_ID: this.Ca_ID > 0 ? this.Ca_ID : 0,
      CategoryCode: this.CategoryCode,
      CategoryName: categoryFormvalue.CategoryName,
      CategoryDesc: categoryFormvalue.CategoryDesc,
      ImagePath: categoryFormvalue.CategoryURL,
      CreatedBY: this.loginInfo.UserId,
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId



    };


    this.categoryservice.addUpdateCategory(InsertCategory).subscribe(
      (response) => {
        this.getAllCategory();

        this.categoryForm.reset();

        this.toaster.success("Data Added Successfully", "Success");
        this.submitted = false;
        this.modalReference.close();
      },

      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");
        this.submitted = false;
        // this.myModal.hide();



      });
  }
  /*----- End ------*/


  /*---- Edit Section ------*/
  onedit(CategoryCode, content) {
    this.CategoryCode = CategoryCode;
    this.Editdetails(content);

  }
  Editdetails(content) {

    // this.myModal.show();
    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
    const editcategory: Iedit = {

      CategoryCode: this.CategoryCode

    };
    this.categoryservice.editcategorydetails(editcategory).subscribe(
      (response) => {
        this.checkeditdetails = response;

        this.Ca_ID = this.checkeditdetails[0].Ca_ID;

        this.category.CategoryName.setValue(this.checkeditdetails[0].CategoryName);
        this.category.CategoryDesc.setValue(this.checkeditdetails[0].CategoryDesc);

      });
  }
  /*------ End --------*/


  Deletecategory(value, content1) {

    //this.DelModal.show();
    this.deletevalue = value;
    this.modalReference = this.modalService.open(content1, this.ngbModalOptions);


  }
  DeleteTableDetails() {

    const delCategory: ICatdelete = {

      Ca_ID: this.deletevalue

    };

    this.categoryservice.DeleteCategory(delCategory).subscribe(
      (response) => {
        //this.DelModal.hide();
        this.getAllCategory();
        this.modalReference.close();

      });
  }
  getLanguage() {

    let fieldInfo = this.helper.getValue('languagelist');
    if (fieldInfo == '') {
      this.categoryservice.getAllLanguage().subscribe(
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



  onlanguage(CategoryCode, content2) {
    this.Code = CategoryCode;
    this.getLangauge(content2);
  }
  getLangauge(content2) {
    this.modalReference = this.modalService.open(content2, this.ngbModalOptions);
    const getlang: IgetLangauge = {

      Code: this.Code

    };
    this.categoryservice.getLanguage(getlang).subscribe(
      (response) => {
        this.languagedetails = response;
        this.categoryForm.setControl('users', this.setExistingLanguage(this.languagedetails));
      });
  }
  setExistingLanguage(LanguageDetails): FormArray {

    const formArray = new FormArray([]);
    if (this.languagedetails != null && this.languagedetails != undefined && this.languagedetails != "") {
      LanguageDetails.forEach(s => {
        formArray.push(this.formBuilder.group({
          language_name: s.LanguageId,
          catagory_Name: s.LanguageText
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
    if (this.categoryForm.get('users').invalid) {
      return;
    }
    let catagoryValue = this.category;
    let inputArray = [];
    let dynamicFormArr = (<FormArray>catagoryValue.users.value) as FormArray;
    if (dynamicFormArr && dynamicFormArr.length > 0) {
      for (let i = 0; i < dynamicFormArr.length; i++) {
        let formGrpDtl = dynamicFormArr[i] as FormGroup;
        const InsertLanguage: InsertLangauge = {

          LanguageId: formGrpDtl['language_name'],
          LanguageText: formGrpDtl['catagory_Name'],
          Code: this.Code,
          CreatedBy: this.loginInfo.UserId,

        };
        inputArray.push(InsertLanguage);
      }


      this.categoryservice.addLanguage(inputArray).subscribe(
        (response) => {


          this.categoryForm.reset();
          this.getAllCategory();
          this.toaster.success("Data Added Successfully", "Success");
          this.submitted = false;
          this.modalReference.close();

        },

        error => {
          this.toaster.error("Some error occurred.Please try again", "Error");
        });
    }

  }
  /*------ End ------*/

}
