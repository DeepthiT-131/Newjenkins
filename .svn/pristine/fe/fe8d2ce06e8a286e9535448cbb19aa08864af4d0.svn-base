import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/helper/toaster.service';
import { HelperService } from 'src/app/helper/helper.service';
import { NoWhitespaceValidator } from 'src/app/helper/no-whitespace.validator';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import {TreeNode} from '../interfaces/itreetable';
import {TreeNode, IGettreetable, Iaddtreetable, Iedit, Itreetabledelete } from '../interfaces/itreetable';
import { TreetableService } from '../services/treetable.service';

@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.css']
})
export class TreetableComponent implements OnInit {

  files1: TreeNode[];
  modalReference: NgbModalRef;
  treetableForm: FormGroup;
  treetableSubForm:FormGroup;
  submitClick = false;
  submitted = false;
  deletevalue:any;
  treetabledetails: any;
  TreetableCode: any;
  checkeditdetails:any;
  treetable_ID: any;
  loginInfo:any;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
    public dtTrigger: Subject<any> = new Subject();
    @ViewChild(DataTableDirective,{static: false}) dtElement: DataTableDirective; 
    // @ViewChild('DelModal',{static: false}) DelModal;
    
    // @ViewChild('CategoryModal',{static: true}) myModal;
    dtOptions: DataTables.Settings = {};

  constructor(private treetableService: TreetableService, private formBuilder: FormBuilder,private toaster:ToasterService,
    private helper:HelperService,private router: Router,private modalService: NgbModal) { }

  ngOnInit() {

    this.loginInfo = this.helper.getValue('LoginInfo');
    
        this.treetableForm = this.formBuilder.group({
          CodeId: ['', [Validators.required]],
          name: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
        });
        
        this.treetableSubForm = this.formBuilder.group({
          Subcode: ['', [Validators.required]],
          Subname: ['', [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
        });
        this.getAllTreeTable();

        this.treetableService.getFilesystem().then(files => this.files1 = files);
  }

  get treetable() { return this.treetableForm.controls; }
  get treetableSub() { return this.treetableSubForm.controls; }

  showModal(content) {
   
    this.submitted=false;
    this.treetableForm.reset();
    this.modalReference =  this.modalService.open(content,this.ngbModalOptions);
    this.treetable_ID=0;
  
  }
  SubshowModal(Subcontent) {
   
    this.submitted=false;
    this.treetableSubForm.reset();
    this.modalReference =  this.modalService.open(Subcontent,this.ngbModalOptions);
  
  }

  getAllTreeTable()
  {
  
    const Treetable: IGettreetable = {

    TenantId:1,
    LanguageId:1
    };

    // getall Treetable
    this.treetableService.getdatadetails(Treetable).subscribe(
      (response) => {

        this.treetabledetails = response;
      },
      error => {
        //this.toaster.error("Error while getting seamer details", "Error!");
      });
  }


  onSubmit(treetablevalue)
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.treetableForm.invalid) {
      return;
    }

    const Inserttreetable: Iaddtreetable = {
      Ca_ID: this.treetable_ID > 0 ? this.treetable_ID : 0,
    TreetableCode :this.TreetableCode,
    CategoryName:treetablevalue.CategoryName,   
    CategoryDesc:treetablevalue.CategoryDesc,      
  
    CreatedBY:41,
    TenantId:1, 
    LanguageId:1
  
    
    };
   

    this.treetableService.addUpdatedetails(Inserttreetable).subscribe(
      (response) => {
        this.getAllTreeTable();
        this.treetableForm.reset();
     
        this.toaster.success("Data Added Successfully","Success");
        this.submitted = false;
        this.modalReference.close();
      },
  
      error => {
        this.toaster.error("Some error occurred.Please try again","Error");
        this.submitted = false;
       // this.myModal.hide();
      
        
      
      });
  }
  onSubSubmit(treetablesubvalue)
  {
 
    this.submitted = true;
    // stop here if form is invalid
    if (this.treetableSubForm.invalid) {
      return;
    }

    const Insertsubtreetable: Iaddtreetable = {
      Ca_ID: this.treetable_ID > 0 ? this.treetable_ID : 0,
    TreetableCode :this.TreetableCode,
    CategoryName:treetablesubvalue.CategoryName,   
    CategoryDesc:treetablesubvalue.CategoryDesc,      
  
    CreatedBY:41,
    TenantId:1, 
    LanguageId:1
  
    
    };
   

    this.treetableService.addUpdatedetails(Insertsubtreetable).subscribe(
      (response) => {
        this.getAllTreeTable();
        this.treetableSubForm.reset();
     
        this.toaster.success("Data Added Successfully","Success");
        this.submitted = false;
        this.modalReference.close();
      },
  
      error => {
        this.toaster.error("Some error occurred.Please try again","Error");
        this.submitted = false;
       // this.myModal.hide();
      
        
      
      });
  }

      
    /*---- Edit Section ------*/
    onedit(Subcontent)
      {
        // this.TreetableCode=TreetableCode;
        this.Editdetails(Subcontent);
        
      }
      Editdetails(Subcontent)
      {
        
       // this.myModal.show();
       this.modalReference = this.modalService.open(Subcontent,this.ngbModalOptions);
        const edittreetable: Iedit = {
    
          TreetableCode:this.TreetableCode
          
        };
      this.treetableService.editdetails(edittreetable).subscribe(
        (response) => {
          this.checkeditdetails=response;
 
        this.treetable_ID=this.checkeditdetails[0].Ca_ID;
     
           this.treetableSub.CategoryName.setValue(this.checkeditdetails[0].CategoryName);
           this.treetableSub.CategoryDesc.setValue(this.checkeditdetails[0].CategoryDesc);
          
        });
      }
      /*------ End --------*/
    Deletedata(Deletecontent)
      {

        // this.deletevalue=value;
        this.modalReference = this.modalService.open(Deletecontent,this.ngbModalOptions);
        
      }

      DeleteTableDetails() {
      
        const deltreetable:Itreetabledelete = {
      
          Ca_ID:this.deletevalue
          
        };
      
        this.treetableService.Deletedetails(deltreetable).subscribe(
          (response) => {
           //this.DelModal.hide();
            this.getAllTreeTable();
            this.modalReference.close();
  
          });
      }
}
