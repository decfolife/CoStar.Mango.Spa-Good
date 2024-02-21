import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCalculatorComponent } from './date-calculator.component';

describe('DateCalculatorComponent', () => {
  let component: DateCalculatorComponent;
  let fixture: ComponentFixture<DateCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateCalculatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
