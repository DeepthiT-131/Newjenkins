import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImoduleTransferSubject } from '../interfaces/ibuilder-creation';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import { HelperService } from '../helper/helper.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  selectedItem: any;
  LanguageId:any;
  constructor(private router:Router,private builderService: BuildercreateServiceService,private helper: HelperService) { }

  ngOnInit() {
    this.LanguageId = this.helper.getValue('LanguageID')

    this.selectedItem = this.helper.getValue('ItemSelected')
    this.changeURL( this.selectedItem)
  }
  changeURL(newValue) {

    if (newValue.ModuleURL != null && newValue.ModuleURL != undefined && newValue.ModuleURL != "") {
      this.router.navigate([newValue.ModuleURL]);
    }
    else {

      let moduleTransferValue: ImoduleTransferSubject = {
        ModuleURL: newValue.ModuleId,
        ModuleName: newValue.ModuleName,
        IsFile: newValue.IsFile,
        Access: newValue
      }

      this.builderService.checkmoduledata(moduleTransferValue);
      if (newValue.IsForm) {
        this.router.navigate(['/theme/Preview/' + newValue.ModuleId]);
      }
      else {
        this.router.navigate(['/theme/ReportView/' + newValue.ModuleId]);
        // this.router.navigate(['/theme/Preview/' + newValue.ModuleId]);
      }
    }
  }
}
