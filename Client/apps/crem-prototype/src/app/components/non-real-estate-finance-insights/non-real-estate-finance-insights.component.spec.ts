import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRealEstateFinanceInsightsComponent } from './non-real-estate-finance-insights.component';

describe('NonRealEstateFinanceInsightsComponent', () => {
  let component: NonRealEstateFinanceInsightsComponent;
  let fixture: ComponentFixture<NonRealEstateFinanceInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonRealEstateFinanceInsightsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRealEstateFinanceInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
