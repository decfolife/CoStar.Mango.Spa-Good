import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Service, Form, Section, FormField } from '../../app.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditFormFieldDialogComponent } from '../edit-form-field-dialog/edit-form-field-dialog.component';

@Component({
	selector: 'form-field',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	providers: [Service]
})
export class FormFieldComponent implements OnInit {

	@Input() field : FormField;
	@Input() clickable : Boolean = true;
	@Input() isDisabled : Boolean = true;
	@Input() isLabelOnTop : Boolean = true;
	@Output() removed = new EventEmitter<FormField>();

	constructor(private service : Service, private router: Router, private route: ActivatedRoute, public dialog: MatDialog ) { }

	ngOnInit() {
	}

	editField() {

		if( this.clickable ) {
			const dialogRef = this.dialog.open(EditFormFieldDialogComponent, {
				width: '80%',
				// height: '80%',
				data : this.field
			});

			dialogRef.afterClosed().subscribe(result => {
				if( result == 'remove' ) {
					this.removed.emit(this.field);
				}
				console.log('The edit field dialog was closed');
			});	
		}
		
	}

}
