import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDetailSectionComponent } from './payments-detail-section.component';

describe('PaymentsDetailSectionComponent', () => {
  let component: PaymentsDetailSectionComponent;
  let fixture: ComponentFixture<PaymentsDetailSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentsDetailSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsDetailSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
