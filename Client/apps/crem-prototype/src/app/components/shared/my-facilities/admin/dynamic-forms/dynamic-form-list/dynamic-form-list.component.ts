import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Service, Form, ListPageQuery } from '../../../../../../app.service';

@Component({
  selector: 'app-dynamic-form-list',
  templateUrl: './dynamic-form-list.component.html',
  styleUrls: ['./dynamic-form-list.component.scss'],
	providers: [Service]
})
export class DynamicFormListComponent implements OnInit {

	forms : Form[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.forms = this.service.getForms();
		this.rowClickRoute = '../../dynamicforms';
		this.keyFields = ["id"];
		this.addWizards = [
			{	name : "Add Form" },			
		];
		this.columns = [
			{	dataField : "id",
				alignment : "left",
				caption : "ID",
				visible : true,
				dataType : "number"
			},
			{	dataField : "formName",
				alignment : null,
				visible : true,
				dataType : null
			},	
			{	dataField : "formType",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "objectType",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "lastModified",
				alignment : null,
				visible : true,
				dataType : "date"
			},			
		];

		// this.filteredForms = this.forms;

		// this.formTypes = ['Standard Form', 'Dialog Form'];
		// this.objectTypes = ['Building', 'Lease', 'Common Object', 'Project', 'Premise', 'Deal Term'];

		// this.newForm = new Form(0, '', '', '', '');	
	}

	// createForm() {
	// 	this.newForm.formName = this.newFormName.value;
	// 	this.newForm.formType = this.newFormType.value;
	// 	this.newForm.objectType = this.newFormObjectType.value;
	// 	this.newForm.id = 1 + Math.max.apply(Math, this.forms.map(function(o) { return o.id; }));
	// 	console.log(this.newForm);

	// 	this.service.postForm(this.newForm);
	// 	this.router.navigate(['../../dynamicforms', this.newForm.id], {relativeTo: this.route } );
	// }

	
}