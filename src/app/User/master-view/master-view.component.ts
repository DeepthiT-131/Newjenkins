import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ImoduleTransferSubject, ILanguageref, IgetJsonData, Idownload,
  Iget, Ibuilderref, Icheck, IHistdownload, IgetMulti, IViewUISubject, IsmsAlert, IEmailAlert
} from 'src/app/interfaces/ibuilder-creation';

import { ConfirmationService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildercreateServiceService } from 'src/app/services/buildercreate-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginconfigService } from 'src/app/services/loginconfig.service';
import { CommonService } from 'src/app/services/common.service';
import { HelperService } from 'src/app/helper/helper.service';
import { ToasterService } from 'src/app/helper/toaster.service';
import { formatDate } from '@angular/common';
import { Dropdown } from 'src/app/helper/dropdown.validator';
import { Iconfig } from 'src/app/interfaces/iloginconfig';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import * as moment from 'moment'
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
declare var jsPDF: any;
@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.css']
})
export class MasterViewComponent implements OnInit {
  data: any;
  finaldata: any;
  model1: Date;
  model2: Date;
  form: FormGroup;
  userForm: FormGroup;
  jsondata: any;
  FormBuildeJson = [];
  ElementArray = [];
  ValidateArray = [];
  modalReference: NgbModalRef;
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };

  FieldID: any;
  report = false;
  reports: any = [];

  // text: any;
  first: number = 0;
  isMeridian = false;
  moduleTransferData: ImoduleTransferSubject;
  modulename: string;
  fcode: string;
  parentCode: string;
  dateValue = new Date();
  dateString: string;
  cascadeDropdown = [];
  submitted = false;
  loginInfo: any;
  PreviousData: any;
  timeValue: any;
  cars: any;
  cars1: any;
  tablevalue: any;
  parentID: any;
  exportColumns: any[];
  selectedColumns: any[];
  selectedColumns1: any[];
  selectedColumns2: any[];
  cols: any[];
  filtercols: any[];
  colshistory: any[];
  casecade: any = [];
  pusharraydata = [];

  allowedExtensions = [];
  fileExtensionMessage = "";

  pdfmessage: any;
  imagevisible = false;

  columns: any[];
  FinalOutput: any = {
    FormCode: "",
    CreatedBy: "",
    Action: ""
  };
  objcheck = [];

  filterValue: any = {};
  PreviousValue: any = {};
  multiAddValue = []
  PreviousCheck = [{
    DateOuyT: "",
    ProductTTma: "",
    CanSizedwaP: ""
  }]

  targetBuilderTools = [

  ];
  emptyrow: number = 2;
  editId: number;
  Cascadevalues = [];
  MultiaddColumns = []
  getcascadevalues: any;
  TabletargetBuilderTools = [];
  dataformat: any;
  dataformatHistory: any;
  getthemeconfigdetails: any;
  LanguageList = [];
  table: any = {
    Pagination: true,
    Scrollable: true,
    Sorting: true,
    Filter: true,
    ExportButton: true,
    MultiSelect: true,
    Resizable: true,
    Reorder: true,
  };
  msgs: Message[] = [];
  downloadDetails: any;
  activeMenuId: string;
  selectedItem: number;
  theme: any;
  isfile: boolean;
  acessData: any;
  IsCalendar: boolean;
  IsKanbana: boolean;
  IsReport: boolean;
  IsForm: boolean;
  IsCalendarButton: boolean = false;
  IsKanbanaButton: boolean = false;
  IsReportButton: boolean = false;
  ArrayValue: any;
  KeyValue: any;
  dataformatmulti: any;
  multichild: any[];
  multichilddata: any;
  calculatedOutput = [];
  dataTablevalue: any;
  relationField: any[] = [];
  LanguageID: any;
  cascadeArray = [];
  autoArray = [];
  texteditor: string;
  ActionIdValue: any;
  kanbanaEnable: boolean = true;
  reportEnable: boolean = true;
  calendarEnable: boolean = true;
  checkvalues: any;
  formvalue: any;
  SourceJson: any;
  Cascadeitemvalue: any;
  constructor(private confirmationService: ConfirmationService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private carService: CommonService, private helper: HelperService, private toaster: ToasterService,
    private modalService: NgbModal, private Builderservice: BuildercreateServiceService, private loginconfigservice: LoginconfigService,
    private sanitizer: DomSanitizer, route: ActivatedRoute, private changeDetector: ChangeDetectorRef, private router: Router) {
    route.params.subscribe(val => {
      this.getData();
    });

  }

  ngOnInit() {

  }



  getData() {
    this.spinner.show();

    this.IsKanbanaButton = false;
    this.IsCalendarButton = false;
    this.IsReportButton = false;
    this.objcheck = [];
    this.formvalue = undefined;
    this.loginInfo = this.helper.getValue('LoginInfo')
    this.LanguageID = this.helper.getValue('LanguageID')

    this.Builderservice.moduleTransferData.subscribe(data =>

      this.moduleTransferData = data
    );

    this.fcode = this.moduleTransferData.ModuleURL;

    this.modulename = this.moduleTransferData.ModuleName;
    this.isfile = this.moduleTransferData.IsFile;
    this.acessData = this.moduleTransferData.Access;
    this.IsForm = this.acessData.IsForm;
    this.IsReport = this.acessData.IsReport;
    this.IsCalendar = this.acessData.IsCalendar;
    this.IsKanbana = this.acessData.IsKanbana;
    this.parentCode = this.acessData.ParentFormCode

    if (this.loginInfo) {
      this.theme = this.helper.getValue('Theme');
      if (this.theme) {

        this.setTheme(this.theme)
      }
      else {

        this.getthemeconfigsetting();
      }
      this.table = this.helper.getValue('Table');
      if (this.table) {


      }
      else {

        this.gettableconfigsetting();
      }
    }

    if (this.fcode != undefined && this.fcode != "" && this.fcode != null) {
      this.getLanguageDetails();
      this.dateValue = new Date();
      this.dateString = formatDate(this.dateValue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
     
    }
    else{
      this.onChangeValue(1);
    }
    
   


  }
  getLanguageDetails() {

    const getdata: ILanguageref = {
      FormCode: this.fcode,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    };
    this.Builderservice.getLanguageInfo(getdata).subscribe(
      (response) => {
        this.LanguageList = response;
        if (!this.IsForm) {
          if (this.IsReport) {
            this.onChangeValue(5);

          }
          else if (this.IsKanbana) {
            this.onChangeValue(6);

          }
          else if (this.IsCalendar) {
            this.onChangeValue(7);

          }
        }
        else {
          this.getJsonValue();
        }

      }, error => {
        this.toaster.error("Some error Occurred")

      });

  }

  getJsonValue() {

    this.ValidateArray = [];
    this.filterValue = {};
    this.PreviousValue = {};
    this.multiAddValue = [];
    const formGroup = {};
    this.cascadeArray = [];
    this.autoArray = [];
    this.SourceJson = [];
    const getdata: IgetJsonData = {
      FormCode: this.fcode,
      ActionId: ""
    };

    this.Builderservice.getbuilderData(getdata).subscribe(
      (response) => {
        if (response.length > 0) {
          if (response[0].JsonData != null) {

            this.jsondata = JSON.parse(response[0].JsonData);

            this.targetBuilderTools = this.jsondata.Createjson;

            this.targetBuilderTools.forEach(formControl => {

              if (formControl.fieldType == "divSection") {
                if (formControl.multiple == false) {
                  if (formControl.children) {
                    formControl.children.forEach(e => {
                      const validatorscheck = [];
                      this.LanguageList.forEach((element) => {

                        if (e.columnID == element.FieldID) {
                          e.fieldName = element.LanguageText;
                          e.placeholder = element.PlaceHolder;
                        }

                      });
                      if (e.hasOwnProperty("CascadedItem")) {
                        if (e.CascadedItem.length > 0) {
                          this.Cascadeitemvalue = e.CascadedItem

                        }

                      }

                      this.SourceJson[e.columnID] = this.Cascadeitemvalue;

                      if (e.defaultValue == "Autofill") {
                        if (this.cascadeArray.includes(e.columnID)) {
                          this.cascadeArray.push(e.columnID);
                        }
                      }
                      if (e.autonumber == true) {

                        if (this.autoArray.includes(formControl.columnID)) {
                          this.autoArray.push(formControl.columnID);
                        }
                      }
                      if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine") {

                      }
                      else {

                        if (e.restrictedRoles.includes(this.loginInfo.RoleID)) {
                          e.visible = true;
                        }
                        if (e.previous) {
                          this.PreviousValue[e.columnID] = "";
                        }

                        formGroup[e.columnID] = new FormControl('', this.bindValidations(e || []));

                        this.DefaultValues(e, formGroup[e.columnID]);
                        if ((e.fieldType == "select" || e.fieldType == "radio") && (e.CascadeValue == "")) {
                          if (e.fieldType == "select") {
                            formGroup[e.columnID].setValue(0);
                          }

                          this.DefaultBind(e, e.columnID, 0, formGroup[e.columnID]);
                        }
                      }
                    });
                  }
                  if (formControl.children1) {


                    formControl.children1.forEach(e => {
                      this.LanguageList.forEach((element) => {

                        if (e.columnID == element.FieldID) {
                          e.fieldName = element.LanguageText;
                          e.placeholder = element.PlaceHolder;
                        }

                      });
                      if (e.hasOwnProperty("CascadedItem")) {
                        if (e.CascadedItem.length > 0) {
                          this.Cascadeitemvalue = e.CascadedItem
                        }
                      }
                      this.SourceJson[e.columnID] = this.Cascadeitemvalue;
                      if (e.defaultValue == "Autofill") {
                        if (this.cascadeArray.includes(formControl.columnID)) {
                          this.cascadeArray.push(formControl.columnID);
                        }
                      }
                      if (e.autonumber == true) {

                        if (this.autoArray.includes(formControl.columnID)) {
                          this.autoArray.push(formControl.columnID);
                        }
                      }
                      if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine") {

                      }
                      else {

                        if (e.restrictedRoles.includes(this.loginInfo.RoleID)) {

                          e.visible = true;
                        }
                        if (e.previous) {
                          this.PreviousValue[e.columnID] = "";
                        }

                        formGroup[e.columnID] = new FormControl('', this.bindValidations(e || []));
                        this.DefaultValues(e, formGroup[e.columnID]);
                        if ((e.fieldType == "select" || e.fieldType == "radio") && (e.CascadeValue == "")) {
                          if (e.fieldType == "select") {
                            formGroup[e.columnID].setValue(0);
                          }
                          this.DefaultBind(e, e.columnID, 0, formGroup[e.columnID]);
                        }
                      }
                    });

                  }
                  if (formControl.children2) {

                    formControl.children2.forEach(e => {
                      this.LanguageList.forEach((element) => {

                        if (e.columnID == element.FieldID) {
                          e.fieldName = element.LanguageText;
                          e.placeholder = element.PlaceHolder;
                        }

                      });
                      if (e.hasOwnProperty("CascadedItem")) {
                        if (e.CascadedItem.length > 0) {
                          this.Cascadeitemvalue = e.CascadedItem

                        }

                      }

                      this.SourceJson[e.columnID] = this.Cascadeitemvalue;
                      if (e.defaultValue == "Autofill") {
                        if (this.cascadeArray.includes(formControl.columnID)) {
                          this.cascadeArray.push(formControl.columnID);
                        }
                      }
                      if (e.autonumber == true) {

                        if (this.autoArray.includes(formControl.columnID)) {
                          this.autoArray.push(formControl.columnID);
                        }
                      }
                      if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine") {

                      }
                      else {

                        if (e.restrictedRoles.includes(this.loginInfo.RoleID)) {

                          e.visible = true;
                        }
                        if (e.previous) {
                          this.PreviousValue[e.columnID] = "";
                        }

                        formGroup[e.columnID] = new FormControl('', this.bindValidations(e || []));
                        this.DefaultValues(e, formGroup[e.columnID]);
                        if ((e.fieldType == "select" || e.fieldType == "radio") && (e.CascadeValue == "")) {
                          if (e.fieldType == "select") {
                            formGroup[e.columnID].setValue(0);
                          }
                          this.DefaultBind(e, e.columnID, 0, formGroup[e.columnID]);
                        }
                      }
                    });

                  }
                  if (formControl.children3) {

                    formControl.children3.forEach(e => {
                      this.LanguageList.forEach((element) => {

                        if (e.columnID == element.FieldID) {
                          e.fieldName = element.LanguageText;
                          e.placeholder = element.PlaceHolder;
                        }

                      });
                      if (e.hasOwnProperty("CascadedItem")) {
                        if (e.CascadedItem.length > 0) {
                          this.Cascadeitemvalue = e.CascadedItem

                        }

                      }

                      this.SourceJson[e.columnID] = this.Cascadeitemvalue;
                      if (e.defaultValue == "Autofill") {
                        if (this.cascadeArray.includes(formControl.columnID)) {
                          this.cascadeArray.push(formControl.columnID);
                        }
                      }
                      if (e.autonumber == true) {

                        if (this.autoArray.includes(formControl.columnID)) {
                          this.autoArray.push(formControl.columnID);
                        }
                      }
                      if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine") {

                      }
                      else {

                        if (e.restrictedRoles.includes(this.loginInfo.RoleID)) {

                          e.visible = true;
                        }
                        if (e.previous) {
                          this.PreviousValue[e.columnID] = "";
                        }
                        formGroup[e.columnID] = new FormControl('', this.bindValidations(e || []));
                        this.DefaultValues(e, formGroup[e.columnID]);
                        if ((e.fieldType == "select" || e.fieldType == "radio") && (e.CascadeValue == "")) {
                          if (e.fieldType == "select") {
                            formGroup[e.columnID].setValue(0);
                          }
                          this.DefaultBind(e, e.columnID, 0, formGroup[e.columnID]);
                        }
                      }

                    });

                  }
                  if (formControl.children4) {

                    formControl.children4.forEach(e => {
                      this.LanguageList.forEach((element) => {

                        if (e.columnID == element.FieldID) {
                          e.fieldName = element.LanguageText;
                          e.placeholder = element.PlaceHolder;
                        }

                      });
                      if (e.hasOwnProperty("CascadedItem")) {
                        if (e.CascadedItem.length > 0) {
                          this.Cascadeitemvalue = e.CascadedItem

                        }

                      }

                      this.SourceJson[e.columnID] = this.Cascadeitemvalue;
                      if (e.defaultValue == "Autofill") {
                        if (this.cascadeArray.includes(formControl.columnID)) {
                          this.cascadeArray.push(formControl.columnID);
                        }
                      }
                      if (e.autonumber == true) {

                        if (this.autoArray.includes(formControl.columnID)) {
                          this.autoArray.push(formControl.columnID);
                        }
                      }
                      if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine") {

                      }
                      else {

                        if (e.restrictedRoles.includes(this.loginInfo.RoleID)) {

                          e.visible = true;
                        }
                        if (e.previous) {
                          this.PreviousValue[e.columnID] = "";
                        }
                        formGroup[e.columnID] = new FormControl('', this.bindValidations(e || []));
                        this.DefaultValues(e, formGroup[e.columnID]);
                        if ((e.fieldType == "select" || e.fieldType == "radio") && (e.CascadeValue == "")) {
                          if (e.fieldType == "select") {
                            formGroup[e.columnID].setValue(0);
                          }
                          this.DefaultBind(e, e.columnID, 0, formGroup[e.columnID]);
                        }
                      }
                    });

                  }
                }
                if (formControl.multiple == true) {
                  if (!this.multiAddValue.includes(formControl.columnID)) {
                    this.multiAddValue.push(formControl.columnID);

                    this.helper.setValue(formControl.columnID, formControl);
                    formGroup[formControl.columnID] = this.formBuilder.array([this.createItem(formControl)])

                  }
                  if (formControl.defaultValue == "Autofill") {
                    if (this.cascadeArray.includes(formControl.columnID)) {
                      this.cascadeArray.push(formControl.columnID);
                    }
                  }
                  if (formControl.autonumber == true) {

                    if (this.autoArray.includes(formControl.columnID)) {
                      this.autoArray.push(formControl.columnID);
                    }
                  }

                }
              }

              else {
                this.LanguageList.forEach((element) => {
                  if (formControl.columnID == element.FieldID) {
                    formControl.fieldName = element.LanguageText;
                    formControl.placeholder = element.PlaceHolder;
                  }
                });
                if (formControl.defaultValue == "Autofill") {
                  if (this.cascadeArray.includes(formControl.columnID)) {
                    this.cascadeArray.push(formControl.columnID);
                  }
                }
                if (formControl.autonumber == true) {

                  if (this.autoArray.includes(formControl.columnID)) {
                    this.autoArray.push(formControl.columnID);
                  }
                }
                if (formControl.fieldType == "button" || formControl.fieldType == "paragraph" || formControl.fieldType == "hrLine") {

                }

                else {

                  if (formControl.restrictedRoles.includes(this.loginInfo.RoleID)) {

                    formControl.visible = true;
                  }
                  formGroup[formControl.columnID] = new FormControl('', this.bindValidations(formControl || []));


                  if (formControl.previous) {
                    this.PreviousValue[formControl.columnID] = "";
                  }
                  this.DefaultValues(formControl, formGroup[formControl.columnID]);
                  if ((formControl.fieldType == "select" || formControl.fieldType == "radio") && (formControl.CascadeValue == "")) {
                    if (formControl.fieldType == "select") {
                      formGroup[formControl.columnID].setValue(0);
                    }
                    this.DefaultBind(formControl, formControl.columnID, 0, formGroup[formControl.columnID]);
                  }
                }
              }
            });


            this.form = this.formBuilder.group(formGroup);
            this.onChangeValue(5)
          }

        }
        
      },
      error => {
        this.toaster.error("Some error Occurred")

      });
  }
  bindValidations(e: any) {

    const validList = [];
    if (e.hasOwnProperty("alertValue")) {
      for (let a = 0; a < e.alertValue.length; a++) {
        let reportdata = {
          Label: e.alertValue[a].alertText,
          criteria: e.alertValue[a].alertCriteria,
          condition: e.alertValue[a].alertCondition,
          refercolumn: e.alertValue[a].referColumn,
          type: "alert",
          column: e.columnID
        }
        this.ValidateArray.push(reportdata);

      }
    }
    if (e.hasOwnProperty("smsValue")) {
      for (let a = 0; a < e.smsValue.length; a++) {
        let reportsmsdata = {
          Label: e.smsValue[a].smsTextBox,
          criteria: e.smsValue[a].smsCriteria,
          condition: e.smsValue[a].smsCondition,
          refercolumn: e.smsValue[a].referColumn,
          type: "sms",
          column: e.columnID,
          Textarea: e.smsValue[a].smsTextarea
        }
        this.ValidateArray.push(reportsmsdata);
      }
    }
    if (e.hasOwnProperty("emailValue")) {
      for (let a = 0; a < e.emailValue.length; a++) {
        let reportemaildata = {
          Label: e.emailValue[a].Email,
          criteria: e.emailValue[a].Criteria,
          condition: e.emailValue[a].Condition,
          refercolumn: e.emailValue[a].referColumn,
          type: "email",
          column: e.columnID,
          Textarea: e.emailValue[a].Text,
          Subject: e.emailValue[a].Subject
        }
        this.ValidateArray.push(reportemaildata);
      }
    }
    if (e.required) {
      if (e.fieldType == "select") {
        validList.push(Dropdown);
      }
      validList.push(Validators.required);
    }
    if (e.minLength != "" && e.minLength != undefined) {
      validList.push(Validators.minLength);
    }
    if (e.maxLength != "" && e.maxLength != undefined) {

      validList.push(Validators.maxLength);
    }
    if (e.max != "" && e.max != undefined) {
      validList.push(Validators.max);
    }
    if (e.min != "" && e.min != undefined) {

      validList.push(Validators.min);
    }
    if (e.regex != "" && e.regex != undefined) {
      //^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$
      validList.push(Validators.pattern(e.regex));


    }

    if (validList.length > 0) {

      return Validators.compose(validList);
    }
    return null;

  }

  createItem(formcheck): FormGroup {
    const multiformGroup = {};
    multiformGroup['ID'] = new FormControl('');
    if (formcheck.children) {
      formcheck.children.forEach(e => {
        this.LanguageList.forEach((element) => {
          if (e.columnID == element.FieldID) {
            e.fieldName = element.LanguageText;
            e.placeholder = element.PlaceHolder;
          }
        });
        if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine") {
        }
        else {
          if (e.restrictedRoles.includes(this.loginInfo.RoleID)) {
            e.visible = true;
          }
          if (e.previous) {
            this.PreviousValue[e.columnID] = "";
          }
          multiformGroup[e.columnID] = new FormControl('', this.bindValidations(e || []));
          this.DefaultValues(e, multiformGroup[e.columnID]);
          if ((e.fieldType == "select" || e.fieldType == "radio") && (e.CascadeValue == "")) {
            if (e.fieldType == "select") {
              multiformGroup[e.columnID].setValue(0);
            }
            this.DefaultBind(e, e.columnID, 0, multiformGroup[e.columnID]);
          }
        }

      });
    }
    if (formcheck.children1) {


      formcheck.children1.forEach(e => {
        this.LanguageList.forEach((element) => {
          if (e.columnID == element.FieldID) {
            e.fieldName = element.LanguageText;
            e.placeholder = element.PlaceHolder;
          }
        });
        if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine") {
        }
        else {
          if (e.restrictedRoles.includes(this.loginInfo.RoleID)) {

            e.visible = true;
          }
          if (e.previous) {
            this.PreviousValue[e.columnID] = "";
          }
          multiformGroup[e.columnID] = new FormControl('', this.bindValidations(e || []));
          this.DefaultValues(e, multiformGroup[e.columnID]);
          if ((e.fieldType == "select" || e.fieldType == "radio") && (e.CascadeValue == "")) {
            if (e.fieldType == "select") {
              multiformGroup[e.columnID].setValue(0);
            }
            this.DefaultBind(e, e.columnID, 0, multiformGroup[e.columnID]);
          }
        }
      });

    }
    if (formcheck.children2) {

      formcheck.children2.forEach(e => {
        this.LanguageList.forEach((element) => {
          if (e.columnID == element.FieldID) {
            e.fieldName = element.LanguageText;
            e.placeholder = element.PlaceHolder;
          }
        });
        if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine") {
        }
        else {
          if (e.restrictedRoles.includes(this.loginInfo.RoleID)) {

            e.visible = true;
          }
          if (e.previous) {
            this.PreviousValue[e.columnID] = "";
          }
          multiformGroup[e.columnID] = new FormControl('', this.bindValidations(e || []));
          this.DefaultValues(e, multiformGroup[e.columnID]);
          if ((e.fieldType == "select" || e.fieldType == "radio") && (e.CascadeValue == "")) {
            if (e.fieldType == "select") {
              multiformGroup[e.columnID].setValue(0);
            }
            this.DefaultBind(e, e.columnID, 0, multiformGroup[e.columnID]);
          }
        }
      });

    }
    if (formcheck.children3) {

      formcheck.children3.forEach(e => {
        this.LanguageList.forEach((element) => {
          if (e.columnID == element.FieldID) {
            e.fieldName = element.LanguageText;
            e.placeholder = element.PlaceHolder;
          }
        });
        if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine") {
        }
        else {
          if (e.restrictedRoles.includes(this.loginInfo.RoleID)) {

            e.visible = true;
          }
          if (e.previous) {
            this.PreviousValue[e.columnID] = "";
          }
          multiformGroup[e.columnID] = new FormControl('', this.bindValidations(e || []));
          this.DefaultValues(e, multiformGroup[e.columnID]);
          if ((e.fieldType == "select" || e.fieldType == "radio") && (e.CascadeValue == "")) {
            if (e.fieldType == "select") {
              multiformGroup[e.columnID].setValue(0);
            }
            this.DefaultBind(e, e.columnID, 0, multiformGroup[e.columnID]);
          }
        }
      });

    }
    if (formcheck.children4) {

      formcheck.children4.forEach(e => {
        this.LanguageList.forEach((element) => {
          if (e.columnID == element.FieldID) {
            e.fieldName = element.LanguageText;
            e.placeholder = element.PlaceHolder;
          }
        });
        if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine") {
        }
        else {
          if (e.restrictedRoles.includes(this.loginInfo.RoleID)) {

            e.visible = true;
          }
          if (e.previous) {
            this.PreviousValue[e.columnID] = "";
          }
          multiformGroup[e.columnID] = new FormControl('', this.bindValidations(e || []));

          this.DefaultValues(e, multiformGroup[e.columnID]);
          if ((e.fieldType == "select" || e.fieldType == "radio") && (e.CascadeValue == "")) {
            if (e.fieldType == "select") {
              multiformGroup[e.columnID].setValue(0);
            }
            this.DefaultBind(e, e.columnID, 0, multiformGroup[e.columnID]);
          }
        }
      });

    }
    return this.formBuilder.group(multiformGroup);
  }
  addValues(formcheck) {

    const control = this.form.get(formcheck.columnID) as FormArray;
    control.push(this.createItem(formcheck));
    //this.defaultValueSet();

  }
  deleteValues(formcheck, index) {
    let control = this.form.get(formcheck.columnID) as FormArray;
    control.removeAt(index);
    if (formcheck.calculateValue) {
      this.OnCalculation(formcheck, formcheck.columnID, index);
    }

  }
  clearValues(formcheck) {
    let arr = this.form.get(formcheck.columnID) as FormArray;
    arr.controls = [];
  }

  onChangeValue(value) {
    if (value == 7) {
      // Kanban.getKanbanaJsonValue(); Kanban,
      this.IsKanbanaButton = false;
      this.IsCalendarButton = true;
      this.IsReportButton = false;
    }
    else if (value == 6) {
      // Kanban.getKanbanaJsonValue(); Kanban,
      this.IsKanbanaButton = true;
      this.IsCalendarButton = false;
      this.IsReportButton = false;
    } else if (value == 5) {
      this.IsKanbanaButton = false;
      this.IsCalendarButton = false;
      this.IsReportButton = true;


    }
    else if (value == 1) {

      this.router.navigate(["/theme/Reload"]);

    }
    if (this.fcode != undefined && this.fcode != "" && this.fcode != null) {
      
      let ViewTransferValue: IViewUISubject = {
        FormCode: this.fcode,
        ActionId: value,
        IsFile: this.isfile,
        Access: this.acessData
      }
      this.Builderservice.checkviewUIdata(ViewTransferValue);
    }

    this.spinner.hide();
  }

  onFilterdatechange(event, columnID) {

  }

  editClick(car, content) {

    this.ActionIdValue = car.value;

    this.editId = car.ID;
    const getdata: Iget = {
      FormCode: this.fcode,
      CreatedBy: this.loginInfo.UserId,

      Id: this.editId, //editID
      Action: 4


    }

    this.Builderservice.dynamicTableOperationEdit(getdata).subscribe(
      (response) => {
        this.openModal(content)

        this.getcascadevalues = response.Table;
        if (this.getcascadevalues) {
          this.getcascadevalues.forEach(val => {
            if (val.CascadeValue != null && val.CascadeValue != undefined && val.CascadeValue != "") {
              this.Cascadevalues.push(val.CascadeValue);
            }
            this.MultiaddColumns = val.MultipleTrueColumns
          });

        }


        for (var key in response.data[0]) {

          if (this.Cascadevalues.includes(key)) {

            this.OnchangeFn(response.data[0][key], key, 1);
          }
          if (this.MultiaddColumns != null && this.MultiaddColumns.length > 0) {

            if (this.MultiaddColumns.includes(key)) {

              this.KeyValue = this.helper.getValue(key);

              this.clearValues(this.KeyValue);
              if (response.data[0][key].length > 0) {

                response.data[0][key] = JSON.parse(response.data[0][key])
                this.ArrayValue = response.data[0][key];
                for (let j = 0; j < this.ArrayValue.length; j++) {
                  this.addValues(this.KeyValue);

                }
              }
            }
          }


        }

        if (response.data) {

          this.form.patchValue(response.data[0]);

        }
      });

  }
  private setTheme(theme: {}) {

    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
  getthemeconfigsetting() {
    const themeconfigdata: Iconfig = {
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    };

    this.loginconfigservice.GetThemeConfigdetails(themeconfigdata).subscribe(
      (response) => {

        this.theme = response[0];
        this.setTheme(this.theme);
      },
      error => {
        //this.toaster.error("Some error occurred.Please try again", "Error");

      });


  }
  gettableconfigsetting() {
    const tableconfigdata: Iconfig = {
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    };

    this.loginconfigservice.GetTableConfigdetails(tableconfigdata).subscribe(
      (response) => {

        this.table = response[0];
      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");

      });


  }


  DefaultBind(formControl: any, fieldId, statusValue, columnId) {

    const getdata: Ibuilderref = {
      FormCode: this.parentCode,
      FieldCode: fieldId,
      Value: "",
      Status: statusValue

    };

    // getall users
    this.Builderservice.getAllReference(getdata).subscribe(
      (response) => {

        formControl.values = response;
        // columnId.setValue(0);
      }
    );


  }
  DefaultValues(formcontrol: any, fieldId) {

    if (formcontrol.defaultValue == "date") {
      let defaultObject = {
        defaultValue: "date",
        defaultLabel: fieldId,
        defaultColumn: formcontrol.columnID,
        defaultCascade: formcontrol
      };
      this.objcheck.push(defaultObject);

    }
    else if (formcontrol.defaultValue == "time") {
      let defaultObject = {
        defaultValue: "time",
        defaultLabel: fieldId,
        defaultColumn: formcontrol.columnID
      };
      this.objcheck.push(defaultObject);

    }
    else if (formcontrol.defaultValue == "userid") {
      let defaultObject = {
        defaultValue: "userid",
        defaultLabel: fieldId,
        defaultColumn: formcontrol.columnID
      };

      this.objcheck.push(defaultObject);
    }
    else if (formcontrol.defaultValue == "username") {
      let defaultObject = {
        defaultValue: "username",
        defaultLabel: fieldId,
        defaultColumn: formcontrol.columnID
      };

      this.objcheck.push(defaultObject);
    }
    else if (formcontrol.defaultValue == "role") {
      let defaultObject = {
        defaultValue: "role",
        defaultLabel: fieldId,
        defaultColumn: formcontrol.columnID
      };
      this.objcheck.push(defaultObject);
    }
    else if (formcontrol.defaultValue == "tenantId") {
      let defaultObject = {
        defaultValue: "tenantId",
        defaultLabel: fieldId,
        defaultColumn: formcontrol.columnID
      };
      this.objcheck.push(defaultObject);
    }

    else if (formcontrol.defaultValue == "language") {
      let defaultObject = {
        defaultValue: "language",
        defaultLabel: fieldId,
        defaultColumn: formcontrol.columnID
      };
      this.objcheck.push(defaultObject);
    }
    else if (formcontrol.autonumber) {
      let defaultObject = {
        defaultValue: "AutoNumber",
        defaultLabel: formcontrol.columnID,
        defaultColumn: formcontrol.defaultValue,
        relationField: formcontrol.relationField

      };
      this.objcheck.push(defaultObject);
    }

    else if (formcontrol.defaultValue != "Autofill" && formcontrol.defaultValue != "") {

      let defaultObject = {
        defaultValue: "other",
        defaultLabel: fieldId,
        defaultColumn: formcontrol.defaultValue
      };
      this.objcheck.push(defaultObject);
    }


  }

  CalculateItem(dataItem, keyitem, key, parentform, childform?) {
console.log(keyitem,"keyitem")
console.log(key,"key")
    let arrValue = [];

    let operandValue = "";
    let currentValue = "";
    let multivalue = ",";
    let multifinalvalue = "";
    let datearray = [];
    let timearray = [];
    let startdate = new Date()
    let startdateValue = formatDate(startdate.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');

    let finalvalue = "";
    for (var i in keyitem) {
      if (dataItem.fieldType == "date") {
        if (keyitem[i] == "+" || keyitem[i] == "-" || keyitem[i] == "*" || keyitem[i] == "/"
          || keyitem[i] == "^" || keyitem[i] == "(" || keyitem[i] == ")" || keyitem[i] == "=") {
        }
        else {
          if (parentform.contains(keyitem[i])) {
            if (parentform.get(keyitem[i]).value != null && parentform.get(keyitem[i]).value != undefined && parentform.get(keyitem[i]).value != "") {
              if (parentform.get(keyitem[i]).value instanceof Date) {
                let dateval = parentform.get(keyitem[i]).value;
                datearray.push(formatDate(dateval.toLocaleDateString(), 'yyyy-MM-dd', 'en-US'));
              }
              else {
                datearray.push(parentform.get(keyitem[i]).value)
              }
            }
            else {
              datearray.push(startdateValue)
            }
          }
          else if (childform != undefined && childform.contains(keyitem[i])) {


            if (childform.get(keyitem[i]).value != null && childform.get(keyitem[i]).value != undefined && childform.get(keyitem[i]).value != "") {
              if (childform.get(keyitem[i]).value instanceof Date) {
                let dateval = childform.get(keyitem[i]).value;
                datearray.push(formatDate(dateval.toLocaleDateString(), 'yyyy-MM-dd', 'en-US'));

              }
              else {
                datearray.push(childform.get(keyitem[i]).value);
              }

            }
            else {
              datearray.push(startdateValue)
            }
          }
          else {
            for (var multi in this.multiAddValue) {
              if (parentform.get(this.multiAddValue[multi])["controls"][0].contains(keyitem[i])) {
                let formname = parentform.get(this.multiAddValue[multi])["controls"][0];
                if (formname.get(keyitem[i]).value != null && formname.get(keyitem[i]).value != undefined && formname.get(keyitem[i]).value != "") {
                  if (formname.get(keyitem[i]).value instanceof Date) {
                    let dateval = formname.get(keyitem[i]).value
                    datearray.push(formatDate(dateval.toLocaleDateString(), 'yyyy-MM-dd', 'en-US'));

                  }
                  else {
                    datearray.push(formname.get(keyitem[i]).value)
                  }

                }
                else {
                  datearray.push(startdateValue)
                }
              }

            }

          }
        }
      }
      else if (dataItem.fieldType == "time") {
        let starttimeValue = formatDate(startdate.toLocaleDateString(), 'yyyy-MM-dd HH:mm:ss', 'en-US');;
        if (keyitem[i] == "+" || keyitem[i] == "-" || keyitem[i] == "*" || keyitem[i] == "/"
          || keyitem[i] == "^" || keyitem[i] == "(" || keyitem[i] == ")" || keyitem[i] == "=") {

        }
        else if (parentform.get(keyitem[i]).value != null && parentform.get(keyitem[i]).value != undefined && parentform.get(keyitem[i]).value != "") {

          let timevalues = parentform.get(keyitem[i]).value;

          var combined = startdateValue + ' ' + timevalues;

          // tell moment how to parse the input string
          var momentObj = formatDate(combined, 'yyyy-MM-dd HH:mm:ss', 'en-US');
          //const nextWeek = today.add(7, 'days');
          timearray.push(momentObj)
        }
        else {

          timearray.push(starttimeValue)
        }

      }
      else {
        if (keyitem[i] == "+" || keyitem[i] == "-" || keyitem[i] == "*" || keyitem[i] == "/"
          || keyitem[i] == "^" || keyitem[i] == "(" || keyitem[i] == "=") {
          finalvalue += keyitem[i];
          multivalue = keyitem[i];
        }
        else if (keyitem[i] == ")") {

          if (operandValue == "max" || operandValue == "min") {
            var str = "0";
            if (arrValue.length > 0) {
              str = arrValue.join();
            }

            finalvalue += str;

          }
          else if (operandValue == "Avg") {
            let arrop = eval(arrValue.join('+')) / arrValue.length;
            finalvalue += arrop.toFixed(2).toString();
          }
          finalvalue += keyitem[i];
          operandValue = "";
          arrValue = [];

        }
        else if (keyitem[i] == "max" || keyitem[i] == "min" || keyitem[i] == "Avg") {
          operandValue = keyitem[i];
          if (keyitem[i] == "max" || keyitem[i] == "min") {
            finalvalue += "Math." + keyitem[i];
          }
        }
        else {
          if (parentform.contains(keyitem[i])) {
            currentValue = parentform.get(keyitem[i]).value > 0 ? parentform.get(keyitem[i]).value : 0;

            if (operandValue == "max" || operandValue == "min" || operandValue == "Avg") {
              if (currentValue != "0") {
                arrValue.push(currentValue)
              }
            }
            else {
              finalvalue += currentValue.toString();
            }
          }

          else if (childform != undefined && childform.contains(keyitem[i])) {

            currentValue = childform.get(keyitem[i]).value > 0 ? childform.get(keyitem[i]).value : 0;

            if (operandValue == "max" || operandValue == "min" || operandValue == "Avg") {
              if (currentValue != "0") {
                arrValue.push(currentValue)
              }
            }
            else {
              finalvalue += currentValue.toString();
            }


          }
          else {

            for (var multi in this.multiAddValue) {
              if (parentform.get(this.multiAddValue[multi])["controls"].length > 0) {
                if (parentform.get(this.multiAddValue[multi])["controls"][0].contains(keyitem[i])) {
                  multifinalvalue = "";
                  if (multivalue == "(" || multivalue == ")") {
                    multivalue = ",";
                  }
                  let counttime = parentform.get(this.multiAddValue[multi])["controls"]
                  for (var formname in counttime) {


                    currentValue = counttime[formname].get(keyitem[i]).value > 0 ? counttime[formname].get(keyitem[i]).value : 0;
                    multifinalvalue += currentValue.toString() + multivalue;
                    if (currentValue != "0") {
                      arrValue.push(currentValue)
                    }
                  }
                  if (operandValue == "max" || operandValue == "min" || operandValue == "Avg") {

                  }

                  else {
                    multifinalvalue = multifinalvalue.slice(0, -1);
                    finalvalue += multifinalvalue;
                  }
                }
              }
              else {
                finalvalue += 0;
              }
            }

          }
        }
      }
    }

    if (dataItem.fieldType == "date") {


      let firstDate = moment(datearray[0]);
      let secondDate = moment(datearray[1]);

      let diffInDays = Math.abs(firstDate.diff(secondDate, dataItem.Intervals));
      if (parentform.contains(key)) {
        parentform.get(key).setValue(diffInDays);
      }
      if (childform != undefined && childform.contains(key)) {
        childform.get(key).setValue(diffInDays);
      }

    }
    else if (dataItem.fieldType == "time") {


      let firstDate = moment(timearray[0]);
      let secondDate = moment(timearray[1]);
      let minutediff = 0;
      let diffInDays = Math.abs(firstDate.diff(secondDate, dataItem.Intervals));
      if (diffInDays > 500) {
        minutediff = 1440 - diffInDays;
      }
      else {
        minutediff = diffInDays;
      }
      if (parentform.contains(key)) {
        parentform.get(key).setValue(minutediff);
      }
      if (childform != undefined && childform.contains(key)) {
        childform.get(key).setValue(minutediff);
      }



    }
    else {
      // if (operandValue == "max") {
      //   var str = arrValue.join();
      //   finalvalue = "Math.max(" + str + ")";
      // }

      // if (operandValue == "min") {
      //   var str = arrValue.join();
      //   finalvalue = " Math.min(" + str + ")";
      // }
      // if (operandValue == "Avg") {
      //   let arrop = eval(arrValue.join('+')) / arrValue.length;
      //   finalvalue = arrop.toFixed(2).toString();

      // }
      let checkvalues = eval(finalvalue);
      checkvalues = checkvalues.toFixed(2).toString();
      if (parentform.contains(key)) {
        parentform.get(key).setValue(checkvalues);
      }


      if (childform != undefined && childform.contains(key)) {
        childform.get(key).setValue(checkvalues);
      }

    }

  }
  OnCalculation(dataItem, divname?, index?) {

    var calc = dataItem.Calculation;
    Object.keys(calc).forEach(key => {
      if (this.form.contains(key)) {
        this.CalculateItem(dataItem, calc[key], key, this.form)
      }
      else {
        if (index != undefined && divname != undefined) {
          let indexmulti = this.form.get(divname)["controls"][index]
          if (indexmulti != undefined) {
            this.CalculateItem(dataItem, calc[key], key, this.form, indexmulti)
          }
        }
        else {
          for (var mul in this.multiAddValue) {
            if (this.form.get(this.multiAddValue[mul])["controls"][0].contains(key)) {
              let checkmulti = this.form.get(this.multiAddValue[mul])["controls"]
              for (var formnames in checkmulti) {
                this.CalculateItem(dataItem, calc[key], key, this.form, checkmulti[formnames])
              }
            }
          }
        }
      }
    });
  }
  Onconditioncheck(arrItem) {
    this.OnchangeFn(arrItem.val, arrItem.fieldvalue, arrItem.settingflag, arrItem.itemvalue,
      arrItem.childform, arrItem.index)
  }
  OnchangeFn(val: string, fieldvalue, settingflag, itemvalue?, childform?, index?) {
    if (itemvalue != undefined && itemvalue.calculateValue) {
      this.OnCalculation(itemvalue, childform, index);
    }
    else {
      if (itemvalue != undefined && itemvalue.CascadedItems) {
        this.OnCascadeValue(itemvalue, childform, index);
      }


    }



  }
  OnCascadeValue(dataItem, divname?, index?) {
    var cas = dataItem.CascadedItems;
    Object.keys(cas).forEach(key => {

      if (this.form.contains(key)) {

        this.CascadeItemValue(dataItem, cas[key], key, this.form)

      }
      else {
        if (index != undefined && divname != undefined) {
          let indexmulti = this.form.get(divname)["controls"][index]
          if (indexmulti != undefined) {
            this.CascadeItemValue(dataItem, cas[key], key, this.form, indexmulti)
          }


        }
        else {
          for (var mul in this.multiAddValue) {

            if (this.form.get(this.multiAddValue[mul])["controls"][0].contains(key)) {

              let checkmulti = this.form.get(this.multiAddValue[mul])["controls"]

              for (var formnames in checkmulti) {
                this.CascadeItemValue(dataItem, cas[key], key, this.form, checkmulti[formnames])

              }
            }
          }
        }
      }
    });
  }
  CascadeItemValue(dataItem, keyitem, key, parentform, childform?) {
    let casresult = {};

    for (var i in keyitem) {
      let keyitemvalue = keyitem[i];
      for (let j = 0; j < keyitemvalue.length; j++) {
        if (parentform.contains(keyitemvalue[j])) {
          // if (parentform.get(keyitemvalue[j]).value != null && parentform.get(keyitemvalue[j]).value != undefined && parentform.get(keyitemvalue[j]).value != "") {
          casresult[keyitemvalue[j]] = parentform.get(keyitemvalue[j]).value;
          // }


        } else if (childform.contains(keyitemvalue[j])) {
          // if (childform.get(keyitemvalue[j]).value != null && childform.get(keyitemvalue[j]).value != undefined && childform.get(keyitemvalue[j]).value != "") {
          casresult[keyitemvalue[j]] = parentform.get(keyitemvalue[j]).value;
          // }
        } else {
          for (var multi in this.multiAddValue) {
            if (parentform.get(this.multiAddValue[multi])["controls"][0].contains(keyitemvalue[j]) != null) {
              let formname = parentform.get(this.multiAddValue[multi])["controls"][0];
              if (formname.get(keyitemvalue[j]).value != null && formname.get(keyitemvalue[j]).value != undefined && formname.get(keyitemvalue[j]).value != "") {
                casresult[keyitemvalue[j]] = formname.get(keyitemvalue[j]).value;
              }
            }
          }

        }
      }





    }
    this.casecade = casresult,
      this.casecade.Status = 0,
      this.casecade.FormCode = this.parentCode,
      this.casecade.FieldCode = key,



      this.Builderservice.MultiCascade(this.casecade).subscribe(
        (response) => {

          if (response) {
            // if (response != null && response.length > 0) {
            // if (parentform != undefined && parentform != null && parentform != "") {
            //   if (parentform.contains(key)) {
            //     if (this.cascadeArray.includes(parentform.contains(key))) {
            //       parentform.get(key).values = response;
            //       parentform.get(key).setValue(response[0].Value);
            //     } else if (this.autoArray.includes(parentform.contains(key))) {
            //       parentform.get(key).setValue(response[0].Value);
            //     }
            //     // else {
            //     //   // parentform.get(key).values = response;
            //     //   // parentform.controls[key].value = response;
            //     //   parentform.controls.values = response;
            //     //   this.form.get(key).patchValue(response);
            //     // }
            //     // parentform.values = response;
            //   }
            // }
            // if (childform != undefined && childform != null && childform != "") {
            //   if (childform.contains(key)) {
            //     if (this.cascadeArray.includes(childform.contains(key))) {
            //       childform.get(key).setValue(response);
            //     } else if (this.autoArray.includes(childform.contains(key))) {
            //       childform.get(key).setValue(response);
            //     }
            //     // else {
            //     //   childform.get(key).setValue(response);
            //     // }
            //     // childform.values = response;
            //   }
            // }
            this.targetBuilderTools.forEach(formControl => {
              if (formControl.fieldType == "divSection") {
                if (formControl.children) {
                  formControl.children.forEach(e => {
                    if (e.columnID == key) {
                      // e.values = response.length > 0 ? response : e.columnID.setValue(0);
                      if (e.fieldType == "select") {
                        e.values = response;
                      } else {
                        this.form.get(e.columnID).setValue(response[0].Value);
                      }

                    }
                  });

                }
                if (formControl.children1) {

                  formControl.children1.forEach(e => {
                    if (e.columnID == key) {
                      // e.values = response;
                      // e.values = response.length > 0 ? response : e.columnID.setValue(0);
                      if (e.fieldType == "select") {
                        e.values = response;
                      } else {
                        this.form.get(e.columnID).setValue(response[0].Value);
                      }
                    }
                  });
                }
                if (formControl.children2) {

                  formControl.children2.forEach(e => {
                    if (e.columnID == key) {
                      // e.values = response.length > 0 ? response : e.columnID.setValue(0);
                      if (e.fieldType == "select") {
                        e.values = response;
                      } else {
                        this.form.get(e.columnID).setValue(response[0].Value);
                      }
                    }
                  });
                }
                if (formControl.children3) {

                  formControl.children3.forEach(e => {
                    if (e.columnID == key) {
                      // e.values = response.length > 0 ? response : e.columnID.setValue(0);
                      if (e.fieldType == "select") {
                        e.values = response;
                      } else {
                        this.form.get(e.columnID).setValue(response[0].Value);
                      }
                    }
                  });
                }
                if (formControl.children4) {

                  formControl.children4.forEach(e => {
                    if (e.columnID == key) {
                      // e.values = response.length > 0 ? response : e.columnID.setValue(0);
                      if (e.fieldType == "select") {
                        e.values = response;
                      } else {
                        this.form.get(e.columnID).setValue(response[0].Value);
                      }
                    }
                  });
                }
              }
              // }
            });

            for (var i in this.PreviousValue) {
              if (this.PreviousValue.hasOwnProperty(i)) {
                if (this.PreviousValue[i] != "" && this.PreviousValue[i] != undefined && this.PreviousValue[i] != null)
                  this.form.get(i).setValue(this.PreviousValue[i]);
              }
            }
            // }


          }

        }
      );

  }

  get dynamicform() { return this.form.controls; }
  defaultValueSet() {
    this.dateValue = new Date();
    this.dateString = formatDate(this.dateValue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    this.timeValue = this.dateValue.getHours() + ":" + this.dateValue.getMinutes();

    for (let i = 0; i < this.objcheck.length; i++) {
      if (this.objcheck[i].defaultValue == "date") {
        this.objcheck[i].defaultLabel.setValue(this.dateValue)
        this.OnchangeFn(this.dateString, this.objcheck[i].defaultColumn, 0, this.objcheck[i].defaultCascade);
      }
      else if (this.objcheck[i].defaultValue == "time") {
        this.objcheck[i].defaultLabel.setValue(this.timeValue);
      }
      else if (this.objcheck[i].defaultValue == "userid") {
        this.objcheck[i].defaultLabel.setValue(this.loginInfo.UserId);
      }
      else if (this.objcheck[i].defaultValue == "username") {
        this.objcheck[i].defaultLabel.setValue(this.loginInfo.firstName + " " + this.loginInfo.lastName);
      }
      else if (this.objcheck[i].defaultValue == "role") {
        this.objcheck[i].defaultLabel.setValue(this.loginInfo.RoleID);
      }
      else if (this.objcheck[i].defaultValue == "tenantId") {
        this.objcheck[i].defaultLabel.setValue(this.loginInfo.TenantId);
      }
      else if (this.objcheck[i].defaultValue == "language") {
        this.objcheck[i].defaultLabel.setValue(this.loginInfo.LanguageId);
      }
      else if (this.objcheck[i].defaultValue == "AutoNumber") {
        this.getautoNumberData(this.objcheck[i].defaultLabel, this.objcheck[i].relationField);

      }
      else if (this.objcheck[i].defaultValue == "other") {
        this.objcheck[i].defaultLabel.setValue(this.objcheck[i].defaultColumn);
      }

    }
  }
  AddClick(AddValue, content) {

    this.ActionIdValue = AddValue.value;

    this.form.reset();
    this.editId = 0;

    for (var multi in this.multiAddValue) {

      this.KeyValue = this.helper.getValue(this.multiAddValue[multi]);

      this.clearValues(this.KeyValue);
      this.addValues(this.KeyValue);
    }
    this.defaultValueSet();

    for (var i in this.PreviousValue) {
      if (this.PreviousValue.hasOwnProperty(i)) {
        if (this.PreviousValue[i] != "" && this.PreviousValue[i] != undefined && this.PreviousValue[i] != null)
          this.form.get(i).setValue(this.PreviousValue[i]);
      }
    }

    this.openModal(content);
  }
  openModal(content) {


    this.submitted = false;
    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
  }

  toggleValue(item) {
    item.selected = !item.selected;
  }

  getautoNumberData(columnID, relationField) {

    this.reports = {};

    this.reports.ColumnName = columnID,
      this.reports.FormCode = this.parentCode
    for (let i = 0; i < relationField.length; i++) {
      let relationValue = this.form.get(relationField[i]).value;
      let itemname = relationField[i];
      if (relationValue.length > 0 || relationValue != null && relationValue != undefined) {
        this.reports[itemname] = relationValue;
      }
    }
    this.cols = [

    ];


    this.spinner.hide();
    this.Builderservice.dynamicFormPreviewSelect(this.reports).subscribe(
      (response) => {
        this.dataTablevalue = response;


        this.form.get(columnID).setValue(this.dataTablevalue.AutoNumber);

      },

      error => {
        this.spinner.hide();
        this.toaster.error("Some error occurred.Please try again", "Error");

      });
  }
  exportPdf() {

    let doc = new jsPDF('l', 'pt');
    doc.autoTable(this.exportColumns, this.cars); // typescript compile time error
    doc.save(this.modulename + new Date().getTime() + '.pdf');
  }

  SaveJson() {

    let alertcount = 0;
    let alertmessage = "";
    let columnvalue = "";
    const x = this.PreviousValue;
    const z = this.filterValue;
    const y = this.form.value;
    this.formvalue = this.form.value;

    for (var i in this.form.value) {
      if (x.hasOwnProperty(i)) {
        this.PreviousValue[i] = y[i]
      }
      if (z.hasOwnProperty(i)) {
        this.filterValue[i] = y[i]
      }
    }

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.FinalOutput = this.form.value;

    this.FinalOutput.FormCode = this.fcode,
      this.FinalOutput.CreatedBy = this.loginInfo.UserId;
    this.FinalOutput.Action = this.editId > 0 ? "2" : "1",
      this.FinalOutput.Id = this.editId > 0 ? this.editId : 0;
    this.FinalOutput.LanguageId = this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    for (let i = 0; i < this.ValidateArray.length; i++) {
      if (this.ValidateArray[i].type == "alert") {
        if (this.ValidateArray[i].refercolumn) {
          if (this.ValidateArray[i].condition != "between" && this.ValidateArray[i].condition != "notbetween") {
            if (this.form.get(this.ValidateArray[i].criteria).value != null &&
              this.form.get(this.ValidateArray[i].criteria).value != undefined && this.form.get(this.ValidateArray[i].criteria).value != "") {
              columnvalue = this.form.get(this.ValidateArray[i].column).value + this.ValidateArray[i].condition +
                (this.form.get(this.ValidateArray[i].criteria).value);

            }

          }
          else {
            // let criteria = this.ValidateArray[i].criteria.split(",");

            // if (this.ValidateArray[i].condition == "between") {
            //   columnvalue = this.form.get(this.ValidateArray[i].column).value + '>=' + criteria[0] + '&&' +
            //     this.form.get(this.ValidateArray[i].column).value + '<=' + criteria[1]

            // }
            // if (this.ValidateArray[i].condition == "notbetween") {
            //   columnvalue = this.form.get(this.ValidateArray[i].column).value + '<' + criteria[0] + '&&' +
            //     this.form.get(this.ValidateArray[i].column).value + '>' + criteria[1]

            // }
          }

          if (eval(columnvalue)) { // if (columnvalue) {
            alertcount = alertcount + 1;
            alertmessage = this.ValidateArray[i].Label;
          }
          else {
          }
        }
        else {
          if (this.ValidateArray[i].condition != "between" && this.ValidateArray[i].condition != "notbetween") {
            columnvalue = '"' + this.form.get(this.ValidateArray[i].column).value + '"' + this.ValidateArray[i].condition + '"' + this.ValidateArray[i].criteria + '"';
          }
          else {
            let criteria = this.ValidateArray[i].criteria.split(",");
            if (this.ValidateArray[i].condition == "between") {
              columnvalue = this.form.get(this.ValidateArray[i].column).value + '>=' + criteria[0] + '&&' +
                this.form.get(this.ValidateArray[i].column).value + '<=' + criteria[1]
            }
            if (this.ValidateArray[i].condition == "notbetween") {
              columnvalue = this.form.get(this.ValidateArray[i].column).value + '<' + criteria[0] + '&&' +
                this.form.get(this.ValidateArray[i].column).value + '>' + criteria[1]
            }
          }

          if (eval(columnvalue)) {  // if (columnvalue) {
            alertcount = alertcount + 1;
            alertmessage = this.ValidateArray[i].Label;
          }
          else {
          }
        }
      }
      if (this.ValidateArray[i].type == "sms") {
        if (this.ValidateArray[i].refercolumn) {
          if (this.ValidateArray[i].condition != "between" && this.ValidateArray[i].condition != "notbetween") {
            if (this.form.get(this.ValidateArray[i].criteria).value != null &&
              this.form.get(this.ValidateArray[i].criteria).value != undefined && this.form.get(this.ValidateArray[i].criteria).value != "") {
              columnvalue = this.form.get(this.ValidateArray[i].column).value + this.ValidateArray[i].condition +
                (this.form.get(this.ValidateArray[i].criteria).value);
            }
          }
          else {
          }
          if (eval(columnvalue)) {  // if (columnvalue) { 
            // alertcount = alertcount + 1;
            // alertmessage = this.ValidateArray[i].Label;
            const smsalert: IsmsAlert = {
              PhoneNumber: this.ValidateArray[i].Label,
              Message: this.ValidateArray[i].Textarea
            }
            this.Builderservice.dynamicSMSAlert(smsalert).subscribe(
              (response) => {

              },
              error => {
                this.spinner.hide();
                this.toaster.error("Some error occurred.Please try again", "Error");
              });
          }
          else {

          }
        }
        else {
          if (this.ValidateArray[i].condition != "between" && this.ValidateArray[i].condition != "notbetween") {
            columnvalue = '"' + this.form.get(this.ValidateArray[i].column).value + '"' + this.ValidateArray[i].condition + '"' + this.ValidateArray[i].criteria + '"';
          }
          else {
            let criteria = this.ValidateArray[i].criteria.split(",");
            if (this.ValidateArray[i].condition == "between") {
              columnvalue = this.form.get(this.ValidateArray[i].column).value + '>=' + criteria[0] + '&&' +
                this.form.get(this.ValidateArray[i].column).value + '<=' + criteria[1]
            }
            if (this.ValidateArray[i].condition == "notbetween") {
              columnvalue = this.form.get(this.ValidateArray[i].column).value + '<' + criteria[0] + '&&' +
                this.form.get(this.ValidateArray[i].column).value + '>' + criteria[1]
            }
          }

          if (eval(columnvalue)) { //  if (columnvalue){
            // alertcount = alertcount + 1;
            // alertmessage = this.ValidateArray[i].Label;
            const smsalert: IsmsAlert = {
              PhoneNumber: this.ValidateArray[i].Label,
              Message: this.ValidateArray[i].Textarea
            }
            this.Builderservice.dynamicSMSAlert(smsalert).subscribe(
              (response) => {

              },
              error => {
                this.spinner.hide();
                this.toaster.error("Some error occurred.Please try again", "Error");
              });
          }
          else {


          }
        }
      }
      if (this.ValidateArray[i].type == "email") {
        if (this.ValidateArray[i].refercolumn) {
          if (this.ValidateArray[i].condition != "between" && this.ValidateArray[i].condition != "notbetween") {
            if (this.form.get(this.ValidateArray[i].criteria).value != null &&
              this.form.get(this.ValidateArray[i].criteria).value != undefined && this.form.get(this.ValidateArray[i].criteria).value != "") {
              columnvalue = this.form.get(this.ValidateArray[i].column).value + this.ValidateArray[i].condition +
                (this.form.get(this.ValidateArray[i].criteria).value);
            }
          }
          else {

          }
          if (eval(columnvalue)) {//  if (columnvalue) {
            // alertcount = alertcount + 1;
            // alertmessage = this.ValidateArray[i].Label;
            const emailalert: IEmailAlert = {
              EmailID: this.ValidateArray[i].Label,
              Message: this.ValidateArray[i].Textarea,
              Subject: this.ValidateArray[i].Subject
            }
            this.Builderservice.dynamicEmailAlert(emailalert).subscribe(
              (response) => {

              },
              error => {
                this.spinner.hide();
                this.toaster.error("Some error occurred.Please try again", "Error");
              });
          }
          else {

          }
        }
        else {
          if (this.ValidateArray[i].condition != "between" && this.ValidateArray[i].condition != "notbetween") {
            columnvalue = '"' + this.form.get(this.ValidateArray[i].column).value + '"' + this.ValidateArray[i].condition + '"' + this.ValidateArray[i].criteria + '"';
          }
          else {
            let criteria = this.ValidateArray[i].criteria.split(",");
            if (this.ValidateArray[i].condition == "between") {
              columnvalue = this.form.get(this.ValidateArray[i].column).value + '>=' + criteria[0] + '&&' +
                this.form.get(this.ValidateArray[i].column).value + '<=' + criteria[1]
            }
            if (this.ValidateArray[i].condition == "notbetween") {
              columnvalue = this.form.get(this.ValidateArray[i].column).value + '<' + criteria[0] + '&&' +
                this.form.get(this.ValidateArray[i].column).value + '>' + criteria[1]
            }
          }

          if (eval(columnvalue)) {//  if (columnvalue) {
            // alertcount = alertcount + 1;
            // alertmessage = this.ValidateArray[i].Label;
            const emailalert: IEmailAlert = {
              EmailID: this.ValidateArray[i].Label,
              Message: this.ValidateArray[i].Textarea,
              Subject: this.ValidateArray[i].Subject
            }
            this.Builderservice.dynamicEmailAlert(emailalert).subscribe(
              (response) => {

              },
              error => {
                this.spinner.hide();
                this.toaster.error("Some error occurred.Please try again", "Error");
              });
          }
          else {
          }
        }
      }
    }
    if (alertcount == 0) {
      this.spinner.show();
      this.Builderservice.dynamicTableOperationInsertUpdate(this.FinalOutput).subscribe(
        (response) => {
          if (this.editId > 0) {
            this.toaster.success("Data Updated Successfully");
          }
          else {
            this.toaster.success("Data Inserted Successfully");
          }
          this.form.reset();
          this.modalReference.close();
          if (this.ActionIdValue == 5) {

            this.reportEnable = false;
            this.changeDetector.detectChanges();
            this.reportEnable = true;

          }
          else if (this.ActionIdValue == 6) {
            this.kanbanaEnable = false;
            this.changeDetector.detectChanges();
            this.kanbanaEnable = true;
          }
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();

        });
    }
    else {
      Swal.fire({
        title: 'Are you sure?',
        text: alertmessage,

        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {

          this.spinner.show();
          this.Builderservice.dynamicTableOperationInsertUpdate(this.FinalOutput).subscribe(
            (response) => {
              if (this.editId > 0) {
                this.toaster.success("Data Updated Successfully");
              }
              else {
                this.toaster.success("Data Inserted Successfully");
              }
              this.form.reset();
              this.modalReference.close();
              if (this.ActionIdValue == 5) {

                this.reportEnable = false;
                this.changeDetector.detectChanges();
                this.reportEnable = true;

              }
              else if (this.ActionIdValue == 6) {
                this.kanbanaEnable = false;
                this.changeDetector.detectChanges();
                this.kanbanaEnable = true;
              }
              this.spinner.hide();
            },
            error => {
              this.spinner.hide();

            });
        }
      })
    }
  }



}


