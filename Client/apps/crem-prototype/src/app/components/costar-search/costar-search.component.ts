import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'costar-search',
	templateUrl: './costar-search.component.html',
	styleUrls: ['./costar-search.component.scss']
})
export class CostarSearchComponent implements OnInit {

	@Output() changed = new EventEmitter<string>();
	@Input() searchText : string = null;
	@Input() placeholder : string = "Search...";

	constructor() { }

	ngOnInit() {
	}

	outputSearchText(e) {
		this.changed.emit(this.searchText);
	} 

}
