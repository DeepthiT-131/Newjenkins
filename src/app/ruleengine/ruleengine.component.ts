import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import { HelperService } from '../helper/helper.service';
import { IgetAllTableDetails , IRole, IgetAllColumnValues, IgetallDropdown, Iget, IgetAllTableDetailsDB} from '../interfaces/ibuilder-creation';
import { SelectItem } from 'primeng/api';
import { isUndefined, isNull } from 'util';
import { languageValue, refCondtnValue, value, refJoinValue, columnValue } from '../global.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { CalculationWidgetComponent } from '../calculation-widget/calculation-widget.component';

@Component({
  selector: 'app-ruleengine',
  templateUrl: './ruleengine.component.html',
  styleUrls: ['./ruleengine.component.css']
})
export class RuleengineComponent implements OnInit {

  checked: boolean = true;
	table: string = 'val1';
	defaultvaluelist = [];
	defaulttypelist = [];
	defaultvaluelist1 = [];
	reftablelist = [];
	reports1: any = [];
	cars1 = [];
	cascadevaluearray = [];
	cascadevaluearray1 = [];
	reftablecondtnlist = [];
	reftableOperatorList = [];
	refcollist = [];
	jointablecollist = [];
	jointableTotallist: any;
	languagelist = [];
	jsondata = [];
	columnvaluelist = [];
	actionlist = [];
	intervallist=[];
	actionStatus: boolean = false;
	reftablename: any;
	menuActive: boolean;
	activeMenuId: string;
	popupdata: any = [];

