import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, JournalEntryProfile } from '../../../../../../app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-journal-entry-profile-detail',
  templateUrl: './journal-entry-profile-detail.component.html',
  styleUrls: ['./journal-entry-profile-detail.component.scss'],
  providers: [Service]
})
export class JournalEntryProfileDetailComponent implements OnInit {

	profileId : Number;
	profile : JournalEntryProfile;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => { 
			this.profileId = params['journal_entry_profile_id']; 
			this.profile = this.service.getJournalEntryProfile(this.profileId);
		}); 
	}

	close() {
		this.router.navigate(['../../jeprofiles'], { relativeTo: this.route });
	}  

}
