import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingHealthGridComponent } from './accounting-health-grid.component';

describe('AccountingHealthGridComponent', () => {
  let component: AccountingHealthGridComponent;
  let fixture: ComponentFixture<AccountingHealthGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingHealthGridComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingHealthGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
