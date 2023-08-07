import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizationProfileAccountsCardComponent } from './amortization-profile-accounts-card.component';

describe('AmortizationProfileAccountsCardComponent', () => {
  let component: AmortizationProfileAccountsCardComponent;
  let fixture: ComponentFixture<AmortizationProfileAccountsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmortizationProfileAccountsCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmortizationProfileAccountsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
