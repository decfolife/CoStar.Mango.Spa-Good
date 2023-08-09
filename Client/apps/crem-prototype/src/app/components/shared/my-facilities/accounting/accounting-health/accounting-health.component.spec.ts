import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingHealthComponent } from './accounting-health.component';

describe('AccountingHealthComponent', () => {
  let component: AccountingHealthComponent;
  let fixture: ComponentFixture<AccountingHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingHealthComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
