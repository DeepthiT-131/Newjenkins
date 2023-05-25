export interface Iaddcategory {
    Ca_ID: any;
    CategoryName: any;
    CategoryDesc: any;
    ImagePath:any;
    CategoryCode: any,
    CreatedBY : any;
    TenantId:any;
    LanguageId:any;

}


export interface IGetcategory{
    TenantId:any;
    LanguageId:any;
    
 
}


export interface Icategory {
    CategoryCode:any
}

export interface Iedit {
    CategoryCode:any;

}

export interface ICatdelete {
        
    Ca_ID:number;
   
}

export interface IgetLangauge {
    Code:any
}
export interface ImoduleFilter {
    CategoryCode: any,
}
export interface InsertLangauge {
    Code:any;
	LanguageId:any;
	LanguageText: any;
	CreatedBy:any;
}

