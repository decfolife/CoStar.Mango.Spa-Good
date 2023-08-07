import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../../../../app.service';

@Component({
  selector: 'assign-tags-dialog',
  templateUrl: './assign-tags-dialog.component.html',
  styleUrls: ['./assign-tags-dialog.component.scss']
})
export class AssignTagsDialogComponent implements OnInit {

	isVisible : Boolean = true;
	title : string = "Assign Tags";

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
	}

	close() {
		// this.isVisible = false;
		this.router.navigate(['../../'], {relativeTo: this.route } );
	}

	save() {
		// this.isVisible = false;
		this.router.navigate(['../../'], {relativeTo: this.route } );
	}

}
