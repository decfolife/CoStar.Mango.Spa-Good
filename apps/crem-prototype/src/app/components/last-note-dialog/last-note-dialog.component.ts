import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Note } from '../../app.service';

@Component({
	selector: 'last-note-dialog',
	templateUrl: './last-note-dialog.component.html',
	styleUrls: ['./last-note-dialog.component.scss'],
	providers: [Service]
})
export class LastNoteDialogComponent implements OnInit {

	noteTypes : String[] = ['Status', 'File Upload', 'Task Approval'];
	allNotes : Note[];
	showMoreNotes : Boolean = false;

	@Output() saved = new EventEmitter<String>();
	@Output() cancelled = new EventEmitter<String>();

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.allNotes = this.service.getNotes();
	}

	toggleMoreNotes() {
		this.showMoreNotes = !this.showMoreNotes;
	}

	cancel() {
		this.cancelled.emit("cancelled");
	}

	save() {
		this.saved.emit("saved");
	}

}
