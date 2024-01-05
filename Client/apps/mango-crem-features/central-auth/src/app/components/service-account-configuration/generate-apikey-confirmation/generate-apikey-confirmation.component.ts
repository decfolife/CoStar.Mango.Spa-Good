import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports:[ModalModule, MatDialogModule],
  selector: 'mango-generate-apikey-confirmation',
  templateUrl: 'generate-apikey-confirmation.component.html',
  styleUrls: ['generate-apikey-confirmation.component.scss'],
})
export class GenerateApiKeyConfirmationComponent implements OnInit {
  public msg: string;
  public confirmButtonText: string;
  public title: string;

  constructor(
    private dialogRef: MatDialogRef<GenerateApiKeyConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit() {
    this.msg = this.data.msg;
    this.confirmButtonText = this.data.confirmButtonText;
    this.title = this.data.title;
  }

  yes() {
    this.dialogRef.close(true);
  }

}
