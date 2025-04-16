import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { CremTabItemComponent } from './tab-item.component';

export interface SelectedTab {
  index: number;
  title?: string;
}
@Component({
  selector: 'crem-tabs',
  standalone: true,
  imports: [CommonModule, CremTabItemComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  host: {
    '[attr.id]': `id`,
  },
})
export class CremTabsComponent implements AfterContentInit {
  @Input() selectedTabIndex = 0;
  @Input() id: string;
  @Output() selectedTabChange: EventEmitter<number> = new EventEmitter<number>(
    null
  );

  /**
   * Emit all the values of the selection for later advanced filtering and logic
   *
   * @type {EventEmitter<SelectedTab>}
   * @memberof CremTabsComponent
   */
  @Output() selectedTab: EventEmitter<SelectedTab> =
    new EventEmitter<SelectedTab>(null);

  @ContentChildren(CremTabItemComponent) tabs: QueryList<CremTabItemComponent>;

  ngAfterContentInit() {
    this.selectedTabIndex = this.selectedTabIndex ?? 0;
    const activeTabs = this.tabs.filter((tab) => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.toArray()[this.selectedTabIndex]);
    }
  }

  onKeyDownEvent(e, tab: CremTabItemComponent) {
    if (e.key == 'Enter') {
      this.selectTab(tab);
    }
  }

  selectTab(tab: CremTabItemComponent) {
    if (tab) {
      this.tabs.toArray().forEach((tab) => (tab.active = false));
      tab.active = true;

      const selectedIndex = this.tabs
        .toArray()
        .findIndex((tab) => tab.active === true);
      this.selectedTabChange.emit(selectedIndex);
      this.selectedTab.emit({
        index: selectedIndex,
        title: this.tabs.toArray()[selectedIndex].title,
      });
    }
  }
}
