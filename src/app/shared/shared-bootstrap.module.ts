import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion'
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
//import { TabsModule } from 'ngx-bootstrap/tabs';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker'
import { ReloadPageComponent } from './reload-page/reload-page.component';
//import { NgxUploaderModule } from 'ngx-uploader';
// import { Errorpage1Component } from './errorpage1/errorpage1.component';



@NgModule({
    imports: [AccordionModule.forRoot(), ModalModule.forRoot(), 
        BsDatepickerModule.forRoot()],
    exports: [AccordionModule, ModalModule,
        BsDatepickerModule],
    declarations: [ReloadPageComponent],
    providers: []
    
})

export class SharedBootstrapModule {

}