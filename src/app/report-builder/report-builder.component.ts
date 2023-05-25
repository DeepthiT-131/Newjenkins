import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import { HelperService } from '../helper/helper.service';
import { IgetAllTableDetails, IRole, IgetAllColumnValues, IgetallDropdown, Iget, IReportbuilderCreation, IgetJsonData, IgetAllTableDetailsDB } from '../interfaces/ibuilder-creation';
import { SelectItem } from 'primeng/api';
import { isUndefined, isNullOrUndefined, isNull } from 'util';
import { languageValue, refCondtnValue, value, refJoinValueRB } from '../global.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CalculationWidgetComponent } from '../calculation-widget/calculation-widget.component';
import { Iconfig } from '../interfaces/iloginconfig';
import { LoginconfigService } from '../services/loginconfig.service';
import { CalculatorforRBComponent } from '../calculatorfor-rb/calculatorfor-rb.component';
import Swal from 'sweetalert2';
import { ToasterService } from '../helper/toaster.service';
import { Router } from '@angular/router';
import { FormDetailsService } from '../services/form-details.service';
import { ReportfilterpopupComponent } from '../reportfilterpopup/reportfilterpopup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from '../helper/no-whitespace.validator';

@Component({
  selector: 'app-report-builder',
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.css'],
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
export class ReportBuilderComponent implements OnInit {
  CalenderForm: FormGroup;
  checked: boolean = true;
  FilterType = "Range"
  modalReference: NgbModalRef;
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };

  theme: any = {
    PrimaryBgColor: " #1d1d85",
    SecondaryBgColor: "#f5901f",
    PrimaryTextColor: "#FFF",
    SecondaryTextColor: "#FFF",
    FooterText: "Enter Footer Text",
    ActiveColor: "#f5901f",
    NavBar: "topwithbuttons"
  };
  table: string = 'val1';
  defaultvaluelist = [];
  defaulttypelist = [];
  reftablelist = [];
  reports1: any = [];
  cars1 = [];
  reftablecondtnlist = [];
  reftableOperatorList = [];
  refcollist = [];
  jointablecollist = [];
  jointableTotallist: any;
  Jointable = [];
  joinColumn = [];
  languagelist = [];
  jsondata: any;
  columnvaluelist = [];
  actionlist = [];
  actionStatus: boolean = false;
  reftablename: any;
  menuActive: boolean;
  activeMenuId: string;
  selectedItem: any;
  getthemeconfigdetails: any;
  themecolor: any;
  MasterTable: any;
  MasterTableKanbana: any;
  TabletargetBuilderTools = [];
  JoinArray = [];
  WhereCondition = [];
  JoinArrayKanbana = [];
  WhereConditionKanbana = [];
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
  joinValue: refJoinValueRB = {
    joinTable1: "",
    firstValue: "",
    joinTable2: "",
    SecondValue: "",
  };
  reports: any = [];
  roledetails = [];
  selectedCars1: string[] = [];
  selectedTables: string[] = [];
  selectedArray: any;
  getcascadevalues: any;
  editId: number;
  fcode: string;
  loginInfo: any;
  cars = [];
  roles = [];
  DbData = [];
  DBUpdated = [];
  selectedDB: string[] = [];
  array = [];
  popupdata: any = [];
  reportdata1: any;
  reportdata2: any;
  defaultService: any;
  selectedCars = [];
  selectedKanbana = [];
  selectedCalendar = [];
  calendarObject = [];
  draggedCar = [];
  draggedKan = [];
  draggedCal = [];
  reportDetails: any;
  Condition = [];
  eventArray: any = {};
  // SelectedItem = [];
  reportBoolean: boolean = false;
  calenderBoolean: boolean = false;
  kanbanaBoolean: boolean = false;
  // calender: string;
  kanbana: string;
  LanguageID: any;
  isVisible: boolean = true;
  selectedvalue: string = "report"
  submitted = false;
  @Input() public SelectedItem;
  @Input() public CascadeValues;
  @Output() SaveData: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private loginconfigservice: LoginconfigService, public modalService: NgbModal, private router: Router,
    public activeModal: NgbActiveModal, private builderService: BuildercreateServiceService,
    private helper: HelperService, private toaster: ToasterService, private formdetailservice: FormDetailsService) { }


  ngOnInit() {
    this.loginInfo = this.helper.getValue('LoginInfo');
    this.defaultService = this.helper.getValue('LoginInfo')
    this.LanguageID = this.helper.getValue('LanguageID');
    if (this.defaultService) {
      this.theme = this.helper.getValue('Theme');
      if (this.theme) {

        this.setTheme(this.theme)
      }
      else {

        this.getthemeconfigsetting();
      }

    }
    this.getRefDB();
    this.getReftable(isNull);
    this.getdefaultValues();
    this.getrestrictedroles();
    this.formdetailservice.formcode.subscribe(data =>
      this.reportDetails = data
    );


    if (this.reportDetails.ModuleURL != "") {
      this.getReportBuilder();
    }
    else {
      this.router.navigate(['/theme/report']);
    }
    this.CalenderForm = this.formBuilder.group({
      // Eventname: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      URL: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Startdate: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Starttime: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Enddate: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Endtime: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],



    });
  }
  get calender() { return this.CalenderForm.controls; }
  @Input()
  set items(names) {
    this.refcollist = names;

  }
  get items() {
    return this.refcollist;
  }
  @Input()
  set tablejoin(jointbl) {
    this.Jointable = jointbl;
  }
  get tablejoin() {
    return this.Jointable;
  }
  @Input()
  set columnjoin(joinCol) {

    this.joinColumn = joinCol;
  }
  get columnjoin() {
    return this.joinColumn;
  }
  @Input()
  set isshow(show: boolean) {
    this.isVisible = show;
  }
  get isshow() {
    return this.isVisible;
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
  dragStart(event, car) {
    this.draggedCar = car;
  }
  dragStart1(event, car) {
    this.draggedKan = car;
  }
  dragStart2(event, car) {
    this.draggedCal = car;
  }

  drop(event) {
    if (this.draggedCar) {
      this.selectedCars = [...this.selectedCars, this.draggedCar];
      this.draggedCar = null;
    }
  }

  drop1(event) {
    if (this.draggedKan) {
      this.selectedKanbana = [...this.selectedKanbana, this.draggedKan];
      this.draggedKan = null;
    }
  }
  drop2(event) {
    if (this.draggedCal) {
      this.selectedCalendar = [...this.selectedCalendar, this.draggedCal];

      this.draggedCal = null;
    }
  }

  dragEnd(event) {
    this.draggedCar = null;
  }
  dragEnd1(event) {
    this.draggedKan = null;
  }
  dragEnd2(event) {
    this.draggedCal = null;
  }


  addRefCondition(conditionValues) {
    conditionValues.push(this.conditionValue)
    this.conditionValue = { columnName: "", columnOperator: "", columnValue: "", colCondition: "" }
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
  getReftable(dbname) {


    const getdata: IgetAllTableDetailsDB = {

      DBName: dbname != isNull ? dbname : ""

    };

    this.builderService.GetAllTablesDB(getdata).subscribe(
      (response) => {

        this.cars = response;

        this.reports = [];
        this.cars.forEach(element => {
          let reportdata = {
            value: element.TableName,
            label: element.TableName
          }
          this.reports.push(reportdata);
          this.cars1 = this.reports;



        },
          error => {

          });
      })

  }
  getRefDB() {

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
  getAllTablecolumnValues(changeobject) {
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
          "kanbana": false,
          "calendar": false,
          "Hide": false,
          "Link": "",
          "SOP": ""

        },

      ],

    }

    this.refcollist.push(reportdata);

    this.reftablename = changeobject;
    const getdata: IgetAllTableDetails = {
      TableName: changeobject

    };

    this.builderService.getAllColumneachTable(getdata).subscribe(
      (response) => {

        this.refcollist = response;
        this.refcollist.push(reportdata);


        for (let i = 0; i < this.refcollist.length; i++) {
          if (this.refcollist[i].fieldType == "Table") {
            let reportdata = {
              Label: this.refcollist[i].fieldName,
              value: this.refcollist[i].fieldName
            };
            this.Jointable.push(reportdata);
            this.reftablelist = this.Jointable;

            for (let j = 0; j < this.refcollist[i].children.length; j++) {
              this.joinColumn.push(this.refcollist[i].children[j]);

            }

          }
        }



      },
      error => {

      });
  }

  getReportBuilder() {

    const getdata: IgetJsonData = {
      FormCode: this.reportDetails.ModuleURL,
      ActionId: ""
    };
    this.builderService.getreportbuilderData(getdata).subscribe(
      (response) => {

        if (response[0].JsonDataRB != null) {
          this.jsondata = JSON.parse(response[0].JsonDataRB);

          this.selectedCars = this.jsondata.TableCondition;
          this.selectedKanbana = this.jsondata.KanbanaCondition;
          this.selectedCalendar = this.jsondata.CalendarCondition;
          this.JoinArray = this.jsondata.JoinArray;
          this.WhereCondition = this.jsondata.WhereArray;
          this.selectedCars1 = this.jsondata.DropdownValues;
          this.selectedDB = this.jsondata.DBValues;
          this.MasterTable = this.jsondata.MasterTable;
          this.JoinArrayKanbana = this.jsondata.JoinArrayKanbana;
          this.WhereConditionKanbana = this.jsondata.WhereConditionKanbana;
          this.MasterTableKanbana = this.jsondata.MasterTableKanbana;
          this.reportBoolean = this.jsondata.FormReport;
          this.kanbanaBoolean = this.jsondata.FormKanbana;
          this.calenderBoolean = this.jsondata.FormCalendar;

          if (this.jsondata.CalendarArray != undefined && this.jsondata.CalendarArray != null && this.jsondata.CalendarArray != "") {
            if (this.jsondata.CalendarArray.length > 0) {
              this.calender.URL.setValue(this.jsondata.CalendarArray[0].URL);
              this.calender.Startdate.setValue(this.jsondata.CalendarArray[0].Startdate);
              this.calender.Enddate.setValue(this.jsondata.CalendarArray[0].Enddate);
              this.calender.Starttime.setValue(this.jsondata.CalendarArray[0].Starttime);
              this.calender.Endtime.setValue(this.jsondata.CalendarArray[0].Endtime);
            }
          }

          let stringArray = this.selectedCars1.toString();
          if (!isNullOrUndefined(this.jsondata.MasterTable)) {
            if (this.jsondata.MasterTable != "") {
              this.getAllTablecolumnValues(stringArray);
            }

            this.jsondata.WhereArray.forEach(item => {
              if (item.columnName != "") {
                var table = item.columnName.lastIndexOf('.');
                var tablename = item.columnName.substring(0, table);;

                this.getAllColumnValuesFirst(tablename, item.columnName)
              }
            });
          }


        }
      },
      error => {
        this.toaster.error("Some error Occurred")

      });
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

  addRefJoin(joinValues) {

    joinValues.push(this.joinValue)
    this.joinValue = { joinTable1: "", firstValue: "", joinTable2: "", SecondValue: "" }
  }

  OpenCalculator(item) {
    this.SelectedItem = item;

    const initialState = {

      title: item
    };
    const modalRef = this.modalService.open(CalculatorforRBComponent, { size: 'xl' });
    modalRef.componentInstance.SelectedItem = this.SelectedItem;
    modalRef.componentInstance.CascadeValues = this.refcollist;
    modalRef.componentInstance.SaveCalc.subscribe((receivedEntry) => {



      //this.CalculatedValue(receivedEntry.Calculation,receivedEntry.columnID)

      modalRef.close();
    })


  }

  getthemeconfigsetting() {
    const themeconfigdata: Iconfig = {
      TenantId: 1,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    };

    this.loginconfigservice.GetThemeConfigdetails(themeconfigdata).subscribe(
      (response) => {

        this.getthemeconfigdetails = response[0];
        this.theme = response[0];
        this.themecolor = response[0].Theme;
        this.setTheme(this.theme);
        this.theme.NavBar = response[0].NavBar;



      },
      error => {
        // this.toaster.error("Some error occurred.Please try again", "Error");

      });


  }


  private setTheme(theme: {}) {

    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }

  public saveClick() {

    let calc = [];

    let stringArray = this.selectedCars1.toString();

    this.getAllTablecolumnValues(stringArray);


  }
  public getTablefromDB() {

    let dbArray = this.selectedDB.toString();

    this.getReftable(dbArray);
  }
  getAllColumnValues(changeobject) {
    var table = changeobject.lastIndexOf('.');


    const getdata: IgetAllColumnValues = {
      TableName: changeobject.substring(0, table),
      ColumnName: changeobject.substring(table + 1)


    };

    this.builderService.getAllColumnValue(getdata).subscribe(
      (response) => {

        this.columnvaluelist = response;

      },
      error => {

      });
  }
  removeJson(valueIndex, deletedvalue) {

    Swal.fire({
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
  onSubmit(CalenderForm) {

    this.calendarObject.push(CalenderForm);


    this.SaveJson(this.calendarObject)
  }
  SaveJson(calendarObject?) {

    if (calendarObject != undefined && calendarObject != null && calendarObject != "") {
      this.calendarObject = calendarObject;
    }
    else if (this.jsondata != undefined && this.jsondata != null && this.jsondata != "") {
      if (this.jsondata.CalendarArray != undefined && this.jsondata.CalendarArray != null && this.jsondata.CalendarArray != "") {
        if (this.jsondata.CalendarArray.length > 0) {
          if (this.jsondata.CalendarArray[0].Startdate != undefined && this.jsondata.CalendarArray[0].Startdate != null && this.jsondata.CalendarArray[0].Startdate != "") {
            this.eventArray.URL = this.jsondata.CalendarArray[0].URL;
            this.eventArray.Startdate = this.jsondata.CalendarArray[0].Startdate;
            this.eventArray.Enddate = this.jsondata.CalendarArray[0].Enddate;
            this.eventArray.Starttime = this.jsondata.CalendarArray[0].Starttime;
            this.eventArray.Endtime = this.jsondata.CalendarArray[0].Endtime;
          }
          this.calendarObject.push(this.eventArray);
        }
      }
    }
    else {
      this.calendarObject.push([]);
    }


    if (this.selectedCalendar != undefined && this.selectedCalendar != null) {
      for (let i = 0; i < this.selectedCalendar.length; i++) {
        this.selectedCalendar[i].displayID = i + 1;
      }

    }

    if (this.selectedCars != undefined && this.selectedCars != null) {
      for (let i = 0; i < this.selectedCars.length; i++) {
        this.selectedCars[i].displayID = i + 1;
      }
    }

    if (this.selectedKanbana != undefined && this.selectedKanbana != null) {
      for (let i = 0; i < this.selectedKanbana.length; i++) {
        this.selectedKanbana[i].displayID = i + 1;
      }
    }

    let joinCondition = "From " + this.MasterTable;
    let whereCondtn = "Where"
    if (this.JoinArray != undefined && this.JoinArray != null) {
      for (let i = 0; i < this.JoinArray.length; i++) {
        joinCondition += " left join " + this.JoinArray[i].joinTable1 + " on " + this.JoinArray[i].firstValue + " = " + this.JoinArray[i].SecondValue;
      }
    }
    if (this.WhereCondition != undefined && this.WhereCondition != null) {
      for (let i = 0; i < this.WhereCondition.length; i++) {

        whereCondtn += " " + this.WhereCondition[i].columnName + " " + this.WhereCondition[i].colCondition + "'" + this.WhereCondition[i].columnValue + "' " + this.WhereCondition[i].columnOperator
      }
    }
    let joinConditionKanbana = "From " + this.MasterTableKanbana;
    let whereCondtnKanbana = "Where"
    if (this.JoinArrayKanbana != undefined && this.JoinArrayKanbana != null) {
      for (let i = 0; i < this.JoinArrayKanbana.length; i++) {
        joinConditionKanbana += " left join " + this.JoinArrayKanbana[i].joinTable1 + " on " + this.JoinArrayKanbana[i].firstValue + " = " + this.JoinArrayKanbana[i].SecondValue;
      }
    }
    if (this.WhereConditionKanbana != undefined && this.WhereConditionKanbana != null) {
      for (let i = 0; i < this.WhereConditionKanbana.length; i++) {

        whereCondtnKanbana += " " + this.WhereConditionKanbana[i].columnName + " " + this.WhereConditionKanbana[i].colCondition + "'" + this.WhereConditionKanbana[i].columnValue + "' " + this.WhereConditionKanbana[i].columnOperator
      }
    }

    const getdata: IReportbuilderCreation = {
      FormCode: this.reportDetails.ModuleURL,
      TenantId: this.defaultService.TenantId,
      LanguageId: this.defaultService.LanguageId,
      CreatedBy: this.defaultService.UserId,
      TableCondition: this.selectedCars,
      KanbanaCondition: this.selectedKanbana,
      CalendarCondition: this.selectedCalendar,
      // CalendarArray: this.calendarObject[0].Startdate == undefined ? [] : this.calendarObject,
      CalendarArray: this.calendarObject,
      DBValues: this.selectedDB,
      DropdownValues: this.selectedCars1,
      JoinCondn: joinCondition,
      WhereCondn: whereCondtn,
      MasterTable: this.MasterTable,
      JoinArray: this.JoinArray,
      WhereArray: this.WhereCondition,
      FormReport: this.reportBoolean,
      FormCalendar: this.calenderBoolean,
      FormKanbana: this.kanbanaBoolean,
      joinConditionKanbana: joinConditionKanbana,
      whereCondtnKanbana: whereCondtnKanbana,
      MasterTableKanbana: this.MasterTableKanbana
    };



    this.builderService.savereportbuilderData(getdata).subscribe(
      (response) => {

        this.toaster.success("Data Added Successfully");
      },
      error => {
        this.toaster.error("Some error Occurred while Inserting/Updating.");

      });
  }
  OnFilterPopup(SelectedValue) {
    const modalRef = this.modalService.open(ReportfilterpopupComponent, { size: 'xl' });
    modalRef.componentInstance.SelectedItem = SelectedValue;
  }
  openModal(content) {


    // this.submitted = false;
    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
  }
  RestrictedRolesPopup(car, restrictedroles) {
    // this.modalReference = this.modalService.open(restrictedroles, this.ngbModalOptions);
    this.openModal(restrictedroles)
  }

  OnchangeFilter(values: any, SelectedValue) {

    if (values.currentTarget.checked) {
      if (SelectedValue.hasOwnProperty("Filertype")) {

      }
      else {

        SelectedValue.filtertype = "Range"
        SelectedValue.Rangetype = "Date"
        SelectedValue.refTable = ""
        SelectedValue.refLabel = ""
        SelectedValue.refValue = ""
        SelectedValue.refCondition = [
          {
            "columnName": "",
            "columnOperator": "",
            "columnValue": "",
            "colCondition": ""
          },
        ]
      }
    }
    SelectedValue.Filter = values.currentTarget.checked;



    this.OnFilterPopup(SelectedValue)
  }
  initResponse() {

    this.router.navigate(['/theme/report']);
  }
  HandleChange(e, condition) {

    if (condition == 'report') {

      this.reportBoolean = true;
      this.calenderBoolean = false;
      this.kanbanaBoolean = false;
    }
    if (condition == 'calender') {

      this.reportBoolean = false;
      this.calenderBoolean = true;
      this.kanbanaBoolean = false;
    }
    if (condition == 'kanbana') {

      this.reportBoolean = false;
      this.calenderBoolean = false;
      this.kanbanaBoolean = true;
    }
  }
  setradio(e: string): void {

    this.selectedvalue = e;

  }
  isSelected(name: string): boolean {

    if (!this.selectedvalue) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedvalue === name); // if current radio button is selected, return true, else return false  
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
          this.roles = this.reports;

        },
          error => {
            //this.dtTrigger.next();
          });
      })
  }
}



