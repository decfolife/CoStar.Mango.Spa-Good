import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldTooltipComponent } from './form-field-tooltip.component';

describe('FormFieldTooltipComponent', () => {
  let component: FormFieldTooltipComponent;
  let fixture: ComponentFixture<FormFieldTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldTooltipComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
