import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingEventChartCardComponent } from './accounting-event-chart-card.component';

describe('AccountingEventChartCardComponent', () => {
  let component: AccountingEventChartCardComponent;
  let fixture: ComponentFixture<AccountingEventChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingEventChartCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingEventChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
