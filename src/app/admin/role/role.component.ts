import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';
import { NoWhitespaceValidator } from 'src/app/helper/no-whitespace.validator';

import { Icheck } from 'src/app/interfaces/ibuilder-creation';
import { ToasterService } from 'src/app/helper/toaster.service';
import { formatDate } from '@angular/common';
import { Icommon, IRole, Iedit, IGetrole } from 'src/app/interfaces/irole';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'src/app/helper/helper.service';

import * as XLSX from 'xlsx';

declare var jsPDF: any;



@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  modalReference: NgbModalRef;
  roleForm: FormGroup;
  submitClick = false;
  submitted = false;
  deletevalue: any;
  error = '';
  roledetails: any;
  RoleID: any;
  roledetailedit: any;
  reportDate = '_' + formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };
  table: any = {
    Pagination: true,
    Scrollable: true,
    Sorting: true,
    Filter: true,
    ExportButton: true,
    Multiselect: true,
    Resizable: true,
    Reorder: true,
  };
  loginInfo: any;
  first: number = 0;
  columns: any[];
  exportColumns: any[];
  dataformat: any;
  cols: any[];
  fileName: any;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering

  constructor(private helper: HelperService, private formBuilder: FormBuilder, private roleservice: RoleService, private toaster: ToasterService,
    private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.cols = [
      { field: 'RoleID', header: 'Role Id' },
      { field: 'RoleName', header: 'Role Name' },
      { field: 'RoleDesc', header: 'Role Description' },
      { field: '', header: 'Role Permission' },
      { field: '', header: 'Action' }
    ];
    this.loginInfo = this.helper.getValue('LoginInfo');
    if (this.loginInfo) {
      // this.getthemeconfigsetting();

      this.table = this.helper.getValue('Tables');

    };

    this.getallroledetails();

    this.roleForm = this.formBuilder.group({
      rolename: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      roledesc: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
    });

  }
  get role() { return this.roleForm.controls; }


  /*------ Getting Data ------*/
  getallroledetails() {


    const common: Icommon = {

      RoleID: 0,
      TenantID: this.loginInfo.TenantId
    };

    // getall dispatch summary
    this.roleservice.getroledetails(common).subscribe(
      (response) => {
        this.roledetails = response;


        this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
        // this.dtTrigger.next();
      },
      error => {

      });

  }
  /*--------- End ---------*/

  /*------ Modal Pop-Up -----*/
  showModal(content) {
    this.roleForm.reset();
    this.RoleID = 0;
    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
    //this.myModal.show();
  }
  /*------ end ------*/

  onSubmit(roleFormvalue) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.roleForm.invalid) {
      return;
    }


    const Insertrole: IRole = {

      RoleID: this.RoleID > 0 ? this.RoleID : 0,
      RoleName: roleFormvalue.rolename,
      RoleDesc: roleFormvalue.roledesc,
      CreatedBY: 1,
      LanguageID: this.loginInfo.LanguageId,
      TenantID: this.loginInfo.TenantId

    };


    this.roleservice.addUpdateRole(Insertrole).subscribe(
      (response) => {
        this.getallroledetails();
        // this.myModal.hide();
        this.roleForm.reset();
        this.toaster.success("Role Added Successfully", "Success");
        this.modalReference.close();
        this.submitted = false;

      },

      error => {
        //this.toaster.error("Some error occurred.Please try again","Error");
        // this.submitted = false;
        // this.myModal.hide();
        // this.roleForm.reset();
        this.error = error;


      });
  }

  AddPermission(RoleId, RoleName) {
    const getRole: IRole = {
      RoleID: RoleId,
      RoleName: RoleName
    };
    this.roleservice.showPermission(getRole);
    this.router.navigate(['/theme/rolepermission']);
  }


  /*---- Edit Section ------*/
  onedit(RoleID, content) {
    this.RoleID = RoleID;
    this.Editdetails(content);
  }
  Editdetails(content) {
    // this.myModal.show();
    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
    const editrole: Iedit = {

      RoleID: this.RoleID

    };
    this.roleservice.editroledetails(editrole).subscribe(
      (response) => {
        this.roledetailedit = response;


        this.role.rolename.setValue(this.roledetailedit[0].RoleName);
        this.role.roledesc.setValue(this.roledetailedit[0].RoleDesc);

      });
  }
  /*------ End --------*/


  /*------- Delete Function ----------*/
  deleteroletable(value, content1) {
    //this.DelModal.show();
    this.deletevalue = value;
    this.modalReference = this.modalService.open(content1, this.ngbModalOptions);

  }

  DeleteTableDetails() {
    const roledelete: IGetrole = {

      RoleID: this.deletevalue

    };

    this.roleservice.deleterole(roledelete).subscribe(
      (response) => {
        //this.DelModal.hide();

        this.getallroledetails();
        this.toaster.success("Role Deleted Successfully", "Success");
        this.modalReference.close();
      });
  }
  exportPdf() {

    let doc = new jsPDF('l', 'pt');
    doc.autoTable(this.exportColumns, this.roledetails); // typescript compile time error
    doc.save('name' + new Date().getTime() + '.pdf');
  }
  // export() {
  //   this.exportService.exportExcel(this.exportColumns, 'cols');
  // }
  exportExcel() {

    / table id is passed over here /
    let element = document.getElementById('texport');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    / generate workbook and add the worksheet /
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    / save to file /
    XLSX.writeFile(wb, 'export table.xlsx');
  }
  /*------- End -------*/
}
