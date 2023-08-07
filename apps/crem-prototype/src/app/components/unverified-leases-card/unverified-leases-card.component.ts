import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Lease } from '../../app.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
	selector: 'unverified-leases-card',
	templateUrl: './unverified-leases-card.component.html',
	styleUrls: ['./unverified-leases-card.component.scss'],
  providers : [Service]
})
export class UnverifiedLeasesCardComponent implements OnInit {

	unverifiedLeases : Lease[];

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		// Get the unverified lease from the service
		// this.unverifiedLeases = this.service.getLeases();
		this.unverifiedLeases = this.service.getUnverifiedLeases();
	}

	navigateToObject(event) {
		// this.router.navigate([this.rowClickRoute, event.data[this.keyFields[0]]], {relativeTo: this.route } );	
		this.router.navigate(['../../lease', event.data.SystemLeaseID], {relativeTo: this.route } );			
	} 

}
