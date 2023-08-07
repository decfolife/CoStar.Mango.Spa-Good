import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, User, TransactionActivity } from '../../app.service';

@Component({
	selector: 'activity-item',
	templateUrl: './activity-item.component.html',
	styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {

	@Input() activity : TransactionActivity;
	// replies : TransactionActivity[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {

	}

	ngOnInit() {
		// fetch the child activities/replies for this activity
		// if( this.activity.parentActivityId == 0 ) {
		// 	this.replies = this.service.getTransactionActivities(this.activity.projectId, this.activity.parentActivityId);
		// }
	}

}
