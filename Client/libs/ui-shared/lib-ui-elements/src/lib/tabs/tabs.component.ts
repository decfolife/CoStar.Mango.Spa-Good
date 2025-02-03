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

  @ContentChildren(CremTabItemComponent) tabs: QueryList<CremTabItemComponent>;

  ngAfterContentInit() {
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
    }
  }
}
