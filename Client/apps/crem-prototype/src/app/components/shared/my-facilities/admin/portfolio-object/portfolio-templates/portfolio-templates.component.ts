import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../../../../../app.service';



@Component({
	selector: 'app-portfolio-templates',
	templateUrl: './portfolio-templates.component.html',
	styleUrls: ['./portfolio-templates.component.scss'],
	providers: [Service],	
})
export class PortfolioTemplatesComponent implements OnInit {

	constructor(private service : Service, private router: Router, private route: ActivatedRoute ) {

	}

	ngOnInit() {
		
	}		

}
