import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper/helper.service';
import { CommonService } from 'src/app/services/common.service';
import { FormDetailsService } from 'src/app/services/form-details.service';
import { ToasterService } from 'src/app/helper/toaster.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';

import { Igetsubcategory } from 'src/app/interfaces/isub-category';
import { Igetformdetails, Ieditformdetails, IaddUpdateformdetails, Iformdetailsdelete, IRoles, InsertLangauge, IgetLangauge } from 'src/app/interfaces/iform-details';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImoduleTransferSubject, ISubmoduleTransferSubject } from 'src/app/interfaces/ibuilder-creation';
import { Dropdown } from 'src/app/helper/dropdown.validator';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-form-module',
  templateUrl: './form-module.component.html',
  styleUrls: ['./form-module.component.css']
})
export class FormModuleComponent implements OnInit {
  modalReference: NgbModalRef;
  FormDetailsForm: FormGroup;
  roledetails: any;

  submitted = false;
  deletevalue: any;
  subformdetails: any;
  FormID: any;
  FormCode: any;
  FormCategory: any;
  getFormDetails: any;
  checkeditFormdetails: any;
  loginInfo: any;

  subcategorydetails: any;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false, size: 'lg'
  };
  languagelist = [];
  Code: any;
  languagedetails: any;

  isMeridian = false;
  readonly = true;
  Time = new Date();
  Designedon: any;
  LanguageID: any;
  constructor(private formBuilder: FormBuilder, private formdetailservice: FormDetailsService, private toaster: ToasterService,
    private helper: HelperService, private commonService: CommonService, private subcategoryservice: SubCategoryService,
    private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.loginInfo = this.helper.getValue('LoginInfo');
    this.LanguageID = this.helper.getValue('LanguageID');
    this.getAllFormDetails();
    this.getAllSubCategory();

    this.getLanguage();
    this.FormDetailsForm = this.formBuilder.group({
      FormName: ['', [Validators.required]],
      FormDisplay: ['', [Validators.required]],
      FormDescription: ['', [Validators.required]],
      SOFNumber: ['', [Validators.required]],
      DesignedBy: ['', [Validators.required]],
      DesignedOn: ['', [Validators.required]],
      SubCategory: ['', [Validators.required]],
      displayorder: [''],
      // users: this.formBuilder.array([this.addOtherSkillFormGroup()]),
    });
  }

  get FormDetailsData() { return this.FormDetailsForm.controls; }

  addOtherSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      language_name: ['', [Validators.required, Dropdown]],
      form_Name: ['', [Validators.required]]
    });
  }

  addGroup() {
    var dynFormArray = (<FormArray>this.FormDetailsForm.get('users'));
    dynFormArray.push(this.addOtherSkillFormGroup());

  }

  removeGroup(index: number): void {

    if (!((<FormArray>this.FormDetailsForm.get('users')).length == 1)) {
      (<FormArray>this.FormDetailsForm.get('users')).removeAt(index);
    }
  }



  onredirect(moduleUrl, moduleName) {
    let submoduleTransferValue: ISubmoduleTransferSubject = {
      ModuleURL: moduleUrl,
      ModuleName: moduleName,
      IsChild: 0,
      ParentCode: '',
      GroupName: '',
      ParentTable: ''
    }
    this.formdetailservice.CheckFormCode(submoduleTransferValue);
    this.router.navigate(['/FormBuilder']);
  }

  onredirecttoreportbuilder(moduleUrl, moduleName) {

    let moduleTransferValue: ISubmoduleTransferSubject = {
      ModuleURL: moduleUrl,
      ModuleName: moduleName,
      IsChild: 0,
      ParentCode: '',
      GroupName: '',
      ParentTable: ''
    }
    this.formdetailservice.CheckFormCode(moduleTransferValue);

    this.router.navigate(['/reportbuilder']);
  }
  getAllSubCategory() {

    const subcategory: Igetsubcategory = {
      CategoryCode: "null",
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId

    };

    // getall users
    this.subcategoryservice.getsubcategorydetails(subcategory).subscribe(
      (response) => {
        this.subcategorydetails = response;

      },
      error => {
        this.toaster.error("Error while getting Form details", "Error!");
      });
  }
  /*------ Modal Pop-Up -----*/
  showModal(content) {
    this.FormDetailsForm.reset();
    //this.myModal.show();
    this.FormCode = "";
    let PopupDate2 = formatDate(this.Time.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    this.FormDetailsData.DesignedOn.setValue(PopupDate2);

    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
  }
  getAllFormDetails() {

    const getformdetails: Igetformdetails = {
      FormCategory: "null",
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId,
      IsForm: 1,
      IsChild: 0


    };

    // getall users
    this.formdetailservice.getFormDetails(getformdetails).subscribe(
      (response) => {



        this.getFormDetails = response;

      },
      error => {
        //this.toaster.error("Error while getting seamer details", "Error!");
      });
  }
  onedit(FormCode, content) {
    this.FormCode = FormCode;

    this.Editdetails(content);
  }
  Editdetails(content) {
    //this.myModal.show();
    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
    const editFormDetails: Ieditformdetails = {

      FormCode: this.FormCode

    };
    this.formdetailservice.editFormdetails(editFormDetails).subscribe(
      (response) => {
        this.checkeditFormdetails = response;
        this.FormID = this.checkeditFormdetails[0].FormID;
        this.FormCode = this.checkeditFormdetails[0].FormCode;
        this.FormCategory = this.checkeditFormdetails[0].FormCategory;

        this.FormDetailsData.FormName.setValue(this.checkeditFormdetails[0].FormName);
        this.FormDetailsData.FormDisplay.setValue(this.checkeditFormdetails[0].FormDisplayName);
        this.FormDetailsData.FormDescription.setValue(this.checkeditFormdetails[0].FormDesc);
        this.FormDetailsData.SOFNumber.setValue(this.checkeditFormdetails[0].SQFNumber);
        this.FormDetailsData.DesignedBy.setValue(this.checkeditFormdetails[0].DesignedBY);
        this.FormDetailsData.DesignedOn.setValue(this.checkeditFormdetails[0].DesignedOn.slice(0, 10));
        this.FormDetailsData.SubCategory.setValue(this.checkeditFormdetails[0].FormCategory);

        this.FormDetailsData.displayorder.setValue(this.checkeditFormdetails[0].DisplayOrder);
      });
  }
  /*------ Adding Data ----------*/
  onSubmit(FormDetailsValue) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.FormDetailsForm.invalid) {
      return;
    }
    if (FormDetailsValue.DesignedOn instanceof Date) {

      this.Designedon = formatDate(FormDetailsValue.DesignedOn.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    }
    else {
      this.Designedon = FormDetailsValue.DesignedOn
    }
    const InsertFormDetails: IaddUpdateformdetails = {
      FormID: this.FormID > 0 ? this.FormID : 0,

      FormDisplayName: FormDetailsValue.FormDisplay,
      FormDesc: FormDetailsValue.FormDescription,
      SQFNumber: FormDetailsValue.SOFNumber,
      DesignedBY: FormDetailsValue.DesignedBy,
      DesignedOn: this.Designedon,
      FormCategory: FormDetailsValue.SubCategory,
      FormCode: this.FormCode,
      FormName: FormDetailsValue.FormName,
      DisplayOrder: FormDetailsValue.displayorder,
      CreatedBy: this.loginInfo.UserId,
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId,
      IsForm: 1,
      IsChild: 0,
      ParentCode: "",
      GroupName: ""

    };

    this.formdetailservice.addUpdateFormDetails(InsertFormDetails).subscribe(
      (response) => {


        this.FormDetailsForm.reset();
        this.getAllFormDetails();
        this.toaster.success("Data Added Successfully", "Success");
        this.submitted = false;
        this.modalReference.close();

      },

      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");
      });

  }

  /*------ ENd ----*/

  /*------ Delete section -------*/
  Deleteformdetails(value, content1) {

    this.deletevalue = value;
    this.modalReference = this.modalService.open(content1, this.ngbModalOptions);


  }
  DeleteTableDetails() {

    const formdetailsdelete: Iformdetailsdelete = {

      FormID: this.deletevalue

    };

    this.formdetailservice.deleteFormDetails(formdetailsdelete).subscribe(
      (response) => {


        this.getAllFormDetails();

        this.toaster.success("Deleted Successfully", "Success");
        this.modalReference.close();
      },

      error => {
        this.toaster.error("Error while deleting details", "Error!");
      });
  }

  getLanguage() {

    let fieldInfo = this.helper.getValue('languagelist');
    if (fieldInfo == '') {
      this.formdetailservice.getAllLanguage().subscribe(
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

  onlanguage(FormCode, content2) {
    this.Code = FormCode;
    this.getLangauge(content2);
  }

  getLangauge(content2) {
    this.modalReference = this.modalService.open(content2, this.ngbModalOptions);
    const getlang: IgetLangauge = {

      Code: this.Code

    };
    this.formdetailservice.getLanguage(getlang).subscribe(
      (response) => {
        this.languagedetails = response;
        this.FormDetailsForm.setControl('users', this.setExistingLanguage(this.languagedetails));

      });
  }
  setExistingLanguage(LanguageDetails): FormArray {
    const formArray = new FormArray([]);
    if (this.languagedetails != null && this.languagedetails != undefined && this.languagedetails != "") {
      LanguageDetails.forEach(s => {
        formArray.push(this.formBuilder.group({
          language_name: s.LanguageId,
          form_Name: s.LanguageText
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
    if (this.FormDetailsForm.get('users').invalid) {
      return;
    }
    let catagoryValue = this.FormDetailsData;
    let inputArray = [];
    let dynamicFormArr = (<FormArray>catagoryValue.users.value) as FormArray;
    if (dynamicFormArr && dynamicFormArr.length > 0) {
      for (let i = 0; i < dynamicFormArr.length; i++) {
        let formGrpDtl = dynamicFormArr[i] as FormGroup;
        const InsertLanguage: InsertLangauge = {

          LanguageId: formGrpDtl['language_name'],
          LanguageText: formGrpDtl['form_Name'],
          Code: this.Code,
          CreatedBy: this.loginInfo.UserId,

        };
        inputArray.push(InsertLanguage);
      }


      this.formdetailservice.addLanguage(inputArray).subscribe(
        (response) => {


          this.FormDetailsForm.reset();
          this.getAllFormDetails();
          this.toaster.success("Data Added Successfully", "Success");
          this.submitted = false;
          this.modalReference.close();

        },

        error => {
          this.toaster.error("Some error occurred.Please try again", "Error");
        });


    }
  }
  /*------ end --------*/
}
