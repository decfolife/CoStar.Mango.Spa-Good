import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormItemService } from '@micro-components/services/form-item.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'mango-widget-history',
  templateUrl: './widget-history.component.html',
  styleUrls: ['./widget-history.component.scss'],
})
export class WidgetHistoryComponent implements OnInit {
  public widgetHistory: any;
  public userPreference: any;
  public columns: any;
  public loading: boolean = true;
  public dateFormat: string = 'MM/dd/yyyy';
  public filterValue: any = [];

  constructor(
    private formItemService: FormItemService,
    public dialogRef: MatDialogRef<WidgetHistoryComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ObjectTypeID: number; // grid level
      ObjectID: number | null; //grid level, null on form
      FormItemID: number | null; //null
      RelatedObjectID: number; // Form OID
      RelatedObjectTypeID: number; // Form OTID
      RelationshipDefinitionID: number; // Grid Widget
      ObjectTypeTypeID: number | null; // Grid, null on form
    }
  ) {}

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.close(event);
      }
    });
    if (this.data.ObjectID) {
      this.filterValue = ['ObjectID', '=', Number(this.data.ObjectID)];
    }
    const observableList = forkJoin({
      widgetHistory: this.formItemService.GetFormItemChangeHistoryWithParam(
        this.data
      ),
      userPreference: this.formItemService.getUserPreferences(),
    });

    observableList.subscribe((data: any) => {
      this.widgetHistory = data.widgetHistory.data;
      this.userPreference = data.userPreference.data;
      this.setUserDateFormat(data.userPreference?.data?.isDatesEU);
      this.setGridColumns();
    });
  }

  public setGridColumns() {
    this.columns = [
      {
        dataField: 'ObjectID',
        alignment: 'left',
        dataType: 'number',
        caption: 'Record ID',
      },
      { dataField: 'SourceField', dataType: 'string', caption: 'Field' },
      {
        dataField: 'LastModified',
        caption: 'Date',
        dataType: 'date',
        format: this.dateFormat,
      },
      { dataField: 'ContactName', caption: 'User', dataType: 'string' },
      { dataField: 'BeforeChange', caption: 'Old Value', dataType: 'string' },
      { dataField: 'AfterChange', caption: 'New Value', dataType: 'string' },
      { dataField: 'Description', caption: 'Action', dataType: 'string' },
    ];
    this.loading = false;
  }

  public setUserDateFormat(isDatesEU: boolean) {
    this.dateFormat = 'MM/dd/yyyy' + ' hh:mm:ss aa';
    if (isDatesEU) {
      this.dateFormat = 'dd.MM.yyyy' + ' hh:mm:ss aa';
    }
  }

  public close(data: any) {
    this.dialogRef.close(data);
  }
}
