import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Report } from '../../app.service';

@Component({
	selector: 'my-reports-card',
	templateUrl: './my-reports-card.component.html',
	styleUrls: ['./my-reports-card.component.scss'],
	providers: [Service]
})
export class MyReportsCardComponent implements OnInit {

	myReports : Report[];
	@Input() isProject : Boolean = true;
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		if( this.isProject ) {
			this.myReports = this.service.getMyReports('project');		
		} else {
			this.myReports = this.service.getMyReports('portfolio');		
		}
	}

}
