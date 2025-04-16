import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { AddFormWizardComponent } from './add-form-wizard.component';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Component({
  selector: 'mango-open-form-wizard-modal',
  templateUrl: './open-form-wizard-modal.component.html',
  styleUrls: ['./open-form-wizard-modal.component.scss'],
})
export class OpenFormWizardModalComponent implements OnInit {
  @Input() objectTypeId: number;
  @Input() objectId: number;
  @Input() objectTypeTypeId: number;
  @Input() objectName: string;
  @Input() userId: string;

  constructor(
    private dialog: MatDialog,
    private formWizardService: FormWizardService,
    private elementRef: ElementRef
  ) {
    this.userId = this.elementRef.nativeElement.getAttribute('userId');
  }

  ngOnInit(): void {
    if (environment.name === 'LOCAL') {
      this.objectId = 728;
      this.objectTypeId = 3;
      this.openButtonClicked();
    }
  }

  public openButtonClicked() {
    this.openModal();
  }

  public openModal() {
    const dialogRef = this.dialog.open(AddFormWizardComponent, {
      disableClose: true,
      minWidth: '320px',
      maxWidth: '1100px',
      minHeight: '420px',
      maxHeight: '90vh',
      data: {
        objectTypeId: Number(this.objectTypeId),
        objectId: Number(this.objectId),
        objectTypeName: this.objectName,
        userId: this.userId,
      },
    });

    dialogRef.afterClosed();
  }
}
