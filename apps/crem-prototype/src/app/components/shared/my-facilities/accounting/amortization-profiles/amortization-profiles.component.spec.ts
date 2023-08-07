import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizationProfilesComponent } from './amortization-profiles.component';

describe('AmortizationProfilesComponent', () => {
  let component: AmortizationProfilesComponent;
  let fixture: ComponentFixture<AmortizationProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmortizationProfilesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
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
