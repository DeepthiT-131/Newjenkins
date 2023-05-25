import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { LoginconfigService } from '../services/loginconfig.service';
import { ToasterService } from '../helper/toaster.service';
import { IgetModuleonLoad, IgetallMenu } from '../interfaces/irolepermission';
import { RolepermissionService } from '../services/rolepermission.service';
import { HelperService } from '../helper/helper.service';
import { Iconfig } from '../interfaces/iloginconfig';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import { ImoduleTransferSubject } from '../interfaces/ibuilder-creation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
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
export class LayoutComponent implements OnInit {
  theme: any = {
    PrimaryBgColor: " #1d1d85",
    SecondaryBgColor: "#f5901f",
    PrimaryTextColor: "#FFF",
    SecondaryTextColor: "#FFF",
    FooterText: "Enter Footer Text",
    ActiveColor: "#f5901f",
    NavBar: "topwithbuttons"
  };


  LanguageID: any;
  menuActive: boolean;
  selectedItem: any;
  activeMenuId: string;

  darkDemoStyle: HTMLStyleElement;

  routes: Array<string> = [];

  filteredRoutes: Array<string> = [];

  searchText: string;
  getthemeconfigdetails: any;

  themecolor: any;
  defaultService: any;
  buttondata: any;
  loginInfo: any;
  menudetails: any;
  constructor(private router: Router, private loginconfigservice: LoginconfigService, private toaster: ToasterService, private rolepermissionservice: RolepermissionService, private helper: HelperService, private builderservice: BuildercreateServiceService) { }

  ngOnInit() {

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
    this.getLinkdetails();
    this.getMenudetails();
  }

  changeURL(event, newValue) {

    if (newValue.ModuleURL.length > 0) {
      this.router.navigate([newValue.ModuleURL]);
    }
    else {
      this.selectedItem = newValue;
      let moduleTransferValue: ImoduleTransferSubject = {
        ModuleURL: newValue.ModuleId,
        ModuleName: newValue.ModuleName,
        IsFile: newValue.IsFile,
        Access: newValue
      }

      this.builderservice.checkmoduledata(moduleTransferValue);
      this.router.navigate(['/layout/Preview/' + newValue.ModuleId]);
    }
  }

  getLinkdetails() {
    const common: IgetModuleonLoad = {
      RoleId: this.defaultService.RoleID,
      ParentMenu: this.defaultService.ParentMenu,

    };

    // getall dispatch summary
    this.rolepermissionservice.GetModuleonLoad(common).subscribe(
      (response) => {

        this.buttondata = response;
        //this.router.navigate([response[0].ModuleURL]);

      });

  }


  getMenudetails() {
    const common: IgetallMenu = {
      RoleId: this.defaultService.RoleID,
      LanguageID: 1,
      TenantId: 1,

    };

    // getall dispatch summary
    this.rolepermissionservice.GetAllMenuDetails(common).subscribe(
      (response) => {

        this.menudetails = response;
        //this.router.navigate([response[0].ModuleURL]);

      });
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
        //alert( this.theme.NavBar);


      },
      error => {
        this.toaster.error("Some error occurred.Please try again", "Error");

      });


  }
  private setTheme(theme: {}) {

    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
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

  onKeydown(event: KeyboardEvent, id: string) {
    if (event.which === 32 || event.which === 13) {
      this.toggle(id);
      event.preventDefault();
    }
  }

  selectRoute(routeName) {
    this.router.navigate(['/' + routeName.toLowerCase()]);
    this.filteredRoutes = [];
    this.searchText = "";
  }

  filterRoutes(event) {
    let query = event.query;
    this.filteredRoutes = this.routes.filter(route => {
      return route.toLowerCase().includes(query.toLowerCase());
    });
  }

  // changeTheme(event: Event, theme: string, dark: boolean) {
  //     let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
  //     themeLink.href = 'assets/components/themes/' + theme + '/theme.css';

  //     if (dark) {
  //         if (!this.darkDemoStyle) {
  //             this.darkDemoStyle = document.createElement('style');
  //             this.darkDemoStyle.type = 'text/css';
  //             this.darkDemoStyle.innerHTML = '.implementation { background-color: #3f3f3f; color: #dedede} .implementation > h3, .implementation > h4{ color: #dedede}';
  //             document.body.appendChild(this.darkDemoStyle);
  //         }
  //     }
  //     else if(this.darkDemoStyle) {
  //         document.body.removeChild(this.darkDemoStyle);
  //         this.darkDemoStyle = null;
  //     }

  //     event.preventDefault();
  // }

  onMenuButtonClick(event: Event) {
    this.menuActive = !this.menuActive;
    event.preventDefault();
  }




}
