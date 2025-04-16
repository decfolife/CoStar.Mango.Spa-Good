import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormLeaseVerificationComponent } from './dynamic-form-lease-verification.component';

describe('DynamicFormLeaseVerificationComponent', () => {
  let component: DynamicFormLeaseVerificationComponent;
  let fixture: ComponentFixture<DynamicFormLeaseVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormLeaseVerificationComponent],
    });
    fixture = TestBed.createComponent(DynamicFormLeaseVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
