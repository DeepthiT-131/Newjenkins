import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { HelperService } from '../helper/helper.service';
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { Ireportref, IDynamicTable, Icheck, ImoduleTransferSubject, Iget, IgetJsonData, Idownload, Igethistory } from '../interfaces/ibuilder-creation';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';

import { CommonService } from '../services/common.service';

import { ToasterService } from '../helper/toaster.service';
import { Iconfig } from '../interfaces/iloginconfig';
import { LoginconfigService } from '../services/loginconfig.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-reportview',
  templateUrl: './reportview.component.html',
  styleUrls: ['./reportview.component.css']
})
export class ReportviewComponent implements OnInit {
  first: number = 0;
  reportform: FormGroup;
  modalReference: NgbModalRef;
  ngbModalDownload: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };
  reports: any = [];
  moduleTransferData: ImoduleTransferSubject;
  modulename: string;
  fcode: string;
  dateValue = new Date();
  dateString: string;
  loginInfo: any;
  timeValue: any;
  cars: any;
  exportColumns: any[];
  selectedColumns: any[];
  columns: any[];
  cols: any[];
  objcheck = [];

  emptyrow: number = 2;
  TabletargetBuilderTools = [];
  dataformat: any;
  getthemeconfigdetails: any;
  table: any = {
    Pagination: true,
    Scrollable: true,
    Sorting: true,
    Filter: true,
    ExportButton: true,
    Multiselect: true,
    Resizable: true,
    Reorder: true,
  };
  downloadDetails: any;
  theme: any;
  LanguageID: any;
  constructor(private confirmationService: ConfirmationService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private carService: CommonService, private helper: HelperService, private toaster: ToasterService,
    private modalService: NgbModal, private Builderservice: BuildercreateServiceService, private loginconfigservice: LoginconfigService,
    private sanitizer: DomSanitizer, route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.getData();

    });
  }

  ngOnInit() {



  }


  getData() {

    this.objcheck = [];
    this.loginInfo = this.helper.getValue('LoginInfo')
    this.LanguageID = this.helper.getValue('LanguageID');
 
    this.Builderservice.moduleTransferData.subscribe(data =>

      this.moduleTransferData = data
    );
    
    this.fcode = this.moduleTransferData.ModuleURL;
    this.modulename = this.moduleTransferData.ModuleName;



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



    this.dateValue = new Date();
    // this.timeValue = this.dateValue.getHours() + ":" + this.dateValue.getMinutes();

    this.dateString = formatDate(this.dateValue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    this.FilterBind();
  }
  FilterBind() {

    const formGroup = {};
    const themeconfigdata: IgetJsonData = {
      FormCode: this.fcode,
      ActionId:5

    };

    this.Builderservice.getReportFilter(themeconfigdata).subscribe(
      (response) => {

        this.TabletargetBuilderTools = response;
        this.TabletargetBuilderTools.forEach(formControl => {
          formGroup[formControl.FilterColumn] = new FormControl('');
          if (formControl.FilterType == 'Range') {
            if (formControl.RangeType == 'Date') {

              formGroup[formControl.FilterColumn].setValue(this.dateString);

              //DefaultValue
            }
            if (formControl.RangeType == 'Time') {
              formControl.FilterColumn.setValue(this.timeValue);
            }
            if (formControl.RangeType == 'Number') {
              //DefaultValue
            }
          }
          else {
            this.DefaultBindFilter(formControl, formControl.FilterColumn)
          }

        });
        this.reportform = new FormGroup(formGroup);
        this.CheckFilter();
      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");

      });
  }

  DefaultBindFilter(formControl: any, fieldId) {

    const getdata: Ireportref = {
      FormCode: this.fcode,
      FilterColumn: fieldId,


    };


    this.Builderservice.getReportReference(getdata).subscribe(
      (response) => {

        formControl.values = response;
        fieldId.setValue(0);





      }
    );


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



  CheckFilter() {

    let obj = this.reportform.value;


    this.reports = obj;

    this.reports.Id = 0,
      this.reports.CreatedBy = 1,

      this.reports.Action = 5
    this.reports.FormCode = this.fcode,

      this.cols = [

      ];

    this.Builderservice.dynamicTableReportFilter(this.reports).subscribe(
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


      },

      error => {

        this.toaster.error("Some error occurred.Please try again", "Error");

      });

  }

  DownLoadFiles(fieldname, fieldvalue) {
    let fileName = fieldvalue;
    //file type extension
    let checkFileType = fileName.split('.').pop();

    let thefile: any;
    let now = formatDate(new Date().toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    let filecheck = fieldname + now + "." + checkFileType;
    this.Builderservice.DownloadFile(fileName)
      .subscribe(

        err => {
          alert("Server error while downloading file.");
        }
      );


  }


}

