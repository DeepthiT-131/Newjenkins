import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import { HelperService } from '../helper/helper.service';
import { IgetAllTableDetails , IRole, IgetAllColumnValues, IgetallDropdown, Iget} from '../interfaces/ibuilder-creation';

import { languageValue, refCondtnValue, value, refJoinValue } from '../global.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-calculation-widget',
  templateUrl: './calculation-widget.component.html',
  styleUrls: ['./calculation-widget.component.css'],
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
export class CalculationWidgetComponent implements OnInit {
	checked: boolean = true;
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
	languagelist = [];
	jsondata = [];
	columnvaluelist = [];
	actionlist = [];
	intervallist=[];
	actionStatus: boolean = false;
	reftablename: any;
	menuActive: boolean;
	activeMenuId: string;


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
intervals="0";
	@Input() public SelectedItem;
	@Input() public CascadeValues;
	@Output() SaveCalc: EventEmitter < any > = new EventEmitter();
	constructor(public activeModal: NgbActiveModal, private builderService: BuildercreateServiceService, private helper: HelperService) {}


	ngOnInit() {

		this.getReftable();
		this.getdefaultValues();
		if (this.SelectedItem.hasOwnProperty("CalcArray")) {
			this.TabletargetBuilderTools=this.SelectedItem.CalcArray;
		}
		if (this.SelectedItem.hasOwnProperty("Intervals")) {
			this.intervals=this.SelectedItem.Intervals;
		}
		else{
		
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
			//this.cars1 = this.reports1;


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

	}


	
	SaveCalculation()
	{
		let calc=[];
		for (let i = 0; i < this.TabletargetBuilderTools.length; i++) {
			if(this.TabletargetBuilderTools[i].fieldType=="divSection")
			{
				if (this.TabletargetBuilderTools[i].children1) {
    
          
					for (let j = 0; j < this.TabletargetBuilderTools[i].children1.length ; j++) {
				   
					
					  calc.push(this.TabletargetBuilderTools[i].children1[j].fieldValue);
					}
				  }
				}
				
			}
			this.SelectedItem.CalcArray=this.TabletargetBuilderTools;
				 this.SelectedItem.Calculation=calc;
				if(this.intervals!="0")
				{
					this.SelectedItem.Intervals=this.intervals;
				}
				this.SaveCalc.emit(this.SelectedItem);
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
				  this.intervallist = response.filter(x => x.ParentCode === "Int12");
		
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
}


