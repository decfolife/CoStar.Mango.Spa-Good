/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mango-column-limit',
  templateUrl: './column-limit.component.html',
  styleUrls: ['./column-limit.component.scss'],
})
export class ColumnLimitComponent implements OnInit {
  // Assigning info to component variable for display. Can do directly to html, but prefer this way

  public closeButton = true;
  public action: string;
  public projectRequiredTaskNote = false;
  public columns: string[];

  constructor(
    public dialogRef: MatDialogRef<ColumnLimitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.columns = this.data.columns.map((column) => {
      const columnNameModified = column.replace(/([a-z])([A-Z])/g, '$1 $2');
      if (columnNameModified.length > 0) {
        const columnDisplay =
          columnNameModified.charAt(0).toUpperCase() +
          columnNameModified.slice(1);
        return { columns: columnDisplay };
      } else {
        return { columns: '' };
      }
    });
  }

  deleteConfirmation() {
    this.dialogRef.close(this.data);
  }
}
