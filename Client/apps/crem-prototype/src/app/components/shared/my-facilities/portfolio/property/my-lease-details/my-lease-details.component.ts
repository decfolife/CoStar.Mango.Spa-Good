import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Lease } from '../../../../../../app.service';

@Component({
  selector: 'app-my-lease-details',
  templateUrl: './my-lease-details.component.html',
  styleUrls: ['./my-lease-details.component.scss'],
  providers: [Service]
})
export class MyLeaseDetailsComponent implements OnInit {

	leases : Lease[];
	propertyId : Number;

	constructor( service : Service, private router: Router, private route: ActivatedRoute ) {
		
		route.parent.params.subscribe(params => { this.propertyId = params['property_id']; }); 

		this.leases = service.getLeasesByBuilding(this.propertyId);
	}

	ngOnInit() {
	}

	navigateToLease(event) {
		// this.router.navigate(['/costar-b/facilities/realestate/lease', event.data.systemLeaseID ]);
		this.router.navigate(['../../../lease', event.data.SystemLeaseID], { relativeTo: this.route });
	}

}
