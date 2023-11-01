import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GenerateApiKeyConfirmationComponent } from '../generate-apikey-confirmation/generate-apikey-confirmation.component';

@Component({
  selector: 'mango-copy-clipboard-message',
  templateUrl: 'copy-clipboard-message.component.html',
  styleUrls: ['copy-clipboard-message.component.scss'],
})
export class CopyClipboardMessageComponent {
  public apiKey: string = "";
  public value: string = "";
  public info: string = "";

  constructor(
    public dialogRef: MatDialogRef<CopyClipboardMessageComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit() {
    this.apiKey = this.data.apikey;
  }

  copyClipboard() {
    navigator.clipboard.writeText(this.apiKey);

    this.info = "Copied to clipboard";
  }

}
