import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, FormField, Form, Section } from '../../../../../../app.service';
import { DxFormComponent, DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
	selector: 'app-dynamic-form',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	providers: [Service]
})
export class DynamicFormComponent implements OnInit {

	formFields : Object[];

	form : Form;
	availableFields : FormField[] = [];
	sections : Section[] = [];
	availableSections : Section[] = [];
	@ViewChild('availableSectionsGrid') availableSectionsGrid : DxDataGridComponent;

	sectionSearchText : string = null;
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.route.params.subscribe(params => { 
			this.form = this.service.getForm(parseInt(params['form_id']));
			this.sections = this.service.getFormSections(this.form.id);	
			this.availableFields = this.service.getAvailableFormFields(this.form.id);
			this.availableSections = this.service.getAvailableFormSections(this.form.id);
		}); 
	}

	close() {
		// this.router.navigate(['/costar-b/facilities/admin/home/dynamicforms']);
		this.router.navigate(['../../dynamicforms'], {relativeTo: this.route } );
	}

	createNewSection( columns ) {
		
		let isTableData = false,
			allowEditing = false,
			allowAdding = false;

		if( columns == 0) {
			isTableData = true;
			allowEditing = true;
			allowAdding = true;
		}		

		let s = new Section(0, 'New Section', columns, this.form.objectType, 2, isTableData, allowEditing, allowAdding, [], [], []);

		this.sections.push(s);
	}

	addSections() {
		let newSections = this.availableSectionsGrid.instance.getSelectedRowsData();
		
		newSections.forEach(itm => {this.sections.push(itm); this.availableSections.splice(this.availableSections.indexOf(itm), 1);});

		this.availableSectionsGrid.instance.clearSelection();

		// Add the sections to the form sections at the service level
		this.service.postSectionsToForm(newSections, this.form.id);

		// Refresh the available fields 
		this.availableFields = this.service.getAvailableFormFields(this.form.id);

	}

	onRemoved(section: Section) {
		this.sections.splice(this.sections.indexOf(section), 1);
		this.availableSections.push(section);
		
		// remove section from service
		this.service.deleteSectionFromForm(section.id, this.form.id);

		// Refresh the available fields 
		this.availableFields = this.service.getAvailableFormFields(this.form.id);

		notify({
			message : "Section: '" + section.sectionName + "' removed.", 
			type : "info", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}

	searchAvailableSectionsDataGrid(data) {		
		this.availableSectionsGrid.instance.searchByText(data);
	}

	
}
