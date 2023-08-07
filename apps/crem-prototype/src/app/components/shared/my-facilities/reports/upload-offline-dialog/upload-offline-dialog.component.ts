import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../../../../app.service';

@Component({
	selector: 'upload-offline-dialog',
	templateUrl: './upload-offline-dialog.component.html',
	styleUrls: ['./upload-offline-dialog.component.scss']
})
export class UploadOfflineDialogComponent implements OnInit {

	isVisible : Boolean = true;
	title : string = "Upload Offline Report Template";

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
	}

	close() {
		// this.isVisible = false;
		this.router.navigate(['../'], {relativeTo: this.route } );
	}

	save() {
		// this.isVisible = false;
		this.router.navigate(['../'], {relativeTo: this.route } );
	}
}
