import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateFinanceArChartCardComponent } from './real-estate-finance-ar-chart-card.component';

describe('RealEstateFinanceArChartCardComponent', () => {
  let component: RealEstateFinanceArChartCardComponent;
  let fixture: ComponentFixture<RealEstateFinanceArChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealEstateFinanceArChartCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateFinanceArChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
