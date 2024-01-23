import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JePaymentInfoComponent } from './je-payment-info.component';

describe('JePaymentInfoComponent', () => {
  let component: JePaymentInfoComponent;
  let fixture: ComponentFixture<JePaymentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JePaymentInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JePaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
