import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerpageComponent } from './triggerpage.component';

describe('TriggerpageComponent', () => {
  let component: TriggerpageComponent;
  let fixture: ComponentFixture<TriggerpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
