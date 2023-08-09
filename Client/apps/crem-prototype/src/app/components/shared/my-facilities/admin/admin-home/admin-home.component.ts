import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-admin-home',
	templateUrl: './admin-home.component.html',
	styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

	isLeftNavOpened : Boolean = true;
	drawerContentExpandedMarginLeft : Number = 200;
	drawerContentMinimizedMarginLeft : Number = 50;

	drawerWidth : String;

	constructor() { }

	ngOnInit() { 
		let self = this;
		setTimeout(function() {
			self.setDrawerStyle()
		}, 50)
	}

	setDrawerStyle() {
		if( this.isLeftNavOpened ) {
			this.drawerWidth = this.drawerContentExpandedMarginLeft.toString() + "px";
		} else {
			this.drawerWidth = this.drawerContentMinimizedMarginLeft.toString() + "px";
		}

		console.log(this.drawerWidth);
	}

	toggleDrawer() {
		this.isLeftNavOpened = !this.isLeftNavOpened;
		let self = this;
		setTimeout(function() {
			self.setDrawerStyle()
		}, 50)
		// this.setDrawerStyle();	
	}

}
