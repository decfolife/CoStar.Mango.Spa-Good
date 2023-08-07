import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, User } from '../app.service';
import { AuthenticationService } from '../authentication.service';

@Component({
	selector: 'app-crem-a',
	templateUrl: './crem-a.component.html',
	styleUrls: ['./crem-a.component.scss'],
	providers: [Service]

})
export class CremAComponent implements OnInit {

	productTitle : String = "Real Estate Manager";
	searchObjectTypes : String[];
	searchObjectType : String;
	user: User;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) { 
		this.searchObjectType = "All";

		this.searchObjectTypes = ["All", "Center", "Store", "Lease", "Project", "Company", "Contact"];

		this.authenticationService.user.subscribe(x => this.user = x);
	}

	ngOnInit() {		
	}

	toggleSearchObjectType(objectType: String) {
		this.searchObjectType = objectType;
	}

	logout() {
        this.authenticationService.logout();
    }

}
