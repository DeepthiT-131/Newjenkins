import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';
import { Ireportref, IgetJsonData, Icheck, IViewUISubject, Ibuilderref, Iget, Idownload, IHistdownload, IgetMulti, ILanguageref } from 'src/app/interfaces/ibuilder-creation';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/helper/helper.service';
import { ToasterService } from 'src/app/helper/toaster.service';
import { BuildercreateServiceService } from 'src/app/services/buildercreate-service.service';
import { Iconfig } from 'src/app/interfaces/iloginconfig';
import { LoginconfigService } from 'src/app/services/loginconfig.service';
import { formatDate } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css'],

})
export class ViewReportComponent implements OnInit {
  reportform: FormGroup;
  fcode: string;
  parentCode: string;
  TabletargetBuilderTools = [];
  dateString: string;
  timeValue: any;
  reports: any = [];
  cols: any[];
  dataformat: any;
  cars: any;
  exportColumns: any[];
  selectedColumns: any[];
  filtercol: any[];
  emptyrow: number = 2;
  TransferData: IViewUISubject;
  loginInfo: any;
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
  LanguageID: number;
  Action: number;
  isfile: boolean;
  acessData: any;
  isForm: any;
  isReport: any;
  first: number = 0;
  downloadDetails: any;
  colshistory: any[];
  dataformatHistory: any;
  cars1: any;
  selectedColumns1: any[];
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
  parentID: any;
  multichild: any[];
  multichilddata: any;
  dataformatmulti: any;
  selectedColumns2: any[];
  casecade: any = [];
  key: any = [];
  keyValue: any;
  SourceJson = {};
  formval: any;
  multiParentID: any;
  headerValue: any;
  @Output() public addItem = new EventEmitter();
  @Output() public editItem = new EventEmitter();
  @Output() public downloadItem = new EventEmitter();

