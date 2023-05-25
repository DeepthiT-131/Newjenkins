import { Component, OnInit, Input } from '@angular/core';
import { refCondtnValue, refJoinValueRB } from '../global.model';
import { IgetAllTableDetails, IgetAllColumnValues, IgetallDropdown, IgetAllTableDetailsDB } from '../interfaces/ibuilder-creation';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import { HelperService } from '../helper/helper.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { isNullOrUndefined, isNull } from 'util';

@Component({
  selector: 'app-reportfilterpopup',
  templateUrl: './reportfilterpopup.component.html',
  styleUrls: ['./reportfilterpopup.component.css']
})
export class ReportfilterpopupComponent implements OnInit {
  conditionValue: refCondtnValue = {
    columnName: "",
    columnOperator: "",
    columnValue: "",
    colCondition: ""
  };
  joinValue: refJoinValueRB = {
    joinTable1: "",
    firstValue: "",
    joinTable2: "",
    SecondValue: "",
  };
  JoinArray = [

  ]
  WhereCondition = [

  ]
  MasterTable: any;
  reftablecondtnlist = [];
  reftableOperatorList = [];
  refcollist = [];
  jointablecollist = [];
  jointableTotallist: any;
  Jointable = [];
  joinColumn = [];
  reftablename: any;
  selectedCars1: string[] = [];
  selectedTables: string[] = [];
  selectedArray: any;
  columnvaluelist = [];
  defaultvaluelist = [];
  defaulttypelist = [];
  reftablelist = [];
  actionlist = [];
  DbData = [];
  DBUpdated = [];
  reports: any = [];
  @Input() public SelectedItem;
  constructor(private builderService: BuildercreateServiceService, private helper: HelperService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  
    this.getRefDB();
    this.getReftable(isNull);
    this.getdefaultValues();

    if (!isNullOrUndefined(this.SelectedItem.refTable)) {
      if (this.SelectedItem.refTable != "") {
        this.getAllTablecolumnValues(this.SelectedItem.refTable);
      }

      this.SelectedItem["refCondition"].forEach(item => {
        if (item.columnName != "") {
          this.getAllColumnValuesFirst(this.SelectedItem.refTable, item.columnName)
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
  addRefCondition(conditionValues) {
    conditionValues.push(this.conditionValue)
    this.conditionValue = { columnName: "", columnOperator: "", columnValue: "", colCondition: "" }
  }

  addRefJoin(joinValues) {
    joinValues.push(this.joinValue)
    this.joinValue = { joinTable1: "", firstValue: "", joinTable2: "", SecondValue: "" }
  }
  public getTablefromDB(dbArray) {

    let dbArray1 = dbArray.toString();

    this.getReftable(dbArray1);



  }

  getReftable(dbname) {


    const getdata: IgetAllTableDetailsDB = {

      DBName: dbname != isNull ? dbname : ""

    };

    this.builderService.GetAllTablesDB(getdata).subscribe(
      (response) => {



        this.reftablelist = response;
        this.helper.setValue('reftablelist', this.reftablelist);

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
  saveClick() {

    let whereCondtn = "Where"
    for (let i = 0; i < this.SelectedItem.refCondition.length; i++) {

      whereCondtn += " " + this.SelectedItem.refCondition[i].columnName + " " +
        this.SelectedItem.refCondition[i].colCondition + "'" + this.SelectedItem.refCondition[i].columnValue + "' " + this.SelectedItem.refCondition[i].columnOperator
    }
    this.SelectedItem.WhereCondn = whereCondtn;

    this.activeModal.close();
  }
}
