import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationWidgetComponent } from './calculation-widget.component';

describe('CalculationWidgetComponent', () => {
  let component: CalculationWidgetComponent;
  let fixture: ComponentFixture<CalculationWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculationWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
