import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Dropdown } from 'src/app/helper/dropdown.validator';
import { NoWhitespaceValidator } from 'src/app/helper/no-whitespace.validator';
import { MustMatch } from 'src/app/helper/must-match.validators';

import { IGetuser, Icommon, IUser, IDeleteuser, IGetroleUser } from 'src/app/interfaces/iuser';
import { Icheck } from 'src/app/interfaces/ibuilder-creation';
import { Subject } from 'rxjs';
import { ToasterService } from '../helper/toaster.service';
import { DataTableDirective } from 'angular-datatables';
import { HelperService } from 'src/app/helper/helper.service';

import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { RoleService } from 'src/app/services/role.service';
import * as XLSX from 'xlsx';
import { languageValue } from 'src/app/global.model';
import { BuildercreateServiceService } from 'src/app/services/buildercreate-service.service';
import { IGetTenant, IDeleteTenant, IinsertTenant } from '../interfaces/itenant';
import { TenantService } from '../services/tenant.service';
declare var jsPDF: any;

@Component({
  selector: 'app-tenantdetails',
  templateUrl: './tenantdetails.component.html',
  styleUrls: ['./tenantdetails.component.css']
})
export class TenantdetailsComponent implements OnInit {
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  cities: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  CreatedBy: any;
  TenantForm: FormGroup;
  submitted: any;
  delUserid: number;
  usertitle: string;
  userHeader: string = 'Add User Details';
  userId = 0;
  companydetails: any;
  getRoleDetails: any;
  role: any;
  isEdit: boolean = false;
  CompanyData: any;
  deletevalue: any;
  TenantValue: any;
  Langvalue: any;
  error = '';
  loginInfo: any;
  CompanyID: any;
  TenantID: any;
  LanguageID: any;
  url: any;
  fileToUpload: any;
  fileExtension = ".jpg";
  fileExtensionError = false;
  photoName: any;
  allowedExtensions = [];
  fileExtensionMessage = "";
  filesize: any;
  pdfmessage: any;
  imagevisible = false;
  Attachment: any;
  SuperAdmin: boolean;
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
  columns: any[];
  exportColumns: any[];
  dataformat: any;
  cols: any[];
  first: number = 0;
  languagelist = [];
  languageValue: languageValue = {
    LanguageID: "",
    LanguageText: "",
    Placeholder: ""
  };
  reportDate = '_' + formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  @ViewChild('usermodal', { static: false }) myModal;
  @ViewChild('deletemodal', { static: false }) delModal;
  @ViewChild('htmlData', { static: false }) htmlData: ElementRef;

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  constructor(private builderService: BuildercreateServiceService, private formBuilder: FormBuilder, private tenantservice: TenantService, private roleservice: RoleService,
    private toaster: ToasterService, private helper: HelperService, private router: Router
  ) { }

