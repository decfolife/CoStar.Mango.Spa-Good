import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Transaction } from '../../../../../app.service';

@Component({
  selector: 'project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {

	transaction : Transaction;
	isVisible : Boolean = true;
	title : string;

	transactionTypes : any;
	transactionManagers : any;
	clients : any;
	templates : any;
	teams : any;
	countries : any;
	states : any;
	markets : any;
	submarkets : any;
	buildingClasses : any;
	spaceUses : any;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute, private _location: Location ) { 				
	}

	ngOnInit() {
		this.clients = [
			{ value : "ADT", display : "Amazon"}
		];
		this.transactionManagers = [
			{ value : "ADT", display : "Amazon"}
		];
		this.transactionTypes = [
			{ value : "ADT", display : "Amazon"}
		];
		this.templates = [
			{ value : "ADT", display : "Amazon"}
		];
		this.teams = [
			{ value : "ADT", display : "Amazon"}
		];
		this.countries = [
			{ value : "ADT", display : "Amazon"}
		];
		this.states = [
			{ value : "ADT", display : "Amazon"}
		];
		this.markets = [
			{ value : "ADT", display : "Amazon"}
		];
		this.submarkets = [
			{ value : "ADT", display : "Amazon"}
		];
		this.buildingClasses = [
			{ value : "ADT", display : "Amazon"}
		];
		this.spaceUses = [
			{ value : "ADT", display : "Amazon"}
		];
	}

	close(e) {
		// console.log("closing");
    this._location.back();
		// this.isVisible = false;
	}

	saveProject(e) {
		// console.log("saving");
		this.close(e);		
	}	

}
