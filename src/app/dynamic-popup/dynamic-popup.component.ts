import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { value, languageValue, refCondtnValue, refJoinValue, refJoincodn } from '../global.model';
import { IgetAllTableDetails, IgetAllColumnValues, IgetallDropdown, IRole, IgetAllTableDetailsDB } from '../interfaces/ibuilder-creation';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../helper/helper.service';
import { isUndefined, isNull } from 'util';
import { FormControl, FormArray, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-popup',
  templateUrl: './dynamic-popup.component.html',
  styleUrls: ['./dynamic-popup.component.css']
})
export class DynamicPopupComponent implements OnInit {
  reports: any = [];
  reports1: any = [];
  roledetails = [];
  checked: boolean = true;
  table: string = 'val1';
  defaultvaluelist = [];
  defaulttypelist = [];
  reftablelist = [];
  DbData = [];
  DBUpdated = [];
  Columns = [];
  reftables = [];
  reftablevalue = [];
  cars1 = [];
  reftablecondtnlist = [];
  reftableOperatorList = [];
  refcollist = [];
  jointablecollist = [];
  jointableTotallist: any;
  languagelist = [];
  jsondata = [];
  columnvaluelist = [];
  actionlist = [];
  actionStatus: boolean = false;
  reftablename: any;
  error = false;
  index = 1;
  value: value = {
    label: "",
    value: ""
  };
  success = false;
  languageValue: languageValue = {
    LanguageID: "",
    LanguageText: "",
    Placeholder: ""
  };
  conditionValue: refCondtnValue = {
    columnName: "",
    columnOperator: "",
    columnValue: "",
    colCondition: ""
  };
  joinValue: refJoinValue = {
    joinTable: "",
    firstValue: "",
    SecondValue: "",
  };
  cars = [];
  relationfieldList = [];
  loginInfo: any;
  CascadeValueName: any;
  @Input() public SelectedItem;
  @Input() public CascadeValues;

