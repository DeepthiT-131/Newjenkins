import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { LoginconfigService } from 'src/app/services/loginconfig.service';

import { BuildercreateServiceService } from 'src/app/services/buildercreate-service.service';
import { ToasterService } from 'src/app/helper/toaster.service';
import { HelperService } from 'src/app/helper/helper.service';
import { IgetJsonData, Ireportref, Icheck1, IKanbanaIp, IViewUISubject, Ibuilderref, Iget } from 'src/app/interfaces/ibuilder-creation';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-view-kanban',
  templateUrl: './view-kanban.component.html',
  styleUrls: ['./view-kanban.component.css']
})
export class ViewKanbanComponent implements OnInit {

  kanbanaform: FormGroup;
  reports: any;
  fcode: string;
  parentCode: string
  children1json: any = [];
  dataformat: any;
  jsondata: any;
  kanbanaValue: any;
  jsondatachild: any;
  dataArray = [];
  children2 = [];
  FinalJson = [];
  FormCode: any;
  isfile: boolean;
  acessData: any;
  TabletargetBuilderTools: any = [];
  TabletargetBuilderTools1: any = [

  ];
  loginInfo: any;
  dateString: string;
  timeValue: any;
  TransferData: IViewUISubject;
  Action: number;
  constructor(private spinner: NgxSpinnerService, private Builderservice: BuildercreateServiceService, private toaster: ToasterService,
    private helper: HelperService, private loginconfigservice: LoginconfigService, private confirmationService: ConfirmationService, ) {

  }

