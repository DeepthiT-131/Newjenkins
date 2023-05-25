import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { HelperService } from '../helper/helper.service';
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { Ibuilderref, IDynamicTable, Icheck, ImoduleTransferSubject, Iget, IgetJsonData, Idownload, Igethistory, IgetMulti, IHistdownload, ILanguageref } from '../interfaces/ibuilder-creation';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';

import { CommonService } from '../services/common.service';
import { saveAs } from 'file-saver';
import { ToasterService } from '../helper/toaster.service';
import { Iconfig } from '../interfaces/iloginconfig';
import { LoginconfigService } from '../services/loginconfig.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Dropdown } from 'src/app/helper/dropdown.validator';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import Swal from 'sweetalert2';
import * as moment from 'moment'
import { element } from 'protractor';

declare var jsPDF: any;
@Component({
  selector: 'app-dynamicformpreview',
  templateUrl: './dynamicformpreview.component.html',
  styleUrls: ['./dynamicformpreview.component.css']
})
export class DynamicformpreviewComponent implements OnInit {
  public signaturePadOptions: Object = {
    // 'minWidth': 1,
    // 'canvasWidth': 0,
    // 'canvasHeight': 0,
    'minWidth': 2,
    'canvasWidth': 0,
    // 'canvasWidth': 150,
    'canvasHeight': 0,
    'penColor': "#1d1d85",
  };
  // private signaturePadOptions: object = {
  //   minWidth: 0.4,
  //   maxWidth: 1.5,
  //   dotSize: 1.5,
  //   penColor: "DarkBlue",
  //   /* INVERSE BECAUSE IT IS SHOW ONLY IN LANDSCAPE */
  //   canvasHeight: window.innerHeight / 3,
  //   canvasWidth: window.innerWidth / 1.2,
  // }
  // private signaturePadOptions: object = {
  //   minWidth: 2,
  //   canvasHeight: window.innerHeight / 3,
  //   canvasWidth: window.innerWidth / 1.2,
  //   backgroundColor: '#ffffff',
  //   penColor: '#000000',
  // }; 

  // texteditor: string;
  isDrawing = false;

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
  ngbModalDownload: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
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
  url: any;
  pusharraydata = [];
  fileExtension = ".jpg";
  fileExtensionError = false;
  photoName: any;
  allowedExtensions = [];
  fileExtensionMessage = "";
  filesize: any;
  pdfmessage: any;
  imagevisible = false;
  Attachment: any;
  splitValue: any;
  File: any;
  columns: any[];
  FinalOutput: any = {
    FormCode: "",
    CreatedBy: "",
    Action: ""
  };
  objcheck = [];
  defaultValueLoad: any;
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
  casecade: any = [];
  MultiaddColumns = [];
  cascadeArray = [];
  autoArray = [];
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
  ArrayValue: any;
  KeyValue: any;
  dataformatmulti: any;
  multichild: any[];
  multichilddata: any;
  calculatedOutput = [];
  dataTablevalue: any;
  relationField: any[] = [];
  LanguageID: any;
  SourceJson: any;
  Cascadeitemvalue: any;
  // @Input() texteditor: any;
  texteditor: string;
  // @ViewChild(SignaturePad,{static:false}) signaturePad: SignaturePad;
  @ViewChild('signatureCanvas', { static: true }) signaturePad: SignaturePad;

  constructor(private confirmationService: ConfirmationService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private carService: CommonService, private helper: HelperService, private toaster: ToasterService,
    private modalService: NgbModal, private Builderservice: BuildercreateServiceService, private loginconfigservice: LoginconfigService,
    private sanitizer: DomSanitizer, route: ActivatedRoute, ) {
    route.params.subscribe(val => {
      this.getData();
    });

  }

  ngOnInit() {

  }

  // ngAfterViewInit(signatureCanvas) {
  //   let canvas = document.querySelector('canvas');
  //   // signatureCanvas.set('minWidth', 1); // set szimek/signature_pad options at runtime
  //   signatureCanvas.clear(); // invoke functions from szimek/signature_pad API
  //   signatureCanvas.set('canvasWidth', canvas.offsetWidth);
  //   signatureCanvas.set('canvasHeight', canvas.offsetHeight);
  // }

  drawComplete(signatureCanvas, columnID) {
    this.form.get(columnID).setValue(signatureCanvas.toDataURL())
    this.isDrawing = false;

  }
  drawchildComplete(signatureCanvas, columnID, divId, Index) {
    let formname = this.form.get(divId)["controls"][Index]
    formname.get(columnID).setValue(signatureCanvas.toDataURL())
    this.isDrawing = false;

  }
  drawStart() {
    this.isDrawing = true;

  }
  clearPad(signatureCanvas) {
    signatureCanvas.clear();
  }

