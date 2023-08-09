import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingScheduleComponent } from './accounting-schedule.component';

describe('AccountingScheduleComponent', () => {
  let component: AccountingScheduleComponent;
  let fixture: ComponentFixture<AccountingScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingScheduleComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
