import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode, MenuItem } from 'primeng/api';

import { RolepermissionService } from 'src/app/services/rolepermission.service';
import { RoleService } from 'src/app/services/role.service';

import { HelperService } from 'src/app/helper/helper.service';
import { ToasterService } from 'src/app/helper/toaster.service';
import { Router } from '@angular/router';
import { IRole } from 'src/app/interfaces/irole';
import { IgetModules, IsavePermission, IgetallMenu } from 'src/app/interfaces/irolepermission';

@Component({
  selector: 'app-rolepermission',
  templateUrl: './rolepermission.component.html',
  styleUrls: ['./rolepermission.component.css']
})
export class RolepermissionComponent implements OnInit {
  
  files: TreeNode[];
  selectedFiles: TreeNode[] = [];
  loginInfo:any;
  moduledetails:any;
  files1: TreeNode[];
  dataArray: string[] = [];
  SaveArray = [];
  getRoleData:IRole;
  roleId:any;
  roleName:any;
  menudetails:any;
  constructor(private rolepermissionservice: RolepermissionService,private roleService:RoleService,private helper:HelperService,
    private toaster:ToasterService, private router: Router,) {}

    ngOnInit() {
      this.loginInfo = this.helper.getValue('LoginInfo');
      this.roleService.roleIdData.subscribe(data => 
        this.getRoleData = data
      );
      this.roleId= this.getRoleData.RoleID;
      this.roleName= this.getRoleData.RoleName;
      this.getMenudetails();
     
   
    }
    getMenudetails(){
      const common: IgetallMenu = {
        RoleId: this.roleId,
        LanguageID:1,
        TenantId:1,
        
      };
     
      // getall dispatch summary
      this.rolepermissionservice.GetAllMenuDetails(common).subscribe(
        (response) => {
  
          this.menudetails = response;
          
          this.menudetails.forEach(parentnode => {
              if (parentnode.children) {
       
                  parentnode.children.forEach(e => {
                      if(e.ReadAccess)
                      {
                          this.dataArray.push(e.ModuleId);
                      }
  
                  });
              }
          });
          
          this.getModuleDetails();
          
        
   
   
         
     
        });
    }
  getModuleDetails()
  {
    const common: IgetModules = {
      
        RoleId:this.roleId,
        TenantId:this.loginInfo.TenantId,
        LanguageId:this.loginInfo.LanguageId,
        
      };
  
      // getall dispatch summary
      this.rolepermissionservice.getmoduledetails(common).subscribe(
        (response) => {
          this.files1 = response;
          this.checkNode(this.files1, this.dataArray);
       
        });
      }
      checkNode(nodes:TreeNode[], str:string[]) {
        for(let i=0 ; i < nodes.length ; i++) {
          //   if(nodes[i].children.length>0)
          //   {
            if(!nodes[i].leaf && (nodes[i].children["length"]>0 && nodes[i].children[0].leaf)) {
                for(let j=0 ; j < nodes[i].children.length ; j++) {
                    if(str.includes(nodes[i].children[j].label)) {
                        if(!this.selectedFiles.includes(nodes[i].children[j])){
                            this.selectedFiles.push(nodes[i].children[j]);
                        }
                    }
                }
            }
            if (nodes[i].leaf) {
                return;
            }
            this.checkNode(nodes[i].children, str);
            let count = nodes[i].children.length;
            let c = 0;
            for(let j=0 ; j < nodes[i].children.length ; j++) {
                if(this.selectedFiles.includes(nodes[i].children[j])) {
                    c++;
                }
                if(nodes[i].children[j].partialSelected) nodes[i].partialSelected = true;
            }
            if(c == 0) {}
            else if(c == count) { 
                nodes[i].partialSelected = false;
                if(!this.selectedFiles.includes(nodes[i])){
                    this.selectedFiles.push(nodes[i]); 
                }
            }
            else {
                nodes[i].partialSelected = true;
            }
         // }
        }
    }
     
      nodeSelect(event) {
        this.selectNode(event.node);
       
    }
      
