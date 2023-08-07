import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRealEstateFinanceArChartCardComponent } from './non-real-estate-finance-ar-chart-card.component';

describe('NonRealEstateFinanceArChartCardComponent', () => {
  let component: NonRealEstateFinanceArChartCardComponent;
  let fixture: ComponentFixture<NonRealEstateFinanceArChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonRealEstateFinanceArChartCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRealEstateFinanceArChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
