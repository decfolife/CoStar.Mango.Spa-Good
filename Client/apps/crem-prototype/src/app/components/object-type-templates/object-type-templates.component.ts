import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, ObjectTemplate, TemplateNav } from '../../app.service';
import { animate, state, style, transition, trigger} from '@angular/animations';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTemplateDialogComponent } from '../edit-template-dialog/edit-template-dialog.component';
import { EditLeftNavDialogComponent } from '../edit-left-nav-dialog/edit-left-nav-dialog.component';

@Component({
	selector: 'object-type-templates',
	templateUrl: './object-type-templates.component.html',
	styleUrls: ['./object-type-templates.component.scss'],
	providers: [Service],
	animations: [
	trigger('detailExpand', [
		state('collapsed', style({height: '0px', minHeight: '0', padding: '0px'})),
		state('expanded', style({height: '*'})),
		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	]
})
export class ObjectTypeTemplatesComponent implements OnInit {

	@Input() objectType : String;
	templates : ObjectTemplate[];
	navs : TemplateNav[] = [];
	columnsToDisplay = ['name'];
	navColumns = ['name', 'form', 'isLanding', 'action'];
	expandedElement : ObjectTemplate | null;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute, public dialog: MatDialog ) {

	}

	ngOnInit() {
		this.route.parent.params.subscribe(params => { 
			let portfolioId = params['portfolio_id']; 
			// this.portfolio = this.service.getPortfolio(this.portfolioId);

			this.templates = this.service.getObjectTemplates(this.objectType);
		}); 
	}	

	toggleTableRow(element) {
		this.expandedElement = (this.expandedElement === element ? null : element);

		if( this.expandedElement != null ) {
			this.navs = this.service.getTemplateNav(element.id);	
		}		
	}

	openTemplateEditor(element) {		
		const dialogRef = this.dialog.open(EditTemplateDialogComponent, {
			width: '80%',
			data : element
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	openLeftNavEditor(element) {
		const dialogRef = this.dialog.open(EditLeftNavDialogComponent, {
			width: '80%',
			data : element
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
}
