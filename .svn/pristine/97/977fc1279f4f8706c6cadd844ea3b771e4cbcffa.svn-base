import { Component, OnInit, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalenderService } from '../services/calender.service';
import { Calendar } from '@fullcalendar/core';
import { HelperService } from '../helper/helper.service';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import { ImoduleTransferSubject, ICalendarIp } from '../interfaces/ibuilder-creation';
import { Iconfig } from '../interfaces/iloginconfig';
import { LoginconfigService } from '../services/loginconfig.service';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from '../helper/toaster.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {
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
  @Input() calendarChild;
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
      this.reports.FormCode = "Tas3080", //"Tas3080", //this.fcode,
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
    let start = e.event.start.toISOString();
    let end = e.event.end != null ? e.event.end.toISOString() : e.event.start.toISOString()
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
