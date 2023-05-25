import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { languageValue, refCondtnValue, refJoinValue } from '../global.model';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import { HelperService } from '../helper/helper.service';
import { IgetAllTableDetails, IgetAllColumnValues, IgetallDropdown, IgetAllTableDetailsDB } from '../interfaces/ibuilder-creation';
import { isNull } from 'util';

@Component({
  selector: 'app-table-popup',
  templateUrl: './table-popup.component.html',
  styleUrls: ['./table-popup.component.css']
})
export class TablePopupComponent implements OnInit {
  reftablecondtnlist = [];
  reftableOperatorList = [];
  refcollist = [];
  jointablecollist = [];
  jointableTotallist: any;
  languagelist = [];
  reftablelist = [];
  reftablename: any;
  columnvaluelist = [];
  error = false;
  DbData = [];
  DBUpdated = [];
  reports: any = [];
  cars = [];
  cars1 = [];
  relationfieldList = [];
  @Input() public SelectedItem;
  @Input() public CascadeValues;
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
  constructor(public activeModal: NgbActiveModal, private builderService: BuildercreateServiceService,
    private helper: HelperService) { }

  ngOnInit() {
    this.getdefaultValues();
    // this.getReftable();
    this.getRefDB();
    this.getReftable(isNull);
    this.getRelationValues();
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

          //Operator List for Lookup table
          this.reftablecondtnlist = response.filter(x => x.ParentCode === "RF03");
          this.reftableOperatorList = response.filter(x => x.ParentCode === "RF04");



        },
        error => {
        });
    }
    else {


      //Operator List for Lookup table
      this.reftablecondtnlist = fieldInfo.filter(x => x.ParentCode === "RF03");
      this.reftableOperatorList = fieldInfo.filter(x => x.ParentCode === "RF04");

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

    let dbArray1 = dbArray.toString();

    this.getReftable(dbArray1);



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


        if (this.jointableTotallist) {
          this.jointableTotallist = response.concat(this.jointableTotallist);
        }
        else {
          this.jointableTotallist = response;
        }



      },
      error => {


      });
  }
  getJoinTable(changeobject) {

    this.reftablename = changeobject;
    const getdata: IgetAllTableDetails = {

      TableName: changeobject

    };
    this.builderService.getAllTable(getdata).subscribe(
      (response) => {
        this.jointablecollist = response;
        if (this.jointableTotallist) {
          this.jointableTotallist = response.concat(this.jointableTotallist);
        }
        else {
          this.jointableTotallist = response;
        }

      },
      error => {


      });
  }
  DeleteJoinItem(SelectItem, value) {
    if (value.joinTable != "") {
      const delPopupIndex = SelectItem.findIndex((todo) => todo.joinTable === value.joinTable)
      if (delPopupIndex != -1) {
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

    const getdata: IgetAllColumnValues = {
      TableName: this.reftablename,
      ColumnName: changeobject


    };

    this.builderService.getAllColumnValue(getdata).subscribe(
      (response) => {

        this.columnvaluelist = response;

      },
      error => {

      });
  }
  //Reference table for Lookup
  // getReftable() {
  //   let fieldInfo = this.helper.getValue('reftablelist');

  //   if (fieldInfo == '') {
  //     const getdata: IgetAllTableDetails = {

  //       TableName: ""

  //     };

  //     this.builderService.getAllTable(getdata).subscribe(
  //       (response) => {

  //         this.reftablelist = response;
  //         this.helper.setValue('reftablelist', this.reftablelist);
  //       },
  //       error => {
  //       });
  //   }
  //   else {

  //     this.reftablelist = fieldInfo
  //   }
  // }
  getReftable(dbname) {


    const getdata: IgetAllTableDetailsDB = {

      DBName: dbname != isNull ? dbname : ""

    };

    this.builderService.GetAllTablesDB(getdata).subscribe(
      (response) => {

        // this.cars = response;

        this.reftablelist = response;
        this.helper.setValue('reftablelist', this.reftablelist);
        this.reports = [];
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
  addLanguage(languageValues) {
    languageValues.push(this.languageValue)
    this.languageValue = { LanguageID: "", LanguageText: "", Placeholder: "" }
  }
  addRefCondition(conditionValues) {
    conditionValues.push(this.conditionValue)
    this.conditionValue = { columnName: "", columnOperator: "", columnValue: "", colCondition: "" }
  }
  addRefJoin(joinValues) {
    joinValues.push(this.joinValue)
    this.joinValue = { joinTable: "", firstValue: "", SecondValue: "" }
  }

}
