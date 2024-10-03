import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingHistoryComponent } from './accounting-history.component';

describe('AccountingHistoryComponent', () => {
  let component: AccountingHistoryComponent;
  let fixture: ComponentFixture<AccountingHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AccountingHistoryComponent]
    });
    fixture = TestBed.createComponent(AccountingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
