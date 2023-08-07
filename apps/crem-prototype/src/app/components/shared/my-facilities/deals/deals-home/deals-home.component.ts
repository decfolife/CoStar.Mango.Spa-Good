import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'deals-home',
  templateUrl: './deals-home.component.html',
  styleUrls: ['./deals-home.component.scss']
})
export class DealsHomeComponent implements OnInit {

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
