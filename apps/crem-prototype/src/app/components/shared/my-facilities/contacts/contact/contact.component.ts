import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	constructor( private router: Router, private route: ActivatedRoute ) { 
	}

	ngOnInit() {
	}

	close() {
		this.router.navigate(['../../home/people'], { relativeTo: this.route });
	}

}
