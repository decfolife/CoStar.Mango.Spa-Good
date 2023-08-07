import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountRateProfileListComponent } from './discount-rate-profile-list.component';

describe('DiscountRateProfileListComponent', () => {
  let component: DiscountRateProfileListComponent;
  let fixture: ComponentFixture<DiscountRateProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountRateProfileListComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountRateProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
