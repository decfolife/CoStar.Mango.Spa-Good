import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxSelectBoxComponent } from "devextreme-angular";
import notify from 'devextreme/ui/notify';

@Component({
	selector: 'start-page-select',
	templateUrl: './start-page-select.component.html',
	styleUrls: ['./start-page-select.component.scss']
})
export class StartPageSelectComponent implements OnInit {

	@ViewChild("StartPageList") startPageList: DxSelectBoxComponent;

	startPageOptions : string[] = [
		"Portfolio", "Projects", "Contacts", "Reports", "Strategy", "Lease List Page", "Building List Page", "Project List Page", "Contact List Page", "Company List Page"
	];

	quickSelectStartPages : string[] = [
		"Portfolio", "Projects"
	];

	constructor( private route: ActivatedRoute, private router: Router ) { 
	}

	ngOnInit() {		
	}

	ngAfterViewInit() {
		this.startPageList.instance.focus();
	}

	goToPrototypeSelect() {
		this.router.navigate(['prototype']);
		
		notify({
			message : "User start page successfully.", 
			type : "success", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}

}
