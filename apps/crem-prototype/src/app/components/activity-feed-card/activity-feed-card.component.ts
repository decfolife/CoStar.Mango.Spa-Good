import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, ProjectActivity } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'activity-feed-card',
	templateUrl: './activity-feed-card.component.html',
	styleUrls: ['./activity-feed-card.component.scss'],
	providers: [Service]
})
export class ActivityFeedCardComponent implements OnInit {

	@Input() mode : string = 'projects'
	activities : any;
	isExpanded : Boolean = true;

	@ViewChild("ActivityDataGrid") dataGrid: DxDataGridComponent;
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		if( this.mode == 'projects') {
			this.activities = this.service.getProjectActivities();	
		} else {
			this.activities = this.service.getPortfolioActivities();	
		}
		
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

}
