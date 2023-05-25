export interface Iaddsubcategory {
    SubCa_ID :any,
    SubCategoryName :any,
    SubCategoryDesc :any,
    CategoryCode : any,
    SubCategoryDivision: any,
    SubCode: any,
    CreatedBY :any;
    TenantId:any;
    LanguageId:any;
 
}

export interface IeditSubCategory{
    SubCode:any
}

export interface Igetsubcategory {
    CategoryCode?:any;
TenantId:any;
LanguageId:any

}

export interface Igetsubcategoryview {
    RoleID:any;
    CategoryCode:any;
}

export interface Igetcategoryview {
    RoleID:any;
}

export interface ISubGetcategorydelete {
    SubCa_ID:any;

}

export interface IgetLangauge {
    Code:any
}

export interface InsertLangauge {
    Code:any;
	LanguageId:any;
	LanguageText: any;
	CreatedBy:any;
}
