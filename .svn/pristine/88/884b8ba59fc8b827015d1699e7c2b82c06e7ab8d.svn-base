import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalenderService } from 'src/app/services/calender.service';
import { Calendar } from '@fullcalendar/core';
import { HelperService } from 'src/app/helper/helper.service';
import { BuildercreateServiceService } from 'src/app/services/buildercreate-service.service';
import { ImoduleTransferSubject, ICalendarIp } from 'src/app/interfaces/ibuilder-creation';
import { Iconfig } from 'src/app/interfaces/iloginconfig';
import { LoginconfigService } from 'src/app/services/loginconfig.service';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from 'src/app/helper/toaster.service';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.css']
})
export class ViewCalendarComponent implements OnInit {
  events: any[

  ];
  public eventData = new BehaviorSubject(this.events);
  reports: any;
  options: any;
  loginInfo: any;
  defaultService: any;
  LanguageID: any;
  reportDetails: any;
  getthemeconfigdetails: any;
  themecolor: any;
  dateString: string;
  isfile: boolean;
  acessData: any;
  getCalendar: ICalendarIp;
  theme: any = {
    PrimaryBgColor: " #1d1d85",
    SecondaryBgColor: "#f5901f",
    PrimaryTextColor: "#FFF",
    SecondaryTextColor: "#FFF",
    FooterText: "Enter Footer Text",
    ActiveColor: "#f5901f",
    NavBar: "topwithbuttons"
  };
  moduleTransferData: ImoduleTransferSubject;
  modulename: string;
  fcode: string;
  constructor(private eventService: CalenderService, private helper: HelperService, private Builderservice: BuildercreateServiceService, private loginconfigservice: LoginconfigService,
    private toaster: ToasterService, ) { }

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
    this.Builderservice.moduleTransferData.subscribe(data =>

      this.moduleTransferData = data
    );

    this.fcode = this.moduleTransferData.ModuleURL;
    this.modulename = this.moduleTransferData.ModuleName;
    this.isfile = this.moduleTransferData.IsFile;
    this.acessData = this.moduleTransferData.Access;
    this.getCalendarData();
  }
  private setTheme(theme: {}) {

    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
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
  getCalendarData() {
    this.reports = {};
    this.reports.Action = 7,
      this.reports.CreatedBy = 1,
      this.reports.FormCode = this.fcode, //"Tas3080", //this.fcode,
      this.reports.Id = 0,
      this.eventService.getEvents(this.reports).toPromise().then((events) => {
     
        this.events = events.data;

      });

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultView: 'dayGridMonth',
      // defaultDate: this.events[0].start,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      droppable: true,
      eventDrop: (event, element) => {
        
        this.updateEvent(event);
      },
    };

  }

  private updateEvent(e: any) {
    let id = e.event.id;
    //let start = e.event.start.toISOString(); let end = e.event.end != null ? e.event.end.toISOString() : e.event.start.toISOString()
    let start = e.event.start;
    let end = e.event.end != null ? e.event.end : e.event.start
    const getCalendar: ICalendarIp = {
      FormCode: this.fcode,//"Tas3080",//this.fcode,
      ID: id,
      start: start,
      end: end
    }


    this.eventService.dynamicReportBuilderCalendarInsert(getCalendar).subscribe(
      (response) => {
        this.toaster.success("Updated Succesfully", "Success");
      },
      error => {

        this.toaster.error("Some error occurred.Please try again", "Error");

      });
  }


}
