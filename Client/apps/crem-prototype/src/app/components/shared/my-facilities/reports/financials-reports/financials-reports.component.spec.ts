import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsReportsComponent } from './financials-reports.component';

describe('FinancialsReportsComponent', () => {
  let component: FinancialsReportsComponent;
  let fixture: ComponentFixture<FinancialsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialsReportsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
