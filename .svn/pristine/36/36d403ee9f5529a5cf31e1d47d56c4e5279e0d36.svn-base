import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper/helper.service';
import { CommonService } from 'src/app/services/common.service';
import { FormDetailsService } from 'src/app/services/form-details.service';
import { ToasterService } from 'src/app/helper/toaster.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';

import { Igetsubcategory } from 'src/app/interfaces/isub-category';
import { Igetformdetails, Ieditformdetails, IaddUpdateformdetails, Iformdetailsdelete, IRoles } from 'src/app/interfaces/iform-details';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ISubmoduleTransferSubject } from 'src/app/interfaces/ibuilder-creation';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  modalReference: NgbModalRef;
  FormDetailsForm: FormGroup;
  roledetails: any;
  submitClick = false;
  submitted = false;
  deletevalue: any;
  subformdetails: any;
  FormID: any;
  FormCode: any;
  FormCategory: any;
  getFormDetails: any;
  checkeditFormdetails: any;
  loginInfo: any;
  divisionList: any;
  subcategorydetails: any;
  Designedon: any;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false, size: 'lg'
  };

  isMeridian = false;
  readonly = true;
  Time = new Date();
  constructor(private formBuilder: FormBuilder, private formdetailservice: FormDetailsService, private toaster: ToasterService,
    private helper: HelperService, private commonService: CommonService, private subcategoryservice: SubCategoryService,
    private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.loginInfo = this.helper.getValue('LoginInfo');
    this.getAllFormDetails();

    this.getAllSubCategory();

    this.FormDetailsForm = this.formBuilder.group({
      FormName: ['', [Validators.required]],
      FormDisplay: ['', [Validators.required]],
      FormDescription: ['', [Validators.required]],
      SOFNumber: ['', [Validators.required]],
      DesignedBy: ['', [Validators.required]],
      DesignedOn: ['', [Validators.required]],
      SubCategory: ['', [Validators.required]],
      displayorder: [''],
    });
  }
  get FormDetailsData() { return this.FormDetailsForm.controls; }


  onredirect(moduleUrl, moduleName) {
    let moduleTransferValue: ISubmoduleTransferSubject = {
      ModuleURL: moduleUrl,
      ModuleName: moduleName,
      IsChild: 0,
      ParentCode: '',
      GroupName: '',
      ParentTable:''
    }
    this.formdetailservice.CheckFormCode(moduleTransferValue);
    this.router.navigate(['/reportbuilder']);
  }

  onredirecttoreportbuilder(moduleUrl, moduleName) {
    let moduleTransferValue: ISubmoduleTransferSubject = {
      ModuleURL: moduleUrl,
      ModuleName: moduleName,
      IsChild: 0,
      ParentCode: '',
      GroupName: '',
      ParentTable:''
    }
    this.formdetailservice.CheckFormCode(moduleTransferValue);
    this.router.navigate(['/reportbuilder']);
  }
  getAllSubCategory() {

    const subcategory: Igetsubcategory = {
      CategoryCode: "null",
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.loginInfo.LanguageId

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
      LanguageId: this.loginInfo.LanguageId,
      IsForm: 0,
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
      // DesignedOn:FormDetailsValue.Time,
      DesignedOn: FormDetailsValue.DesignedOn,
      FormCategory: FormDetailsValue.SubCategory,
      FormCode: this.FormCode,
      FormName: FormDetailsValue.FormName,
      DisplayOrder: FormDetailsValue.displayorder,
      CreatedBy: this.loginInfo.UserId,
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.loginInfo.LanguageId,
      IsForm: 0,
      IsChild: 0,
      ParentCode: "",
      GroupName: ""

    };

    this.formdetailservice.addUpdateFormDetails(InsertFormDetails).subscribe(
      (response) => {
        //this.SubCa_ID=response[0].ID;
        // this.myModal.hide();
        this.FormDetailsForm.reset();
        this.getAllFormDetails();
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

  /*------ Delete section -------*/
  Deleteformdetails(value, content1) {
    //this.DelModal.show();
    this.deletevalue = value;
    this.modalReference = this.modalService.open(content1, this.ngbModalOptions);


  }
  DeleteTableDetails() {

    const formdetailsdelete: Iformdetailsdelete = {

      FormID: this.deletevalue

    };

    this.formdetailservice.deleteFormDetails(formdetailsdelete).subscribe(
      (response) => {
        // this.DelModal.hide();

        this.getAllFormDetails();

        this.toaster.success("Deleted Successfully", "Success");
        this.modalReference.close();
      },

      error => {
        this.toaster.error("Error while deleting details", "Error!");
      });
  }
  /*------ end --------*/
}
