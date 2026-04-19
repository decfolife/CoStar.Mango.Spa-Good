import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';

export interface AiMarkErrorDialogData {
  aiAbstractionId: number;
  tenantName?: string;
  buildingName?: string;
  currentStatus: string;
}

@Component({
  selector: 'mango-ai-mark-error-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ModalModule],
  templateUrl: './ai-mark-error-dialog.component.html',
  styleUrls: ['./ai-mark-error-dialog.component.scss'],
})
export class AiMarkErrorDialogComponent {
  readonly defaultReason =
    'Marked as error manually because processing appeared stuck.';
  readonly reasonControl = new FormControl(this.defaultReason, {
    nonNullable: true,
  });

  constructor(
    public dialogRef: MatDialogRef<AiMarkErrorDialogComponent, string | null>,
    @Inject(MAT_DIALOG_DATA) public data: AiMarkErrorDialogData
  ) {}

  cancel(): void {
    this.dialogRef.close(null);
  }

  confirm(): void {
    const reason = this.reasonControl.value.trim() || this.defaultReason;
    this.dialogRef.close(reason);
  }
}
