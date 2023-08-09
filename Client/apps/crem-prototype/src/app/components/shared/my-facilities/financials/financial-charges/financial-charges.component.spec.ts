import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialChargesComponent } from './financial-charges.component';

describe('FinancialChargesComponent', () => {
  let component: FinancialChargesComponent;
  let fixture: ComponentFixture<FinancialChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialChargesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
