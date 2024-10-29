import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseAlertsControlsComponent } from './lease-alerts-controls.component';

describe('LeaseAlertsComponent', () => {
  let component: LeaseAlertsControlsComponent;
  let fixture: ComponentFixture<LeaseAlertsControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaseAlertsControlsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseAlertsControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
