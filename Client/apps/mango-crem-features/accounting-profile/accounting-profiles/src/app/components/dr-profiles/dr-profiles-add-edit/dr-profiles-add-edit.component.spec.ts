import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiscountRateProfilesAddEditComponent } from './dr-profiles-add-edit.component';

describe('DiscountRateProfilesAddEditComponent', () => {
  let component: DiscountRateProfilesAddEditComponent;
  let fixture: ComponentFixture<DiscountRateProfilesAddEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountRateProfilesAddEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountRateProfilesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
