import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { triggerCondtnValue, triggersmsValue, triggerwhatsappValue, triggeralertgtValue } from '../global.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import { HelperService } from '../helper/helper.service';
import { IgetallDropdown } from '../interfaces/ibuilder-creation';

@Component({
  selector: 'app-triggerpage',
  templateUrl: './triggerpage.component.html',
  styleUrls: ['./triggerpage.component.css']
})
export class TriggerpageComponent implements OnInit {
  EmailBoolean: boolean = false;
  SmsBoolean: boolean = false;
  WhatsappBoolean: boolean = false;
  AlertBoolean: boolean = false;
  text: string;
  Email: boolean = false;
  Sms: boolean = false;
  Whatsapp: boolean = false;
  Alert: boolean = false;
  emailValue: triggerCondtnValue = {
    referColumn: false,
    Email: "",
    Text: "",
    Condition: "",
    Criteria: "",
    Subject: "",
  };
  smsValue: triggersmsValue = {
    referColumn: false,
    smsTextBox: "",
    smsTextarea: "",
    smsCondition: "",
    smsCriteria: "",
  };
  whatsappValue: triggerwhatsappValue = {
    referColumn: false,
    wtspTextBox: "",
    wtspTextarea: "",
    wtspCondition: "",
    wtspCriteria: "",
  };
  alertValue: triggeralertgtValue = {
    referColumn: false,
    alertText: "",
    alertCondition: "",
    alertCriteria: ""

  };
  emailArray = [];
  smsArray = [];
  whatsappArray = [];
  alertArray = [];

  TriggerBuilder = [
  ];
  reftableOperatorList = [];
  cascadereports: any = [];
  cascadedata = []
  @Input() public SelectedItem;
  @Input() public CascadeValues;
  constructor(public activeModal: NgbActiveModal, private builderService: BuildercreateServiceService,
    private helper: HelperService) { }

  ngOnInit() {
 
    this.CascadeValues.forEach(element => {
      let reportdata = {
        value: element.value,
        label: element.Label
      }
      this.cascadereports.push(reportdata);
      this.cascadedata = this.cascadereports;
    }),

      this.getdefaultValues();
    if ((this.SelectedItem.hasOwnProperty("alertValue")) || (this.SelectedItem.hasOwnProperty("smsValue"))
      || (this.SelectedItem.hasOwnProperty("whatsappValue")) || (this.SelectedItem.hasOwnProperty("emailValue"))) {
      if (this.SelectedItem.hasOwnProperty("emailValue")) {
        this.EmailBoolean = true;
        this.emailArray = this.SelectedItem.emailValue;
      }
      if (this.SelectedItem.hasOwnProperty("smsValue")) {
        this.SmsBoolean = true;
        this.smsArray = this.SelectedItem.smsValue;
      }
      if (this.SelectedItem.hasOwnProperty("whatsappValue")) {
        this.WhatsappBoolean = true;
        this.whatsappArray = this.SelectedItem.whatsappValue;
      }
      if (this.SelectedItem.hasOwnProperty("alertValue")) {
        this.AlertBoolean = true;
        this.alertArray = this.SelectedItem.alertValue;
      }
    }
    else {
      this.emailArray.push(this.emailValue);
      this.smsArray.push(this.smsValue);
      this.whatsappArray.push(this.whatsappValue);
      this.alertArray.push(this.alertValue);
    }


  }
  handleChange(e, condition) {

    if (condition == 'Email') {

      this.EmailBoolean = e.checked;
      this.SmsBoolean = false;
      this.WhatsappBoolean = false;
      this.AlertBoolean = false;

    }
    if (condition == 'Sms') {

      this.EmailBoolean = false;
      this.SmsBoolean = e.checked;
      this.WhatsappBoolean = false;
      this.AlertBoolean = false;
    }
    if (condition == 'Whatsapp') {
      this.EmailBoolean = false;
      this.SmsBoolean = false;
      this.WhatsappBoolean = e.checked;
      this.AlertBoolean = false;
    }
    if (condition == 'Alert') {

      this.EmailBoolean = false;
      this.SmsBoolean = false;
      this.WhatsappBoolean = false;
      this.AlertBoolean = e.checked;
    }
    //alert(e.checked)
  }
  OnArrowClick(condition) {
    if (condition == 'Email') {

      if (!this.Email)
        this.Email = true;
      this.EmailBoolean = true;
      this.SmsBoolean = false;
      this.WhatsappBoolean = false;
      this.AlertBoolean = false;

    }
    if (condition == 'Sms') {

      if (!this.Sms)
        this.Sms = true;
      this.EmailBoolean = false;
      this.SmsBoolean = true;
      this.WhatsappBoolean = false;
      this.AlertBoolean = false;
    }
    if (condition == 'Whatsapp') {
      if (!this.Whatsapp)
        this.Whatsapp = true;
      this.EmailBoolean = false;
      this.SmsBoolean = false;
      this.WhatsappBoolean = true;
      this.AlertBoolean = false;
    }
    if (condition == 'Alert') {
      if (!this.Alert)
        this.Alert = true;
      this.EmailBoolean = false;
      this.SmsBoolean = false;
      this.WhatsappBoolean = false;
      this.AlertBoolean = true;
    }

  }
  addRefCondition() {
    if (this.EmailBoolean == true) {
      this.emailValue = { referColumn: false, Email: "", Text: "", Subject: "", Condition: "" }
      this.emailArray.push(this.emailValue);
    }
    if (this.SmsBoolean == true) {
      this.smsValue = { referColumn: false, smsTextBox: "", smsTextarea: "", smsCondition: "" }
      this.smsArray.push(this.smsValue);
    }
    if (this.WhatsappBoolean == true) {
      this.whatsappValue = { referColumn: false, wtspTextBox: "", wtspTextarea: "", wtspCondition: "" }
      this.whatsappArray.push(this.whatsappValue);
    }
    if (this.AlertBoolean == true) {
      this.alertValue = { referColumn: false, alertText: "", alertCondition: "", alertCriteria: "" }
      this.alertArray.push(this.alertValue);
    }



  }

