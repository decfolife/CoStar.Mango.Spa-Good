import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseVerificationComponent } from './lease-verification.component';

describe('LeaseVerificationComponent', () => {
  let component: LeaseVerificationComponent;
  let fixture: ComponentFixture<LeaseVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseVerificationComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
