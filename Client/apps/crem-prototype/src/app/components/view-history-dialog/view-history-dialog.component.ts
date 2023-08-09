import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'view-history-dialog',
  templateUrl: './view-history-dialog.component.html',
  styleUrls: ['./view-history-dialog.component.scss']
})
export class ViewHistoryDialogComponent implements OnInit {

	@Output() closed = new EventEmitter<Event>();
	
	constructor() { }

	ngOnInit() {
	}

}
