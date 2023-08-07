import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateFinanceArCardComponent } from './real-estate-finance-ar-card.component';

describe('RealEstateFinanceArCardComponent', () => {
  let component: RealEstateFinanceArCardComponent;
  let fixture: ComponentFixture<RealEstateFinanceArCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealEstateFinanceArCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateFinanceArCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
