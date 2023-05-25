import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformpreviewComponent } from './dynamicformpreview.component';

describe('DynamicformpreviewComponent', () => {
  let component: DynamicformpreviewComponent;
  let fixture: ComponentFixture<DynamicformpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicformpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicformpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
