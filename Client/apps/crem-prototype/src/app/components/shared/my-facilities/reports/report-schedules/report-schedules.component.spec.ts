import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSchedulesComponent } from './report-schedules.component';

describe('ReportSchedulesComponent', () => {
  let component: ReportSchedulesComponent;
  let fixture: ComponentFixture<ReportSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportSchedulesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
