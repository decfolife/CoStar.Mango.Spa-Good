import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Service, Lease } from '../../../../../app.service';
import { DxPopupComponent, DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'app-lease',
	templateUrl: './lease.component.html',
	styleUrls: ['./lease.component.scss'],
	providers: [Service]
})
export class LeaseComponent implements OnInit {
	@ViewChild('sidenav') sidenav: MatSidenav;
	showComments : Boolean;
	showFiles : Boolean;
	showNotifications : Boolean;
	useLeftNav : Boolean = true;

	leaseId : Number;
	lease : Lease;

	@ViewChild("ObjectDrawerPopup") objectDrawerPopup : DxPopupComponent;
	objectDrawerPopupVisible : Boolean;
	objectDrawerPopupTitle : String;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) {		
	}

	ngOnInit() {
		this.route.params.subscribe(params => { 
			this.leaseId = params['lease_id']; 

			this.lease = this.service.getLease(this.leaseId);
		}); 		
	}

	close() {
		// window.history.back();
		this.router.navigate(['../../home/re-leases'], { relativeTo: this.route });
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
		// this.currentFormItem = this.sectionFields.find(itm => itm.id == data.name);
		// this.objectDrawerPopupTitle = "Edit Field - " + this.currentFormItem.label + " (" + this.currentFormItem.id.toString() + ")";
		this.objectDrawerPopupTitle = this.lease.PropertyName;
		this.objectDrawerPopupVisible = true;
		this.closeSidenav();
	}

	objectDrawerClosed() {
		this.objectDrawerPopupVisible = false;
	}

}