	TabletargetBuilderTools = [

	];
	TableSourceBuilderTools = [
		
	];
	CalculationTools = [{
			"fieldName": 'Add',
			"fieldType": 'Calculate',
			"fieldValue": "+",
			"fieldIcon": 'fa fa-plus',
			"fieldstyle":'Secbgcolor'
		},
		{
			"fieldName": 'Subtract',
			"fieldType": 'Calculate',
			"fieldValue": "-",
			"fieldIcon": 'fa fa-minus',
			"fieldstyle":'Secbgcolor'
		},
		{
			"fieldName": 'Multiplication',
			"fieldType": 'Calculate',
			"fieldValue": "*",
			"fieldIcon": 'fa fa-times',
			"fieldstyle":'Secbgcolor'
		},
		{
			"fieldName": 'Division',
			"fieldType": 'Calculate',
			"fieldValue": "/",
			"fieldIcon": 'fa fa-percent',
			"fieldstyle":'Secbgcolor'
		},
		{
			"fieldName": 'Sum',
			"fieldType": 'Calculate',
			"fieldValue": "Sum",
			"fieldIcon": 'sum',
			"fieldstyle":'Secbgcolor'
		},
		{
			"fieldName": 'Average',
			"fieldType": 'Calculate',
			"fieldValue": "Avg",
			"fieldIcon": 'average',
			"fieldstyle":'Primarybgcolor'
		},
		{
			"fieldName": 'Max',
			"fieldType": 'Calculate',
			"fieldValue": "max",
			"fieldIcon": 'max',
			"fieldstyle":'Primarybgcolor'
		},
		{
			"fieldName": 'Min',
			"fieldType": 'Calculate',
			"fieldValue": "min",
			"fieldIcon": 'min',
			"fieldstyle":'Primarybgcolor'
		},
		{
			"fieldName": 'Power',
			"fieldType": 'Calculate',
			"fieldValue": "^",
			"fieldIcon": 'fa fa-chevron-up',
			"fieldstyle":'Primarybgcolor'
		},
		{
			"fieldName": 'Equalto',
			"fieldType": 'Calculate',
			"fieldValue": "=",
			"fieldIcon": 'fas fa-equals',
			"fieldstyle":'Commonbgcolor'
		},
		
		{
			"fieldName": 'Open',
			"fieldType": 'Calculate',
			"fieldValue": "(",
			"fieldIcon": 'fa fa-chevron-left',
			"fieldstyle":'Commonbgcolor'
		},
		{
			"fieldName": 'Close',
			"fieldType": 'Calculate',
			"fieldValue": ")",
			"fieldIcon": 'fa fa-chevron-right',
			"fieldstyle":'Commonbgcolor'
    },
    {
			"fieldName": 'If',
			"fieldType": 'Condition',
			"fieldValue": "If",
			"fieldIcon": 'fa fa-chevron-right',
			"fieldstyle":'ruleengine'
    },
    {
			"fieldName": 'Else',
			"fieldType": 'Condition',
			"fieldValue": "Else",
			"fieldIcon": 'fa fa-chevron-right',
			"fieldstyle":'ruleengine'
    },
    {
			"fieldName": 'Hide',
			"fieldType": 'Calculate',
			"fieldValue": "(Hide)",
			"fieldIcon": 'fa fa-chevron-right',
			"fieldstyle":'ruleengine'
    },
    {
			"fieldName": 'Show',
			"fieldType": 'Calculate',
			"fieldValue": "(Show)",
			"fieldIcon": 'fa fa-chevron-right',
			"fieldstyle":'ruleengine'
    },
    {
			"fieldName": 'Skip Logic',
			"fieldType": 'Calculate',
			"fieldValue": "Skip Logic",
			"fieldIcon": 'fa fa-chevron-right',
			"fieldstyle":'ruleengine'
    },
    {
			"fieldName": 'Data Trigger',
			"fieldType": 'Datatrigger',
			"fieldValue": "Data Trigger",
			"fieldIcon": 'fa fa-chevron-right',
			"fieldstyle":'ruleengine'
		},
];
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
	columns: columnValue = {
		column1: "",
		column2: "",
		
	};
	joinValue: refJoinValue = {
		joinTable: "",
		firstValue: "",
		SecondValue: "",
	};
	reports: any = [];
	roledetails = [];
	selectedCars1: string[] = [];
	selectedArray: any;
	getcascadevalues: any;
	editId: number;
	fcode: string;
	loginInfo: any;
	cars = [];
	array = [];
	WhereCondition=[
	];
	ColumnCondition=[];
intervals="0";
DBUpdated = [];
	@Input() public SelectedItem;
	@Input() public CascadeValues;
	@Input() public DbData;
	@Output() SaveCalc: EventEmitter < any > = new EventEmitter();
	constructor(public modalService: NgbModal,public activeModal: NgbActiveModal, private builderService: BuildercreateServiceService, private helper: HelperService) {
		
	}


