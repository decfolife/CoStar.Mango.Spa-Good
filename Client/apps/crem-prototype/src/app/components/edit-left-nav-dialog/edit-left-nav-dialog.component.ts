import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioChange } from '@angular/material/radio';
import { Service, TemplateNav, User, Group } from '../../app.service';

@Component({
	selector: 'app-edit-left-nav-dialog',
	templateUrl: './edit-left-nav-dialog.component.html',
	styleUrls: ['./edit-left-nav-dialog.component.scss'],
	providers: [Service],
})
export class EditLeftNavDialogComponent implements OnInit {

	availableObjects : Object[] = [];
	availableUsers : User[] = [];
	availableGroups : Group[] = [];

	selectedObjects : Object[] = [];
	selectedUsers : User[] = [];
	selectedGroups : Group[] = [];

	showUsers : Boolean = true;

	@ViewChild('availableGrid') availableGrid : any;
	@ViewChild('selectedGrid') selectedGrid : any;

	constructor( public dialogRef: MatDialogRef<EditLeftNavDialogComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: TemplateNav, private service : Service ) {
	}

	ngOnInit() {
		this.availableUsers = this.service.getUsers();
		this.availableObjects = this.availableUsers;
	}

	onNoClick(): void {
		this.dialogRef.close();

		this._snackBar.open('Left Nav Saved', 'Dismiss', {
			// duration: 2000,
			horizontalPosition: 'right',
			verticalPosition: 'bottom',
			panelClass : 'snackbar-default'
		});
	}

	toggleType( event : MatRadioChange ) {

		if( event.value == "Users") {
			this.availableObjects = this.availableUsers;
			this.selectedObjects = this.selectedUsers;
			this.showUsers = true;
		} else {
			this.availableObjects = this.availableGroups;
			this.selectedObjects = this.selectedGroups;
			this.showUsers = false;
		}
	}

	assign( restrictionType, selectedRecords ) {
		console.log(restrictionType, selectedRecords);
		// console.log(this.availableGrid.instance.getSelectedRowsData());

		if(this.showUsers) {
			selectedRecords.forEach(itm => {			
				this.selectedUsers.push(itm);
				let removeIndex = this.availableUsers.map(function(user) { return user.id; }).indexOf(itm.id);
				this.availableUsers.splice(removeIndex, 1);
			});
			this.selectedObjects = this.selectedUsers;	
			this.availableObjects = this.availableUsers;
		} else {
			selectedRecords.forEach(itm => {
				this.selectedGroups.push(itm);
				let removeIndex = this.availableGroups.map(function(group) { return group.id; }).indexOf(itm.id);
				this.availableGroups.splice(removeIndex, 1);
			});
			this.selectedObjects = this.selectedGroups;	
		}
		
	}


	remove( selectedRecords ) {
		console.log(selectedRecords);
		// console.log(this.availableGrid.instance.getSelectedRowsData());

		if(this.showUsers) {
			selectedRecords.forEach(itm => {			
				this.availableUsers.push(itm);

				let removeIndex = this.selectedUsers.map(function(user) { return user.id; }).indexOf(itm.id);
				this.selectedUsers.splice(removeIndex, 1);
			});
			this.selectedObjects = this.selectedUsers;	
			this.availableObjects = this.availableUsers;
		} else {
			selectedRecords.forEach(itm => {
				this.availableGroups.push(itm);

				let removeIndex = this.selectedGroups.map(function(group) { return group.id; }).indexOf(itm.id);
				this.selectedGroups.splice(removeIndex, 1);
			});
			this.selectedObjects = this.selectedGroups;
			this.availableObjects = this.availableGroups;	
		}
		
	}

}
