import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

	@Input() text : String = "";
	@Input() type : String = "primary"

	constructor() { 
		
	}

	ngOnInit() {
	}

}