  @Output() SaveData: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal, private builderService: BuildercreateServiceService,
    private helper: HelperService) { }

  ngOnInit() {

    this.loginInfo = this.helper.getValue('LoginInfo');
    this.getRefDB();
    this.getrestrictedroles();
    this.getdefaultValues();
    this.getLanguage();
    // this.getTablefromDB(isNull);
    // this.getReftable();
    //this.getReftable(isNull);
    this.getRelationValues();
    if (!isUndefined(this.SelectedItem.selectedDB)) {
      if (this.SelectedItem.selectedDB != "") {
        this.getTablefromDB(this.SelectedItem.selectedDB);
      } else {
        this.getTablefromDB(isNull);
      }
    }
    if (!isUndefined(this.SelectedItem.refTable)) {

      if (this.SelectedItem.refTable != "") {
        this.getAllTablecolumnValues(this.SelectedItem.refTable);
      }

      this.SelectedItem["refCondition"].forEach(item => {
        if (item.columnName != "") {
          this.getAllColumnValuesFirst(this.SelectedItem.refTable, item.columnName)
        }
      });
      this.SelectedItem["refJoin"].forEach(items => {

        if (items.joinTable != "") {
          this.getJoinTable(items.joinTable);
        }
      });
    }

  }
  getRefDB() {
    // alert("AllDB");
    this.builderService.GetAllDB().subscribe(
      (response) => {

        this.DbData = response;
        this.reports = [];
        this.DbData.forEach(element => {
          let reportdata = {
            value: element.DBName,
            label: element.DBName
          }
          this.reports.push(reportdata);
          this.DBUpdated = this.reports;

        },
          error => {

          });
      })

  }
  public getTablefromDB(dbArray) {

    let dbArray1 = dbArray.toString() != isNull ? dbArray.toString() : "";

    this.getReftable(dbArray1);



  }
  getReftable(dbname) {


    const getdata: IgetAllTableDetailsDB = {

      DBName: dbname != isNull ? dbname : ""

    };

    this.builderService.GetAllTablesDB(getdata).subscribe(
      (response) => {

        this.cars = response;

        // this.reftablelist = response;
        this.helper.setValue('reftablelist', this.reftablelist);
        this.reports = [];
        let selectdata = {
          value: "",
          label: "--Select--"
        }
        this.reports.push(selectdata);
        this.cars.forEach(element => {
          let reportdata = {
            value: element.TableName,
            label: element.TableName
          }
          this.reports.push(reportdata);
          this.cars1 = this.reports;

          this.reftablelist = this.reports;

        },
          error => {

          });
      })

  }
  public getRelationValues() {
    let relationfieldList = [];
    this.CascadeValues.forEach(element => {
      let reportdata = {
        value: element.value,
        label: element.Label,
        // value: element.fieldId,
      }
      this.relationfieldList.push(reportdata);
      this.relationfieldList;

    },
      error => {
        //this.dtTrigger.next();
      });
  }
  public getrestrictedroles() {

    const common: IRole = {

      RoleID: 0,
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.loginInfo.LanguageId
    };

    // getall dispatch summary
    this.builderService.getrole(common).subscribe(
      (response) => {

        this.roledetails = response;

        this.reports = [];
        this.roledetails.forEach(element => {
          let reportdata = {
            value: element.RoleID,
            label: element.RoleName
          }
          this.reports.push(reportdata);
          this.cars = this.reports;

        },
          error => {

          });
      })
  }


  getLanguage() {

    let fieldInfo = this.helper.getValue('languagelist');
    if (fieldInfo == '') {
      this.builderService.getAllLanguage().subscribe(
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

  //Reference selected table column values
  getAllTablecolumnValues(changeobject) {

    this.reftablename = changeobject;
    const getdata: IgetAllTableDetails = {

      TableName: changeobject

    };
    if (this.refcollist.length > 0) {
      var check = this.refcollist[0].ColumnName;

      let splitvalue = check.split('.')
      var check1 = splitvalue[0];


      this.jointableTotallist = this.jointableTotallist.filter(function (item) {
        return !item.ColumnName.includes(check1)
      });


    }
    this.builderService.getAllTable(getdata).subscribe(
      (response) => {
        this.refcollist = response;

        this.reftables = [];
        let selectdata = {
          value: "",
          label: "--Select--"
        }
        this.reftables.push(selectdata);
        this.refcollist.forEach(element => {
          let reportdata = {
            value: element.ColumnName,
            label: element.DisplayName
          }
          this.reftables.push(reportdata);
          this.reftablevalue = this.reftables;

        },
          error => {
          });
        if (this.jointableTotallist) {
          this.jointableTotallist = response.concat(this.jointableTotallist);
        }
        else {
          this.jointableTotallist = response;
        }
        this.reports1 = [];

        this.reports1.push(selectdata);
        this.jointableTotallist.forEach(element => {
          let reportdata1 = {
            value: element.ColumnName,
            label: element.DisplayName
          }
          this.reports1.push(reportdata1);
          this.Columns = this.reports1;
         
        },

          error => {
          });
      });

  }
  getJoinTable(changeobject) {
    let selectdata = {
      value: "",
      label: "--Select--"
    }
    this.reftablename = changeobject;
    const getdata: IgetAllTableDetails = {

      TableName: changeobject

    };
    this.builderService.getAllTable(getdata).subscribe(
      (response) => {
        this.jointablecollist = response;
        if (this.jointableTotallist) {
          this.jointableTotallist = response.concat(this.jointableTotallist);
          this.reports1 = [];
          this.reports1.push(selectdata);
          this.jointableTotallist.forEach(element => {
            let reportdata1 = {
              value: element.ColumnName,
              label: element.DisplayName
            }
            this.reports1.push(reportdata1);
            this.Columns = this.reports1;
        
          },

            error => {
            });
        }
        else {
          this.jointableTotallist = response;
          this.reports1 = [];
          this.reports1.push(selectdata);
          this.jointableTotallist.forEach(element => {
            let reportdata1 = {
              value: element.ColumnName,
              label: element.DisplayName
            }
            this.reports1.push(reportdata1);
            this.Columns = this.reports1;
           
          },

            error => {
            });
        }
      });
  }
  DeleteJoinItem(SelectItem, value) {
    if (value.joinTable != "") {
      const delPopupIndex = SelectItem.findIndex((todo) => todo.joinTable === value.joinTable)
      if (delPopupIndex != -1 || delPopupIndex == 1) {
        SelectItem.splice(delPopupIndex, 1);
      }
      this.jointableTotallist = this.jointableTotallist.filter(function (item) {
        return !item.ColumnName.includes(value.joinTable)
      });
    }

  }
  //values from the Reference table-column
  getAllColumnValuesFirst(reftablename, changeobject) {

    const getdata: IgetAllColumnValues = {
      TableName: reftablename,
      ColumnName: changeobject


    };

    this.builderService.getAllColumnValue(getdata).subscribe(
      (response) => {

        this.columnvaluelist = response;

      },
      error => {

      });
  }
  //values from the Reference table-column
  getAllColumnValues(changeobject) {
    // let SelectedIdex = null;
    const getdata: IgetAllColumnValues = {
      TableName: this.reftablename,
      ColumnName: changeobject
    };

    // this.SelectedItem.columnName = changeobject;
    this.builderService.getAllColumnValue(getdata).subscribe(
      (response) => {

        this.columnvaluelist = response;
        this.columnvaluelist[changeobject] = this.columnvaluelist;
      },
      error => {

      });

  }

  getdefaultValues() {
    let fieldInfo = this.helper.getValue('default');

    if (fieldInfo == '') {
      const getdata: IgetallDropdown = {


        ParentCode: ""

      };

      this.builderService.getAllDropdowndata(getdata).subscribe(
        (response) => {
          this.helper.setValue('default', response);
          //datatype
          this.defaulttypelist = response.filter(x => x.ParentCode === "DT01");

          //datatype
          this.defaultvaluelist = response.filter(x => x.ParentCode === "DV02");
         
          //Operator List for Lookup table
          this.reftablecondtnlist = response.filter(x => x.ParentCode === "RF03");
          this.reftableOperatorList = response.filter(x => x.ParentCode === "RF04");
          this.actionlist = response.filter(x => x.ParentCode === "AT04");


        },
        error => {
        });
    }
    else {

      this.defaulttypelist = fieldInfo.filter(x => x.ParentCode === "DT01");

      //datatype
      this.defaultvaluelist = fieldInfo.filter(x => x.ParentCode === "DV02");
 
      //Operator List for Lookup table
      this.reftablecondtnlist = fieldInfo.filter(x => x.ParentCode === "RF03");
      this.reftableOperatorList = fieldInfo.filter(x => x.ParentCode === "RF04");
      this.actionlist = fieldInfo.filter(x => x.ParentCode === "AT04");
    }


  }
  addValue(values) {
    values.push(this.value);
    this.value = { label: "", value: "" };
  }
  addLanguage(languageValues) {
    languageValues.push(this.languageValue)
    this.languageValue = { LanguageID: "", LanguageText: "", Placeholder: "" }
  }
  addRefCondition(conditionValues) {
    // this.conditionValue = { columnName: "", columnOperator: "", columnValue: "", colCondition: "" }
    this.conditionValue = new refCondtnValue();
    conditionValues.push(this.conditionValue)

  }
  addRefJoin(joinValues) {
    joinValues.push(this.joinValue)
    this.joinValue = { joinTable: "", firstValue: "", SecondValue: "" }
  }
  public saveClick() {
    if (this.SelectedItem.fieldName == "Dropdown" || this.SelectedItem.fieldName == "radio" || this.SelectedItem.fieldName == "checkbox" ||
      this.SelectedItem.fieldName == "MultiLine Text" || this.SelectedItem.fieldName == "Number" || this.SelectedItem.fieldName == "Text") {
      this.error = true;

    }
    else {
      
      this.SelectedItem.CascadedItem = [];
      if (this.SelectedItem["refCondition"] != undefined && this.SelectedItem["refCondition"] != null && this.SelectedItem["refCondition"] != "" && this.SelectedItem["refCondition"] != []) {
        this.CascadeValueName = this.SelectedItem["refCondition"].map(x => x.CascadeValue);
        if (this.CascadeValueName != undefined && this.CascadeValueName != null && this.CascadeValueName != "") {
          this.SelectedItem.CascadedItem.push(this.CascadeValueName);
        }
        this.SelectedItem.CascadeValue = this.SelectedItem.CascadedItem.length > 0 ? this.SelectedItem.CascadedItem.length : "";
      }
    
      this.SaveData.emit(this.SelectedItem);
    }
  }
}