  constructor(private spinner: NgxSpinnerService, private helper: HelperService, private toaster: ToasterService,
    private Builderservice: BuildercreateServiceService, private loginconfigservice: LoginconfigService, private confirmationService: ConfirmationService,
    private modalService: NgbModal, private changeDetector: ChangeDetectorRef) {

  }
  @Input()
  set formvalue(formvalues) {

    this.formval = formvalues;
  }
  get formvalue() {
    return this.formval;
  }
  ngOnInit() {

    this.loginInfo = this.helper.getValue('LoginInfo');
    this.LanguageID = this.helper.getValue('LanguageID')
    this.viewData();
    this.table = this.helper.getValue('Table');
    if (this.table) {


    }
    else {

      this.gettableconfigsetting();

    }
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
  viewData() {


    this.Builderservice.viewTransferData.subscribe(data =>

      this.TransferData = data
    )

    this.fcode = this.TransferData.FormCode;
    this.Action = this.TransferData.ActionId
    this.isfile = this.TransferData.IsFile;
    this.acessData = this.TransferData.Access;
    this.parentCode = this.acessData.ParentFormCode;
    this.isForm = this.acessData.IsForm;
    this.isReport = this.acessData.IsReport;
    let dateValue = new Date();
    this.timeValue = dateValue.getHours() + ":" + dateValue.getMinutes();
    this.dateString = formatDate(dateValue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    this.spinner.show();
    if (this.isForm == 1 && this.isReport == 0) {

      this.FilterFormBind();
    }
    if (this.isReport == 1) {

      this.FilterBind();
    }
  }
  CheckConditions() {
    this.spinner.show();
    if (this.isForm == 1 && this.isReport == 0) {


      this.CheckFormFilter();
    }
    if (this.isReport == 1) {

      this.CheckFilter();
    }
  }
  FilterBind() {

    const formGroup = {};
    const themeconfigdata: IgetJsonData = {
      FormCode: this.fcode,
      ActionId: 5

    };

    this.Builderservice.getReportFilter(themeconfigdata).subscribe(
      (response) => {

        this.TabletargetBuilderTools = response.Table;

        this.TabletargetBuilderTools.forEach(formControl => {
          formGroup[formControl.FilterColumn] = new FormControl('');
          if (formControl.FilterType == 'Range') {
            if (formControl.RangeType == 'Date') {

              let datevalue = this.formval == undefined ? this.dateString : this.formval[formControl.FieldID]
              if (datevalue != undefined && datevalue != null && datevalue != "") {
                if (datevalue instanceof Date) {
                  this.dateString = formatDate(datevalue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
                }
                else {
                  this.dateString = datevalue;
                }

              }

              formGroup[formControl.FilterColumn].setValue(this.dateString);

            }
            if (formControl.RangeType == 'Time') {
              let timevalues = this.formval == undefined ? this.timeValue : this.formval[formControl.FieldID]

              if (timevalues != undefined && timevalues != null && timevalues != "") {
                this.timeValue = timevalues;

              }
            

              formControl.FilterColumn.setValue(this.timeValue);
            }
            if (formControl.RangeType == 'Number') {
              
            }
          }
          else {
           
          }

        });
        this.reportform = new FormGroup(formGroup);
        this.CheckFilter();
       
      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");
        this.spinner.hide();
      });

  }
  FilterFormBind() {
  
   
    let fieldName = "";
    let fieldvalue = "";
    const formGroup = {};
    const themeconfigdata: IgetJsonData = {
      FormCode: this.fcode,
      ActionId: 5

    };

    this.Builderservice.getFormFilter(themeconfigdata).subscribe(
      (response) => {


        this.TabletargetBuilderTools = response.Table;
        if (response.data != undefined && response.data != null && response.data != "") {
          for (let i = 0; i < response.data.length; i++) {
            let value = response.data[i];

            value = value.RefCriteria;
            if (value != undefined && value != null && value != "") {
              value = value.split(':');
              value[1] = value[1].slice(1, -1);
              fieldvalue = value[1].split(',');
              // SourceJson[value[0]] = fieldvalue;
              this.key = value[0];

              for (let j = 0; j < fieldvalue.length; j++) {
                this.TabletargetBuilderTools.forEach(x => {
                  if (x.FieldID == fieldvalue[j]) {
                    this.SourceJson[x.FilterColumn] = "";
                  }
                });
              }
            }
          }
        }


        this.keyValue = this.SourceJson;
        this.TabletargetBuilderTools.forEach(formControl => {
          formGroup[formControl.FilterColumn] = new FormControl('');

          if (formControl.FilterType == 'Range') {
            if (formControl.RangeType == 'Date') {

              let datevalue = this.formval == undefined ? this.dateString : this.formval[formControl.FieldID];

              if (datevalue != undefined && datevalue != null && datevalue != "") {
                if (datevalue instanceof Date) {

                  this.dateString = formatDate(datevalue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
                }
                else {

                  this.dateString = datevalue;
                }

              }

              // else {
              //   this.dateString = formatDate(datevalue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
              // }
              formGroup[formControl.FilterColumn].setValue(this.dateString);

              //DefaultValue
            }
            if (formControl.RangeType == 'Time') {
              let timevalues = this.formval == undefined ? this.timeValue : this.formval[formControl.FieldID]

              if (timevalues != undefined && timevalues != null && timevalues != "") {
                this.timeValue = timevalues;

              }
              // else {
              //   let dateValue = new Date();
              //   this.timeValue = dateValue.getHours() + ":" + dateValue.getMinutes();
              // }
              formControl.FilterColumn.setValue(this.timeValue);
            }
            if (formControl.RangeType == 'Number') {
              //DefaultValue
            }

          }
          else {
            if (formControl.CascadeValue == "1") {
              //this.CascadeFilterBind();
            }
            else {
              let dropvalue = this.formval == undefined ? "" : this.formval[formControl.FieldID];
              this.DefaultBindFilter(formControl, formControl.FilterColumn, 0, dropvalue)
            }

          }

        });
        this.reportform = new FormGroup(formGroup);

        this.CheckFormFilter();
        this.CascadeFilterBind();
  
      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");
        this.spinner.hide();
      });

  }
  DefaultBindFilter(formControl: any, fieldId, statusValue, dropvalue) {


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
        this.reportform.get(fieldId).setValue(dropvalue);

      }
    );
  }
  ondatechange(val, columnid, itemvalue) {
    val = formatDate(val.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    this.reportform.get(columnid).setValue(val);

    if (this.keyValue != undefined && this.keyValue != null && this.keyValue != "") {
      this.CascadeFilterBind();
    }
  }

  CheckFilter() {
    this.spinner.show();
    let obj = this.reportform.value;

    this.reports = obj;
    this.reports.Id = 0,
      this.reports.CreatedBy = 1,
      this.reports.Action = this.Action
    this.reports.FormCode = this.fcode,
      this.cols = [

      ];

    this.Builderservice.dynamicTableReportFilter(this.reports).subscribe(
      (response) => {

        this.dataformat = response.Table;
        if (this.dataformat != undefined && this.dataformat != null && this.dataformat != "") {
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
          this.filtercol = this.cols;
          this.emptyrow += this.cols.length;
        }
        this.spinner.hide();
      },

      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");
        this.spinner.hide();
      });

    //this.CascadeFilterBind();

  }
  CheckFormFilter() {
    this.spinner.show();
    let obj = this.reportform.value;

    this.reports = obj;
    this.reports.Id = 0,
      this.reports.CreatedBy = 1,
      this.reports.Action = this.Action
    this.reports.FormCode = this.fcode,
      this.reports.LanguageId = this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    this.cols = [

    ];
    // this.Builderservice.dynamicTableReportFilter(this.reports).subscribe(
    this.Builderservice.dynamicTableOperationselectFilter(this.reports).subscribe(
      (response) => {

        this.dataformat = response.Table;
        if (this.dataformat != undefined && this.dataformat != null && this.dataformat != "") {
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
          this.filtercol = this.cols;
          this.emptyrow += this.cols.length;
        }
        this.spinner.hide();
      },
      error => {

        this.toaster.error("Some error occurred.Please try again", "Error");
        this.spinner.hide();
      });

   
  }

  CascadeValueBind(val: string, fieldvalue, itemvalue?) {

    let cascadeValue = {};
    for (var i in this.keyValue) {
      if (this.reportform.controls.hasOwnProperty(i) && this.reportform.value[i] != null) {
        if (fieldvalue == i) {
          cascadeValue[fieldvalue] = val;
        }
      }
    }
    const formGroup = {};
    this.casecade = cascadeValue;
    this.casecade.Status = 0,
      this.casecade.FormCode = this.fcode,
      this.casecade.FieldCode = this.key

    this.Builderservice.MultiCascade(this.casecade).subscribe(
      (response) => {

        if (response) {
          if (response != null && response.length > 0) {
            if (this.reportform != undefined && this.reportform != null) {
              if (this.reportform.contains(this.key)) {
                // this.reportform.get(this.key).setValue(response);
              }

            }
          }

          this.TabletargetBuilderTools.forEach(formControl => {
            formGroup[formControl.FilterColumn] = new FormControl('');
            if (formControl.FilterType == "Single") {
              if (formControl.FilterColumn == this.key) {
                formControl.values = response;
                //DefaultValue
              }
            }
          });
        }
      });
  }
  CascadeFilterBind() {
    let cascadeValue = {};
    for (var i in this.keyValue) {
      if (this.reportform.controls.hasOwnProperty(i) && this.reportform.value[i] != null) {
        if (this.reportform.get(i).value != undefined && this.reportform.get(i).value != null && this.reportform.get(i).value != "") {
          cascadeValue[i] = this.reportform.get(i).value;
        }
      }
    }
    const formGroup = {};
    this.casecade = cascadeValue;
    this.casecade.Status = 0,
      this.casecade.FormCode = this.fcode,
      this.casecade.FieldCode = this.key

    this.Builderservice.MultiCascade(this.casecade).subscribe(
      (response) => {

        if (response) {

          this.TabletargetBuilderTools.forEach(formControl => {
            formGroup[formControl.FilterColumn] = new FormControl('');
            if (formControl.FilterType == "Single") {
              if (formControl.FilterColumn == this.key) {
                let dropvalue = this.formval == undefined ? "" : this.formval[formControl.FilterColumn];
                if (formControl.FilterColumn.value != null) {
                  this.reportform.get(formControl.FilterColumn).setValue(dropvalue);
                } else {
                  formControl.values = response;
                }


              }
            }
          });
        }
      });
  }
  AddClick() {
    this.addItem.emit({ value: this.Action })
  }
  public editClick(editId) {

    this.editItem.emit({ ID: editId, value: this.Action });
  }
  deleteClick(SelectedId) {
    const getdata: Iget = {
      FormCode: this.fcode,
      CreatedBy: this.loginInfo.UserId,
      Id: SelectedId,
      Action: 3
    }
    this.Builderservice.dynamicTableOperation(getdata).subscribe(
      (response) => {
        this.toaster.success("Record Deleted Successfully");
        this.CheckConditions();
      });
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
  historyClick(histId, history) {
    this.parentID = histId;
    this.BindHisoryData(histId, history)
  }
  BindHisoryData(Id, history) {
    this.openModal(history)
    this.colshistory = [];
    this.reports = {};
    this.reports.Id = Id,
      this.reports.CreatedBy = this.loginInfo.UserId,
      this.reports.Action = 5,
      this.reports.FormCode = this.fcode,
      this.reports.LanguageId = this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId,

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
  downloadClick(downloadId, download) {

    const category: Idownload = {
      FormCode: this.fcode,
      Id: downloadId,
      ColName: ''
    };
    // getall category
    this.Builderservice.getDownloadFileDetails(category).subscribe(
      (response) => {
        this.downloadDetails = response;
      },
      error => {
      });
    this.DownloadFile(download);
  }
  DownloadFile(download) {
    this.modalReference = this.modalService.open(download, this.ngbModalDownload);
  }
  openModal(history) {
    this.modalReference = this.modalService.open(history, this.ngbModalOptions);
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

    this.multiParentID = id;
    this.headerValue = headerValue;
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
  downloadMultiClick(car, download) {

    const category: Idownload = {
      FormCode: this.fcode,
      Id: car.ID,
      ColName: this.headerValue
    };
    // getall category
    this.Builderservice.getDownloadFileDetails(category).subscribe(
      (response) => {
        this.downloadDetails = response;
      },
      error => {
      });
    this.DownloadFile(download);

  }
}
