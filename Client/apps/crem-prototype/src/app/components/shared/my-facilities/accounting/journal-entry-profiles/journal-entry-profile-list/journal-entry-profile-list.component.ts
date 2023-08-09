import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, JournalEntryProfile, ListPageQuery } from '../../../../../../app.service';

@Component({
  selector: 'app-journal-entry-profile-list',
  templateUrl: './journal-entry-profile-list.component.html',
  styleUrls: ['./journal-entry-profile-list.component.scss'],
  providers: [Service]
})
export class JournalEntryProfileListComponent implements OnInit {

	profiles : JournalEntryProfile[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.profiles = this.service.getJournalEntryProfiles();
		this.rowClickRoute = '../../jeprofiles';
		this.keyFields = ["id"];
		this.addWizards = [
			{	name : "Journal Entry Profile" },			
		];
		this.columns = [
			{	dataField : "id",
				alignment : "left",
				caption : "ID",
				visible : true,
				dataType : "number"
			},
			{	dataField : "name",
				alignment : null,
				visible : true,
				dataType : null
			},	
			{	dataField : "portfolio",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "classificationType",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "exportDebitCode",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "exportCreditCode",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "useAbsoluteValues",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "comments",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "isActive",
				alignment : null,
				visible : true,
				dataType : null
			},		
		];
	}

	
}