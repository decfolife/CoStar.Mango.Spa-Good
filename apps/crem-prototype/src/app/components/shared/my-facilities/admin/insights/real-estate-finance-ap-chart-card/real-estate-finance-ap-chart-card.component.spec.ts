import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateFinanceApChartCardComponent } from './real-estate-finance-ap-chart-card.component';

describe('RealEstateFinanceApChartCardComponent', () => {
  let component: RealEstateFinanceApChartCardComponent;
  let fixture: ComponentFixture<RealEstateFinanceApChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealEstateFinanceApChartCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateFinanceApChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
