import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseFinancialSettingsComponent } from './lease-financial-settings.component';

describe('LeaseFinancialSettingsComponent', () => {
  let component: LeaseFinancialSettingsComponent;
  let fixture: ComponentFixture<LeaseFinancialSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseFinancialSettingsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseFinancialSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
