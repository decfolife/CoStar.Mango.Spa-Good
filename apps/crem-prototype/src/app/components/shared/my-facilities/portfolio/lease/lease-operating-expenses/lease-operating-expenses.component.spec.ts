import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseOperatingExpensesComponent } from './lease-operating-expenses.component';

describe('LeaseOperatingExpensesComponent', () => {
  let component: LeaseOperatingExpensesComponent;
  let fixture: ComponentFixture<LeaseOperatingExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseOperatingExpensesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseOperatingExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
