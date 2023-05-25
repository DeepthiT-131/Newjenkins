import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { map } from 'rxjs/operators';
import { IDivision, Car } from '../interfaces/common';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private base: BaseService,private http: HttpClient) { }
  getdivision(getdiv: IDivision) {
    return this.base.post('User/GetDivision', getdiv).pipe(map((response: any) => {
  
      return response;

    }));
  }

  getCarsSmall() {
    return this.http.get<any>('assets/showcase/data/cars-small.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => {
         return data; });
    }


}
