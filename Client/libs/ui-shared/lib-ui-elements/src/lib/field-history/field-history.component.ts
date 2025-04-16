import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldHistoryDataSource } from '@mango/data-models/lib-data-models';
import {
  DxDataGridModule,
  DxTemplateModule,
  DxBulletModule,
  DxPopoverModule,
} from 'devextreme-angular';
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
    IconModule,
  ],
  templateUrl: './field-history.component.html',
  styleUrls: ['./field-history.component.scss'],
})
export class FieldHistoryComponent implements OnInit {
  @Input() helpTextID: string;
  @Input() dataSource: FieldHistoryDataSource;
  @Input() dateFormat = 'MM/dd/yyyy h:mm a';
  @Input() visible = false;
  @Input() displayIcon: string = '';
  @Output() getInitialData?: EventEmitter<void> = new EventEmitter();
  @Output() getHistData?: EventEmitter<void> = new EventEmitter();

  @Output() display = new EventEmitter<boolean>();

  @ViewChild('popoverTitle') popoverTitle: ElementRef<HTMLDivElement>;
  @ViewChild('TriggerIcon') TriggerIcon: ElementRef<HTMLElement>;
  activeTabIndex = 0;
  getDataFlag: boolean = false;

  static uniqueNum: number = 0;
  ngOnInit(): void {
    this.helpTextID = this.helpTextID + '-' + FieldHistoryComponent.uniqueNum++;
  }

  toggleVisible() {
    this.visible = !this.visible;
    if (this.visible) {
      this.getInitialData.emit();
      if (this.activeTabIndex == 1) {
        this.getHistData.emit();
      }
      this.display.emit(true);
      setTimeout(() => {
        if (this.popoverTitle) this.popoverTitle.nativeElement.focus();
      }, 1000);
    }
  }

  onTabChanged(e) {
    this.activeTabIndex = e;
    if (this.activeTabIndex == 1 && !this.getDataFlag) {
      this.getDataFlag = true;
      this.getHistData.emit();
    }
  }

  onPopoverHidden() {
    this.getDataFlag = false;
    this.TriggerIcon.nativeElement.focus();
  }
}