  confirm1(car) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteClick(car);
      },
      reject: () => {

      }
    });
  }

  getData() {
    this.objcheck = [];
    this.loginInfo = this.helper.getValue('LoginInfo')
    this.LanguageID = this.helper.getValue('LanguageID')

    this.Builderservice.moduleTransferData.subscribe(data =>

      this.moduleTransferData = data
    );

    this.fcode = this.moduleTransferData.ModuleURL;
    this.modulename = this.moduleTransferData.ModuleName;
    this.isfile = this.moduleTransferData.IsFile;
    this.acessData = this.moduleTransferData.Access;


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
    this.getLanguageDetails();
    // this.getJsonValue();

    this.dateValue = new Date();
    // this.timeValue = this.dateValue.getHours() + ":" + this.dateValue.getMinutes();

    this.dateString = formatDate(this.dateValue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
  }
  getLanguageDetails() {
    // bind the API
    const getdata: ILanguageref = {
      FormCode: this.fcode,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    };
    this.Builderservice.getLanguageInfo(getdata).subscribe(
      (response) => {
        this.LanguageList = response;

        this.getJsonValue();
      }, error => {
        this.toaster.error("Some error Occurred")

      });
    // response this.getJsonValue
  }
  // reset() {
  //   this.first = 0;
  // }
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
      ActionId: 5
    };

    this.Builderservice.getbuilderData(getdata).subscribe(
      (response) => {

        if (response[0].JsonData != null) {
          this.jsondata = JSON.parse(response[0].JsonData);

          this.targetBuilderTools = this.jsondata.Createjson;
          this.TabletargetBuilderTools = this.jsondata.Filter;

          this.TabletargetBuilderTools.forEach(formControl => {

            if (formControl.fieldType == "divSection") {
              if (formControl.children) {
                formControl.children.forEach(e => {

                  if (e.fieldType == "select") {
                    this.filterValue[e.ReferenceId] = ""
                    this.DefaultBindFilter(e, e.ReferenceId, 1);
                  }
                  if (e.fieldType == "date") {
                    this.filterValue[e.ReferenceId] = ""
                    let datevalue = new Date()
                    e.value = formatDate(datevalue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
                  }


                });
              }
              if (formControl.children1) {


                formControl.children1.forEach(e => {
                  if (e.fieldType == "select") {
                    this.filterValue[e.ReferenceId] = ""
                    this.DefaultBindFilter(e, e.ReferenceId, 1);
                  }
                  if (e.fieldType == "date") {
                    this.filterValue[e.ReferenceId] = ""
                    let datevalue = new Date()
                    e.value = formatDate(datevalue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
                  }
                });

              }
              if (formControl.children2) {

                formControl.children2.forEach(e => {
                  if (e.fieldType == "select") {
                    this.filterValue[e.ReferenceId] = ""
                    this.DefaultBindFilter(e, e.ReferenceId, 1);
                  }
                  if (e.fieldType == "date") {
                    this.filterValue[e.ReferenceId] = ""
                    let datevalue = new Date()
                    e.value = formatDate(datevalue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
                  }
                });

              }
              if (formControl.children3) {

                formControl.children3.forEach(e => {
                  if (e.fieldType == "select") {
                    this.filterValue[e.ReferenceId] = ""
                    this.DefaultBindFilter(e, e.ReferenceId, 1);
                  }
                  if (e.fieldType == "date") {
                    this.filterValue[e.ReferenceId] = ""
                    let datevalue = new Date()
                    e.value = formatDate(datevalue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
                  }
                });

              }
              if (formControl.children4) {

                formControl.children4.forEach(e => {
                  if (e.fieldType == "select") {
                    this.filterValue[e.ReferenceId] = ""
                    this.DefaultBindFilter(e, e.ReferenceId, 1);
                  }
                  if (e.fieldType == "date") {
                    this.filterValue[e.ReferenceId] = ""
                    let datevalue = new Date()
                    e.value = formatDate(datevalue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
                  }
                });

              }


            }

          });
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
                      //this.fb.control(field.value,this.bindValidations(field.validations || [])

                      formGroup[e.columnID] = new FormControl('', this.bindValidations(e || []));

                      this.DefaultValues(e, formGroup[e.columnID]);
                      if ((e.fieldType == "select" || e.fieldType == "radio") && (e.CascadeValue == "")) {

                        this.DefaultBind(e, e.columnID, 0);
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

                        this.DefaultBind(e, e.columnID, 0);
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

                        this.DefaultBind(e, e.columnID, 0);
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

                        this.DefaultBind(e, e.columnID, 0);
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

                        this.DefaultBind(e, e.columnID, 0);
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

                  this.DefaultBind(formControl, formControl.columnID, 0);
                }
              }
            }
          });

          // this.form = new FormGroup(formGroup);
          this.form = this.formBuilder.group(formGroup);



          this.CheckFilter();

        }


      },
      error => {
        this.toaster.error("Some error Occurred")

      });
  }
  bindValidations(e: any) {
    const validList = [];
    // if((e.hasOwnProperty("alertValue"))||(e.hasOwnProperty("SMSValue"))
    //  ||(e.hasOwnProperty("WhatsappValue")) ||(e.hasOwnProperty("AlertValue")))
    //  {
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

            this.DefaultMultiBind(e, e.columnID, 0,multiformGroup[e.columnID]);
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

            this.DefaultMultiBind(e, e.columnID, 0,multiformGroup[e.columnID]);
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

            this.DefaultMultiBind(e, e.columnID, 0,multiformGroup[e.columnID]);
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

            this.DefaultMultiBind(e, e.columnID, 0,multiformGroup[e.columnID]);
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

            this.DefaultMultiBind(e, e.columnID, 0,multiformGroup[e.columnID]);
          }
        }
      });

    }
   
    return this.formBuilder.group(multiformGroup);
  
  }
  addValues(formcheck) {

    const control = this.form.get(formcheck.columnID) as FormArray;
    control.push(this.createItem(formcheck));
  this.defaultValueSet();

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
  BindHisoryData(Id, history) {
    this.parentID = Id; 

    this.openModal(history)
    this.colshistory = [];
    var obj = {};

    this.TabletargetBuilderTools.forEach(fil => {

      if (fil.children) {
        fil.children.forEach(fil1 => {

          if (fil1.value != "") {
            if (fil1.fieldType == 'date') {
              let datevalue = "";
              if (fil1.value instanceof Date) {

                datevalue = formatDate(fil1.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
              }
              else {
                datevalue = fil1.value
              }
              obj[fil1.fieldId] = datevalue;
            }
            else if (fil1.fieldType == 'select') {
              obj[fil1.ReferenceId] = fil1.value;
            }
          }

        });
      }
      if (fil.children1) {
        fil.children1.forEach(fil2 => {
          if (fil2.value != "") {
            if (fil2.fieldType == 'date') {
              let datevalue = "";
              if (fil2.value instanceof Date) {

                datevalue = formatDate(fil2.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
              }
              else {
                datevalue = fil2.value
              }

              obj[fil2.fieldId] = datevalue;
            }
            else if (fil2.fieldType == 'select') {
              obj[fil2.ReferenceId] = fil2.value;
            }
          }


        });
      }
      if (fil.children2) {
        fil.children2.forEach(fil3 => {
          if (fil3.value != "") {
            if (fil3.fieldType == 'date') {

              let datevalue = "";
              if (fil3.value instanceof Date) {

                datevalue = formatDate(fil3.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
              }
              else {
                datevalue = fil3.value
              }
              obj[fil3.fieldId] = datevalue;
            }
            else if (fil3.fieldType == 'select') {
              obj[fil3.ReferenceId] = fil3.value;
            }
          }



        });
      }
      if (fil.children3) {
        fil.children3.forEach(fil3 => {
          if (fil3.value != "") {
            if (fil3.fieldType == 'date') {


              let datevalue = "";
              if (fil3.value instanceof Date) {

                datevalue = formatDate(fil3.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
              }
              else {
                datevalue = fil3.value
              }
              obj[fil3.fieldId] = datevalue;
            }
            else if (fil3.fieldType == 'select') {
              obj[fil3.ReferenceId] = fil3.value;
            }
          }



        });
      }
      if (fil.children4) {
        fil.children4.forEach(fil3 => {
          if (fil3.value != "") {
            if (fil3.fieldType == 'date') {

              let datevalue = "";
              if (fil3.value instanceof Date) {

                datevalue = formatDate(fil3.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
              }
              else {
                datevalue = fil3.value
              }
              obj[fil3.fieldId] = datevalue;
            }
            else if (fil3.fieldType == 'select') {
              obj[fil3.ReferenceId] = fil3.value;
            }
          }



        });
      }


    });

    this.reports = obj;
    this.reports.Id = Id,
      this.reports.CreatedBy = this.loginInfo.UserId,

      this.reports.FormCode = this.fcode,
      this.Builderservice.dynamicGetHisory(this.reports).subscribe(
        (response) => {

          this.dataformatHistory = response.Table;


          for (let key in this.dataformatHistory[0]) {
            const getdata: Icheck = {
              field: key,
              header: this.dataformatHistory[0][key]

            }

            this.colshistory.push(getdata);

          }
          this.cars1 = response.data;
          this.selectedColumns1 = this.colshistory;
          this.emptyrow += this.colshistory.length;

        });

  }


  onFilterdatechange(event, columnID) {

  }
  downloadClick(car, download) {
    let downloadSelectedId = car.ID;


    const category: Idownload = {
      FormCode: this.fcode,
      Id: downloadSelectedId,
      ColName:""

    };

    // getall category
    this.Builderservice.getDownloadFileDetails(category).subscribe(
      (response) => {

        this.downloadDetails = response;
        // for(var j in this.downloadDetails)
        // {
        //   if()
        // }

      },
      error => {
        //this.toaster.error("Error while getting seamer details", "Error!");
      });


    this.DownloadFile(download);
  }
  historyClick(car, history) {

    this.BindHisoryData(car.ID, history)
  }

  DownloadFile(download) {


    this.modalReference = this.modalService.open(download, this.ngbModalDownload);

  }



  deleteClick(car) {

    let SelectedId = car.ID;
    const getdata: Iget = {

      FormCode: this.fcode,
      CreatedBy: this.loginInfo.UserId,
      Id: SelectedId,
      Action: 3


    }

    this.Builderservice.dynamicTableOperation(getdata).subscribe(
      (response) => {
        this.toaster.success("Record Deleted Successfully");
        this.CheckFilter();
      });



  }
  editClick(car, content) {
    this.editId = car.ID;
    const getdata: Iget = {
      FormCode: this.fcode,
      CreatedBy: this.loginInfo.UserId,

      Id: this.editId,
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

          // if (this.Cascadevalues.includes(key)) 
          if (this.SourceJson.indexOf(key) > -1) {

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

  DefaultBindFilter(formControl: any, fieldId, statusValue) {

    const getdata: Ibuilderref = {
      FormCode: this.fcode,
      FieldCode: fieldId,
      Value: "",
      Status: statusValue

    };

    // getall users
    this.Builderservice.getAllReference(getdata).subscribe(
      (response) => {

        formControl.values = response;
        formControl.value = 0;
      }
    );


  }
  DefaultMultiBind(formControl: any, fieldId, statusValue,columnID)
  {
    const getdata: Ibuilderref = {
      FormCode: this.fcode,
      FieldCode: fieldId,
      Value: "",
      Status: statusValue

    };

    // getall users
    this.Builderservice.getAllReference(getdata).subscribe(
      (response) => {

        formControl.values = response;
        columnID.setValue(0)
        //this.form.get(fieldId).setValue(0);

      }
    );
  }
  DefaultBind(formControl: any, fieldId, statusValue) {

    const getdata: Ibuilderref = {
      FormCode: this.fcode,
      FieldCode: fieldId,
      Value: "",
      Status: statusValue

    };

    // getall users
    this.Builderservice.getAllReference(getdata).subscribe(
      (response) => {

        formControl.values = response;
        formControl.setValue(0)
        //this.form.get(fieldId).setValue(0);

      }
    );


  }
  DefaultValues(formcontrol: any, fieldId) {

    if (formcontrol.defaultValue == "date") {
      let defaultObject = {
        defaultValue: "date",
        defaultLabel: fieldId,
        defaultColumn: formcontrol.columnID
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

  ondatechange(val, columnid, fieldId, itemvalue, index?) {


    val = formatDate(val.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    this.dateString = val;
    this.form.get(columnid).setValue(val);
    if (itemvalue != undefined && itemvalue.calculateValue) {
      this.OnCalculation(itemvalue);
    }
    else {
      this.OnCascadeValue(itemvalue)
      // this.OnchangeFn(val, columnid, 0);
    }
  }
  ontimechange(val, fieldId, itemvalue) {

    let timevalue = val.getHours() + ":" + val.getMinutes()
    this.form.get(fieldId).setValue(timevalue);
    if (itemvalue != undefined && itemvalue.calculateValue) {
      this.OnCalculation(itemvalue);
    }
  }
  CalculateItem(dataItem, keyitem, key, parentform, childform?) {


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
          || keyitem[i] == "^" || keyitem[i] == "(" || keyitem[i] == ")" || keyitem[i] == "=") {
          finalvalue += keyitem[i];
          multivalue = keyitem[i];
        }
        else if (keyitem[i] == "max" || keyitem[i] == "min" || keyitem[i] == "Avg") {
          operandValue = keyitem[i];
        }
        else {
          if (parentform.contains(keyitem[i])) {
            currentValue = parentform.get(keyitem[i]).value > 0 ? parentform.get(keyitem[i]).value : 0;
            finalvalue += currentValue.toString();
            if (currentValue != "0") {
              arrValue.push(currentValue)
            }
          }

          else if (childform != undefined && childform.contains(keyitem[i])) {

            currentValue = childform.get(keyitem[i]).value > 0 ? childform.get(keyitem[i]).value : 0;
            finalvalue += currentValue.toString();
            if (currentValue != "0") {
              arrValue.push(currentValue)
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
                  multifinalvalue = multifinalvalue.slice(0, -1);
                  finalvalue += multifinalvalue;
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
      //       console.log(a.diff(b, 'minutes')) // 44700
      // console.log(a.diff(b, 'hours')) // 745
      // console.log(a.diff(b, 'days')) // 31
      // console.log(a.diff(b, 'weeks')) 
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
      if (operandValue == "max") {
        var str = arrValue.join();
        finalvalue = "Math.max(" + str + ")";
      }

      if (operandValue == "min") {
        var str = arrValue.join();
        finalvalue = " Math.min(" + str + ")";
      }
      if (operandValue == "Avg") {
        let arrop = eval(arrValue.join('+')) / arrValue.length;
        finalvalue = arrop.toFixed(2).toString();

      }
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
      this.casecade.FormCode = this.fcode,
      this.casecade.FieldCode = key,



    this.Builderservice.MultiCascade(this.casecade).subscribe(
      (response) => {
 
        if (response) {
          if (response != null && response.length > 0) {
            if (parentform != undefined && parentform != null && parentform != "") {
              if (parentform.contains(key)) {
                if (this.cascadeArray.includes(parentform.contains(key))) {
                  parentform.get(key).setValue(response[0].Label);
                } else if (this.autoArray.includes(parentform.contains(key))) {
                  parentform.get(key).setValue(response[0].Label);
                }
                // else {
                //   // parentform.get(key).values = response;
                //   // parentform.controls[key].value = response;
                //   parentform.controls.values = response;
                //   this.form.get(key).patchValue(response);
                // }
                // parentform.values = response;
              }
            }
            if (childform != undefined && childform != null && childform != "") {
              if (childform.contains(key)) {
                if (this.cascadeArray.includes(childform.contains(key))) {
                  childform.get(key).setValue(response);
                } else if (this.autoArray.includes(childform.contains(key))) {
                  childform.get(key).setValue(response);
                }
                // else {
                //   childform.get(key).setValue(response);
                // }
                // childform.values = response;
              }
            }


            this.targetBuilderTools.forEach(formControl => {
              if (formControl.fieldType == "divSection") {
                if (formControl.children) {
                  formControl.children.forEach(e => {
                    if (e.columnID == key) {
                      e.values = response;
                    }
                  });

                }
                if (formControl.children1) {

                  formControl.children1.forEach(e => {
                    if (e.columnID == key) {
                      e.values = response;
                    }
                  });
                }
                if (formControl.children2) {

                  formControl.children2.forEach(e => {
                    if (e.columnID == key) {
                      e.values = response;
                    }
                  });
                }
                if (formControl.children3) {

                  formControl.children3.forEach(e => {
                    if (e.columnID == key) {
                      e.values = response;
                    }
                  });
                }
                if (formControl.children4) {

                  formControl.children4.forEach(e => {
                    if (e.columnID == key) {
                      e.values = response;
                    }
                  });
                }
              }
              // }
            });
            //     if (formControl.fieldType == "divSection") {
            //       if (formControl.children)
            //         if(formControl.children.columnID = key) {}
          }


        }

      }
    );

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
  OnchangeFn(val: string, fieldvalue, settingflag, itemvalue?, childform?, index?) {



    if (itemvalue != undefined && itemvalue.calculateValue) {
      this.OnCalculation(itemvalue, childform, index);
    }


    else {
      this.targetBuilderTools.forEach(formControl => {

        if (formControl.fieldType == "divSection") {
          if (formControl.children) {
            this.cascadeDropdown = formControl.children.filter(x => x.CascadeValue === fieldvalue);

            for (let i = 0; i < this.cascadeDropdown.length; i++) {
              let item1 = this.cascadeDropdown[i];
              const getdata: Ibuilderref = {

                FormCode: this.fcode,
                FieldCode: this.cascadeDropdown[i].columnID,
                Value: val

              };

              this.Builderservice.getAllReference(getdata).subscribe(
                (response) => {
                  if (response) {
                    if (item1.defaultValue == "Autofill") {
                      this.form.get(item1.columnID).setValue(response[0].Value);
                    }
                    else {
                      if (settingflag == 0) {
                        this.form.get(item1.columnID).setValue(0);
                      }


                    }
                    item1.values = response;
                  }

                }
              );
            }
          }
          if (formControl.children1) {

            this.cascadeDropdown = formControl.children1.filter(x => x.CascadeValue === fieldvalue);

            for (let i = 0; i < this.cascadeDropdown.length; i++) {
              let item2 = this.cascadeDropdown[i];
              const getdata: Ibuilderref = {

                FormCode: this.fcode,
                FieldCode: this.cascadeDropdown[i].columnID,
                Value: val

              };

              this.Builderservice.getAllReference(getdata).subscribe(
                (response) => {
                  if (response) {
                    if (item2.defaultValue == "Autofill") {
                      this.form.get(item2.columnID).setValue(response[0].Value);
                    }
                    else {
                      if (settingflag == 0) {
                        this.form.get(item2.columnID).setValue(0);
                      }


                    }
                    item2.values = response;
                  }

                }
              );
            }

          }
          if (formControl.children2) {

            this.cascadeDropdown = formControl.children2.filter(x => x.CascadeValue === fieldvalue);

            for (let i = 0; i < this.cascadeDropdown.length; i++) {
              let item = this.cascadeDropdown[i];
              const getdata: Ibuilderref = {

                FormCode: this.fcode,
                FieldCode: this.cascadeDropdown[i].columnID,
                Value: val

              };

              this.Builderservice.getAllReference(getdata).subscribe(
                (response) => {

                  if (response) {

                    item.values = response;
                    if (item.defaultValue == "Autofill") {

                      this.form.get(item.columnID).setValue(response[0].Value);
                    }
                    else {
                      if (settingflag == 0) {
                        this.form.get(item.columnID).setValue(0);
                      }

                    }

                  }

                }
              );
            }

          }
          if (formControl.children3) {

            this.cascadeDropdown = formControl.children3.filter(x => x.CascadeValue === fieldvalue);

            for (let i = 0; i < this.cascadeDropdown.length; i++) {
              let item3 = this.cascadeDropdown[i];
              const getdata: Ibuilderref = {

                FormCode: this.fcode,
                FieldCode: this.cascadeDropdown[i].columnID,
                Value: val

              };

              this.Builderservice.getAllReference(getdata).subscribe(
                (response) => {
                  if (response) {
                    if (item3.defaultValue == "Autofill") {
                      this.form.get(item3.columnID).setValue(response[0].Value);
                    }
                    else {
                      if (settingflag == 0) {
                        this.form.get(item3.columnID).setValue(0);
                      }


                    }
                    item3.values = response;
                  }

                }
              );
            }

          }
          if (formControl.children4) {

            this.cascadeDropdown = formControl.children4.filter(x => x.CascadeValue === fieldvalue);

            for (let i = 0; i < this.cascadeDropdown.length; i++) {
              let item4 = this.cascadeDropdown[i];
              const getdata: Ibuilderref = {

                FormCode: this.fcode,
                FieldCode: this.cascadeDropdown[i].columnID,
                Value: val

              };

              this.Builderservice.getAllReference(getdata).subscribe(
                (response) => {
                  if (response) {
                    if (item4.defaultValue == "Autofill") {
                      this.form.get(item4.columnID).setValue(response[0].Value);
                    }
                    else {
                      if (settingflag == 0) {
                        this.form.get(item4.columnID).setValue(0);
                      }


                    }
                    item4.values = response;
                  }

                }
              );
            }

          }


        }

        else if (formControl.fieldType != "button" && formControl.fieldType != "paragraph" && formControl.fieldType != "hrLine") {
          this.cascadeDropdown = this.targetBuilderTools.filter(x => x.CascadeValue === fieldvalue);

          for (let i = 0; i < this.cascadeDropdown.length; i++) {
            let item5 = this.cascadeDropdown[i];
            const getdata: Ibuilderref = {

              FormCode: this.fcode,
              FieldCode: this.cascadeDropdown[i].columnID,
              Value: val

            };

            this.Builderservice.getAllReference(getdata).subscribe(
              (response) => {
                if (response) {
                  if (item5.defaultValue == "Autofill") {
                    this.form.get(item5.columnID).setValue(response[0].Value);
                  }
                  else {
                    if (settingflag == 0) {
                      this.form.get(item5.columnID).setValue(0);
                    }


                  }
                  item5.values = response;
                }

              }
            );
          }

        }
      });
    }




  }


  get dynamicform() { return this.form.controls; }
  AddClick(content) {
    this.form.reset();
    this.editId = 0;
    this.dateValue = new Date();
    this.timeValue = this.dateValue.getHours() + ":" + this.dateValue.getMinutes();
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
  openModal(content) {


    this.submitted = false;
    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
  }

  toggleValue(item) {
    item.selected = !item.selected;
  }
  CheckFilter() {
    this.spinner.show();
    var obj = {};

    this.TabletargetBuilderTools.forEach(fil => {

      if (fil.children) {
        fil.children.forEach(fil1 => {

          if (fil1.fieldType == 'date') {
            let datevalue = "";


            if (fil1.value instanceof Date) {

              datevalue = formatDate(fil1.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
            }
            else {
              datevalue = fil1.value
            }

            obj[fil1.fieldId] = datevalue;
          }
          else if (fil1.fieldType == 'select') {

            if (fil1.value != undefined && fil1.value != null && fil1.value != "" && fil1.value != 0) {

              obj[fil1.ReferenceId] = fil1.value;
            }
            this.form.get(fil1.ReferenceId).setValue(fil1.value);

          }


        });
      }
      if (fil.children1) {
        fil.children1.forEach(fil2 => {


          if (fil2.fieldType == 'date') {
            let datevalue = "";

            if (fil2.value instanceof Date) {

              datevalue = formatDate(fil2.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
            }
            else {
              datevalue = fil2.value
            }


            obj[fil2.fieldId] = datevalue;
          }
          else if (fil2.fieldType == 'select') {

            if (fil2.value != undefined && fil2.value != null && fil2.value != "" && fil2.value != 0) {
              obj[fil2.ReferenceId] = fil2.value;
            }
            this.form.get(fil2.ReferenceId).setValue(fil2.value);

          }



        });
      }
      if (fil.children2) {
        fil.children2.forEach(fil3 => {


          if (fil3.fieldType == 'date') {
            let datevalue = "";



            if (fil3.value instanceof Date) {

              datevalue = formatDate(fil3.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
            }
            else {
              datevalue = fil3.value
            }
            obj[fil3.fieldId] = datevalue;
          }
          else if (fil3.fieldType == 'select') {

            if (fil3.value != undefined && fil3.value != null && fil3.value != "" && fil3.value != 0) {
              obj[fil3.ReferenceId] = fil3.value;
            }

            this.form.get(fil3.ReferenceId).setValue(fil3.value);
          }




        });
      }
      if (fil.children3) {
        fil.children3.forEach(fil3 => {


          if (fil3.fieldType == 'date') {
            let datevalue = "";

            if (fil3.value instanceof Date) {

              datevalue = formatDate(fil3.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
            }
            else {
              datevalue = fil3.value
            }

            obj[fil3.fieldId] = datevalue;
          }
          else if (fil3.fieldType == 'select') {

            if (fil3.value != undefined && fil3.value != null && fil3.value != "" && fil3.value != 0) {
              obj[fil3.ReferenceId] = fil3.value;
            }

            this.form.get(fil3.ReferenceId).setValue(fil3.value);
          }




        });
      }
      if (fil.children4) {
        fil.children4.forEach(fil3 => {


          if (fil3.fieldType == 'date') {
            let datevalue = "";

            if (fil3.value instanceof Date) {

              datevalue = formatDate(fil3.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
            }
            else {
              datevalue = fil3.value
            }

            obj[fil3.fieldId] = datevalue;
          }
          else if (fil3.fieldType == 'select') {

            if (fil3.value != undefined && fil3.value != null && fil3.value != "" && fil3.value != 0) {
              obj[fil3.ReferenceId] = fil3.value;
            }

            this.form.get(fil3.ReferenceId).setValue(fil3.value);
          }




        });
      }


    });

    this.reports = obj;

    this.reports.Id = 0,
      this.reports.CreatedBy = this.loginInfo.UserId,
      this.reports.Action = 5
    this.reports.FormCode = this.fcode,
      // this.reports.RoleID = this.loginInfo.RoleID,
      // this.reports.LanguageId = this.loginInfo.LanguageId
      this.reports.LanguageId = this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    this.cols = [

    ];

    this.Builderservice.dynamicTableOperationselectFilter(this.reports).subscribe(
      (response) => {

        this.tablevalue = response;
        this.dataformat = response.Table;

        for (let key in this.dataformat[0]) {
          const getdata: Icheck = {
            field: key,
            header: this.dataformat[0][key]

          }

          this.cols.push(getdata);

        }
        this.cars = response.data;


        this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
        this.filtercols = this.cols;
        this.selectedColumns = this.cols;
        this.emptyrow += this.cols.length;
        this.spinner.hide();

      },

      error => {
        this.spinner.hide();
        this.toaster.error("Some error occurred.Please try again", "Error");

      });

  }
  getautoNumberData(columnID, relationField) {

    this.reports = {};

    this.reports.ColumnName = columnID,
      this.reports.FormCode = this.fcode
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

        //let columnvalue='this.form.get("AutoFielp6i5").value ===2';
        if (eval(columnvalue)) {
          alertcount = alertcount + 1;
          alertmessage = this.ValidateArray[i].Label;
        }
        else {


        }
      }
      else {
        if (this.ValidateArray[i].condition != "between" && this.ValidateArray[i].condition != "notbetween") {
          columnvalue = this.form.get(this.ValidateArray[i].column).value + this.ValidateArray[i].condition + this.ValidateArray[i].criteria;
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

        //let columnvalue='this.form.get("AutoFielp6i5").value ===2';
        if (eval(columnvalue)) {
          alertcount = alertcount + 1;
          alertmessage = this.ValidateArray[i].Label;
        }
        else {


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
          this.SaveFilter();
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
              this.SaveFilter();
              this.spinner.hide();
            },
            error => {
              this.spinner.hide();

            });
        }
      })
    }

  }
  downloadHistClick(car, download) {

    let downloadSelectedId = this.parentID;
    let downloadHistId = car.ID;

    const category: IHistdownload = {
      FormCode: this.fcode,
      Id: downloadSelectedId,
      HistId: downloadHistId

    };
    this.Builderservice.getHistDownloadFileDetails(category).subscribe(
      (response) => {

        this.downloadDetails = response;

      },
      error => {
        //this.toaster.error("Error while getting seamer details", "Error!");
      });


    this.DownloadFile(download);
  }

  SaveFilter() {
    this.spinner.show();
    var obj = {};


    this.TabletargetBuilderTools.forEach(fil => {

      if (fil.children) {
        fil.children.forEach(fil1 => {

          if (fil1.fieldType == 'date') {
            let datevalue = "";
            let previousdate = this.filterValue[fil1.ReferenceId]
            if (previousdate != undefined && previousdate != null && previousdate != "") {
              datevalue = previousdate;
              fil1.value = datevalue;
            }
            else {

              if (fil1.value instanceof Date) {

                datevalue = formatDate(fil1.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
              }
              else {
                datevalue = fil1.value
              }
            }
            obj[fil1.fieldId] = datevalue;
          }
          else if (fil1.fieldType == 'select') {
            let previousSelect = this.filterValue[fil1.ReferenceId]

            if (previousSelect != undefined && previousSelect != null && previousSelect != "") {
              fil1.value = previousSelect;

            }
            if (fil1.value != undefined && fil1.value != null && fil1.value != "" && fil1.value != 0) {

              obj[fil1.ReferenceId] = fil1.value;
            }
            this.form.get(fil1.ReferenceId).setValue(fil1.value);

          }


        });
      }
      if (fil.children1) {
        fil.children1.forEach(fil2 => {


          if (fil2.fieldType == 'date') {
            let datevalue = "";
            let previousdate = this.filterValue[fil2.ReferenceId]
            if (previousdate != undefined && previousdate != null && previousdate != "") {
              datevalue = previousdate;
              fil2.value = previousdate;
            }
            else {
              if (fil2.value instanceof Date) {

                datevalue = formatDate(fil2.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
              }
              else {
                datevalue = fil2.value
              }
            }

            obj[fil2.fieldId] = datevalue;
          }
          else if (fil2.fieldType == 'select') {
            let previousSelect = this.filterValue[fil2.ReferenceId]

            if (previousSelect != undefined && previousSelect != null && previousSelect != "") {
              fil2.value = previousSelect;

            }
            if (fil2.value != undefined && fil2.value != null && fil2.value != "" && fil2.value != 0) {
              obj[fil2.ReferenceId] = fil2.value;
            }
            this.form.get(fil2.ReferenceId).setValue(fil2.value);

          }



        });
      }
      if (fil.children2) {
        fil.children2.forEach(fil3 => {


          if (fil3.fieldType == 'date') {
            let datevalue = "";
            let previousdate = this.filterValue[fil3.ReferenceId]
            if (previousdate != undefined && previousdate != null && previousdate != "") {
              datevalue = previousdate;
              fil3.value = previousdate;
            }
            else {


              if (fil3.value instanceof Date) {

                datevalue = formatDate(fil3.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
              }
              else {
                datevalue = fil3.value
              }
            }
            obj[fil3.fieldId] = datevalue;
          }
          else if (fil3.fieldType == 'select') {
            let previousSelect = this.filterValue[fil3.ReferenceId]

            if (previousSelect != undefined && previousSelect != null && previousSelect != "") {
              fil3.value = previousSelect;

            }
            if (fil3.value != undefined && fil3.value != null && fil3.value != "" && fil3.value != 0) {
              obj[fil3.ReferenceId] = fil3.value;
            }

            this.form.get(fil3.ReferenceId).setValue(fil3.value);
          }




        });
      }
      if (fil.children3) {
        fil.children3.forEach(fil3 => {


          if (fil3.fieldType == 'date') {
            let datevalue = "";
            let previousdate = this.filterValue[fil3.ReferenceId]
            if (previousdate != undefined && previousdate != null && previousdate != "") {
              datevalue = previousdate;
              fil3.value = previousdate;
            }
            else {
              if (fil3.value instanceof Date) {

                datevalue = formatDate(fil3.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
              }
              else {
                datevalue = fil3.value
              }
            }
            obj[fil3.fieldId] = datevalue;
          }
          else if (fil3.fieldType == 'select') {
            let previousSelect = this.filterValue[fil3.ReferenceId]

            if (previousSelect != undefined && previousSelect != null && previousSelect != "") {
              fil3.value = previousSelect;

            }
            if (fil3.value != undefined && fil3.value != null && fil3.value != "" && fil3.value != 0) {
              obj[fil3.ReferenceId] = fil3.value;
            }

            this.form.get(fil3.ReferenceId).setValue(fil3.value);
          }




        });
      }
      if (fil.children4) {
        fil.children4.forEach(fil3 => {


          if (fil3.fieldType == 'date') {
            let datevalue = "";
            let previousdate = this.filterValue[fil3.ReferenceId]


            if (previousdate != undefined && previousdate != null && previousdate != "") {
              datevalue = previousdate;
              fil3.value = previousdate;
            }
            else {
              if (fil3.value instanceof Date) {

                datevalue = formatDate(fil3.value.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
              }
              else {
                datevalue = fil3.value
              }
            }
            obj[fil3.fieldId] = datevalue;
          }
          else if (fil3.fieldType == 'select') {
            let previousSelect = this.filterValue[fil3.ReferenceId]

            if (previousSelect != undefined && previousSelect != null && previousSelect != "") {
              fil3.value = previousSelect;

            }
            if (fil3.value != undefined && fil3.value != null && fil3.value != "" && fil3.value != 0) {
              obj[fil3.ReferenceId] = fil3.value;
            }

            this.form.get(fil3.ReferenceId).setValue(fil3.value);
          }




        });
      }


    });

    this.reports = obj;

    this.reports.Id = 0,
      this.reports.CreatedBy = this.loginInfo.UserId,
      this.reports.Action = 5
    this.reports.FormCode = this.fcode,
      this.reports.LanguageId = this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    this.cols = [

    ];

    this.Builderservice.dynamicTableOperationselectFilter(this.reports).subscribe(
      (response) => {

        this.dataformat = response.Table;

        for (let key in this.dataformat[0]) {
          const getdata: Icheck = {
            field: key,
            header: this.dataformat[0][key]

          }

          this.cols.push(getdata);

        }
        this.cars = response.data;
        this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
        this.selectedColumns = this.cols;

        this.emptyrow += this.cols.length;
        this.spinner.hide();

      },

      error => {
        this.spinner.hide();
        this.toaster.error("Some error occurred.Please try again", "Error");

      });

  }
  onMultiSelectFile(event, fieldId) {


    this.url = null;

    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.photoName = file.name;

      this.filesize = file.size;

      let now = new Date();
      this.Attachment = file.name;


      this.loginconfigservice.postFiles(this.Attachment, file).subscribe(
        (response) => {

          this.splitValue = response;
          let split = this.splitValue.split(',')
          if (split) {
            if (split.length > 0) {
              this.File = split[0];

              this.url = split[1];
              this.File.forEach((value) => {
                const control = new FormControl(value);
                (<FormArray>this.form.get(fieldId)).push(control);
              });
              this.form.setControl(fieldId, this.formBuilder.array(this.File || []));
              // this.form.get(fieldId).setValue(this.File);

            }
          }
        }
      );



    }
  }
  onSelectFile(event, fieldId, formname) {

    this.url = null;

    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.photoName = file.name;

      this.filesize = file.size;

      let now = new Date();
      this.Attachment = file.name;


      this.loginconfigservice.postFiles(this.Attachment, file).subscribe(
        (response) => {

          this.splitValue = response;
          let split = this.splitValue.split(',')
          if (split) {
            if (split.length > 0) {
              this.File = split[0];

              this.url = split[1];
              formname.get(fieldId).setValue(this.File);

            }
          }
        }
      );



    }
  }
  DownLoadFiles(fieldname, fieldvalue) {

    fieldname = fieldname.replace(/[\s]/g, '');
    let fileName = fieldvalue;
    //file type extension
    let checkFileType = fileName.split('.').pop();

    let thefile: any;
    let now = formatDate(new Date().toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    let filecheck = fieldname + now + "." + checkFileType;
    this.Builderservice.DownloadFile(fileName)
      .subscribe(
        (data) => {

          thefile = new Blob([data], { type: "application/octet-stream" }),
            saveAs(thefile, filecheck);

        },
        err => {

          alert("Server error while downloading file.");
        }
      );


  }

  OpenchildTable(headerValue, id, multichildtable) {

    this.multichild = [];
    this.openModal(multichildtable)
    const getdata: IgetMulti = {
      FormCode: this.fcode,
      CreatedBy: this.loginInfo.UserId,
      ID: id,
      Action: 5,

      ColumnName: headerValue
    }

    this.Builderservice.MultiaddColumns(getdata).subscribe(
      (response) => {
        this.dataformatmulti = response.Table;

        for (let key in this.dataformatmulti[0]) {
          const getdata: Icheck = {
            field: key,
            header: this.dataformatmulti[0][key]

          }

          this.multichild.push(getdata);

        }
        this.multichilddata = response.data;
        this.selectedColumns2 = this.multichild;
        this.emptyrow += this.multichild.length;

      });
  }


}