  deleteRow(index, condition) {
    if (this.EmailBoolean == true && this.emailArray.length > 1) {
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      this.emailArray.splice(index, 1);
    }
    if (this.SmsBoolean == true && this.smsArray.length > 1) {
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      this.smsArray.splice(index, 1);
    }
    if (this.WhatsappBoolean == true && this.whatsappArray.length > 1) {
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      this.whatsappArray.splice(index, 1);
    }
    if (this.AlertBoolean == true) {
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      this.alertArray.splice(index, 1);
    }
  }
  getdefaultValues() {

    const getdata: IgetallDropdown = {


      ParentCode: "CT06"

    };

    this.builderService.getAllDropdowndata(getdata).subscribe(
      (response) => {


        this.reftableOperatorList = response;



      },
      error => {
      });



  }
  SaveCommunication() {
 
    if (this.alertArray.length > 0) {
      if (this.alertArray[0].alertText != "") {
        this.SelectedItem.alertValue = this.alertArray;
      }

    }
    if (this.smsArray.length > 0) {
      if (this.smsArray[0].smsTextBox != "") {
        this.SelectedItem.smsValue = this.smsArray;
      }

    }
    if (this.emailArray.length > 0) {
      if (this.emailArray[0].Email != "") {
        this.SelectedItem.emailValue = this.emailArray;
      }
    }
    if (this.whatsappArray.length > 0) {
      if (this.whatsappArray[0].wtspTextBox != "") {
        this.SelectedItem.whatsappValue = this.whatsappArray;
      }
    }

    // for (let i = 0; i < this.alertArray.length; i++) {
    //   if(this.TabletargetBuilderTools[i].fieldType=="divSection")
    //   {
    //     if (this.TabletargetBuilderTools[i].children1) {


    //       for (let j = 0; j < this.TabletargetBuilderTools[i].children1.length ; j++) {


    //         calc.push(this.TabletargetBuilderTools[i].children1[j].fieldValue);
    //       }
    //       }
    //     }

    //   }
    //   this.SelectedItem.CalcArray=this.TabletargetBuilderTools;
    //   this.SaveCalc.emit(this.SelectedItem);
  }
}
