import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizationProfileDetailComponent } from './amortization-profile-detail.component';

describe('AmortizationProfileDetailComponent', () => {
  let component: AmortizationProfileDetailComponent;
  let fixture: ComponentFixture<AmortizationProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmortizationProfileDetailComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmortizationProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
