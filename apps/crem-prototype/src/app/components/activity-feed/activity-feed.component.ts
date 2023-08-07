import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../app.service';

@Component({
	selector: 'activity-feed',
	templateUrl: './activity-feed.component.html',
	styleUrls: ['./activity-feed.component.scss'],
	providers: [ Service ]
})
export class ActivityFeedComponent implements OnInit {

	@Input() data : Array<any>;
	@Input() mode : string;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
	}

}
