import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Service, Building } from '../../../../../app.service';
import { DxPopupComponent, DxDataGridComponent } from "devextreme-angular";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  providers: [Service]
})
export class PropertyComponent implements OnInit {
	@ViewChild('sidenav') sidenav: MatSidenav;
	showComments : boolean;
	showFiles : boolean;
	showNotifications : boolean;
	useLeftNav : Boolean = true;

	propertyId : Number;
	property : Building;

	@ViewChild("ObjectDrawerPopup") objectDrawerPopup : DxPopupComponent;
	objectDrawerPopupVisible : Boolean;
	objectDrawerPopupTitle : String;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => { 
			this.propertyId = params['property_id']; 

			this.property = this.service.getBuilding(this.propertyId);
		});
	}

	close() {
		// window.history.back();
		this.router.navigate(['../../home/re-properties'], { relativeTo: this.route });
	}

	closeSidenav() {
		this.showComments = false;
		this.showFiles = false;
		this.showNotifications = false;
		this.sidenav.close();		
	}

	toggleSidenav(content) {
		
		if( !this.sidenav.opened ) {
			this.sidenav.open();
		} else if( 
			(this.showComments && content === 'comments')
			|| (this.showFiles && content === 'files')
			|| (this.showNotifications && content === 'notifications')
			) {
			this.closeSidenav();
			return;
		}

		if( content === 'comments') {
			this.showComments = true;
			this.showFiles = false;
			this.showNotifications = false;
		} else if( content === 'files') {
			this.showFiles = true;
			this.showComments = false;
			this.showNotifications = false;
		} else if( content === 'notifications') {
			this.showNotifications = true;
			this.showComments = false;
			this.showFiles = false;
		}
	}	

	toggleLeftNav() {
		this.useLeftNav = !this.useLeftNav;
	}

	launchObjectDrawerPopup() {
		this.objectDrawerPopupTitle = this.property.buildingName;
		this.objectDrawerPopupVisible = true;
		this.closeSidenav();
	}

	objectDrawerClosed() {
		this.objectDrawerPopupVisible = false;
	}

}
