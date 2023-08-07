import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

	constructor( private router: Router, private route: ActivatedRoute ) { 
	}

	ngOnInit() {
	}

	close() {
		this.router.navigate(['../../home/companies'], { relativeTo: this.route });
	}

}
