import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseFinancialsComponent } from './lease-financials.component';

describe('LeaseFinancialsComponent', () => {
  let component: LeaseFinancialsComponent;
  let fixture: ComponentFixture<LeaseFinancialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseFinancialsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseFinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
