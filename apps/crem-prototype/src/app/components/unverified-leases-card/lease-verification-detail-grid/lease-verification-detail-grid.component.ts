import { Component, AfterViewInit, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Lease, LeaseVerification } from '../../../app.service';

@Component({
	selector: 'lease-verification-detail-grid',
	templateUrl: './lease-verification-detail-grid.component.html',
	styleUrls: ['./lease-verification-detail-grid.component.scss']
})
export class LeaseVerificationDetailGridComponent implements AfterViewInit {

	@Input() leaseId : number;
	leaseVerificationHistory : LeaseVerification[];

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) {
	}	

	ngAfterViewInit() {
		this.leaseVerificationHistory = this.service.getLeasesVerificationHistory(this.leaseId);	
	}
}
