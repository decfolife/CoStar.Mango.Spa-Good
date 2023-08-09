import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Milestone } from '../../app.service';

@Component({
	selector: 'milestone-chart',
	templateUrl: './milestone-chart.component.html',
	styleUrls: ['./milestone-chart.component.scss'],
	providers: [ Service ]
})
export class MilestoneChartComponent implements OnInit {

	data : Milestone[];
	// @Input() data : Milestone[];
	@Input() projectId : Number;
	@Input() showDates : Boolean;


	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		// console.log(this.data);
		// console.log(this.projectId);
		this.data = this.service.getProjectMilestones(this.projectId);
	}

}
