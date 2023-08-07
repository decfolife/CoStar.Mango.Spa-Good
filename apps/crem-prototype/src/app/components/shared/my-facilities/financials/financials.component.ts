import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'financials',
  templateUrl: './financials.component.html',
  styleUrls: ['./financials.component.scss']
})
export class FinancialsComponent implements OnInit {

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
