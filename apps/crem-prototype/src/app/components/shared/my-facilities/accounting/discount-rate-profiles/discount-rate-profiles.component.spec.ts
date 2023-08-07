import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountRateProfilesComponent } from './discount-rate-profiles.component';

describe('DiscountRateProfilesComponent', () => {
  let component: DiscountRateProfilesComponent;
  let fixture: ComponentFixture<DiscountRateProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountRateProfilesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountRateProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
