import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../../../../app.service';

@Component({
  selector: 'share-report-dialog',
  templateUrl: './share-report-dialog.component.html',
  styleUrls: ['./share-report-dialog.component.scss']
})
export class ShareReportDialogComponent implements OnInit {

	isVisible : Boolean = true;
	title : string = "Share Report";

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
