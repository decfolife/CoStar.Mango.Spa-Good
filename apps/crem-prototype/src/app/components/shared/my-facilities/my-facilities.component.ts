import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Service, Favorite } from '../../../app.service';

@Component({
	selector: 'app-my-facilities',
	templateUrl: './my-facilities.component.html',
	styleUrls: ['./my-facilities.component.scss'],
	providers: [Service]
})
export class MyFacilitiesComponent implements OnInit {
	
	environment : String;
	isCostarStyle : Boolean = false;
	isPasswordExpiring: boolean = true;

	recentBuildings : Favorite[];
	recentLeases : Favorite[];
	recentProjects : Favorite[];
	recentAccounting : Favorite[];
	recentDeals : Favorite[];

	favoriteBuildings : Favorite[];
	favoriteLeases : Favorite[];
	favoriteProjects : Favorite[];
	favoriteAccounting : Favorite[];
	favoriteDeals : Favorite[];
	favoriteReports : Favorite[];

	envPopoverVisible : Boolean = false;

	constructor( public service : Service, private router: Router, private route: ActivatedRoute ) { 
	}

	ngOnInit() {
		this.environment = this.service.getEnvironment() ? 'Production' : 'Stage';

		this.route.parent.url.subscribe(url => { 
			if( url[0].path == "costar" ){
				this.isCostarStyle = true;
			}
		});

		this.recentBuildings = this.service.getRecent("Building");
		this.recentLeases = this.service.getRecent("Lease");
		this.recentProjects = this.service.getRecent("Project");
		this.recentAccounting = this.service.getRecent("Accounting");
		this.recentDeals = this.service.getRecent("Deal");

		this.favoriteBuildings = this.service.getFavorite("Building");
		this.favoriteLeases = this.service.getFavorite("Lease");
		this.favoriteProjects = this.service.getFavorite("Project");
		this.favoriteAccounting = this.service.getFavorite("Accounting");
		this.favoriteDeals = this.service.getFavorite("Deal");
		this.favoriteReports = this.service.getFavorite("Report");
	}

	toggleEnvironment() {
		this.service.toggleEnvironment();
		this.environment = this.service.getEnvironment() ? 'Production' : 'Stage';
	}

	toggleEnvironmentPopover() {
		this.envPopoverVisible = !this.envPopoverVisible;
	}



}
