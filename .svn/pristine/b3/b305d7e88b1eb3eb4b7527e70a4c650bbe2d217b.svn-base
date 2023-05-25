import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IGettable, IaddUpdate, Iedit, Idelete} from '../interfaces/isop-workflow';

@Injectable({
  providedIn: 'root'
})
export class SopWorkflowService {

  constructor(private base: BaseService,private http: HttpClient) { }

  // getCarsSmall() {
  //   return this.http.get<any>('assets/showcase/data/filesystem1.json')
  //     .toPromise()
  //     .then(res => <Car[]>res.data)
  //     .then(data => { return data; });
  //   }

    getdatadetails(sopworkflow: IGettable) {
      return this.base.post('WorkType/GetWorkType', sopworkflow).pipe(map((response: any) => {
        return response;
      }));
    }
  
    editdetails(editsopworkflow: Iedit) {
      return this.base.post('WorkType/WorkTypeEdit', editsopworkflow).pipe(map((response: any) => {
        return response;
      }));
    }
  
    addUpdatedetails(Insertsopworkflow: IaddUpdate) {
      return this.base.post('WorkType/WorkTypeInsertOrUpdate', Insertsopworkflow).pipe(map((response: any) => {
          return response;
      }));
    }
  
    Deletedetails(delsopworkflow:Idelete) {
      return this.base.post('WorkType/WorkTypeDelete', delsopworkflow).pipe(map((response: any) => {
          return response;
      }));
    }

}
