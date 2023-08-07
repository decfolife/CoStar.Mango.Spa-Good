import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, AmortizationProfile } from '../../../../../../app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'amortization-profile-detail',
  templateUrl: './amortization-profile-detail.component.html',
  styleUrls: ['./amortization-profile-detail.component.scss'],
  providers: [Service]
})
export class AmortizationProfileDetailComponent implements OnInit {

	amzProfileId : Number;
	amzProfile : AmortizationProfile;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => { 
			this.amzProfileId = params['amortization_profile_id']; 
			this.amzProfile = this.service.getAmortizationProfile(this.amzProfileId);
		}); 
	}

	close() {
		this.router.navigate(['../../amzprofiles'], { relativeTo: this.route });
	}  


}
