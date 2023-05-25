import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeconfigComponent } from './themeconfig.component';

describe('ThemeconfigComponent', () => {
  let component: ThemeconfigComponent;
  let fixture: ComponentFixture<ThemeconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
