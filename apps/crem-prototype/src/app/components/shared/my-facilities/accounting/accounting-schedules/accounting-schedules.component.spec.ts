import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingSchedulesComponent } from './accounting-schedules.component';

describe('AccountingSchedulesComponent', () => {
  let component: AccountingSchedulesComponent;
  let fixture: ComponentFixture<AccountingSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingSchedulesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
