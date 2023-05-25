import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportfilterpopupComponent } from './reportfilterpopup.component';

describe('ReportfilterpopupComponent', () => {
  let component: ReportfilterpopupComponent;
  let fixture: ComponentFixture<ReportfilterpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportfilterpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportfilterpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
