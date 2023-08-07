import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingBalanceChartCardComponent } from './accounting-balance-chart-card.component';

describe('AccountingBalanceChartCardComponent', () => {
  let component: AccountingBalanceChartCardComponent;
  let fixture: ComponentFixture<AccountingBalanceChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingBalanceChartCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingBalanceChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
