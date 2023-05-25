import { Component, OnInit } from '@angular/core';
import { Iloginconfig, Iconfig } from '../interfaces/iloginconfig';
import { LoginconfigService } from '../services/loginconfig.service';
import { ToasterService } from 'src/app/helper/toaster.service';
import { Router } from '@angular/router';
import { HelperService } from '../helper/helper.service';
import { formatDate } from '@angular/common';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component implements OnInit {

  url: any;
  getconfigdetails: any;
  backgroundimage: any;
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
  isAvailable: false;
  AttachmentBanner: any;
  uploadlogo: any;
  bannerimage: any;
  ConfigID = 0;
  splitValue: any;
  loginInfo: any;
  error = false;
  LanguageID: any;
  constructor(private loginconfigservice: LoginconfigService, private toaster: ToasterService, private router: Router,
    private helper: HelperService, private Builderservice: BuildercreateServiceService, ) { }
  theme: any;

  ngOnInit() {
    this.loginInfo = this.helper.getValue('LoginInfo')
    this.LanguageID = this.helper.getValue('LanguageID');
    if (this.loginInfo) {

    }

    this.getconfigsetting();
    if (this.uploadlogo != "" && this.bannerimage != "") {
      this.uploadlogo.setValue(this.uploadlogo);
      this.bannerimage.setValue(this.bannerimage);
    } else {
      this.uploadlogo.setValue(this.Attachment);
      this.bannerimage.setValue(this.AttachmentBanner);

    }
  }
  getconfigsetting() {

    const configdata: Iconfig = {
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    };

    this.loginconfigservice.GetLoginConfigdetails(configdata).subscribe(
      (response) => {

        this.theme = response[0];
        this.uploadlogo = this.theme.Logo;
        this.bannerimage = this.theme.BannerImage;
        let logo = this.uploadlogo.split('/'); let banner = this.bannerimage.split('/');
        this.uploadlogo = logo[5];
        this.bannerimage = banner[5];
      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");

      });


  }

  onSelectFile(event) {
    this.error = false;
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
        this.loginconfigservice.postConfig(this.Attachment, file).subscribe(
          (response) => {

            this.splitValue = response;
            let split = this.splitValue.split(',')
            if (split) {
              if (split.length > 0) {
                this.uploadlogo = split[0];
                this.url = split[1];

              }
            }


            // this.ImageName=data.FileName;
          }
        );
      } else {
        this.fileExtensionMessage = "Only photos allowed!!"
        this.fileExtensionError = true;
      }


    }
  }
  DownLoadFiles(fieldname) {
    fieldname = fieldname.replace(/[\s]/g, '');
    let fileName = fieldname;
    //file type extension
    let checkFileType = fileName.split('.').pop();

    let thefile: any;
    let now = formatDate(new Date().toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    let filecheck = fieldname + now + "." + checkFileType;
    this.Builderservice.DownloadFile(fileName)
      .subscribe(
        (data) => {

          thefile = new Blob([data], { type: "application/octet-stream" }),
            saveAs(thefile, filecheck);

        },
        err => {

          alert("Server error while downloading file.");
        }
      );


  }
  onselectBanner(event) {
    this.backgroundimage = null;
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
            this.backgroundimage = (<FileReader>event.target).result;


          }

        }
        let now = new Date();
        //  this.Attachment = formatDate(now, 'ddMMyyyyhhmmssa', 'en-US')+file.name;


        this.Attachment = file.name;
        this.AttachmentBanner = file.name;
        //this.Attachment = this.UserID+'.'+this.fileExtension;
        this.loginconfigservice.postConfig(this.Attachment, file).subscribe(
          (response) => {

            this.splitValue = response;
            let split = this.splitValue.split(',')
            if (split) {
              if (split.length > 0) {
                this.bannerimage = split[0];
                this.url = split[1];

              }
            }


            // this.ImageName=data.FileName;
          }
        );
      } else {
        this.fileExtensionMessage = "Only photos allowed!!"
        this.fileExtensionError = true;
      }


    }
  }



  onsubmit() {
    if (this.uploadlogo != null) {


      const loginconfigdata: Iloginconfig = {

        ConfigID: 0,
        BannerImage: this.bannerimage,
        BackgroundColor: this.theme.BackgroundColor,
        TextColor: this.theme.TextColor,
        Alignment: this.theme.Alignment,
        ButtonColor: this.theme.ButtonColor,
        ButtonTextColor: this.theme.ButtonTextColor,
        Logo: this.uploadlogo,
        LoginFormBackgroundcolor: this.theme.LoginFormBackgroundcolor,

        CreatedBy: this.loginInfo.UserId,
        TenantID: this.loginInfo.TenantId,

      };

      this.loginconfigservice.AddloginConfigdetails(loginconfigdata).subscribe(
        (response) => {

          this.toaster.success("Login Details Updated Successfully");
          this.router.navigate(['/theme/form']);



        },
        error => {

          this.toaster.error("Some error occurred.Please try again", "Error");

        });
    } else {
      this.error = true;
    }
  }

  onBackButton() {
    this.router.navigate(['/theme/category']);
  }
}
