import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyModalComponent } from './add-company-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { DataService } from '@mango/core-shared';

describe('AddCompanyModalComponent', () => {
  let component: AddCompanyModalComponent;
  let fixture: ComponentFixture<AddCompanyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddCompanyModalComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        FormWizardService,
        DataService,
      ],
    });
    fixture = TestBed.createComponent(AddCompanyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