  @Output() public addItem = new EventEmitter();
  @Output() public editItem = new EventEmitter();
  @Output() public deleteItem = new EventEmitter();
  ngOnInit() {
    this.loginInfo = this.helper.getValue('LoginInfo')
    this.TabletargetBuilderTools1 = [];
    this.children1json = [];
    this.FinalJson = [];
    this.viewData();

  }
  viewData() {

    this.Builderservice.viewTransferData.subscribe(data =>

      this.TransferData = data
    )

    this.fcode = this.TransferData.FormCode;
    this.Action = this.TransferData.ActionId;
    this.acessData = this.TransferData.Access;
    this.parentCode = this.acessData.ParentFormCode;
    let dateValue = new Date();
    this.timeValue = dateValue.getHours() + ":" + dateValue.getMinutes();

    this.dateString = formatDate(dateValue.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    this.FilterBind();
  }
  AddClick() {
    this.addItem.emit({ value: this.Action })
  }
  public editClick(val) {
    let value1 = val.children1.filter(
      x => x.fieldName === "ID");
    let value = value1[0].fieldValue;
    this.editItem.emit({ ID: value, value: this.Action });
  }
  public deleteClick(val) {
    let value1 = val.children1.filter(
      x => x.fieldName === "ID");
    let value = value1[0].fieldValue;
    //this.deleteItem.emit({ ID: value, value: 6 });
    const getdata: Iget = {

      FormCode: this.fcode,
      CreatedBy: this.loginInfo.UserId,
      Id: value,
      Action: 3


    }

    this.Builderservice.dynamicTableOperation(getdata).subscribe(
      (response) => {
        this.toaster.success("Record Deleted Successfully");
        this.getKanbanaJsonValue();
      });
  }


  onAnimationStart(event) {
    switch (event.toState) {
      case 'visible':
        event.element.style.display = 'block';
        break;
    }
  }
  onAnimationDone(event) {
    switch (event.toState) {
      case 'hidden':
        event.element.style.display = 'none';
        break;

      case 'void':
        event.element.style.display = 'none';
        break;
    }
  }

  FilterBind() {

    const formGroup = {};
    const themeconfigdata: IgetJsonData = {
      FormCode: this.fcode,
      ActionId: 6

    };

    this.Builderservice.getReportFilter(themeconfigdata).subscribe(
      (response) => {

        this.TabletargetBuilderTools = response.Table;
        this.TabletargetBuilderTools.forEach(formControl => {
          formGroup[formControl.FilterColumn] = new FormControl('');
          if (formControl.FilterType == 'Range') {
            if (formControl.RangeType == 'Date') {

              formGroup[formControl.FilterColumn].setValue(this.dateString);

            }
            if (formControl.RangeType == 'Time') {
              formControl.FilterColumn.setValue(this.timeValue);
            }
            if (formControl.RangeType == 'Number') {

            }
          }
          else {
            this.DefaultBindFilter(formControl, formControl.FilterColumn, 0)
          }

        });
        this.kanbanaform = new FormGroup(formGroup);
        this.getKanbanaJsonValue();
      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");

      });
  }

  DefaultBindFilter(formControl: any, fieldId, statusValue) {

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


      }
    );


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
  getKanbanaJsonValue() {
    this.spinner.show();
    this.TabletargetBuilderTools1 = []; this.children1json = []; this.FinalJson = [];
    this.reports = {};
    if (this.kanbanaform != undefined && this.kanbanaform != null) {
      let obj = this.kanbanaform.value;
      this.reports = obj;
    }
    this.reports.Action = 6,
      this.reports.CreatedBy = 1,
      this.reports.FormCode = this.fcode,
      this.reports.Id = 0,


      this.Builderservice.dynamicReportBuilderKanbana(this.reports).subscribe(
        (response) => {

          this.dataformat = response.data;
          this.jsondata = response.Table1;
          this.jsondatachild = response.Table3;
          this.kanbanaValue = response.Table2;;
          if (this.dataformat != undefined && this.dataformat != null && this.dataformat != "") {
            for (var j = 0; j < this.dataformat.length; j++) {
              let data1 = this.dataformat[j];
              let x = JSON.stringify(data1)
              this.dataArray = [];
              for (let key1 in data1) {
                ;
                const getdata: Icheck1 = {
                  field: key1,
                  header: data1[key1]

                }
                this.dataArray.push(getdata);
              }
            }
          }

          this.children1json = []; this.children2 = []; this.TabletargetBuilderTools1 = [];
          if (this.jsondatachild != undefined && this.jsondatachild != null && this.jsondatachild != "") {
            for (var x = 0; x < this.jsondatachild.length; x++) {

              let FieldValue = this.jsondatachild[x].FieldValue;
              let FieldName = this.jsondatachild[x].FieldLabel;

              let cascadeDropdown = this.jsondata.filter(
                book => book.FieldLabel === FieldValue);
              this.FinalJson = [];
              for (var z = 0; z < cascadeDropdown.length; z++) {


                let data2 = cascadeDropdown[z];


                this.children1json = [];
                for (var y = 0; y < this.dataArray.length; y++) {

                  let key = this.dataArray[y].field;

                  let data3 = data2[key];

                  let key2 = this.dataArray[y].header;
                  if (key2 != "FieldLabel" && key2 != "FieldValue") {
                    let children1 = {
                      fieldName: key2,
                      fieldValue: data3
                    }
                    this.children1json.push(children1);
                  }

                }

                let children = {
                  children1: this.children1json
                }
                this.FinalJson.push(children);


              }


              let Arayyy = {
                fieldName: FieldName,
                fieldValue: FieldValue,
                children: this.FinalJson

              };

              this.TabletargetBuilderTools1.push(Arayyy)

            }

          }
          this.spinner.hide();
        },

        error => {

          this.toaster.error("Some error occurred.Please try again", "Error");

        });

  }
  dropped(event, Title) {

    let value = event.value.children1;
    let x = value.filter(x => x.fieldName === "ID");
    let ID = x[0].fieldValue;

    const getkanbana: IKanbanaIp = {
      FormCode: this.fcode,
      ID: ID,
      FieldValue: Title,
      FieldName: this.kanbanaValue[0].FieldName
    }

    this.Builderservice.dynamicReportBuilderKanbanaInsert(getkanbana).subscribe(
      (response) => {
        this.toaster.success("Updated Succesfully", "Success");
      },
      error => {

        this.toaster.error("Some error occurred.Please try again", "Error");

      });

  }

}


