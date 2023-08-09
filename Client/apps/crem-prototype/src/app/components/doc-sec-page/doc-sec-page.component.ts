import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'doc-sec-page',
  templateUrl: './doc-sec-page.component.html',
  styleUrls: ['./doc-sec-page.component.scss']
})
export class DocSecPageComponent implements OnInit {

	@Input() document : string;
	@Input() section : string;
	@Input() page : string;

	constructor() { }

	ngOnInit() {
	}

}
