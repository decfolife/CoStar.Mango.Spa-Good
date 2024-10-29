import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSupplierModalComponent } from './add-supplier-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { DataService } from '@mango/core-shared';

describe('AddSupplierModalComponent', () => {
  let component: AddSupplierModalComponent;
  let fixture: ComponentFixture<AddSupplierModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSupplierModalComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        FormWizardService,
        DataService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSupplierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
