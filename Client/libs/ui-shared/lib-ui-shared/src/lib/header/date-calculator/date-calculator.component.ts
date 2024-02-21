import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { DxFormModule, DxCheckBoxModule } from 'devextreme-angular';
import { ButtonModule } from '@mango/ui-shared/lib-ui-elements';


@Component({
  selector: 'mango-date-calculator',
  standalone: true,
  templateUrl: './date-calculator.component.html',
  styleUrls: ['./date-calculator.component.scss'],
  imports:[ModalModule, DxCheckBoxModule, DxFormModule, ButtonModule]
})
export class DateCalculatorComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DateCalculatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  yesDelete() {
    this.close("Yes");
  }

  public close(data: any) {
    this.dialogRef.close(data);
  }
}