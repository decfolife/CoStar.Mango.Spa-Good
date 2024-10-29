import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalModule } from '@mango/ui-shared/lib-ui-elements';

@Component({
  selector: 'mango-delete-reminder',
  standalone: true,
  templateUrl: './delete-reminder.component.html',
  styleUrls: ['./delete-reminder.component.scss'],
  imports: [ModalModule],
})
export class DeleteReminderComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  yesDelete() {
    this.close('Yes');
  }

  public close(data: any) {
    this.dialogRef.close(data);
  }
}
