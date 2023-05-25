export interface IaddUpdateformdetails {
	FormID: any;
	FormDisplayName: any;
	FormDesc: any;
	SQFNumber: any;
	DesignedBY: any;
	DesignedOn: any;
	FormCategory: any;
	FormCode: any;
	FormName: any;
	DisplayOrder: any
	CreatedBy: any;
	TenantId: any;
	LanguageId: any;
	IsForm: any;
	IsChild: any;
	ParentCode: any;
	GroupName: any;
}

export interface Ieditformdetails {
	FormCode: any
}

export interface Igetformdetails {
	FormCategory: any;
	TenantId: any;
	LanguageId: any;
	IsForm: any;
	IsChild?: any;
}
export interface Igetallisform {
	IsForm: any;
}
export interface IgetFormCode {
	FormCode: any;
}
export interface Iformdetailsdelete {
	FormID: any;
}

export interface IRoles {
	RoleID: any
	TenantId: any;
	LanguageId: any;
}

export interface IsendFormDetails {
	RoleID: any
}

export interface IgetLangauge {
	Code: any
}

export interface InsertLangauge {
	Code: any;
	LanguageId: any;
	LanguageText: any;
	CreatedBy: any;
}