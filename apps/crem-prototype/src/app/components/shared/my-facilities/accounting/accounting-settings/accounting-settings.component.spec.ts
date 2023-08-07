import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingSettingsComponent } from './accounting-settings.component';

describe('AccountingSettingsComponent', () => {
  let component: AccountingSettingsComponent;
  let fixture: ComponentFixture<AccountingSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingSettingsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
