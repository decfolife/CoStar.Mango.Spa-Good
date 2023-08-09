import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service, ObjectTemplate } from '../../app.service';


@Component({
	selector: 'app-edit-template-dialog',
	templateUrl: './edit-template-dialog.component.html',
	styleUrls: ['./edit-template-dialog.component.scss'],
	providers: [Service],
})
export class EditTemplateDialogComponent implements OnInit {

	constructor( public dialogRef: MatDialogRef<EditTemplateDialogComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: ObjectTemplate, private service : Service ) {
	}

	ngOnInit() {
		console.log(this.data);
	}

	onNoClick(): void {
		this.dialogRef.close();

		this._snackBar.open('Template Saved', 'Dismiss', {
			duration: 2000,
			horizontalPosition: 'right',
			verticalPosition: 'bottom',
			panelClass : 'snackbar-default'
		});
	}
}
