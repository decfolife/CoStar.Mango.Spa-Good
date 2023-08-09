import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCategoriesComponent } from './budget-categories.component';

describe('BudgetCategoriesComponent', () => {
  let component: BudgetCategoriesComponent;
  let fixture: ComponentFixture<BudgetCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetCategoriesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
