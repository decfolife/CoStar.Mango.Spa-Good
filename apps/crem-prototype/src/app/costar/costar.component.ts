import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, User } from '../app.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatMenuTrigger } from '@angular/material/menu';
import {UntypedFormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

export class SearchObject {
	id : number;
	objectType : string;
	name : string;
	routePath : string;
	
	constructor(id, objectType, name, routePath) {
		this.id = id;
		this.objectType = objectType;
		this.name = name;
		this.routePath = routePath;
	}
}

@Component({
	selector: 'app-costar',
	templateUrl: './costar.component.html',
	styleUrls: ['./costar.component.scss'],
	providers : [Service]
})

export class CostarComponent implements OnInit {
	@ViewChild('sidenav') sidenav: MatSidenav;
	// @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
	searchControl = new UntypedFormControl();
	searchResults : SearchObject[];
	filteredResults : Observable<SearchObject[]>;
	user: User;


	constructor( private service : Service, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
	}

	ngOnInit() {

		this.searchResults = [
			new SearchObject(682, "My Facility, Office Property", "3438 Peachtree Rd - Phipps Tower, Atlanta, GA", "facilities/portfolio/property"),
			new SearchObject(696, "My Facility, Office Property", "3333 Piedmont Rd - Terminus 200, Atlanta, GA", "facilities/portfolio/property"),
			new SearchObject(696, "Office Property", "3350 Peachtree Rd, Atlanta, GA", ""),			
			new SearchObject(696, "Office Property", "3390 Peachtree Rd - Lenox Towers South, Atlanta, GA", ""),
			new SearchObject(696, "Office Property", "3575 Piedmont Rd - 15 Piedmont Center, Atlanta, GA", ""),			
			new SearchObject(3, "Deal, Office Property", "North Buckhead Atlanta - New Lease", "facilities/deals/deal"),			
			new SearchObject(3, "Project, Office Property", "USA-GA-Atlanta Renewal", "facilities/projects/project"),
			new SearchObject(13, "Project, Flex Property", "USA-GA-Atlanta Purchase", "facilities/projects/project"),
		];

		this.filteredResults = this.searchControl.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filter(value))
			);
	}

	private _filter(value: string): SearchObject[] {
		const filterValue = value.toLowerCase();

		return this.searchResults.filter(option => option.name.toLowerCase().includes(filterValue));
	}

	close() {
		this.sidenav.close();
	}

	navigateToObject(result) {
		console.log(this.searchControl);
		this.router.navigate([result.routePath, result.id], {relativeTo: this.route } );	
	}	

	// hideMenu() {
	// 	this.trigger.closeMenu();
	// }

	logout() {
        this.authenticationService.logout();
    }

}
