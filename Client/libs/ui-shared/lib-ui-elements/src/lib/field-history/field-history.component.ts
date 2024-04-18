import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldHistoryDataSource, FieldHistoryInput, HistoryEntry } from '@mango/data-models/lib-data-models';
import { DxDataGridModule, DxTemplateModule, DxBulletModule, DxPopoverModule } from 'devextreme-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '../icon';

@Component({
  selector: 'crem-field-history',
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxPopoverModule,
    MatTabsModule,
    IconModule
  ],
  templateUrl: './field-history.component.html',
  styleUrls: ['./field-history.component.scss'],
})
export class FieldHistoryComponent {

  @Input() helpTextID: string;

  @Input() dataSource: FieldHistoryDataSource;

  @Input() dateFormat: string = 'MM/dd/yyyy h:mm a';

  @Input() visible: boolean = false;


  @Output() onDisplay = new EventEmitter<boolean>()

  toggleVisible() {
    this.visible = !this.visible;
    if (!!this.visible) {
      this.onDisplay.emit(true)
    }
  }
}
