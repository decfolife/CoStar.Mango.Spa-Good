import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateFinanceApCardComponent } from './real-estate-finance-ap-card.component';

describe('RealEstateFinanceApCardComponent', () => {
  let component: RealEstateFinanceApCardComponent;
  let fixture: ComponentFixture<RealEstateFinanceApCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealEstateFinanceApCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateFinanceApCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
