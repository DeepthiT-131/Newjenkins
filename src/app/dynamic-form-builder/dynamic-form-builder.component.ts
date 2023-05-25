import { Component, OnInit, ViewChild } from '@angular/core';
import { value, languageValue, refCondtnValue } from '../global.model';
import { IgetallDropdown, IgetAllTableDetails, IbuilderCreation, IgetAllColumnValues, IgetJsonData, IEachColumnFormcode } from '../interfaces/ibuilder-creation';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../helper/helper.service';
import { DynamicPopupComponent } from '../dynamic-popup/dynamic-popup.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TablePopupComponent } from '../table-popup/table-popup.component';

import { LoginconfigService } from '../services/loginconfig.service';
import { Iconfig } from '../interfaces/iloginconfig';
import { FormDetailsService } from '../services/form-details.service';
import { ToasterService } from '../helper/toaster.service';
import { CalculationWidgetComponent } from '../calculation-widget/calculation-widget.component';
import { TriggerpageComponent } from '../triggerpage/triggerpage.component';
import { RuleengineComponent } from '../ruleengine/ruleengine.component';


@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.css'],
  animations: [
    trigger('animation', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden',
        maxHeight: '0',
        paddingTop: '0',
        paddingBottom: '0',
        marginTop: '0',
        marginBottom: '0',
        opacity: '0',
      })),
      state('void', style({
        height: '0',
        overflow: 'hidden',
        maxHeight: '0',
        paddingTop: '0',
        paddingBottom: '0',
        marginTop: '0',
        marginBottom: '0',
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('void => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('void => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class DynamicFormBuilderComponent implements OnInit {
  SelectedItem = [];

  reportJson: any = [];
  TabletargetBuilderTools = [

  ];

  targetBuilderTools = [

  ];
  childtargetBuilderTools = [

  ];
  formBuilder: any = {
    "FormCode": "",
    "createdBy": "",
    "TenantId": "",
    "Filter": "",
    "components": ""
  };
  CalculateItem: any;
  report = false;
  reports: any = [];
  popupdata: any = [];
  jsondata: any;
  childjsondata: any;
  getthemeconfigdetails: any;
  theme: any;
  loginInfo: any;
  formDetails: any;
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };
  submitted = false;
  modalReference: NgbModalRef;
  text: string;
  LanguageID: any;
  SourceJson: any = {

  };
  intervals = "0";
  calculatefinal: any = [];
  activeMenuId: string;
  refcollist = [];
  Jointable = [];
  joinColumn = [];
  tablename: any;
  childtablename: any;
  isshow: boolean = false;
  sourceBuilderTools: any;
  checktable: boolean = false;
  ParentTable: any;
  Groupname: any;
  newjoin = [];
  constructor(private builderService: BuildercreateServiceService, private formdetailservice: FormDetailsService, private router: Router, private helper: HelperService,
    public modalService: NgbModal, private loginconfigservice: LoginconfigService, private toaster: ToasterService) { }

  ngOnInit() {


    this.loginInfo = this.helper.getValue('LoginInfo')
    if (this.loginInfo) {
      this.theme = this.helper.getValue('Theme');
      if (this.theme) {

        this.setTheme(this.theme)
      }
      else {

        this.getthemeconfigsetting();
      }
      this.formdetailservice.formcode.subscribe(data =>
        this.formDetails = data
      );

      this.ParentTable = this.formDetails.ParentTable;
      this.Groupname = this.formDetails.GroupName;
      if (this.formDetails.IsChild == 1) {
        this.builderService.getChildJSON().subscribe(
          (data) => {

            this.sourceBuilderTools = data
        
            this.getParentJson();
          },
          error => {
            //this.toaster.error("Some error occurred.Please try again", "Error");

          });

      }
      else {
        this.builderService.getSourceBuilder().subscribe(
          (data) => {

            this.sourceBuilderTools = data
       

          },
          error => {
            //this.toaster.error("Some error occurred.Please try again", "Error");

          });
      }
      this.LanguageID = this.helper.getValue('LanguageID');

      if (this.formDetails.ModuleURL != "") {
        this.getJsonValue();

      }
      else {
        this.router.navigate(['/theme/form']);
      }

    }

  }
  getParentJson() {

    const getdata: IgetJsonData = {
      FormCode: this.formDetails.ParentCode,
      ActionId: ""
    };

    this.builderService.getbuilderData(getdata).subscribe(
      (response) => {

        if (response[0].JsonData != null) {

          this.childjsondata = JSON.parse(response[0].JsonData);
          let reftablename = response[0].TableName;

          this.childtargetBuilderTools = this.childjsondata.Createjson;
      

          this.childtargetBuilderTools.forEach(formControl => {

            if (formControl.fieldType == "divSection") {
              if (this.Groupname != null && this.Groupname != "" && this.Groupname != undefined) {
                if (formControl.columnID == this.Groupname) {
                  let parentvalue = this.ParentTable + "ID";
               

                  let data = {
                    "displayID": "0",
                    "fieldType": "select",
                    "fieldId": "",
                    "icon": "fa-bars",
                    "fieldName": "ID",
                    "description": "",
                    "placeholder": "",
                    "defaultValue": "",
                    "inputType": "Normal",
                    "dataType": "int",
                    "checkTable": true,
                    "Language": [{
                      "LanguageID": "",
                      "LanguageText": "",
                      "Placeholder": ""
                    }],

                    "values": [
                      {
                        "Label": "",
                        "Value": ""
                      }],
                    "className": "",
                    "regex": "",
                    "minLength": "",
                    "maxLength": "",

                    "previous": false,
                    "required": true,
                    "tableView": true,
                    "dbview": true,
                    "dbIndex": false,

                    "editable": true,
                    "refTable": reftablename,
                    "refLabel": "",
                    "refValue": "TestFormsCom3083CompanyTest.ID",
                    "selectedDB": [],
                    "refCondition": [
                      {
                        "columnName": "",
                        "columnOperator": "",
                        "columnValue": "",
                        "colCondition": ""
                      }],
                    "refJoin": [
                      {
                        "joinTable": "",
                        "firstValue": "",
                        "SecondValue": ""
                      }],
                    "formView": true,

                    "groupnamebox": "table",
                    "refCriteria": "",
                    "sop": "",
                    "restrictedRoles": [],
                    "relationField": [],
                    "CascadeValue": "",
                    "CascadedItem": [],
                    "labelTop": true,
                    "visible": false,
                    "columnID": parentvalue,
                    "fieldstyle": "Primarybgcolor"
                  }
                  this.sourceBuilderTools.push(data);


                  this.getParentdata(formControl, reftablename);

                }
              }
              else {
                if (formControl.multiple == false) {
                  this.getParentdata(formControl, reftablename);
                }
                if (formControl.multiple == true) {



                  this.sourceBuilderTools.push(formControl);
                }
              }


            }

            else {

              if (formControl.fieldType == "button" || formControl.fieldType == "paragraph" || formControl.fieldType == "hrLine"
                || formControl.fieldType == "Editor") {

              }

              else {
                this.sourceBuilderTools.push(formControl);
              }
            }
          });



        }

      },
      error => {
        this.toaster.error("Some error Occurred")

      });
  }
  getParentdata(formControl: any, reftablename) {

    if (formControl.children) {
      formControl.children.forEach(e => {

        if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine"
          || e.fieldType == "Editor") {

        }
        else {
          this.sourceBuilderTools.push(e);

        }
      });
    }
    if (formControl.children1) {

      formControl.children1.forEach(e => {

        if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine"
          || e.fieldType == "Editor") {

        }
        else {
          this.sourceBuilderTools.push(e);
        }
      });

    }
    if (formControl.children2) {

      formControl.children2.forEach(e => {

        if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine"
          || e.fieldType == "Editor") {

        }
        else {
          this.sourceBuilderTools.push(e);
        }
      });

    }
    if (formControl.children3) {

      formControl.children3.forEach(e => {

        if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine"
          || e.fieldType == "Editor") {

        }
        else {
          this.sourceBuilderTools.push(e);
        }

      });

    }
    if (formControl.children4) {

      formControl.children4.forEach(e => {

        if (e.fieldType == "button" || e.fieldType == "paragraph" || e.fieldType == "hrLine"
          || e.fieldType == "Editor") {

        }
        else {
          this.sourceBuilderTools.push(e);
        }
      });

    }


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
  toggle(id: string) {
    this.activeMenuId = (this.activeMenuId === id ? null : id);
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
  private setTheme(theme: {}) {

    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }

  getJsonValue() {


    this.popupdata = [];
    const getdata: IgetJsonData = {
      FormCode: this.formDetails.ModuleURL,
      ActionId: ""
    };

    this.builderService.getbuilderData(getdata).subscribe(
      (response) => {

        if (response[0].JsonData != null) {
          this.jsondata = JSON.parse(response[0].JsonData);
         
          this.tablename = response[0].TableName;
          this.getAllFormcolumnValues(this.tablename);
          this.targetBuilderTools = this.jsondata.Createjson;
          this.TabletargetBuilderTools = this.jsondata.Filter;
        }
        for (let i = 0; i < this.targetBuilderTools.length; i++) {

          if (this.targetBuilderTools[i].fieldType == "text" || this.targetBuilderTools[i].fieldType == "number"
            || this.targetBuilderTools[i].fieldType == "date" || this.targetBuilderTools[i].fieldType == "select"
            || this.targetBuilderTools[i].fieldType == "checkbox"
            || this.targetBuilderTools[i].fieldType == "radio") {
            let reportdata = {
              Label: this.targetBuilderTools[i].fieldName,
              value: this.targetBuilderTools[i].columnID,
              fieldId: this.targetBuilderTools[i].fieldId
            }
            this.popupdata.push(reportdata);
          }
          if (this.targetBuilderTools[i].children) {


            for (let j = 0; j < this.targetBuilderTools[i].children.length; j++) {

              if (this.targetBuilderTools[i].children[j].fieldType == "text" || this.targetBuilderTools[i].children[j].fieldType == "number"
                || this.targetBuilderTools[i].children[j].fieldType == "date" || this.targetBuilderTools[i].children[j].fieldType == "select"
                || this.targetBuilderTools[i].children[j].fieldType == "checkbox"
                || this.targetBuilderTools[i].children[j].fieldType == "radio") {

                let reportdata = {
                  Label: this.targetBuilderTools[i].children[j].fieldName,
                  value: this.targetBuilderTools[i].children[j].columnID,
                  fieldId: this.targetBuilderTools[i].children[j].fieldId
                }
                this.popupdata.push(reportdata);
              }
            }
          }
          if (this.targetBuilderTools[i].children1) {

            for (let j = 0; j < this.targetBuilderTools[i].children1.length; j++) {
              if (this.targetBuilderTools[i].children1[j].fieldType == "text" || this.targetBuilderTools[i].children1[j].fieldType == "number"
                || this.targetBuilderTools[i].children1[j].fieldType == "date" || this.targetBuilderTools[i].children1[j].fieldType == "select"
                || this.targetBuilderTools[i].children1[j].fieldType == "checkbox"
                || this.targetBuilderTools[i].children1[j].fieldType == "radio") {
                let reportdata = {
                  Label: this.targetBuilderTools[i].children1[j].fieldName,
                  value: this.targetBuilderTools[i].children1[j].columnID,
                  fieldId: this.targetBuilderTools[i].children1[j].fieldId
                }
                this.popupdata.push(reportdata);
              }
            }
          }
          if (this.targetBuilderTools[i].children2) {

            for (let j = 0; j < this.targetBuilderTools[i].children2.length; j++) {
              if (this.targetBuilderTools[i].children2[j].fieldType == "text" || this.targetBuilderTools[i].children2[j].fieldType == "number"
                || this.targetBuilderTools[i].children2[j].fieldType == "date" || this.targetBuilderTools[i].children2[j].fieldType == "select"
                || this.targetBuilderTools[i].children2[j].fieldType == "checkbox"
                || this.targetBuilderTools[i].children2[j].fieldType == "radio") {
                let reportdata = {
                  Label: this.targetBuilderTools[i].children2[j].fieldName,
                  value: this.targetBuilderTools[i].children2[j].columnID,
                  fieldId: this.targetBuilderTools[i].children2[j].fieldId
                }
                this.popupdata.push(reportdata);
              }
            }
          }
          if (this.targetBuilderTools[i].children3) {

            for (let j = 0; j < this.targetBuilderTools[i].children3.length; j++) {
              if (this.targetBuilderTools[i].children3[j].fieldType == "text" || this.targetBuilderTools[i].children3[j].fieldType == "number"
                || this.targetBuilderTools[i].children3[j].fieldType == "date" || this.targetBuilderTools[i].children3[j].fieldType == "select"
                || this.targetBuilderTools[i].children3[j].fieldType == "checkbox"
                || this.targetBuilderTools[i].children3[j].fieldType == "radio") {
                let reportdata = {
                  Label: this.targetBuilderTools[i].children3[j].fieldName,
                  value: this.targetBuilderTools[i].children3[j].columnID,
                  fieldId: this.targetBuilderTools[i].children3[j].fieldId
                }
                this.popupdata.push(reportdata);
              }

            }
          }
          if (this.targetBuilderTools[i].children4) {

            for (let j = 0; j < this.targetBuilderTools[i].children4.length; j++) {
              if (this.targetBuilderTools[i].children4[j].fieldType == "text" || this.targetBuilderTools[i].children4[j].fieldType == "number"
                || this.targetBuilderTools[i].children4[j].fieldType == "date" || this.targetBuilderTools[i].children4[j].fieldType == "select"
                || this.targetBuilderTools[i].children4[j].fieldType == "checkbox"
                || this.targetBuilderTools[i].children4[j].fieldType == "radio") {
                let reportdata = {
                  Label: this.targetBuilderTools[i].children4[j].fieldName,
                  value: this.targetBuilderTools[i].children4[j].columnID,
                  fieldId: this.targetBuilderTools[i].children4[j].fieldId
                }
                this.popupdata.push(reportdata);

              }
            }
          }
        }


      },
      error => {
        this.toaster.error("Some error Occurred")

      });
  }
  getAllFormcolumnValues(changeobject) {

    let reportdata =
    {
      "displayID": "0",
      "fieldType": 'Table',
      "fieldName": "Common Fields",
      "children": [
        {
          "displayID": "0",
          "fieldName": "Div",
          "fieldType": "divSection",
          "children1": [] as any[],
        },
        {
          "displayID": "0",
          "fieldName": "Text",
          "fieldValue": "0",
          "fieldType": "column",
          "fieldId": "",
          "displayName": "",
          "Filter": false,
          "Hide": false,
          "Link": "",
          "SOP": ""

        },

      ],

    }



    const getdata: IEachColumnFormcode = {
      FormCode: this.formDetails.ModuleURL,
      TableName: changeobject

    };

    this.builderService.getAllColumneachFormcode(getdata).subscribe(
      (response) => {

        this.refcollist = response;

        for (let i = 0; i < this.refcollist.length; i++) {
          if (this.refcollist[i].fieldType == "Table") {
            let reportdata = {
              Label: this.refcollist[i].fieldName,
              value: this.refcollist[i].fieldName
            };
            this.Jointable.push(reportdata);
            for (let j = 0; j < this.refcollist[i].children.length; j++) {
              this.joinColumn.push(this.refcollist[i].children[j])
              // let reportdata = {
              //   label: this.refcollist[i].children[j].displayName,
              //   value: this.refcollist[i].children[j].fieldId
              // };
              // this.joinColumn.push(reportdata)
              
            }

          }
        }
        this.refcollist.push(reportdata)
      },
      error => {

      });
  }
  onTabChange(val) {
    if (val.index == 1) {
     
    }
  }
  OpenModalFilter(item) {
    this.SelectedItem = item;
    const initialState = {

      title: this.SelectedItem
    };


    const modalRef = this.modalService.open(TablePopupComponent, this.ngbModalOptions);
    modalRef.componentInstance.SelectedItem = this.SelectedItem;
    modalRef.componentInstance.CascadeValues = this.popupdata;


  }

  OpenModal(item) {

    this.SelectedItem = item;
    const initialState = {

      title: this.SelectedItem
    };


    const modalRef = this.modalService.open(DynamicPopupComponent,this.ngbModalOptions);
   
    modalRef.componentInstance.SelectedItem = this.SelectedItem;
    modalRef.componentInstance.CascadeValues = this.popupdata;
    modalRef.componentInstance.SaveData.subscribe((receivedEntry) => {
      receivedEntry.columnID = receivedEntry.columnID != "" ?
        receivedEntry.columnID : receivedEntry.fieldName.replace(/[^a-zA-Z0-9]+/ig, '').substring(0, 8) + this.randomString(4)

      if (receivedEntry.fieldType != "divSection") {
        let reportdata = {
          Label: receivedEntry.fieldName,
          value: receivedEntry.columnID,
          fieldId: receivedEntry.fieldId
        }
        var currentItem = JSON.stringify(this.popupdata);

        if (currentItem.indexOf(receivedEntry.columnID) !== -1) {
          const deleteIndex = this.popupdata.findIndex((todo) => todo.fieldId === receivedEntry.fieldId);
          if (deleteIndex != -1) {
            this.popupdata.splice(deleteIndex, 1);
          }
        }
        this.popupdata.push(reportdata);

      }
      this.CascadedItemValue(receivedEntry.CascadedItem, receivedEntry.columnID);
      modalRef.close();
    })

  }
  CascadedItemValue(Cascadeitemvalue, columnName) {
  
    this.SourceJson = {};
    this.SourceJson[columnName] = Cascadeitemvalue;
    
    for (let i = 0; i < this.targetBuilderTools.length; i++) {


      if (this.targetBuilderTools[i].fieldType == "divSection") {
        if (this.targetBuilderTools[i].multiple) {
          var TargetJson = this.targetBuilderTools[i].CascadedItems;

          TargetJson = TargetJson != undefined ? TargetJson : {};
          var FinalJson = Object.assign({}, TargetJson, this.SourceJson);
          this.targetBuilderTools[i].CascadedItems = FinalJson;
        }
        if (this.targetBuilderTools[i].children) {


          for (let j = 0; j < this.targetBuilderTools[i].children.length; j++) {
            if (Cascadeitemvalue != undefined && Cascadeitemvalue != null && Cascadeitemvalue != "" && Cascadeitemvalue != []) {
              if (Cascadeitemvalue[0].includes(this.targetBuilderTools[i].children[j].columnID)) {
                var TargetJson = this.targetBuilderTools[i].children[j].CascadedItems;
                TargetJson = TargetJson != undefined ? TargetJson : {};
                var FinalJson = Object.assign(TargetJson, this.SourceJson);
                this.targetBuilderTools[i].children[j].CascadedItems = FinalJson;
              }
            }
          }
        }
        if (this.targetBuilderTools[i].children1) {

          for (let j = 0; j < this.targetBuilderTools[i].children1.length; j++) {
            if (Cascadeitemvalue != undefined && Cascadeitemvalue != null && Cascadeitemvalue != "" && Cascadeitemvalue != []) {
              if (Cascadeitemvalue[0].includes(this.targetBuilderTools[i].children1[j].columnID)) {
                var TargetJson = this.targetBuilderTools[i].children1[j].CascadedItems;
                TargetJson = TargetJson != undefined ? TargetJson : {};
                var FinalJson = Object.assign(TargetJson, this.SourceJson);
                this.targetBuilderTools[i].children1[j].CascadedItems = FinalJson;

              }
            }
          }
        }
        if (this.targetBuilderTools[i].children2) {

          for (let j = 0; j < this.targetBuilderTools[i].children2.length; j++) {
            if (Cascadeitemvalue != undefined && Cascadeitemvalue != null && Cascadeitemvalue != "" && Cascadeitemvalue != []) {
              if (Cascadeitemvalue[0].includes(this.targetBuilderTools[i].children2[j].columnID)) {
                var TargetJson = this.targetBuilderTools[i].children2[j].CascadedItems;
                TargetJson = TargetJson != undefined ? TargetJson : {};
                var FinalJson = Object.assign(TargetJson, this.SourceJson);
                this.targetBuilderTools[i].children2[j].CascadedItems = FinalJson;
              }
            }
          }
        }
        if (this.targetBuilderTools[i].children3) {

          for (let j = 0; j < this.targetBuilderTools[i].children3.length; j++) {
            if (Cascadeitemvalue != undefined && Cascadeitemvalue != null && Cascadeitemvalue != "" && Cascadeitemvalue != []) {
              if (Cascadeitemvalue[0].includes(this.targetBuilderTools[i].children3[j].columnID)) {
                var TargetJson = this.targetBuilderTools[i].children3[j].CascadedItems;
                TargetJson = TargetJson != undefined ? TargetJson : {};
                var FinalJson = Object.assign(TargetJson, this.SourceJson);
                this.targetBuilderTools[i].children3[j].CascadedItems = FinalJson;
              }
            }
          }

        }
        if (this.targetBuilderTools[i].children4) {

          for (let j = 0; j < this.targetBuilderTools[i].children4.length; j++) {
            if (Cascadeitemvalue != undefined && Cascadeitemvalue != null && Cascadeitemvalue != "" && Cascadeitemvalue != []) {
              if (Cascadeitemvalue[0].includes(this.targetBuilderTools[i].children4[j].columnID)) {
                var TargetJson = this.targetBuilderTools[i].children4[j].CascadedItems;
                TargetJson = TargetJson != undefined ? TargetJson : {};
                var FinalJson = Object.assign(TargetJson, this.SourceJson);
                this.targetBuilderTools[i].children4[j].CascadedItems = FinalJson;
              }
            }
          }
        }
      }
      else {
        if (Cascadeitemvalue != undefined && Cascadeitemvalue != null && Cascadeitemvalue != "" && Cascadeitemvalue != []) {
          if (Cascadeitemvalue[0].includes(this.targetBuilderTools[i].columnID)) {
            var TargetJson = this.targetBuilderTools[i].CascadedItems;
            TargetJson = TargetJson != undefined ? TargetJson : {};
            var FinalJson = Object.assign(TargetJson, this.SourceJson);
            this.targetBuilderTools[i].CascadedItems = FinalJson;
          }
        }
      }

    }

  }
  builderDrag(e: any) {


    e.value.fieldId = e.value.fieldName + '_' + new Date().getTime();


  }
  OpenCalculator(item) {

    this.SelectedItem = item;
    const initialState = {

      title: this.SelectedItem
    };

    const modalRef = this.modalService.open(CalculationWidgetComponent, this.ngbModalOptions);
    modalRef.componentInstance.SelectedItem = this.SelectedItem;
    modalRef.componentInstance.CascadeValues = this.popupdata;
    modalRef.componentInstance.SaveCalc.subscribe((receivedEntry) => {
      if (receivedEntry.hasOwnProperty("Intervals")) {
        this.intervals = receivedEntry.Intervals;
      }

      this.CalculatedValue(receivedEntry.Calculation, receivedEntry.columnID, this.intervals)

      modalRef.close();
    })

  }
  CalculatedValue(CalcValue, itemname, intervalValue) {

    this.calculatefinal = [];
    this.SourceJson = {};
    this.SourceJson[itemname] = CalcValue;
    //this.calculatefinal.push(this.SourceJson);


    for (let i = 0; i < this.targetBuilderTools.length; i++) {


      if (this.targetBuilderTools[i].fieldType == "divSection") {
        if (this.targetBuilderTools[i].multiple) {
          if (intervalValue != "0") {
            this.targetBuilderTools[i].Intervals = intervalValue;
          }
          var TargetJson = this.targetBuilderTools[i].Calculation;
          TargetJson = TargetJson != undefined ? TargetJson : {};
          var FinalJson = Object.assign({}, TargetJson, this.SourceJson);
          this.targetBuilderTools[i].calculateValue = true;
          this.targetBuilderTools[i].inputType = "Cascade";
          this.targetBuilderTools[i].Calculation = FinalJson;

        }
        if (this.targetBuilderTools[i].children) {


          for (let j = 0; j < this.targetBuilderTools[i].children.length; j++) {

            if (CalcValue.indexOf(this.targetBuilderTools[i].children[j].columnID) !== -1) {
              var TargetJson = this.targetBuilderTools[i].children[j].Calculation;
              TargetJson = TargetJson != undefined ? TargetJson : {};
              var FinalJson = Object.assign({}, TargetJson, this.SourceJson);
              if (intervalValue != "0") {
                this.targetBuilderTools[i].children[j].Intervals = intervalValue;
              }
              this.targetBuilderTools[i].children[j].calculateValue = true;
              this.targetBuilderTools[i].children[j].inputType = "CasCade";
              this.targetBuilderTools[i].children[j].Calculation = FinalJson;
            }
          }
        }
        if (this.targetBuilderTools[i].children1) {

          for (let j = 0; j < this.targetBuilderTools[i].children1.length; j++) {
            if (CalcValue.indexOf(this.targetBuilderTools[i].children1[j].columnID) !== -1) {
              var TargetJson = this.targetBuilderTools[i].children1[j].Calculation;
              TargetJson = TargetJson != undefined ? TargetJson : {};

              var FinalJson = Object.assign({}, TargetJson, this.SourceJson);
              if (intervalValue != "0") {
                this.targetBuilderTools[i].children1[j].Intervals = intervalValue;
              }
              //   this.calculatefinal.push(FinalJson);
              this.targetBuilderTools[i].children1[j].calculateValue = true;
              this.targetBuilderTools[i].children1[j].inputType = "Cascade";
              this.targetBuilderTools[i].children1[j].Calculation = FinalJson;

            }

          }
        }
        if (this.targetBuilderTools[i].children2) {

          for (let j = 0; j < this.targetBuilderTools[i].children2.length; j++) {

            if (CalcValue.indexOf(this.targetBuilderTools[i].children2[j].columnID) !== -1) {
              var TargetJson = this.targetBuilderTools[i].children2[j].Calculation;
              TargetJson = TargetJson != undefined ? TargetJson : {};
              var FinalJson = Object.assign({}, TargetJson, this.SourceJson);
              if (intervalValue != "0") {
                this.targetBuilderTools[i].children2[j].Intervals = intervalValue;
              }
              // this.calculatefinal.push(FinalJson);
              this.targetBuilderTools[i].children2[j].calculateValue = true;
              this.targetBuilderTools[i].children2[j].inputType = "Cascade";
              this.targetBuilderTools[i].children2[j].Calculation = FinalJson;
            }
          }
        }
        if (this.targetBuilderTools[i].children3) {

          for (let j = 0; j < this.targetBuilderTools[i].children3.length; j++) {

            if (CalcValue.indexOf(this.targetBuilderTools[i].children3[j].columnID) !== -1) {
              var TargetJson = this.targetBuilderTools[i].children3[j].Calculation;
              TargetJson = TargetJson != undefined ? TargetJson : {};
              // var FinalJson=Object.assign(TargetJson,this.SourceJson);
              var FinalJson = Object.assign({}, TargetJson, this.SourceJson);
              if (intervalValue != "0") {
                this.targetBuilderTools[i].children3[j].Intervals = intervalValue;
              }
              // this.calculatefinal.push(FinalJson);
              this.targetBuilderTools[i].children3[j].calculateValue = true;
              this.targetBuilderTools[i].children3[j].inputType = "Cascade";
              this.targetBuilderTools[i].children3[j].Calculation = FinalJson;
            }
          }

        }
        if (this.targetBuilderTools[i].children4) {

          for (let j = 0; j < this.targetBuilderTools[i].children4.length; j++) {

            if (CalcValue.indexOf(this.targetBuilderTools[i].children4[j].columnID) !== -1) {
              var TargetJson = this.targetBuilderTools[i].children4[j].Calculation;
              TargetJson = TargetJson != undefined ? TargetJson : {};
              var FinalJson = Object.assign({}, TargetJson, this.SourceJson);
              if (intervalValue != "0") {
                this.targetBuilderTools[i].children4[j].Intervals = intervalValue;
              }
              // this.calculatefinal.push(FinalJson);
              this.targetBuilderTools[i].children4[j].calculateValue = true;
              this.targetBuilderTools[i].children4[j].inputType = "Cascade";
              this.targetBuilderTools[i].children4[j].Calculation = FinalJson;
            }
          }
        }
      }
      else {
        if (CalcValue.indexOf(this.targetBuilderTools[i].columnID) !== -1) {
          var TargetJson = this.targetBuilderTools[i].Calculation;
          TargetJson = TargetJson != undefined ? TargetJson : {};
          var FinalJson = Object.assign({}, TargetJson, this.SourceJson);
          if (intervalValue != "0") {
            this.targetBuilderTools[i].Intervals = intervalValue;
          }
          this.targetBuilderTools[i].calculateValue = true;
          this.targetBuilderTools[i].inputType = "Cascade";
          this.targetBuilderTools[i].Calculation = FinalJson;
        }
      }

    }
  }

  removeJson(valueIndex, deletedvalue) {

    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        valueIndex.splice(deletedvalue, 1);

      }
    })
  }
  removeField(arrItem) {

    let valueIndex = arrItem.itemname;

    //currentItem.indexOf(receivedEntry.fieldId)
    if (valueIndex) {

      const deleteIndex = this.targetBuilderTools.findIndex((todo) => todo.fieldId === arrItem.Id);
      const delPopupIndex = this.popupdata.findIndex((todo) => todo.fieldId === arrItem.Id)
      if (delPopupIndex != -1) {
        this.popupdata.splice(delPopupIndex, 1);
      }

      if (deleteIndex != -1) {
        //  let d= valueIndex.children.splice(deleteIndex, 1);
        this.removeJson(this.targetBuilderTools, deleteIndex);
      }

    }

    if (valueIndex.children) {
      if (valueIndex.children.length > 0) {
        const deleteIndex = valueIndex.children.findIndex((todo) => todo.fieldId === arrItem.Id);
        if (deleteIndex != -1) {
          //  let d= valueIndex.children.splice(deleteIndex, 1);
          this.removeJson(valueIndex.children, deleteIndex);
        }
        const delPopupIndex = this.popupdata.findIndex((todo) => todo.fieldId === arrItem.Id)
        if (delPopupIndex != -1) {
          this.popupdata.splice(delPopupIndex, 1);
        }

      }
    }
    if (valueIndex.children1) {
      if (valueIndex.children1.length > 0) {

        const deleteIndex = valueIndex.children1.findIndex((todo) => todo.fieldId === arrItem.Id);
        if (deleteIndex != -1) {

          this.removeJson(valueIndex.children1, deleteIndex);

        }
        const delPopupIndex = this.popupdata.findIndex((todo) => todo.fieldId === arrItem.Id)
        if (delPopupIndex != -1) {
          this.popupdata.splice(delPopupIndex, 1);
        }

      }
    }
    if (valueIndex.children2) {
      if (valueIndex.children2.length > 0) {

        const deleteIndex = valueIndex.children2.findIndex((todo) => todo.fieldId === arrItem.Id);
        if (deleteIndex != -1) {

          this.removeJson(valueIndex.children2, deleteIndex);
        }
        const delPopupIndex = this.popupdata.findIndex((todo) => todo.fieldId === arrItem.Id)
        if (delPopupIndex != -1) {
          this.popupdata.splice(delPopupIndex, 1);
        }

      }
    }
    if (valueIndex.children3) {
      if (valueIndex.children3.length > 0) {

        const deleteIndex = valueIndex.children3.findIndex((todo) => todo.fieldId === arrItem.Id);
        if (deleteIndex != -1) {
          this.removeJson(valueIndex.children3, deleteIndex);
        }
        const delPopupIndex = this.popupdata.findIndex((todo) => todo.fieldId === arrItem.Id)
        if (delPopupIndex != -1) {
          this.popupdata.splice(delPopupIndex, 1);
        }

      }
    }
    if (valueIndex.children4) {
      if (valueIndex.children4.length > 0) {

        const deleteIndex = valueIndex.children4.findIndex((todo) => todo.fieldId === arrItem.Id);
        if (deleteIndex != -1) {
          this.removeJson(valueIndex.children4, deleteIndex);
        }
        const delPopupIndex = this.popupdata.findIndex((todo) => todo.fieldId === arrItem.Id)
        if (delPopupIndex != -1) {
          this.popupdata.splice(delPopupIndex, 1);
        }

      }

    }

  }
  removeFieldFilter(arrItem) {

    let valueIndex = arrItem.itemname;

    if (valueIndex.children) {
      if (valueIndex.children.length > 0) {
        const deleteIndex = valueIndex.children.findIndex((todo) => todo.fieldId === arrItem.Id);
        if (deleteIndex != -1) {
          //  let d= valueIndex.children.splice(deleteIndex, 1);
          this.removeJson(valueIndex.children, deleteIndex);
        }

      }
    }
    if (valueIndex.children1) {
      if (valueIndex.children1.length > 0) {

        const deleteIndex = valueIndex.children1.findIndex((todo) => todo.fieldId === arrItem.Id);
        if (deleteIndex != -1) {

          this.removeJson(valueIndex.children1, deleteIndex);

        }

      }
    }
    if (valueIndex.children2) {
      if (valueIndex.children2.length > 0) {

        const deleteIndex = valueIndex.children2.findIndex((todo) => todo.fieldId === arrItem.Id);
        if (deleteIndex != -1) {

          this.removeJson(valueIndex.children2, deleteIndex);
        }

      }
    }
    if (valueIndex.children3) {
      if (valueIndex.children3.length > 0) {

        const deleteIndex = valueIndex.children3.findIndex((todo) => todo.fieldId === arrItem.Id);
        if (deleteIndex != -1) {
          this.removeJson(valueIndex.children3, deleteIndex);
        }

      }
    }
    if (valueIndex.children4) {
      if (valueIndex.children4.length > 0) {

        const deleteIndex = valueIndex.children4.findIndex((todo) => todo.fieldId === arrItem.Id);
        if (deleteIndex != -1) {
          this.removeJson(valueIndex.children4, deleteIndex);
        }

      }
    }

  }

  SaveModal(selectedItems) {


  }
  randomString(stringLength) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

    let randomstring = '';
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }

    return randomstring;
  }
  SaveJson() {

    for (let i = 0; i < this.targetBuilderTools.length; i++) {
      this.targetBuilderTools[i].displayID = i + 1;
      this.targetBuilderTools[i].columnID = this.targetBuilderTools[i].columnID != "" ?
        this.targetBuilderTools[i].columnID : this.targetBuilderTools[i].fieldName.replace(/[\s]/g, '').substring(0, 8) + this.randomString(4)
      if (this.targetBuilderTools[i].children) {


        for (let j = 0; j < this.targetBuilderTools[i].children.length; j++) {
          this.targetBuilderTools[i].children[j].displayID = i + 1;
          this.targetBuilderTools[i].children[j].columnID = this.targetBuilderTools[i].children[j].columnID != "" ? this.targetBuilderTools[i].children[j].columnID :
            this.targetBuilderTools[i].children[j].fieldName.replace(/[\s]/g, '').substring(0, 8) + this.randomString(4);
          let reportdata = {
            fieldName: this.targetBuilderTools[i].children[j].fieldName,
            fieldType: this.targetBuilderTools[i].children[j].fieldType,
            fieldId: this.targetBuilderTools[i].children[j].columnID,
            displayID: this.targetBuilderTools[i].children[j].displayID
          }
          this.reportJson.push(reportdata);
          // modalRef.componentInstance.CascadeValues = this.popupdata;
        }
      }
      if (this.targetBuilderTools[i].children1) {

        for (let j = 0; j < this.targetBuilderTools[i].children1.length; j++) {
          this.targetBuilderTools[i].children1[j].displayID = i + 1;
          this.targetBuilderTools[i].children1[j].columnID = this.targetBuilderTools[i].children1[j].columnID != "" ? this.targetBuilderTools[i].children1[j].columnID :
            this.targetBuilderTools[i].children1[j].fieldName.replace(/[\s]/g, '').substring(0, 8) + this.randomString(4);
          let reportdata = {
            fieldName: this.targetBuilderTools[i].children1[j].fieldName,
            fieldType: this.targetBuilderTools[i].children1[j].fieldType,
            fieldId: this.targetBuilderTools[i].children1[j].columnID,
            displayID: this.targetBuilderTools[i].children1[j].displayID
          }
          this.reportJson.push(reportdata);

        }
      }
      if (this.targetBuilderTools[i].children2) {

        for (let j = 0; j < this.targetBuilderTools[i].children2.length; j++) {
          this.targetBuilderTools[i].children2[j].displayID = i + 1;
          this.targetBuilderTools[i].children2[j].columnID = this.targetBuilderTools[i].children2[j].columnID != "" ? this.targetBuilderTools[i].children2[j].columnID :
            this.targetBuilderTools[i].children2[j].fieldName.replace(/[\s]/g, '').substring(0, 8) + this.randomString(4)
          let reportdata = {
            fieldName: this.targetBuilderTools[i].children2[j].fieldName,
            fieldType: this.targetBuilderTools[i].children2[j].fieldType,
            fieldId: this.targetBuilderTools[i].children2[j].columnID,
            displayID: this.targetBuilderTools[i].children2[j].displayID
          }
          this.reportJson.push(reportdata);
        }
      }
      if (this.targetBuilderTools[i].children3) {

        for (let j = 0; j < this.targetBuilderTools[i].children3.length; j++) {
          this.targetBuilderTools[i].children3[j].displayID = i + 1;
          this.targetBuilderTools[i].children3[j].columnID = this.targetBuilderTools[i].children3[j].columnID != "" ? this.targetBuilderTools[i].children3[j].columnID :
            this.targetBuilderTools[i].children3[j].fieldName.replace(/[\s]/g, '').substring(0, 8) + this.randomString(4);
          let reportdata = {
            fieldName: this.targetBuilderTools[i].children3[j].fieldName,
            fieldType: this.targetBuilderTools[i].children3[j].fieldType,
            fieldId: this.targetBuilderTools[i].children3[j].columnID,
            displayID: this.targetBuilderTools[i].children3[j].displayID
          }
          this.reportJson.push(reportdata);
        }
      }
      if (this.targetBuilderTools[i].children4) {

        for (let j = 0; j < this.targetBuilderTools[i].children4.length; j++) {
          this.targetBuilderTools[i].children4[j].displayID = i + 1;
          this.targetBuilderTools[i].children4[j].columnID = this.targetBuilderTools[i].children4[j].columnID != "" ? this.targetBuilderTools[i].children4[j].columnID :
            this.targetBuilderTools[i].children4[j].fieldName.replace(/[\s]/g, '').substring(0, 8) + this.randomString(4);
          let reportdata = {
            fieldName: this.targetBuilderTools[i].children4[j].fieldName,
            fieldType: this.targetBuilderTools[i].children4[j].fieldType,
            fieldId: this.targetBuilderTools[i].children4[j].columnID,
            displayID: this.targetBuilderTools[i].children4[j].displayID
          }
          this.reportJson.push(reportdata);
        }
      }
    }

    const getdata: IbuilderCreation = {
      FormCode: this.formDetails.ModuleURL,
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.loginInfo.LanguageId,
      CreatedBy: this.loginInfo.UserId,
      Createjson: this.targetBuilderTools,
      Filter: this.TabletargetBuilderTools


    };



    this.builderService.savebuilderData(getdata).subscribe(
      (response) => {
        console.log(response,"response")
        this.tablename = response.Table;
        this.childtablename = response.Table1

        this.getAllFormcolumnValues(this.tablename[0].ParentTableName)
        this.toaster.success("Data Added Successfully");
      },
      error => {
        this.toaster.error("Some error Occurred while Inserting/Updating.");

      });



  }
  initResponse() {
    this.helper.setValue("jsondata", this.formBuilder);
    if (this.formDetails.IsChild == 1) {
      this.router.navigate(['/theme/subForm']);
    }
    else {
      this.router.navigate(['/theme/form']);
    }


  }

  OpenTriggerModal(item) {

    this.SelectedItem = item;
    const modalRef = this.modalService.open(TriggerpageComponent, this.ngbModalOptions);
    modalRef.componentInstance.SelectedItem = this.SelectedItem;
    modalRef.componentInstance.CascadeValues = this.popupdata;
  }
  OpenRuleEngine(item) {

    this.SelectedItem = item;
    const modalRef = this.modalService.open(RuleengineComponent, this.ngbModalOptions);
    modalRef.componentInstance.SelectedItem = this.SelectedItem;
    modalRef.componentInstance.CascadeValues = this.popupdata;
  }

}
