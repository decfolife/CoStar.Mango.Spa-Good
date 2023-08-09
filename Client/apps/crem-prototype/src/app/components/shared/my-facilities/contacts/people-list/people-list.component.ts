import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, User, ListPageQuery } from '../../../../../app.service';

@Component({
	selector: 'people-list',
	templateUrl: './people-list.component.html',
	styleUrls: ['./people-list.component.scss'],
	providers : [Service]
})
export class PeopleListComponent implements OnInit {

	people : User[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.people = this.service.getUsers();
		this.queries = this.service.getListPageQueriesByObjectType('contact');	
		this.rowClickRoute = '../../contact';
		this.keyFields = ["id"];
		this.addWizards = [
			{	name : "Contact" },			
		];
		this.columns = [
			{	dataField : "id",
				alignment : "left",
				caption : "ID",
				visible : true,
				dataType : "number"
			},
			{	dataField : "firstName",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "lastName",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "email",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "preferredName",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "title",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "company",
				alignment : null,
				visible : true,
				dataType : null
			},		
		];
	}	
}