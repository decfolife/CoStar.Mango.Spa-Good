import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCriteriaComponent } from './report-criteria.component';

describe('ReportCriteriaComponent', () => {
  let component: ReportCriteriaComponent;
  let fixture: ComponentFixture<ReportCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportCriteriaComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
