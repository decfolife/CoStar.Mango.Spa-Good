import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Portfolio } from '../../../../../app.service';

@Component({
	selector: 'app-portfolio-object',
	templateUrl: './portfolio-object.component.html',
	styleUrls: ['./portfolio-object.component.scss'],
	providers: [Service]
})
export class PortfolioObjectComponent implements OnInit {

	portfolioId : Number;
	portfolio : Portfolio;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => { 
			this.portfolioId = params['portfolio_id']; 
			this.portfolio = this.service.getPortfolio(this.portfolioId);
		}); 
	}

	close() {
		this.router.navigate(['../../home/portfolios'], {relativeTo: this.route } );	
	}

}
