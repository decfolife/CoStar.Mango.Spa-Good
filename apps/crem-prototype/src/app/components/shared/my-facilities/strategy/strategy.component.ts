import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss'],
})
export class StrategyComponent implements OnInit {
  isLeftNavOpened: Boolean = true;
  drawerContentExpandedMarginLeft: Number = 200;
  drawerContentMinimizedMarginLeft: Number = 50;

  drawerWidth: String;

  constructor() {}

  ngOnInit() {
    this.setDrawerStyle();
    this.addBodyClass();
  }

  setDrawerStyle() {
    if (this.isLeftNavOpened) {
      this.drawerWidth = this.drawerContentExpandedMarginLeft.toString() + 'px';
    } else {
      this.drawerWidth =
        this.drawerContentMinimizedMarginLeft.toString() + 'px';
    }
  }

  toggleDrawer() {
    this.isLeftNavOpened = !this.isLeftNavOpened;
    let self = this;
    setTimeout(function () {
      self.setDrawerStyle();
    }, 50);
  }

  addBodyClass() {
    const bodyTag = document.body;
    bodyTag.classList.add('page-strategy');
  }
}
