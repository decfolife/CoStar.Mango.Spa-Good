import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRealEstateFinanceApCardComponent } from './non-real-estate-finance-ap-card.component';

describe('NonRealEstateFinanceApCardComponent', () => {
  let component: NonRealEstateFinanceApCardComponent;
  let fixture: ComponentFixture<NonRealEstateFinanceApCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonRealEstateFinanceApCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRealEstateFinanceApCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