      nodeUnselect(event) {
        this.unselectNode(event.node)
  
    }
    AllSelected(event)
    {
     if(event.checked)
     {
      
   this.selectAllNode(this.files1);
     }
     else{
      this.unselectAllNode(this.files1);
     }
      
    }
    selectNode(nodes) {
      if(nodes.data.ReadAccess==0)
      {
        nodes.data.ReadAccess=1;
        nodes.data.AddAccess=true;
        nodes.data.EditAccess=true;
        nodes.data.DeleteAccess=true;
      
      }else{
      for(let i=0 ; i < nodes.children.length ; i++) {
        
          if(nodes.children[i].data.ReadAccess==undefined)
          {
  
          if(nodes.children[i].children.length>0)
          this.selectNode(nodes.children[i]);
      }
      else if(nodes.children[i].data.ReadAccess==0)
      {
        nodes.children[i].data.ReadAccess=1;
        nodes.children[i].data.AddAccess=true;
        nodes.children[i].data.EditAccess=true;
        nodes.children[i].data.DeleteAccess=true;
   
      }
      }
    }
  }
  unselectNode(nodes) {
    if(nodes.data.ReadAccess==1)
    {
      nodes.data.ReadAccess=0;
      nodes.data.AddAccess=false;
      nodes.data.EditAccess=false;
      nodes.data.DeleteAccess=false;
      nodes.data.key="0";
    }else{
    for(let i=0 ; i < nodes.children.length ; i++) {
      
        if(nodes.children[i].data.ReadAccess==undefined)
        {
  
        if(nodes.children[i].children.length>0)
        this.unselectNode(nodes.children[i]);
    }
    else if(nodes.children[i].data.ReadAccess==1)
    {
      nodes.children[i].data.ReadAccess=0;
      nodes.children[i].data.AddAccess=false;
      nodes.children[i].data.EditAccess=false;
      nodes.children[i].data.DeleteAccess=false;
      nodes.children[i].data.key="0";
   
    }
    }
  }
  }
  selectAllNode(nodes:TreeNode[]) {
      
        for(let i=0 ; i < nodes.length ; i++) {
          
            if(nodes[i].data.ReadAccess==undefined)
            {
    
            if(nodes[i].children.length>0)
            this.selectAllNode(nodes[i].children);
        }
        else if(nodes[i].data.ReadAccess==0)
        {
          nodes[i].data.ReadAccess=1;
          nodes[i].data.AddAccess=true;
          nodes[i].data.EditAccess=true;
          nodes[i].data.DeleteAccess=true;
         
        }
        }
    }
    unselectAllNode(nodes:TreeNode[]) {
      
      for(let i=0 ; i < nodes.length ; i++) {
        
          if(nodes[i].data.ReadAccess==undefined)
          {
  
          if(nodes[i].children.length>0)
          this.unselectAllNode(nodes[i].children);
      }
      else if(nodes[i].data.ReadAccess==1)
      {
        nodes[i].data.ReadAccess=0;
        nodes[i].data.AddAccess=false;
        nodes[i].data.EditAccess=false;
        nodes[i].data.DeleteAccess=false;
    
      }
      }
  }
  onsubmit()
    {
      this.SaveArray=[];
    for(let i=0 ; i < this.selectedFiles.length ; i++) {
      if(this.selectedFiles[i].data.ReadAccess==1)
      {
        this.SaveArray.push(this.selectedFiles[i].data);
      
      }
   
    }
    const getTransfer: IsavePermission= {
      RoleId : this.roleId,
      CreatedBy:this.loginInfo.UserId,
      TenantId:this.loginInfo.TenantId,
      LanguageId:this.loginInfo.LanguageId,
      ListRoleManagement:this.SaveArray,
      
    }
  
    this.rolepermissionservice.SavePermission(getTransfer).subscribe(
      (response) => {
       
    
        this.router.navigate(["/theme/role"]);
        this.toaster.success("Role Permissions Saved Successfully");
        
      },
  
      error => {
        this.toaster.error("Some error occurred.Please try again","Error");
       
      
      });
  }
  
}
