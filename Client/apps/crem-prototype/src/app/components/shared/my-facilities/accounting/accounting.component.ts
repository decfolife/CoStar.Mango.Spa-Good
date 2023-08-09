import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {
  isLeftNavOpened: boolean = true;
  drawerContentExpandedMarginLeft: number = 260;
  drawerContentMinimizedMarginLeft: number = 50;

  drawerWidth: string;

  ngOnInit() {
    this.setDrawerStyle();
  }

  setDrawerStyle() {
    this.drawerWidth = this.isLeftNavOpened
      ? `${this.drawerContentExpandedMarginLeft}px`
      : `${this.drawerContentMinimizedMarginLeft}px`;
  }

  toggleDrawer() {
    this.isLeftNavOpened = !this.isLeftNavOpened;

    setTimeout(() => {
      this.setDrawerStyle()
    }, 10)
  }
}
