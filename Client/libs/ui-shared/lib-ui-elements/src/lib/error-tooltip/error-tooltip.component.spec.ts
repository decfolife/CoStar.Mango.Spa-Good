import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorTooltipComponent } from './error-tooltip.component';

describe('ErrorTooltipComponent', () => {
  let component: ErrorTooltipComponent;
  let fixture: ComponentFixture<ErrorTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorTooltipComponent],
    });
    fixture = TestBed.createComponent(ErrorTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
