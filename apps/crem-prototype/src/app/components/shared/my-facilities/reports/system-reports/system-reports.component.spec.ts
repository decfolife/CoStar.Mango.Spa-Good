import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemReportsComponent } from './system-reports.component';

describe('SystemReportsComponent', () => {
  let component: SystemReportsComponent;
  let fixture: ComponentFixture<SystemReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SystemReportsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
