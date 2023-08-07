import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateCountsInsightsComponent } from './real-estate-counts-insights.component';

describe('RealEstateCountsInsightsComponent', () => {
  let component: RealEstateCountsInsightsComponent;
  let fixture: ComponentFixture<RealEstateCountsInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealEstateCountsInsightsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateCountsInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
