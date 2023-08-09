import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingProfilesHistoryComponent } from './accounting-profiles-history.component';

describe('AccountingProfilesHistoryComponent', () => {
  let component: AccountingProfilesHistoryComponent;
  let fixture: ComponentFixture<AccountingProfilesHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingProfilesHistoryComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingProfilesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
