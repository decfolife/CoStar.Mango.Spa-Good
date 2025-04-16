import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormClauseBankComponent } from './dynamic-form-clause-bank.component';

describe('DynamicFormClauseBankComponent', () => {
  let component: DynamicFormClauseBankComponent;
  let fixture: ComponentFixture<DynamicFormClauseBankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormClauseBankComponent],
    });
    fixture = TestBed.createComponent(DynamicFormClauseBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
