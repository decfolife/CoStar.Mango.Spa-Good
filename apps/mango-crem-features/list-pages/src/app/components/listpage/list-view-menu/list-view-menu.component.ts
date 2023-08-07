import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { MatMenuTrigger } from '@angular/material/menu';
import {
  faCaretDown,
  faEllipsisH,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

import {
  ListView,
  ViewDropDownData,
} from '../shared/models';

@Component({
  selector: 'app-list-view-menu',
  templateUrl: './list-view-menu.component.html',
  styleUrls: ['./list-view-menu.component.scss']
})
export class ListViewMenuComponent  {
  @ViewChild(MatMenuTrigger)
  viewMenuTrigger: MatMenuTrigger;

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

  mouseOverView(id: number) {
    this.hoverViewId = id;
  }

  currentListViewClick(listView: ListView) {
    this.closeMenu();
    this.setCurrentListView.next(listView);
  }

  closeMenu() {
    this.viewMenuTrigger.closeMenu();
  }
}
