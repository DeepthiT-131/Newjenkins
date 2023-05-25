import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorforRBComponent } from './calculatorfor-rb.component';

describe('CalculatorforRBComponent', () => {
  let component: CalculatorforRBComponent;
  let fixture: ComponentFixture<CalculatorforRBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorforRBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorforRBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
