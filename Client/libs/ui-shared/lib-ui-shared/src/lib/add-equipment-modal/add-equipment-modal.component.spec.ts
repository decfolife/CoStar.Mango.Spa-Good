import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEquipmentModalComponent } from './add-equipment-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { provideMockStore } from '@ngrx/store/testing';
import { DataService } from '@mango/core-shared';

describe('AddEquipmentModalComponent', () => {
  let component: AddEquipmentModalComponent;
  let fixture: ComponentFixture<AddEquipmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEquipmentModalComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore({}),
        FormWizardService,
        DataService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEquipmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
