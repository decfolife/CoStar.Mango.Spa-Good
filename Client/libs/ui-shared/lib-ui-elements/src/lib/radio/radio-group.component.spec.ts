import { CremRadioGroupComponent } from './radio-group.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CremRadioService } from './radio.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimpleChange, forwardRef } from '@angular/core';

describe('CremRadioGroupComponent', () => {
  let component: CremRadioGroupComponent;
  let fixture: ComponentFixture<CremRadioGroupComponent>;
  let service: CremRadioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CremRadioGroupComponent],
      providers: [
        CremRadioService,
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => CremRadioGroupComponent),
          multi: true,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CremRadioGroupComponent);
    service = TestBed.inject(CremRadioService);
    component = fixture.componentInstance;
    fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnChanges when name and disabled simplechange exists', () => {
    jest.spyOn(service, 'setName');
    jest.spyOn(service, 'setDisabled');
    const onTouchedSpy = jest.spyOn(component, 'onTouched');

    const simpleChangesMock = {
      name: new SimpleChange(undefined, 'radio-group-3', true),
      disabled: new SimpleChange(undefined, false, true),
    };
    component.name = 'some name';
    component.disabled = true;
    component.ngOnChanges(simpleChangesMock);

    expect(onTouchedSpy).toHaveBeenCalledTimes(2);
  });

  it('#registerOnChange should assign function passed as parameter to onChange', () => {
    const registerOnChangeMockFunction = jest.fn(() => 'New York');
    component.registerOnChange(registerOnChangeMockFunction);

    expect(component.onChange).toEqual(registerOnChangeMockFunction);
  });

  it('#registerOnTouched should assign function passed as parameter to onTouched', () => {
    const registerOnTouchedMockFunction = jest.fn(() => true);
    component.registerOnTouched(registerOnTouchedMockFunction);

    expect(component.onTouched).toEqual(registerOnTouchedMockFunction);
  });

  it('#setDisabledState when isDisabled is true and @Input() disabled is false', () => {
    jest.spyOn(service, 'setDisabled');
    component.disabled = false;
    component.setDisabledState(true);

    expect(component.disabled).toBe(true);
  });

  it('#writeValue', () => {
    jest.spyOn(service, 'select');
    component.disabled = false;
    component.writeValue('value');

    expect(component.value).toBe('value');
  });
});
