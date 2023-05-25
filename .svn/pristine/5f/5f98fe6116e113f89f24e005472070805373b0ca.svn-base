import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Dropdown } from 'src/app/helper/dropdown.validator';
import { NoWhitespaceValidator } from 'src/app/helper/no-whitespace.validator';
import { MustMatch } from 'src/app/helper/must-match.validators';
import { UserService } from 'src/app/services/user.service';
import { IGetuser, Icommon, IUser, IDeleteuser, IGetroleUser } from 'src/app/interfaces/iuser';
import { Icheck } from 'src/app/interfaces/ibuilder-creation';
import { Subject } from 'rxjs';
import { ToasterService } from '../../helper/toaster.service';
import { DataTableDirective } from 'angular-datatables';
import { HelperService } from 'src/app/helper/helper.service';

import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { RoleService } from 'src/app/services/role.service';
import * as XLSX from 'xlsx';
import { languageValue } from 'src/app/global.model';
import { BuildercreateServiceService } from 'src/app/services/buildercreate-service.service';
declare var jsPDF: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  cities: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  CreatedBy: any;
  UserForm: FormGroup;
  submitted: any;
  delUserid: number;
  usertitle: string;
  userHeader: string = 'Add User Details';
  userId = 0;
  userdetails: any;
  getRoleDetails: any;
  role: any;
  isEdit: boolean = false;
  userData: any;
  deletevalue: any;
  TenantValue: any;
  Langvalue: any;
  error = '';
  loginInfo: any;
  UserID: any;
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
  constructor(private builderService: BuildercreateServiceService, private formBuilder: FormBuilder, private userservice: UserService, private roleservice: RoleService,
    private toaster: ToasterService, private helper: HelperService, private router: Router
  ) { }

  ngOnInit() {
    this.getLanguage();
    this.loginInfo = this.helper.getValue('LoginInfo');
    this.SuperAdmin = this.loginInfo.IsSuperAdmin,

    
    this.cols = [

      { field: 'User_FName', header: 'F Name' },
      { field: 'User_LName', header: 'L Name' },
      { field: 'EmailID', header: 'Email ID' },
      { field: 'PhoneNumber', header: 'Contact Number' },
      { field: 'Rolename', header: 'Access Role' }
    ];

    this.UserForm = this.formBuilder.group({
      Fname: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Lname: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      // EmpId: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Designation: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      // Skilltype: ['', [Validators.required,]],
      Emailid: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      Password: ['', [Validators.required, Validators.minLength(6), NoWhitespaceValidator.cannotContainSpace]],
      ConfirmPassword: ['', Validators.required],
      Address: ['', []],
      role: ['', [Validators.required, Dropdown]],
      // city: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      // state: ['', [Validators.required, Dropdown]],
      // Country: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      // zip: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      status: ['', [Validators.required, Dropdown]],
      contact: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('[0-9]+'), NoWhitespaceValidator.cannotContainSpace]],
      Language: ['', [Validators.required, Dropdown]],
      Tenant: ['', [Validators.required, Dropdown]],

    }, {
      validator: MustMatch('Password', 'ConfirmPassword')
    });
    this.getAllUserDetails();
    this.getallroledetails();

  }


  get user() { return this.UserForm.controls; }
  getallroledetails() {


    const common: IGetroleUser = {

      RoleID: 0,
      TenantID: this.loginInfo.TenantId
    };

    // getall dispatch summary
    this.roleservice.getroledetails(common).subscribe(
      (response) => {


        this.getRoleDetails = response;


      },
      error => {
        this.toaster.error("Error while loading role details");

      });

  }
  showModal() {
    this.UserForm.reset();
    this.myModal.show();
    this.UserID = 0;
  }


  deleteuser(value) {

    this.delModal.show();
    this.deletevalue = value;
  }

  delUserData() {

    const getuser: IDeleteuser = {
      UserID: this.deletevalue,


    };
    this.userservice.deleteuser(getuser).subscribe(
      data => {

        this.getAllUserDetails();
        this.delModal.hide();
        this.toaster.success("User Deleted Successfully", "Success");
      },
      error => {
        this.error = error;
        this.toaster.error("Some error occured while deleting user.Please try after sometime", "Error");
      });
  }

  getAllUserDetails() {

    const common: Icommon = {
      TenantID: this.loginInfo.TenantId,
      LanguageID: this.loginInfo.LanguageId,
      UserID: 0,

    };

    // getall users
    this.userservice.getAllUsers(common).subscribe(
      (response) => {
      
        this.userdetails = response;
        this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
       
      },
      error => {

        this.toaster.error("Error while gettig user details", "Error!");
      });
  }
  onedit(UserID) {
    this.UserID = UserID;
    this.onuseredit();
  }
  onuseredit() {
    this.myModal.show();
    const lines: Icommon = {
      UserID: this.UserID,
      TenantID: 1,
      LanguageID: 1,
    };
    this.userservice.getAllUsers(lines).subscribe(
      (response) => {
        this.userData = response;
        // var userimg='https://www.empulseit.com/FormBuilderAPI/Attachments/'+this.userData[0].UserImg;

        this.user.Fname.setValue(this.userData[0].User_FName);
        this.user.Lname.setValue(this.userData[0].User_LName);
        //this.user.EmpId.setValue(this.userData[0].UserID);
        this.user.Designation.setValue(this.userData[0].Designation);
        //  this.user.Skilltype.setValue(this.userData[0].UserType);
        this.user.Emailid.setValue(this.userData[0].EmailID);
        this.user.Password.setValue(this.userData[0].UserPassword);
        this.user.ConfirmPassword.setValue(this.userData[0].UserPassword);
        // this.user.ConfirmPassword.setValue(this.userData[0].UserPassword);
        this.user.Address.setValue(this.userData[0].UserAddress);
        this.user.role.setValue(this.userData[0].UserRoleID);
        // this.user.city.setValue(this.userData[0].City);
        // this.user.state.setValue(this.userData[0].State);
        // this.user.Country.setValue(this.userData[0].Country);
        // this.user.zip.setValue(this.userData[0].ZipCode);
        this.user.status.setValue(this.userData[0].AccessStatus);
        this.user.contact.setValue(this.userData[0].PhoneNumber);
        this.user.Language.setValue(this.userData[0].LanguageID);
        // this.user.Userupload.setValue(userimg);
        // this.user.lang.setValue(this.userData.LanguageID);crop1.png.png
        // this.user.Userimage.setValue('crop1.png.png');
        // this.user.Userupload.setValue('https://www.empulseit.com/CriderDataMaskAPI/Attachments/crop1.png.png');

        // this.user.Userimage.setValue('https://www.empulseit.com/CriderDataMaskAPI/Attachments/'+this.userData[0].UserImg);
        if (this.SuperAdmin == true) {
          this.user.Tenant.setValue(this.userData[0].TenantID);
        }
        else {
          this.user.Tenant.setValue(this.userData[0].this.loginInfo.TenantID);
          // this.loginInfo.TenantID
        }

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
        this.userservice.postFile(this.Attachment, file).subscribe(
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
  onSubmit(uservalue) {
    if (!this.SuperAdmin) {
      this.UserForm.get("Tenant").setValue(this.loginInfo.TenantId);
      uservalue.Tenant = this.loginInfo.TenantId
    }
    this.submitted = true;

    if (this.UserForm.invalid) {
      return;
    }


    const userdata: IUser = {
      UserID: this.UserID > 0 ? this.UserID : 0,
      User_Fname: uservalue.Fname,
      User_Lname: uservalue.Lname,
      UserRoleID: uservalue.role,
      EmailID: uservalue.Emailid,
      Designation: uservalue.Designation,
      UserPassword: uservalue.Password,
      PhoneNumber: uservalue.contact,
      UserAddress: uservalue.Address == null ? ' ' : uservalue.Address,
      City: '0',
      ZipCode: '0',
      State: '0',
      UserImg: '0',
      Country: '0',
      UserType: '0',
      AccessStatus: uservalue.status,

      CreatedBy: 1,

      TenantID: uservalue.Tenant,
      LanguageID: uservalue.Language,
      LoginID: "",




    };

    this.userservice.addUpdateUser(userdata).subscribe(
      (response) => {
       
      
        this.toaster.success("Data Added Successfully", "Success");
        this.getAllUserDetails();
        this.UserForm.reset(); // Added this to reset the form
        this.myModal.hide();
        this.submitted = false;

      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");
        this.submitted = false;
        this.myModal.hide();
        this.UserForm.reset();

      });


  }
  exportPdf() {

    let doc = new jsPDF('l', 'pt');
    doc.autoTable(this.exportColumns, this.userdetails); // typescript compile time error
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
