import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateFinanceInsightsComponent } from './real-estate-finance-insights.component';

describe('RealEstateFinanceInsightsComponent', () => {
  let component: RealEstateFinanceInsightsComponent;
  let fixture: ComponentFixture<RealEstateFinanceInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealEstateFinanceInsightsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateFinanceInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