	ngOnInit() {

		this.getReftable();
		this.getdefaultValues();
		this.getRefDB();
		this.getReftableNames(name);
		this.getAllTablecolumnValues(this.reftablename);
		// if (!isUndefined(this.SelectedItem.refTable)) {
		// 	if (this.SelectedItem.refTable != "") {
		// 	  this.getAllTablecolumnValues(this.SelectedItem.refTable);
		// 	}
	  
		//   }
		// if (!isUndefined(this.SelectedItem.refTable)) {
		// 	if (this.SelectedItem.refTable != "") {
		// 	  this.getAllTablecolumnValues(this.SelectedItem.refTable);
		// 	}
	  
		//   }
	
		// if (this.SelectedItem.hasOwnProperty("CalcArray")) {
		// 	this.TabletargetBuilderTools=this.SelectedItem.CalcArray;
		// }
		// if (this.SelectedItem.hasOwnProperty("Intervals")) {
		// 	this.intervals=this.SelectedItem.Intervals;
		// }
		// else{
		
		// }
	}
	getRefDB() {

		this.builderService.GetAllDB().subscribe(
		  (response) => {
	
			this.DbData = response;
		
		  })
	
	  }
	  getReftableNames(dbname) {


		const getdata: IgetAllTableDetailsDB = {
	
		  DBName: dbname != isNull ? dbname : ""
	
		};
	
		this.builderService.GetAllTablesDB(getdata).subscribe(
		  (response) => {
	
			this.cars = response;
		
			// this.reftablelist = response;
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
	builderDrag(e: any) {
	// e.value.fieldId = e.value.fieldName + '_' + new Date().getTime();
}
	
	getReftable() {
		this.CascadeValues.forEach(element => {
			let reportdata1 = {
				fieldName: element.Label,
				fieldValue: element.value,
				fieldId: element.fieldId,
				fieldType: "column"
			}
			this.TableSourceBuilderTools.push(reportdata1);
			this.cascadevaluearray = this.TableSourceBuilderTools;
			this.cascadevaluearray1 = this.TableSourceBuilderTools;

			//this.helper.setValue('reftablelist', this.reftablelist);

		})

		let reportdata1 = {
			fieldName: 'Div',
			"children1": [] as any[],
			fieldType: "divSection"
		}

		let reportdata2 = {
			fieldName: 'Text',
			fieldValue: "0",
			fieldType: "TextBox"
		}
		this.TableSourceBuilderTools.push(reportdata1);
		this.TableSourceBuilderTools.push(reportdata2);
		this.defaultvaluelist1.push(reportdata1);

	}


	getAllTablecolumnValues(changeobject) {

		this.reftablename = changeobject;
		const getdata: IgetAllTableDetails = {
			TableName: changeobject
		};
		
		this.builderService.getAllTable(getdata).subscribe(
			(response) => {
				this.refcollist = response;
			
			},
			error => {

			});
	}
		  
addRefCondition(conditionValues) {                                                               
			conditionValues.push(this.conditionValue)
			this.conditionValue = { columnName: "", columnOperator: "", columnValue: "", colCondition: "" }
		  }	 
	
addcolumn(columns) {                                                               
	columns.push(this.columns)
			this.columns = { column1: "", column2: ""}
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
				
				  this.defaultvaluelist.forEach(element => {
					let defaultvalues = {
						fieldName: element.CodeName,
						fieldValue: element.Code,
						fieldId: element.CodeID,
						fieldType: element.ParentCode,
						
						
					}
					this.defaultvaluelist1.push(defaultvalues);
		
					//this.cars1 = this.reports1;
		
		
					//this.helper.setValue('reftablelist', this.reftablelist);
		
				})
				  //Operator List for Lookup table
				  this.reftablecondtnlist = response.filter(x => x.ParentCode === "RF03");
				  this.reftableOperatorList = response.filter(x => x.ParentCode === "RF04");
				  this.actionlist = response.filter(x => x.ParentCode === "AT04");
				  this.intervallist = response.filter(x => x.ParentCode === "Int12");
		
				},
				error => {
				});
			}
			else {
		   
			  this.defaulttypelist = fieldInfo.filter(x => x.ParentCode === "DT01");
			 
			  //datatype
			  this.defaultvaluelist = fieldInfo.filter(x => x.ParentCode === "DV02");
		
			  this.defaultvaluelist.forEach(element => {
				let defaultvalues = {
					fieldName: element.CodeName,
					fieldValue: element.Code,
					fieldId: element.CodeID,
					fieldType: element.ParentCode,
					
					
			
				}
				this.defaultvaluelist1.push(defaultvalues);
		
				//this.cars1 = this.reports1;
	
	
				//this.helper.setValue('reftablelist', this.reftablelist);
	
			})

			  //Operator List for Lookup table
			  this.reftablecondtnlist = fieldInfo.filter(x => x.ParentCode === "RF03");
			  this.reftableOperatorList = fieldInfo.filter(x => x.ParentCode === "RF04");
			  this.actionlist = fieldInfo.filter(x => x.ParentCode === "AT04");
			  this.intervallist = fieldInfo.filter(x => x.ParentCode === "Int12");
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
  Opencalculator(){
	// this.SelectedItem = item;
    const modalRef = this.modalService.open(CalculationWidgetComponent, { size: 'xl' });
    modalRef.componentInstance.SelectedItem = this.SelectedItem;
    modalRef.componentInstance.CascadeValues = this.popupdata;
  }
}
