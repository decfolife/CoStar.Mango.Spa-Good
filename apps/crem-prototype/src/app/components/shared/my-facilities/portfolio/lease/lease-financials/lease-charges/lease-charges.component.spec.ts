import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseChargesComponent } from './lease-charges.component';

describe('LeaseChargesComponent', () => {
  let component: LeaseChargesComponent;
  let fixture: ComponentFixture<LeaseChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseChargesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
