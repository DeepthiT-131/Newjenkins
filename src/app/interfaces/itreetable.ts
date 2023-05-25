
export interface TreeNode {
    data?: any;
    children?: TreeNode[];
    leaf?: boolean;
    expanded?: boolean;
}


export interface Iaddtreetable {
    Ca_ID: any;
    CategoryName: any;
    CategoryDesc: any;
    TreetableCode: any,
    CreatedBY : any;
    TenantId:any;
    LanguageId:any;

}


export interface IGettreetable {
    TenantId:any;
    LanguageId:any;
    
 
}


export interface Icategory {
    TreetableCode:any
}

export interface Iedit {
    TreetableCode:any;

}

export interface Itreetabledelete {
        
    Ca_ID:number;
   
}
