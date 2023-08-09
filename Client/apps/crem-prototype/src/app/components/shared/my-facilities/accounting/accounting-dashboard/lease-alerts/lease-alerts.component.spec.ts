import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseAlertsCardComponent } from './lease-alerts.component';

describe('PeriodEventCountComponent', () => {
  let component: LeaseAlertsCardComponent;
  let fixture: ComponentFixture<LeaseAlertsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseAlertsCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseAlertsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
