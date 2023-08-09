import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, JournalEntryAccount } from '../../app.service';


@Component({
  selector: 'journal-entry-accounts-card',
  templateUrl: './journal-entry-accounts-card.component.html',
  styleUrls: ['./journal-entry-accounts-card.component.scss'],
  providers: [Service]
})
export class JournalEntryAccountsCardComponent implements OnInit {

	accounts : JournalEntryAccount[];

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.accounts = this.service.getJournalEntryAccounts();		
	}

}
