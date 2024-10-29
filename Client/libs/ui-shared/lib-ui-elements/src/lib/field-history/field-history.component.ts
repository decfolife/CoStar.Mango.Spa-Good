import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldHistoryDataSource } from '@mango/data-models/lib-data-models';
import { DxDataGridModule, DxTemplateModule, DxBulletModule, DxPopoverModule } from 'devextreme-angular';
import { IconModule } from '../icon';
import { CremTabItemComponent, CremTabsComponent } from '../tabs';

@Component({
  selector: 'crem-field-history',
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxPopoverModule,
    CremTabsComponent,
    CremTabItemComponent,
    IconModule
  ],
  templateUrl: './field-history.component.html',
  styleUrls: ['./field-history.component.scss'],
})
export class FieldHistoryComponent{

  @Input() helpTextID: string;
  @Input() dataSource: FieldHistoryDataSource;
  @Input() dateFormat = 'MM/dd/yyyy h:mm a';
  @Input() visible = false;

  @Output() display = new EventEmitter<boolean>()

  @ViewChild('popoverTitle') popoverTitle: ElementRef<HTMLDivElement>;
  activeTabIndex = 0;

  toggleVisible() {
    this.visible = !this.visible;
    if (this.visible) {
      this.display.emit(true)
      setTimeout(() => {
          if (this.popoverTitle)
            this.popoverTitle.nativeElement.focus();
      }, 1000)
    }
  }

  onTabChanged(e){
    this.activeTabIndex = e;
  }

}
