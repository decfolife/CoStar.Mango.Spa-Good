import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountRateProfileDetailComponent } from './discount-rate-profile-detail.component';

describe('DiscountRateProfileDetailComponent', () => {
  let component: DiscountRateProfileDetailComponent;
  let fixture: ComponentFixture<DiscountRateProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountRateProfileDetailComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountRateProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
