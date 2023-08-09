import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseAccountingHomeComponent } from './lease-accounting-home.component';

describe('LeaseAccountingHomeComponent', () => {
  let component: LeaseAccountingHomeComponent;
  let fixture: ComponentFixture<LeaseAccountingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseAccountingHomeComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseAccountingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
