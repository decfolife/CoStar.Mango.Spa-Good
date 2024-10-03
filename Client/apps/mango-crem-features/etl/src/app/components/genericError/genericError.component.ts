/* eslint-disable @typescript-eslint/no-explicit-any */

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  ButtonModule,
  ModalModule,
  TooltipModule,
} from '@mango/ui-shared/lib-ui-elements';

@Component({
  selector: 'mango-generic-error',
  standalone: true,
  templateUrl: './genericError.component.html',
  styleUrls: ['./genericError.component.scss'],
  imports: [
    CommonModule,
    DragDropModule,
    ButtonModule,
    MatIconModule,
    TooltipModule,
    ModalModule,
  ],
})
export class GenericErrorComponent {
  constructor(
    public dialogRef: MatDialogRef<GenericErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close(this.data);
  }
}
