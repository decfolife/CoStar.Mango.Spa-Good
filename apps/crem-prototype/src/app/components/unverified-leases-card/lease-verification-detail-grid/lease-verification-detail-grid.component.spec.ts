import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseVerificationDetailGridComponent } from './lease-verification-detail-grid.component';

describe('LeaseVerificationDetailGridComponent', () => {
  let component: LeaseVerificationDetailGridComponent;
  let fixture: ComponentFixture<LeaseVerificationDetailGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseVerificationDetailGridComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseVerificationDetailGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
