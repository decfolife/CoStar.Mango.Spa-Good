import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DiscountRateProfile, FormField } from '../../../../../../app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-discount-rate-profile-detail',
  templateUrl: './discount-rate-profile-detail.component.html',
  styleUrls: ['./discount-rate-profile-detail.component.scss'],
  providers: [Service]
})
export class DiscountRateProfileDetailComponent implements OnInit {
	profileId : Number;
	profile : DiscountRateProfile;

	formFields : Object[];

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.profileId = params['discount_rate_profile_id'];
			this.profile = this.service.getDiscountRateProfile(this.profileId);

			this.formFields = [
				{ 	sectionName : "Discount Rate Profile Details",
					class : {
						"col-md-12" : true
					},
					fields : [
						new FormField(1, 'Discount Rate', "discountRate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(2, 'Profile Alias', "profileAlias", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(4, 'Accounting Term - Min Months', "accountingTermMinMonths", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(20, 'Accounting Term - Max Months', "accountingTermMaxMonths", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(5, 'Effective Date', "effectiveDate", 'dxDateBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'dateBoxTemplate', [], false, null, null),
						new FormField(20, 'Country', "country", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: "United States", display: "United States"}, {value: "France", display: "France"}, {value: "Italy", display: "Italy"}], false, null, null),
						new FormField(7, 'Currency', "currency", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: "USD", display: "USD"}, {value: "EUR", display: "EUR"}, {value: "HKD", display: "HKD"}], false, null, null),
						new FormField(20, 'Annual Rate Type', "annualRateType", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: "APR", display: "APR"}, {value: "APY", display: "APY"}], false, null, null),
						new FormField(8, 'Portfolio', "portfolio", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(20, 'Profile Name', "profileName", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(9, 'Source Import ID', "sourceImportId", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(21, 'System Profile ID', "id", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(10, 'Modified By', "modifiedBy", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(22, 'Created By', "createdBy", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
					]
				}
			];
		});


	}

	close() {
		// this.router.navigate(['/costar/facilities/accounting/discountrate']);
		this.router.navigate(['../../discountrate'], { relativeTo: this.route });
	}

}
