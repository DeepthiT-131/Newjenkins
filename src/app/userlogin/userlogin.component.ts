import { Component, OnInit } from '@angular/core';

import { Iloginconfig, Iconfig, ILoginuser } from '../interfaces/iloginconfig';
import { LoginconfigService } from '../services/loginconfig.service';
import { ToasterService } from 'src/app/helper/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HelperService } from '../helper/helper.service';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  getconfigdetails: any;
  txtpassword: any;
  txtusername: any;
  password_type: string = 'password';
  getthemeconfigdetails: any;
  loginForm: FormGroup;
  submitClick = false;
  submitted = false;
  returnUrl: string;
  error = false;
  loginInfo: any;
  loginservice: any;
  TenandId: number;
  LanguageId: number;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, private loginconfigservice: LoginconfigService, private toaster: ToasterService,
    private router: Router, private helper: HelperService) { }

  ngOnInit() {
    this.helper.clearStorage();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getconfigsetting();
  }

  getconfigsetting() {

    const configdata: Iconfig = {
      // TenantId: this.loginInfo.TenantId,
      // LanguageId: this.loginInfo.LanguageId
      TenantId: 1,
      LanguageId: 1
    };
    this.loginconfigservice.GetLoginConfigdetails(configdata).subscribe(
      (response) => {
        if (response) {
          this.getconfigdetails = response[0];
      

        }

      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");


      });


  }

  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }

  // convenience getter for easy access to form fields
  get formData() { return this.loginForm.controls; }

  onLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {

      return;
    }

    this.submitClick = true;
    const login: ILoginuser = {
      EmailID: this.formData.username.value,
      Password: this.formData.password.value,
      //languageId:1
    };

    this.loginconfigservice.UserLogin(login).subscribe(
      (response) => {
        this.TenandId = response[0].TenantId;
        this.LanguageId = response[0].LanguageId;

        if (response) {
          
          if (response[0].UserId == 0) {
            this.error = true;
            this.submitClick = false;
          }
          else {

            this.helper.setValue('LoginInfo', response[0]);
            this.loginservice = {

              ModuleURL: response[0].ModuleURL,
              ParentMenu: response[0].ParentMenu,
              RoleID: response[0].RoleID

            }
            this.helper.setValue('DefaultLink', this.loginservice);
            this.helper.setValue('LanguageID', response[0].LanguageId);
            this.getthemeconfigsetting();
            this.gettableconfigsetting();
            this.router.navigate(['/theme']);
            // this.router.navigate(['/FormBuilder'])
          }
        }
      },
      error => {
        this.error = true;

        this.submitClick = false;
      });


  }
  getthemeconfigsetting() {
    const themeconfigdata: Iconfig = {
      TenantId: this.TenandId,
      LanguageId: this.LanguageId
    };

    this.loginconfigservice.GetThemeConfigdetails(themeconfigdata).subscribe(
      (response) => {

        if (response) {

          this.helper.setValue('Theme', response[0]);
        }
      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");


      });


  }

  gettableconfigsetting() {

    const tableconfigdata: Iconfig = {
      TenantId: this.TenandId,
      LanguageId: this.LanguageId
    };

    this.loginconfigservice.GetTableConfigdetails(tableconfigdata).subscribe(
      (response) => {

        if (response) {

          this.helper.setValue('Table', response[0]);
        }
      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");

      });


  }
}
