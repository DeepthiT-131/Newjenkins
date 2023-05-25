import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataTablesModule } from 'angular-datatables'
import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule, TreeModule, TreeTableModule, ConfirmationService } from 'primeng/primeng';
import { TooltipModule } from 'primeng/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputSwitchModule } from 'primeng/inputswitch';

import { TableModule } from 'primeng/table';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { ThemeComponent } from './theme/theme.component';

import { ThemeconfigComponent } from './themeconfig/themeconfig.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { Login1Component } from './login1/login1.component';
import { DynamicformpreviewComponent } from './dynamicformpreview/dynamicformpreview.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicPopupComponent } from './dynamic-popup/dynamic-popup.component';
import { CategoryComponent } from './admin/category/category.component';
import { SubCategoryComponent } from './admin/sub-category/sub-category.component';
import { TablePopupComponent } from './table-popup/table-popup.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { FormModuleComponent } from './admin/form-module/form-module.component';
import { RoleComponent } from './admin/role/role.component';

import { CalendarModule } from 'primeng/calendar';

import { UserComponent } from './admin/user/user.component';
import { RolepermissionComponent } from './admin/rolepermission/rolepermission.component';
import { RadioButtonModule, CheckboxModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/tabview';
import { UserloginComponent } from './userlogin/userlogin.component';
import { LayoutComponent } from './layout/layout.component';

import { PreviewComponent } from './preview/preview.component';
import { TreetableComponent } from './treetable/treetable.component';


import { SanitizeHtmlPipe } from './helper/SanitizeHtmlPipe';
import { SplitValuePipe } from './helper/splitValue';

import { CalculationWidgetComponent } from './calculation-widget/calculation-widget.component';
import { ReportBuilderComponent } from './report-builder/report-builder.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedBootstrapModule } from './shared/shared-bootstrap.module';
import { CalculatorforRBComponent } from './calculatorfor-rb/calculatorfor-rb.component';

import { DragDropModule } from 'primeng/dragdrop';
import { SignaturePadModule } from 'angular2-signaturepad';

import { ReportfilterpopupComponent } from './reportfilterpopup/reportfilterpopup.component';
import { DigitalSignatureComponent } from './digital-signature/digital-signature.component';
import { ReportComponent } from './report/report.component';
import { FooterComponent } from './footer/footer.component';

import { EditorModule } from 'primeng/editor';
import { TriggerpageComponent } from './triggerpage/triggerpage.component';
import { CalenderComponent } from './calender/calender.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CategoryViewComponent } from './category-view/category-view.component';
import { SubCategoryViewComponent } from './sub-category-view/sub-category-view.component';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { EnvServiceProvider } from './env.service.provider';
import { TenantdetailsComponent } from './tenantdetails/tenantdetails.component';
import { RuleengineComponent } from './ruleengine/ruleengine.component';
import { ViewPageComponent } from './User/view-page/view-page.component';
import { ViewKanbanComponent } from './User/view-kanban/view-kanban.component';
import { ViewMultichildComponent } from './User/view-multichild/view-multichild.component';
import { MasterViewComponent } from './User/master-view/master-view.component';
import { ViewReportComponent } from './User/view-report/view-report.component';
import { ViewCalendarComponent } from './User/view-calendar/view-calendar.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SubformComponent } from './admin/subform/subform.component';
import { DropdownModule } from 'primeng/dropdown';
import { SafePipeModule } from 'safe-pipe';
import { ReloadPageComponent } from './shared/reload-page/reload-page.component';

const appRoutes: Routes = [

  { path: 'FormBuilder', component: DynamicFormBuilderComponent },
  { path: 'reportbuilder', component: ReportBuilderComponent },
  //  { path: 'efoliobuilder', component: EfolioBuilderComponent },
  { path: 'filterpopup', component: ReportfilterpopupComponent },
  { path: 'RolePermission', component: RolepermissionComponent },
  { path: 'themeconfig', component: ThemeconfigComponent },

  { path: 'loginconfig', component: Login1Component },
  { path: '', component: UserloginComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'trigger', component: TriggerpageComponent },
  { path: 'header', component: ThemeComponent },

  {
    path: 'theme', component: ThemeComponent,

    children: [
      { path: 'user', component: UserComponent },
      { path: 'role', component: RoleComponent },
      { path: 'rolepermission', component: RolepermissionComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'subForm', component: SubformComponent },
      { path: 'subcategory', component: SubCategoryComponent },
      { path: 'form', component: FormModuleComponent },
      { path: 'tenantdetails', component: TenantdetailsComponent },

      { path: 'dynform', component: DynamicFormComponent },

      { path: 'Preview/:id', component: MasterViewComponent },
   
      { path: 'digitalsignature', component: DigitalSignatureComponent },
      { path: 'report', component: ReportComponent },
      { path: 'calender', component: CalenderComponent },

      { path: 'CategoryView', component: CategoryViewComponent },
      { path: 'SubCategoryView', component: SubCategoryViewComponent },
      { path: 'Reload', component: ReloadPageComponent },
    ]
  },

  {
    path: 'layout', component: LayoutComponent,
    children: [
      { path: 'calculationwidget', component: CalculationWidgetComponent },
      { path: 'calculatorRB', component: CalculatorforRBComponent },
      { path: 'treetable', component: TreetableComponent },


    ]
  },

];

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormBuilderComponent,
    ThemeComponent,

    ThemeconfigComponent,
    Login1Component,
    DynamicformpreviewComponent,

    PreviewComponent,
    TablePopupComponent,
    TableFilterComponent,
    SanitizeHtmlPipe,
    SplitValuePipe,
    DynamicFormComponent,
    DynamicPopupComponent,
    CategoryComponent,
    SubCategoryComponent,
    FormModuleComponent,
    RoleComponent,
    UserComponent,
    RolepermissionComponent,
    UserloginComponent,
    LayoutComponent,
    TreetableComponent,

    CalculationWidgetComponent,
    ReportBuilderComponent,
    CalculatorforRBComponent,

    ReportfilterpopupComponent,
    DigitalSignatureComponent,
    ReportComponent,
    FooterComponent,
    RuleengineComponent,
    TriggerpageComponent,
    CalenderComponent,
    CategoryViewComponent,
    SubCategoryViewComponent,
    // EfolioBuilderComponent,
    // EfoliopopupComponent,
    TenantdetailsComponent,
    ViewPageComponent,
    ViewKanbanComponent,
    ViewMultichildComponent,
    MasterViewComponent,
    ViewReportComponent,
    ViewCalendarComponent,
    SubformComponent


  ],
  entryComponents: [DynamicPopupComponent, TablePopupComponent, RuleengineComponent], //,EfoliopopupComponent
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CheckboxModule,
    TreeModule,
    TreeTableModule,
    RadioButtonModule,
    CheckboxModule,
    TabViewModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    HttpClientModule,
    TooltipModule,
    TableModule,
    InputSwitchModule,
    NgxSpinnerModule,
    MenubarModule,
    MultiSelectModule,
    SharedBootstrapModule,
    NgbModule,
    ConfirmDialogModule,
    HttpModule,
    DragDropModule,
    SignaturePadModule,
    EditorModule,
    AmazingTimePickerModule,
    FullCalendarModule,
    DropdownModule,
    SafePipeModule,
    ToastrModule.forRoot(),
    DataTablesModule.forRoot(),
    // ModalModule.forRoot(),
    NgxDnDModule.forRoot(),
    TimepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),

  ],
  providers: [EnvServiceProvider, ConfirmationService, NgbActiveModal, SignaturePad],
  bootstrap: [AppComponent]

})
export class AppModule { }
// export function initAppService(appService: AppService) {
//   return () => appService.init();
// }
