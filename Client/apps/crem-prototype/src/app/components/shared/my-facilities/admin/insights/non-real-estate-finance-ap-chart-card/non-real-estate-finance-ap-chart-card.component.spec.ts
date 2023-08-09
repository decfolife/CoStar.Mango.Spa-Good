import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRealEstateFinanceApChartCardComponent } from './non-real-estate-finance-ap-chart-card.component';

describe('NonRealEstateFinanceApChartCardComponent', () => {
  let component: NonRealEstateFinanceApChartCardComponent;
  let fixture: ComponentFixture<NonRealEstateFinanceApChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonRealEstateFinanceApChartCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRealEstateFinanceApChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