  ngOnInit() {
    this.getLanguage();
    this.loginInfo = this.helper.getValue('LoginInfo');
    this.SuperAdmin = this.loginInfo.IsSuperAdmin,

     
    this.cols = [

      { field: 'CompanyName', header: 'Company Name' },
      { field: 'ContactName', header: 'Contact Name' },
      { field: 'emailid', header: 'Email ID' },
      { field: 'PhoneNumber', header: 'Contact Number' },
      { field: 'Address', header: 'Address' }
    ];

    this.TenantForm = this.formBuilder.group({
      Companyname: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Contactname: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Emailid: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      Address: ['', []],
      contact: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('[0-9]+'), NoWhitespaceValidator.cannotContainSpace]],
      
    });
    this.getAllCompanyDetails();
   

  }


  get user() { return this.TenantForm.controls; }
 
  showModal() {
    this.TenantForm.reset();
    this.myModal.show();
    this.CompanyID = 0;
  }


  deletecompany(value) {

    this.delModal.show();
    this.deletevalue = value;
  }

  delCompanyData() {

    const getcompany: IDeleteTenant = {
      CompanyID: this.deletevalue,


    };
    this.tenantservice.deletecompany(getcompany).subscribe(
      data => {

        this.getAllCompanyDetails();
        this.delModal.hide();
        this.toaster.success("User Deleted Successfully", "Success");
      },
      error => {
        this.error = error;
        this.toaster.error("Some error occured while deleting user.Please try after sometime", "Error");
      });
  }

  getAllCompanyDetails() {

    const common: IGetTenant = {
      CompanyID: 0
      

    };
     this.tenantservice.getAllcompanydetails(common).subscribe(
      (response) => {
        this.companydetails = response;
    
        this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
       },
      error => {

        this.toaster.error("Error while gettig user details", "Error!");
      });
  }
  onedit(CompanyID) {
    this.CompanyID = CompanyID;
    this.onuseredit();
  }
  onuseredit() {
    this.myModal.show();
    const lines: IGetTenant = {
      CompanyID: this.CompanyID
      
    };
    this.tenantservice.getAllcompanydetails(lines).subscribe(
      (response) => {
        this.CompanyData = response;
        this.user.Companyname.setValue(this.CompanyData[0].CompanyName);
        this.user.Contactname.setValue(this.CompanyData[0].ContactName);
        this.user.Emailid.setValue(this.CompanyData[0].EmailID);
        this.user.Address.setValue(this.CompanyData[0].Address1);
        this.user.contact.setValue(this.CompanyData[0].PhoneNumber);
         });

  }
  onSelectFile(event) {
    this.url = null;
    this.imagevisible = false;
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.photoName = file.name;

      this.filesize = file.size;

      this.allowedExtensions =
        ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG", "JFIF", "BMP", "SVG"];
      this.fileExtension = this.photoName.split('.').pop();
      if (this.allowedExtensions.includes(this.fileExtension)) {



        this.fileExtensionError = false;
        this.fileExtensionMessage = ""
        if (this.fileExtension == "pdf" || this.fileExtension == "PDF") {
          this.pdfmessage = this.photoName;
        }
        else {
          this.imagevisible = true;
          let reader = new FileReader();

          reader.readAsDataURL(event.target.files[0]); // read file as data url

          reader.onload = (event) => { // called once readAsDataURL is completed
            this.url = (<FileReader>event.target).result;


          }

        }
        let now = new Date();
        //  this.Attachment = formatDate(now, 'ddMMyyyyhhmmssa', 'en-US')+file.name;


        this.Attachment = file.name;

        //this.Attachment = this.UserID+'.'+this.fileExtension;
        this.tenantservice.postFile(this.Attachment, file).subscribe(
          data => {

            // this.ImageName=data.FileName;
          }
        );
      } else {
        this.fileExtensionMessage = "Only photos allowed!!"
        this.fileExtensionError = true;
      }


    }
  }
  onSubmit(companyvalue) {
   
    this.submitted = true;

    if (this.TenantForm.invalid) {
      return;
    }


    const CompanyData: IinsertTenant = {
      CompanyID: this.CompanyID > 0 ? this.CompanyID : 0,
      CompanyName: companyvalue.Companyname,
      ContactName: companyvalue.Contactname,
      emailid: companyvalue.Emailid,
      PhoneNumber: companyvalue.contact,
      Address: companyvalue.Address == null ? ' ' : companyvalue.Address,
      CreatedBy: 2,
      TenantID: 1,
     };

    this.tenantservice.addUpdateCompany(CompanyData).subscribe(
      (response) => {
        
        this.toaster.success("Data Added Successfully", "Success");
        this.getAllCompanyDetails();
        this.TenantForm.reset(); // Added this to reset the form
        this.myModal.hide();
        this.submitted = false;

      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");
        this.submitted = false;
        this.myModal.hide();
        this.TenantForm.reset();

      });


  }
  exportPdf() {

    let doc = new jsPDF('l', 'pt');
    doc.autoTable(this.exportColumns, this.companydetails); // typescript compile time error
    doc.save('name' + new Date().getTime() + '.pdf');
  }

  exportExcel() {


    let element = document.getElementById('texport');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);


    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    XLSX.writeFile(wb, 'export table.xlsx');
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

}
