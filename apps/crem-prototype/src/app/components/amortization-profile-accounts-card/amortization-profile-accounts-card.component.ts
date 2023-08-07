import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, GLAccount } from '../../app.service';

@Component({
  selector: 'amortization-profile-accounts-card',
  templateUrl: './amortization-profile-accounts-card.component.html',
  styleUrls: ['./amortization-profile-accounts-card.component.scss']
})
export class AmortizationProfileAccountsCardComponent implements OnInit {

	accounts : GLAccount[];

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.accounts = this.service.getGLAccounts();		
	}

}
