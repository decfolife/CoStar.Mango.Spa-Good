import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableFinancialReportingCardComponent } from './enable-financial-reporting-card.component';

describe('EnableFinancialReportingCardComponent', () => {
  let component: EnableFinancialReportingCardComponent;
  let fixture: ComponentFixture<EnableFinancialReportingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableFinancialReportingCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnableFinancialReportingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
