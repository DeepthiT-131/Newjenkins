import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { BaseService } from '../base/base.service';
import { Iget, ICalendarIp } from '../interfaces/ibuilder-creation';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor(private base: BaseService, private http: Http) { }


  getEvents(getdata: Iget) {
    return this.base.post('FormBuilder/DynamicFormBuilderCalendar', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicReportBuilderCalendarInsert(getcalendar: ICalendarIp) {
    return this.base.post('FormBuilder/CalendarInsertUpdate', getcalendar).pipe(map((response: any) => {
      return response;
    }));

  }
}
