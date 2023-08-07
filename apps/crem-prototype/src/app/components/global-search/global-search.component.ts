import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField } from '../../app.service';

@Component({
	selector: 'global-search',
	templateUrl: './global-search.component.html',
	styleUrls: ['./global-search.component.scss'],
	providers: [Service]
})
export class GlobalSearchComponent implements OnInit {

	searchTerm : string;
	objectTypes :  Array<any>;
	searchButton: any;
	objectTypeButton : any;
	objectType : String;
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.objectTypes = [ {id : 0, value : "All"}, {id : 1, value : "Center"}, {id : 2, value : "Store"}, {id : 3, value : "Lease"}, {id : 4, value : "Project"}, {id : 5, value : "Company"}, {id : 6, value : "Contact"} ];

		this.searchButton = {
            icon: "search",
            stylingMode: "text",
            width: 40,    
            onClick : () => {
                this.router.navigate(['/rem-a/facilities/search-results'] );	
            }                 
        };        
	}

}
