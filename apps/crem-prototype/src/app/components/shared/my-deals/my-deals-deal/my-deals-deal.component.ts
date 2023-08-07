import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Service, Deal, FormField } from '../../../../app.service';

@Component({
	selector: 'my-deals-deal',
	templateUrl: './my-deals-deal.component.html',
	styleUrls: ['./my-deals-deal.component.scss'],
	providers: [Service]
})
export class MyDealsDealComponent implements OnInit {

	@ViewChild('sidenav') sidenav: MatSidenav;
	showComments : boolean;
	showFiles : boolean;
	showNotifications : boolean;
	useLeftNav : Boolean = true;

	dealId : number;
	deal : Deal;

	formFields : Object[];

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.dealId = params['deal_id'];

			this.deal = this.service.getDeal(this.dealId);
		});

		this.formFields = [
				{ 	sectionName : "Deal Details",
					class : {
						"col-md-12" : true
					},
					fields : [
						new FormField(1, 'Deal Type', "dealType", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"New", display: "New"}, {value:"Renewal", display: "Renewal"}], false, null, null),
						new FormField(21, 'Landlord Name', "landlordName", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(3, 'Deal Stage', "dealStage", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"Proposal", display: "Proposal"}, {value:"Tour", display: "Tour"}], false, null, null),
						new FormField(19, 'Landlord Rep', "landlordRep", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [{value:"Leased", display: "Leased"}, {value:"Owned", display: "Owned"}], false, null, null),
						new FormField(4, 'Property', "dealName", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(8, 'Space Use', "targetSpaceType", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [{value:"DC", display: "DC"}, {value:"GA", display: "GA"}], false, null, null),
						new FormField(5, 'Space', "space", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(7, 'SF Required', "targetMaxSF", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(17, 'Location', "location", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(17, 'Lease Commencement', "targetCommencementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(17, 'Total Lease Value', "totalLeaseValue", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(17, 'Lease Term (years)', "targetMaxLeaseTerm", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(17, 'Notes', null, 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [{value:"Office", display: "Office"}, {value:"Warehouse", display: "Warehouse"}], false, null, null),
						new FormField(9, '# of People', "numberOfPeople", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
					]
				},
				{ 	sectionName : "Proposals",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : [],
					columns : []
				},
				{	sectionName : "Prospective Spaces",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : [],
					columns : []
				},
			];
	}

  	close() {
		// window.history.back();
		this.router.navigate(['../../list'], { relativeTo: this.route });
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


}
