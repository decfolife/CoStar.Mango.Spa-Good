import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRealEstateCountsInsightsComponent } from './non-real-estate-counts-insights.component';

describe('NonRealEstateCountsInsightsComponent', () => {
  let component: NonRealEstateCountsInsightsComponent;
  let fixture: ComponentFixture<NonRealEstateCountsInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonRealEstateCountsInsightsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRealEstateCountsInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
