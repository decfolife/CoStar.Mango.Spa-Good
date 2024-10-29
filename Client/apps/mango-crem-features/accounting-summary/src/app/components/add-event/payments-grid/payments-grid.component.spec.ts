import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsGridComponent } from './payments-grid.component';

describe('PaymentsGridComponent', () => {
  let component: PaymentsGridComponent;
  let fixture: ComponentFixture<PaymentsGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsGridComponent],
    });
    fixture = TestBed.createComponent(PaymentsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
