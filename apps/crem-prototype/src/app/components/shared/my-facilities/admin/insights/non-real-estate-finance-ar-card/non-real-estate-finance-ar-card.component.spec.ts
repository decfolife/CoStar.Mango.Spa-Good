import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRealEstateFinanceArCardComponent } from './non-real-estate-finance-ar-card.component';

describe('NonRealEstateFinanceArCardComponent', () => {
  let component: NonRealEstateFinanceArCardComponent;
  let fixture: ComponentFixture<NonRealEstateFinanceArCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonRealEstateFinanceArCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRealEstateFinanceArCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
