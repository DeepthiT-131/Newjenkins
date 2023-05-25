import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModuleComponent } from './form-module.component';

describe('FormModuleComponent', () => {
  let component: FormModuleComponent;
  let fixture: ComponentFixture<FormModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
