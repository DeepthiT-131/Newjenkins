import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem, SelectItem } from 'primeng/api';
import { Car } from '../interfaces/common';
import { CommonService } from '../services/common.service';
import { IThemeconfig, ITableconfig, Iconfig } from '../interfaces/iloginconfig';
import { LoginconfigService } from '../services/loginconfig.service';
import { ToasterService } from '../helper/toaster.service';
import { Scroll, Router } from '@angular/router';
import { IgetModuleonLoad } from '../interfaces/irolepermission';
import { RolepermissionService } from '../services/rolepermission.service';
import { HelperService } from '../helper/helper.service';
import { formatDate } from '@angular/common';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';

@Component({
  selector: 'app-themeconfig',
  templateUrl: './themeconfig.component.html',
  styleUrls: ['./themeconfig.component.css'],

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
export class ThemeconfigComponent implements OnInit {

  menuActive: boolean;
  activeMenuId: string;
  routes: Array<string> = [];
  filteredRoutes: Array<string> = [];
  url: any;
  fileExtension = ".jpg";
  fileExtensionError = false;
  photoName: any;
  allowedExtensions = [];
  fileExtensionMessage = "";
  filesize: any;
  pdfmessage: any;
  imagevisible = false;
  Attachment: any;
  items: MenuItem[];
  themecolor: string = 'blue-orange';
  cars: Car[];
  cols: any[];
  first: number = 0;
  brands: SelectItem[];
  selectedColumns: any[];
  headerlogo: any;
  getthemeconfigdetails: any;
  gettableconfigdetails: any;
  splitValue: any;
  buttondata: any;
  defaultService: any;
  loginInfo: any;
  error = false;
  LanguageID: any;
  constructor(private carService: CommonService, private loginconfigservice: LoginconfigService, private toaster: ToasterService, private router: Router, private rolepermissionservice: RolepermissionService, private helper: HelperService, private Builderservice: BuildercreateServiceService) { }
  theme: any = {
    PrimaryBgColor: " #1d1d85",
    SecondaryBgColor: "#f5901f",
    PrimaryTextColor: "#FFF",
    SecondaryTextColor: "#FFF",
    FooterText: "Enter Footer Text",
    ActiveColor: "#f5901f",
    NavBar: "topwithbuttons"
  };
  table: any = {
    Pagination: true,
    Scrollable: true,
    Sorting: true,
    Filter: true,
    ExportButton: true,
    MultiSelect: true,
    Resizable: true,
    Reorder: true,
  };

  ngOnInit() {
    this.loginInfo = this.helper.getValue('LoginInfo')
    this.LanguageID = this.helper.getValue('LanguageID');
    if (this.loginInfo) {
      this.theme = this.helper.getValue('Theme');
      if (this.theme) {
        this.headerlogo = this.theme.HeaderLogo;
        this.setTheme(this.theme)
      }
      else {

        this.getthemeconfigsetting();
      }
      this.table = this.helper.getValue('Table');
      if (this.table) {


      }
      else {

        this.gettableconfigsetting();
      }
    }

    this.carService.getCarsSmall().then(cars => this.cars = cars);

    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
    this.selectedColumns = this.cols;

    this.getthemeconfigsetting();
    this.defaultService = this.helper.getValue('LoginInfo')

    this.getLinkdetails();

    if (this.headerlogo != "") {
      this.url = this.headerlogo;
      this.headerlogo.setValue(this.headerlogo);
    } else {
      this.headerlogo.setValue(this.Attachment);
    }

  }



  reset() {
    this.first = 0;
  }
  //, fieldvalue
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

  onMenuButtonClick(event: Event) {
    this.menuActive = !this.menuActive;
    event.preventDefault();
  }
  onSelectheaderlogo(event) {
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

            // this.url = (<FileReader>event.target).result;


          }

        }
        let now = new Date();
        this.Attachment = file.name;


        this.loginconfigservice.postConfig(this.Attachment, file).subscribe(
          (response) => {
           
            this.splitValue = response;
            let split = this.splitValue.split(',')
            if (split) {
              if (split.length > 0) {
                this.headerlogo = split[0];

                this.url = split[1];

              }
            }
          }
        );
      } else {
        this.fileExtensionMessage = "Only photos allowed!!"
        this.fileExtensionError = true;
      }
     
      this.headerlogo.setValue(this.Attachment);

    }
  }


  private setTheme(theme: {}) {

    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getCars());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "primengTable");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  getCars() {
    let cars = [];
    for (let car of this.cars) {
      car.year = car.year.toString();
      cars.push(car);
    }
    return cars;
  }


  onsubmit() {

    if (this.headerlogo != null) {
      // this.changeTheme(this.themecolor,false);
      if (this.themecolor == "darkgray-red") {
        this.theme = {
          PrimaryBgColor: "#161616",
          SecondaryBgColor: " #cc0e00",
          PrimaryTextColor: "white",
          SecondaryTextColor: "white",
          FooterText: this.theme.FooterText,
          // Favicon:"",
          ActiveColor: "#cc0e00",
          NavBar: this.theme.NavBar
        };
      }
      if (this.themecolor == "blue-orange") {
        this.theme = {
          PrimaryBgColor: "#1d1d85",
          SecondaryBgColor: "#f5901f",
          PrimaryTextColor: "white",
          SecondaryTextColor: "white",
          FooterText: this.theme.FooterText,
          // Favicon:"",
          ActiveColor: "#f5901f",
          NavBar: this.theme.NavBar
        };
      }
      if (this.themecolor == "blue-red") {
        this.theme = {
          PrimaryBgColor: "#024b7c",
          SecondaryBgColor: "#ed2627",
          PrimaryTextColor: "white",
          SecondaryTextColor: "white",
          FooterText: this.theme.FooterText,
          // Favicon:"",
          ActiveColor: "#ed2627",
          NavBar: this.theme.NavBar
        };
      }
      if (this.themecolor == "purple-green") {
        this.theme = {
          PrimaryBgColor: "#6c0666",
          SecondaryBgColor: "#a4bc02",
          PrimaryTextColor: "white",
          SecondaryTextColor: "white",
          FooterText: this.theme.FooterText,
          // Favicon:"",
          ActiveColor: "#a4bc02",
          NavBar: this.theme.NavBar
        };
      }
      if (this.themecolor == "no-theme") {



        //this.setTheme(this.theme);
      }

      this.setTheme(this.theme);


      const loginconfigdata: IThemeconfig = {

        ConfigID: 0,
        Theme: this.themecolor,
        HeaderLogo: this.headerlogo,
        NavBar: this.theme.NavBar,
        PrimaryBgColor: this.theme.PrimaryBgColor,
        SecondaryBgColor: this.theme.SecondaryBgColor,
        PrimaryTextColor: this.theme.PrimaryTextColor,
        SecondaryTextColor: this.theme.SecondaryTextColor,
        ActiveColor: this.theme.ActiveColor,
        FooterText: this.theme.FooterText,
        FavIcon: "",

        CreatedBy: this.loginInfo.UserId,
        TenantID: this.loginInfo.TenantId,

      };

      this.loginconfigservice.AddThemeConfigdetails(loginconfigdata).subscribe(
        (response) => {
          this.toaster.success("Theme Settings Updated Successfully");
          this.helper.removeValue('Theme');
          this.getthemeconfigsetting();


        },
        error => {
          this.toaster.error("Some error occurred.Please try again", "Error");

        });
    }
    else {
      this.error = true;
    }
  }

  onsubmittable() {

    var pagination = this.table.Pagination ? 1 : 0;
    var scroll = this.table.Scrollable ? 1 : 0;
   
    var sorting = this.table.Sorting ? 1 : 0;
    var filter = this.table.Filter ? 1 : 0;
    var buttons = this.table.ExportButton ? 1 : 0;
    var colmultiselect = this.table.MultiSelect ? 1 : 0;
    var resize = this.table.Resizable ? 1 : 0;
    var reorder = this.table.Reorder ? 1 : 0;
    const loginconfigdata: ITableconfig = {

      ConID: 0,
      Pagination: pagination,
      Scrollable: scroll,
      Sorting: sorting,
      Filter: filter,
      ExportButton: buttons,
      MultiSelect: colmultiselect,
      Resizable: resize,
      Reorder: reorder,
      CreatedBy: this.loginInfo.UserId,
      TenantID: this.loginInfo.TenantId,

    };

    this.loginconfigservice.AddTableConfigdetails(loginconfigdata).subscribe(
      (response) => {
   
        this.toaster.success("Table Settings Updated Successfully");
        this.helper.removeValue('Table');
        this.gettableconfigsetting();

      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");

      });
  }

  onBackButton() {
    this.router.navigate(['/theme/form']);
  }

  getthemeconfigsetting() {
    const themeconfigdata: Iconfig = {

      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    };

    this.loginconfigservice.GetThemeConfigdetails(themeconfigdata).subscribe(
      (response) => {
   
        this.getthemeconfigdetails = response[0];
        this.theme = response[0];
        this.themecolor = response[0].Theme;
        this.setTheme(this.theme);
        this.theme.NavBar = response[0].NavBar;

        this.helper.setValue('Theme', response[0]);
     
        let logo = this.theme.HeaderLogo;
        let logo1 = logo.split('/');
        this.headerlogo = logo1[5];
      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");

      });
    if (this.theme.NavBar == "topwithbuttons") {
      this.getLinkdetails();
    }

  }

  gettableconfigsetting() {
    const tableconfigdata: Iconfig = {
      TenantId: this.loginInfo.TenantId,
      LanguageId: this.LanguageID > 0 ? this.LanguageID : this.loginInfo.LanguageId
    };

    this.loginconfigservice.GetTableConfigdetails(tableconfigdata).subscribe(
      (response) => {
      
        this.table = response[0];


        this.helper.setValue('Table', response[0]);
      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");

      });


  }

  getLinkdetails() {
    const common: IgetModuleonLoad = {
      // RoleId: this.defaultService.RoleID,
      // ParentMenu: this.defaultService.ParentMenu,
      RoleId: this.loginInfo.RoleID,
      ParentMenu: this.loginInfo.ParentMenu,

    };
 
    // getall dispatch summary
    this.rolepermissionservice.GetModuleonLoad(common).subscribe(
      (response) => {
        
        this.buttondata = response;
        // this.router.navigate([response[0].ModuleURL]);

      });

  }
}