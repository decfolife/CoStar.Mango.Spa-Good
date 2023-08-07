import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'portfolio-home',
  templateUrl: './portfolio-home.component.html',
  styleUrls: ['./portfolio-home.component.scss']
})
export class PortfolioHomeComponent implements OnInit {

	isLeftNavOpened : Boolean = true;
	drawerContentExpandedMarginLeft : Number = 200;
	drawerContentMinimizedMarginLeft : Number = 50;

	drawerWidth : String;

	constructor() { }

	ngOnInit() { 
		this.setDrawerStyle();
	}

	setDrawerStyle() {
		if( this.isLeftNavOpened ) {
			this.drawerWidth = this.drawerContentExpandedMarginLeft.toString() + "px";
		} else {
			this.drawerWidth = this.drawerContentMinimizedMarginLeft.toString() + "px";
		}
	}

	toggleDrawer() {
		this.isLeftNavOpened = !this.isLeftNavOpened;
		let self = this;
		setTimeout(function() {
			self.setDrawerStyle()
		}, 50)
	}
	
}
