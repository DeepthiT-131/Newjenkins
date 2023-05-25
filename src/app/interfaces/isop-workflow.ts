export interface IaddUpdate {

    WorkTypeID?;
	WorkTypeName?;
	WorkTypeDesc?;
	ParentworkTypeID?;
	Category?;
	CreatedBy?;
	LanguageID?;
	TenantID?;
	

}
// export interface IaddSubUpdate {

//     ParentworkTypeID:any;
//     WorkTypeName:any;
// 	WorkTypeDesc:any;
// 	Category:any;
// 	CreatedBy:any;
// 	LanguageID:any;
// 	TenantID:any;

// }

export interface IGettable {
    WorkTypeID:any;
}

export interface Iedit {
    WorkTypeID:any;

}

export interface Idelete {
        
    WorkTypeID?;
	LanguageID?;
	TenantID?;   
}

