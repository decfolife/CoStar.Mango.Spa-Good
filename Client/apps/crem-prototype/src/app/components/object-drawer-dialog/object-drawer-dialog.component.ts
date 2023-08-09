import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../app.service';
import { DxPopupComponent, DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'object-drawer-dialog',
	templateUrl: './object-drawer-dialog.component.html',
	styleUrls: ['./object-drawer-dialog.component.scss'],
	providers: [Service]
})
export class ObjectDrawerDialogComponent implements OnInit {

	@Output() closed = new EventEmitter<any>();
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {	
	}

	ngOnInit() {
		
	}

	close() {
		this.closed.emit();
	}
}
