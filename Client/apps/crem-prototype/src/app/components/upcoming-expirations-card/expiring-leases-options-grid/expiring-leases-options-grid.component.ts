import { Component, AfterViewInit, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Lease, LeaseOption } from '../../../app.service';

@Component({
  selector: 'expiring-leases-options-grid',
  templateUrl: './expiring-leases-options-grid.component.html',
  styleUrls: ['./expiring-leases-options-grid.component.scss']
})
export class ExpiringLeasesOptionsGridComponent implements AfterViewInit {

	@Input() leaseId : number;
	leaseOptions : LeaseOption[];

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) {
	}	

	ngAfterViewInit() {

		this.leaseOptions = this.service.getLeaseOptionsByLease(this.leaseId);	
		// this.leaseOptions = this.service.getLeaseOptions();	
	}

}
