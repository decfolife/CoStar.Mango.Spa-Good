import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'view-group-contacts',
  templateUrl: './view-group-contacts.component.html',
  styleUrls: ['./view-group-contacts.component.scss'],
})
export class ViewGroupContactsComponent implements OnInit {
  @ViewChild('DataGrid') dataGrid: DxDataGridComponent;

  public columns: any;

  constructor(
    public dialogRef: MatDialogRef<ViewGroupContactsComponent>,
    @Inject(MAT_DIALOG_DATA) public contacts: any[]
  ) {}

  ngOnInit(): void {
    this.columns = [
      {
        dataField: 'contactDisplay',
        caption: 'Contacts',
      },
    ];
  }
}
