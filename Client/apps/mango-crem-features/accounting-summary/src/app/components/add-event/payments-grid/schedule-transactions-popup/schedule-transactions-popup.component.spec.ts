import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTransactionsPopupComponent } from './schedule-transactions-popup.component';

describe('ScheduleTransactionsPopupComponent', () => {
  let component: ScheduleTransactionsPopupComponent;
  let fixture: ComponentFixture<ScheduleTransactionsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScheduleTransactionsPopupComponent],
    });
    fixture = TestBed.createComponent(ScheduleTransactionsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
