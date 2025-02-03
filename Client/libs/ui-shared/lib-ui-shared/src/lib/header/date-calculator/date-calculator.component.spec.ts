import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCalculatorComponent } from './date-calculator.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { of } from 'rxjs';
import { SettingsService } from '@mango/core-shared';

describe('MangoDateCalculator', () => {
  let component: DateCalculatorComponent;
  let fixture: ComponentFixture<DateCalculatorComponent>;

  beforeEach(() => {
    const matDialogRefStub = {
      close: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MangoAppFacade, useValue: { contactRecord$: of({}) } },
        {
          provide: SettingsService,
          useValue: { getClientSettingsForUser: of({}) },
        },
      ],
      imports: [MatDialogModule],
    });

    fixture = TestBed.createComponent(DateCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include the input date', () => {
    component.inputDate = new Date('2025-01-01');
    component.includeInputDate = true;

    component.years = 1;

    component.processDate();

    expect(component.outputDate).toEqual(new Date('2025-12-31'));
  });

  it('should not include the input date', () => {
    component.inputDate = new Date('2025-01-01');
    component.includeInputDate = false;

    component.years = 1;

    component.processDate();

    expect(component.outputDate).toEqual(new Date('2026-01-01'));
  });
});
