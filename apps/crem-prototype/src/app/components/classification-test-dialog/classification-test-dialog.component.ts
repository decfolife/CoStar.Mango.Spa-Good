import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../app.service';

@Component({
	selector: 'classification-test-dialog',
	templateUrl: './classification-test-dialog.component.html',
	styleUrls: ['./classification-test-dialog.component.scss'],
	providers: [Service],
})
export class ClassificationTestDialogComponent implements OnInit {

	@Output() saved = new EventEmitter<String>();
	@Output() cancelled = new EventEmitter<String>();
	yesNo : String[] = ["Yes", "No"];

  	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {	
	}

	ngOnInit() {
	}

	cancel() {
		this.cancelled.emit("cancelled");
	}

	save() {
		this.saved.emit("saved");
	}

}
