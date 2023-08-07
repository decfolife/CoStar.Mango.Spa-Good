import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service, Section } from '../../app.service';
import { DxPopupComponent, DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'edit-form-section-dialog',
	templateUrl: './edit-form-section-dialog.component.html',
	styleUrls: ['./edit-form-section-dialog.component.scss'],
	providers: [Service]
})
export class EditFormSectionDialogComponent implements OnInit {

	@Input() section : Section;
	@Output() removed = new EventEmitter<Section>();
	@Output() saved = new EventEmitter<Section>();
	@Output() cancelled = new EventEmitter<Section>();
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {	
	}

	ngOnInit() {
		
	}

	remove() {
		this.removed.emit(this.section);
	}

	cancel() {
		this.cancelled.emit(this.section);
	}

	save() {
		this.saved.emit(this.section);
	}
}
