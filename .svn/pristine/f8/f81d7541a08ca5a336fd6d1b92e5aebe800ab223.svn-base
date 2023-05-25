import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { IbuilderCreation, IgetAllTableDetails, IgetallDropdown, IgetAllColumnValues, IgetJsonData, Ibuilderref, IInsertJson, IRole, ImoduleTransferSubject, Iget, Idownload, Igethistory, IReportbuilderCreation, Ireportref, IgetAllTableDetailsDB, IgetMulti, IHistdownload, ILanguageref, IKanbanaIp, IViewUISubject, ICalendarIp, Imulticascade, IEachColumnFormcode, IsmsAlert, IEmailAlert } from '../interfaces/ibuilder-creation';
import { map } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { IGetcategory } from '../interfaces/icategory';
import { HttpClient } from '@angular/common/http';
import { Car } from '../interfaces/ibuilder-creation';

@Injectable({
  providedIn: 'root'
})
export class BuildercreateServiceService {
  API_URL = "";
  ZIP_URL = "";
  moduleurlsource = new BehaviorSubject<ImoduleTransferSubject>({

    ModuleURL: "",
    ModuleName: "",
    IsFile: false,
    Access: ""

  });
  moduleTransferData: any;
  viewurlsource = new BehaviorSubject<IViewUISubject>({

    FormCode: "",
    ActionId: "",
    IsFile: false,
    Access: ""

  });
  viewTransferData: any;

  constructor(private base: BaseService, private http: HttpClient) {
    this.moduleTransferData = this.moduleurlsource.asObservable();
    this.viewTransferData = this.viewurlsource.asObservable();
  }

  checkmoduledata(moduleTransferValue: ImoduleTransferSubject) {
    this.moduleurlsource.next(moduleTransferValue);
  }
  checkviewUIdata(viewUITransferValue: IViewUISubject) {
    this.viewurlsource.next(viewUITransferValue);
  }
  getAllDropdowndata(getdata: IgetallDropdown) {
    return this.base.post('FormBuilder/GetSubCode', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getAllColumneachTable(getdata: IgetAllTableDetails) {
    return this.base.post('DBDetails/GetAllColumnOfEachTable', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getAllColumneachFormcode(getdata: IEachColumnFormcode) {
    return this.base.post('DBDetails/GetAllTablesAndColumnsFormcode', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getAllTable(getdata: IgetAllTableDetails) {
    return this.base.post('DBDetails/GetAllTablesAndColumnsV', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  GetAllDB() {
    return this.base.post('DBDetails/GetAllDB', '').pipe(map((response: any) => {
      return response;
    }));
  }
  GetAllTablesDB(getdata: IgetAllTableDetailsDB) {
    return this.base.post('DBDetails/GetAllDBwithTables', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getAllColumnValue(getdata: IgetAllColumnValues) {
    return this.base.post('DBDetails/GetAllColumnValues', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  savebuilderData(getdata: IbuilderCreation) {
    return this.base.post('FormBuilder/InsertData', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getbuilderData(getdata: IgetJsonData) {
    return this.base.post('FormBuilder/SelectData', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getLanguageInfo(getdata: ILanguageref) {
    return this.base.post('FormBuilder/GetLanguageDetails', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getAllLanguage() {
    return this.base.post('DBDetails/GetLanguage', '').pipe(map((response: any) => {
      return response;
    }));
  }

  getAllReference(getdata: Ibuilderref) {
    return this.base.post('FormBuilder/GetReferenceSelect', getdata).pipe(map((response: any) => {
      return response;
    }));
  }


  InsertJson(getdata: IInsertJson) {
    return this.base.post('FormBuilder/DynamicFormBuilderOperations', getdata).pipe(map((response: any) => {
      return response;
    }));
  }

  getrole(common: IRole) {
    return this.base.post('Role/RolesSelect', common).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicTableOperation(getdata: Iget) {
    return this.base.post('FormBuilder/DynamicFormBuilderOperations', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicTableOperationselect(getdata: Iget) {
    return this.base.post('FormBuilder/DynamicFormBuilderOperationsSelect', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicTableOperationEdit(getdata: Iget) {
    return this.base.post('FormBuilder/DynamicFormBuilderOperationsEdit', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicGetHisory(gethistory: Igethistory) {
    return this.base.post('History/GetHistory', gethistory).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicTableOperationselectFilter(getdata: any) {
    return this.base.post('FormBuilder/DynamicFormBuilderOperationsSelect', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicFormPreviewSelect(getdata: any) {
    return this.base.post('FormBuilder/DynamicFormPreviewSelect', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicTableOperationInsertUpdate(getdata: any) {
    return this.base.post('FormBuilder/DynamicFormBuilderOperations', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicSMSAlert(smsalert: IsmsAlert) {
    return this.base.post('SignUp/CommunicationSendSMS', smsalert).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicEmailAlert(emailalert: IEmailAlert) {
    return this.base.post('SignUp/CommunicationEmail', emailalert).pipe(map((response: any) => {
      return response;
    }));
  }
  getDownloadFileDetails(getdata: Idownload) {
    return this.base.post('FormBuilder/CheckDownloadImage', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getHistDownloadFileDetails(getdata: IHistdownload) {
    return this.base.post('FormBuilder/HistoryFileLoad', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  DownloadFile(filePath: string): Observable<any> {

    let input = filePath;
    return this.base.Postwithdownload("FormBuilder/DownloadFile?fileName=" + input, '', { responseType: 'blob' })
      .pipe(
        map((res: any) => {
          return res;
        })
      );

  }
  getCarsSmall() {
    return this.http.get<any>('assets/showcase/data/cars-small.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => { return data; });
  }
  getSourceBuilder() {
    return this.http.get<any>('assets/showcase/data/sourceBuilder.json')
      .pipe(
        map((res: any) => {

          return res;
        })
      );
  }
  public getChildJSON() {
    return this.http.get('assets/showcase/data/ChildSourceBuilder.json')
      .pipe(
        map((res: any) => {

          return res;
        })
      );


  }
  savereportbuilderData(getdata: IReportbuilderCreation) {
    return this.base.post('ReportBuilder/InsertReportData', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getreportbuilderData(getdata: IgetJsonData) {
    return this.base.post('ReportBuilder/SelectReportData', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getReportView(getdata: IgetJsonData) {
    return this.base.post('ReportBuilder/DynamicReportBuilderOperations', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getReportFilter(getdata: IgetJsonData) {
    return this.base.post('ReportBuilder/ReportViewFilter', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getFormFilter(getdata: IgetJsonData) {
    return this.base.post('ReportBuilder/FormViewFilter', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  getReportReference(getdata: Ireportref) {
    return this.base.post('ReportBuilder/ReportFilterBind', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  MultiCascade(getdata: Imulticascade) {
    return this.base.post('FormBuilder/Multicascade', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicTableReportFilter(getdata: any) {
    return this.base.post('ReportBuilder/DynamicReportBuilderOperations', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  MultiaddColumns(getdata: IgetMulti) {
    return this.base.post('FormBuilder/MultiaddChildTable', getdata).pipe(map((response: any) => {
      return response;
    }));
  }
  dynamicReportBuilderKanbana(getdata: Iget) {
    return this.base.post('ReportBuilder/DynamicReportBuilderKanbana', getdata).pipe(map((response: any) => {
      return response;
    }));

  }

  dynamicReportBuilderKanbanaInsert(getkanbana: IKanbanaIp) {
    return this.base.post('FormBuilder/KanbanaInsertUpdate', getkanbana).pipe(map((response: any) => {
      return response;
    }));

  }


}
