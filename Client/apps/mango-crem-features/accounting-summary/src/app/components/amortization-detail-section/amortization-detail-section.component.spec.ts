import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizationDetailSectionComponent } from './amortization-detail-section.component';

describe('AmortizationDetailSectionComponent', () => {
  let component: AmortizationDetailSectionComponent;
  let fixture: ComponentFixture<AmortizationDetailSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmortizationDetailSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmortizationDetailSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
