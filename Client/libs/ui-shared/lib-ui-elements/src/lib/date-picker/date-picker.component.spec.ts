import { DxDateBoxComponent } from 'devextreme-angular/ui/date-box';
import { DatePickerComponent } from './date-picker.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DxValidatorComponent,
  DxValidatorModule,
} from 'devextreme-angular/ui/validator';
import { DxValidationSummaryModule } from 'devextreme-angular';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DxValidatorModule, DxValidationSummaryModule],
      declarations: [DatePickerComponent, DxDateBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#setDisabledState should set disabled to isDisabled', () => {
    component.disabled = true;

    component.setDisabledState(false);
    
    expect(component.disabled).toBe(false);
  });

  it('#writeValue should set value', () => {
    component.writeValue('value');

    expect(component.value).toEqual('value');
  });

  it('#registerOnChange should assign function passed as parameter to onChange', () => {
    const registerOnChangeMockFunction = jest.fn(() => '06/16/1993');

    component.registerOnChange(registerOnChangeMockFunction);

    expect(component.onChange).toEqual(registerOnChangeMockFunction);
  });

  it('#registerOnTouched should assign function passed as parameter to onTouched', () => {
    const registerOnTouchedMockFunction = jest.fn(() => true);

    component.registerOnTouched(registerOnTouchedMockFunction);

    expect(component.onTouch).toEqual(registerOnTouchedMockFunction);
  });

  it('#onValueChanged', () => {
    const mockEvent = {
      value: 'some value',
    };
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const onTouchSpy = jest.spyOn(component, 'onTouch');
    const onChangeEventSpy = jest.spyOn(component.changeEvent, 'emit');

    component.onValueChanged(mockEvent);

    expect(onChangeSpy).toHaveBeenCalledWith(mockEvent.value);
    expect(onTouchSpy).toHaveBeenCalled();
    expect(onChangeEventSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('#focusDatePicker', () => {
    const datePickerComponent: DxDateBoxComponent =
      fixture.componentInstance.datePickerComponent;
    const focusDatePickerSpy = jest.spyOn(
      datePickerComponent.instance,
      'focus'
    );

    component.focusDatePicker();

    expect(focusDatePickerSpy).toHaveBeenCalled();
  });

  it('#validate', () => {
    const dateBoxValidator: DxValidatorComponent =
      fixture.componentInstance.dateBoxValidator;
    dateBoxValidator.instance['validate'] = function () {
      return {
        isValid: true,
      };
    };

    const validateResponse = component.validate();

    expect(validateResponse).toBe(true);
  });
});
