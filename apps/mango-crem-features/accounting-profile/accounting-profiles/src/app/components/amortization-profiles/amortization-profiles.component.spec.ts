import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AmortizationProfilesComponent } from './amortization-profiles.component';

describe('AmortizationProfilesComponent', () => {
  let component: AmortizationProfilesComponent;
  let fixture: ComponentFixture<AmortizationProfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AmortizationProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmortizationProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
