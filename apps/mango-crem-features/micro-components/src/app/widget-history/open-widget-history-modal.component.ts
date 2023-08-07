import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { WidgetHistoryComponent } from './modal/widget-history.component';


@Component({
  selector: 'mango-open-widget-history-modal',
  templateUrl: './open-widget-history-modal.component.html',
  styleUrls: ['./open-widget-history-modal.component.scss']
})
export class OpenWidgetHistoryModalComponent implements OnInit {
  @Input() objectTypeId: number;
  @Input() objectId: number | string;
  @Input() objectTypeTypeId: number | string;
  @Input() formItemId: number;
  @Input() relatedObjectId: number;
  @Input() relatedObjectTypeId: number;
  @Input() relationshipDefinitionId: number;
  @Input() historyType: string;

  constructor(
    private dialog: MatDialog,
  ) {

   }

  ngOnInit(): void {
  }

  public openButtonClicked() {
    this.openModal();
  }

  public openModal() {
    let dialogRef;
    if (environment.isRestful) {
      if (this.historyType === 'grid') {
        dialogRef = this.dialog.open(WidgetHistoryComponent, {
          disableClose: true,
          height: '70%',
          width: '75%',
          data: {
            objectID: Number(this.objectId),
            objectTypeID: Number(this.objectTypeId),
            objectTypeTypeID: null,
            formItemID: null,
            relatedObjectID: null,
            relatedObjectTypeID: null,
            relationshipDefinitionID: null
          }
        });
      } else if (this.historyType === 'widget') {
        dialogRef = this.dialog.open(WidgetHistoryComponent, {
          disableClose: true,
          height: '70%',
          width: '75%',
          data: {
            ObjectID: null,
            ObjectTypeID: Number(this.objectTypeId),
            ObjectTypeTypeID: Number(this.objectTypeTypeId),
            FormItemID: null,
            RelatedObjectID: Number(this.relatedObjectId),
            RelatedObjectTypeID: Number(this.relatedObjectTypeId),
            RelationshipDefinitionID: Number(this.relationshipDefinitionId),
          }
        });
      }
    } else {
      if (this.historyType === 'grid') {
        dialogRef = this.dialog.open(WidgetHistoryComponent, {
          disableClose: true,
          height: '70%',
          width: '75%',
          data: {
            ObjectID: this.objectId?.toString(),
            ObjectTypeID: this.objectTypeId?.toString(),
            ObjectTypeTypeID: this.objectTypeTypeId?.toString(),
            FormItemID: '',
            RelatedObjectID: this.relatedObjectId?.toString(),
            RelatedObjectTypeID: this.relatedObjectTypeId?.toString(),
            RelationshipDefinitionID: this.relationshipDefinitionId?.toString(),
          }
        });
      } else if (this.historyType === 'widget') {
        dialogRef = this.dialog.open(WidgetHistoryComponent, {
          disableClose: true,
          height: '70%',
          width: '75%',
          data: {
            ObjectID: '',
            ObjectTypeID: this.objectTypeId?.toString(),
            ObjectTypeTypeID: this.objectTypeTypeId?.toString(),
            FormItemID: '',
            RelatedObjectID: this.relatedObjectId?.toString(),
            RelatedObjectTypeID: this.relatedObjectTypeId?.toString(),
            RelationshipDefinitionID: this.relationshipDefinitionId?.toString(),
          }
        });
      }
    }
    
    dialogRef?.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }
}
