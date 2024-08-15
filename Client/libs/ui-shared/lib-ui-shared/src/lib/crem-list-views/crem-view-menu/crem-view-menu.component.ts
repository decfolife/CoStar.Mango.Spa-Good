import { Component, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';

import { MatMenuTrigger } from '@angular/material/menu';
import {
  faCaretDown,
  faEllipsisH,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

import {
  ListView,
  ViewDropDownData,
} from '@list-pages/components/listpage/shared/models'; //../shared/models';

@Component({
  selector: 'crem-list-view-menu',
  templateUrl: './crem-view-menu.component.html',
  styleUrls: ['./crem-view-menu.component.scss']
})
export class CremViewMenuComponent  {
  @ViewChild(MatMenuTrigger) viewMenuTrigger: MatMenuTrigger;

  @Input()
  currentListViewName: string;
  @Input()
  listViews: ViewDropDownData;
  @Input()
  showShare: boolean;
  @Input()
  isSuperUser = false;
  @Input()
  enabled = true;
  @Output()
  setCurrentListView = new EventEmitter<ListView>();
  @Output()
  setDefaultListView = new EventEmitter<ListView>();
  @Output()
  shareListView = new EventEmitter<ListView>();
  @Output()
  hideListView = new EventEmitter<ListView>();
  @Output()
  showListView = new EventEmitter<ListView>();
  @Output()
  deleteListView = new EventEmitter<ListView>();
  @Output()
  clearDefault = new EventEmitter<ListView>();

  faCaretDown = faCaretDown;
  faEllipsisH = faEllipsisH;
  faCheck = faCheck;

  hoverViewId: number;

  constructor() { }

  ShowMenu = false;

  mouseOverView(id: number) {
    this.hoverViewId = id;
  }

  currentListViewClick(listView: ListView) {
    this.closeMenu();
    this.setCurrentListView.next(listView);
  }

  closeMenu() {
    this.ShowMenu = false;
  }

  toggleMenu() {
    this.ShowMenu = !this.ShowMenu;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!(event.target as HTMLElement).closest('.crem-list-view-button')) {
      this.closeMenu();
    }
  }
}
