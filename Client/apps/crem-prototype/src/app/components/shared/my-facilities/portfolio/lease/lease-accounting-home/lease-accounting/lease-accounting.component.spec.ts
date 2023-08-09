import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseAccountingComponent } from './lease-accounting.component';

describe('LeaseAccountingComponent', () => {
  let component: LeaseAccountingComponent;
  let fixture: ComponentFixture<LeaseAccountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseAccountingComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
