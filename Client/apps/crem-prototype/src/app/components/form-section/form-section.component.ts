import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormControl } from '@angular/forms';
import { Service, Form, Section, FormField, FormFieldUse, Dropdown, DropdownValue } from '../../app.service';
import { DxPopupComponent, DxDataGridComponent } from "devextreme-angular";
import notify from 'devextreme/ui/notify';

export class ControlType {
    controlType: String;
    devExTemplate : String;
    dataTypes: String[];
    
    constructor(controlType,devExTemplate,dataTypes) {
		this.controlType = controlType;
		this.devExTemplate = devExTemplate;
		this.dataTypes = dataTypes;
	}
}

@Component({
	selector: 'form-section',
	templateUrl: './form-section.component.html',
	styleUrls: ['./form-section.component.scss'],
	providers: [Service]
})
export class FormSectionComponent implements OnInit {

	@Input() section : Section;
	@Input() availableFields : FormField[];
	@Output() removed = new EventEmitter<Section>();
	@ViewChild('availableFieldsGrid') availableFieldsGrid : DxDataGridComponent;
	@ViewChild("FormItemPopup") formItemPopup : DxPopupComponent;
	@ViewChild("FormSectionPopup") formSectionPopup : DxPopupComponent;
	formItemPopupVisible : Boolean;
	formSectionPopupVisible : Boolean;
	currentFormItem : FormField;
	formItemPopupTitle : String;
	sectionFields : FormField[] = [];	
	selectedFields = new UntypedFormControl();
	sampleRadioItems : String[] = ['Option A', 'Option B', 'Option C'];
	fieldSearchText : string = null;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute ) { 
	}

	ngOnInit() {		
		// Get the fields for this section
		this.sectionFields = this.service.getSectionFields(this.section.id);		
	}

	createNewField() {
		let newField = new FormField(0, "My New Field", '', 'input', 'Building', null, null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null);
		this.currentFormItem = newField;
		this.sectionFields.push(this.currentFormItem);
		this.launchFormItemPopup({ name : 0 });		
	}

	addFields() {
		let newFields = this.availableFieldsGrid.instance.getSelectedRowsData();
		
		newFields.forEach(itm => {this.sectionFields.push(itm); this.availableFields.splice(this.availableFields.indexOf(itm), 1);});

		this.availableFieldsGrid.instance.clearSelection();
	}

	launchFormItemPopup(data) {
		this.currentFormItem = this.sectionFields.find(itm => itm.id == data.name);
		this.formItemPopupTitle = "Edit Field - " + this.currentFormItem.label + " (" + this.currentFormItem.id.toString() + ")";
		
		this.formItemPopupVisible = true;
	}

	formItemRemove(formField: FormField) {
		this.currentFormItem = formField;
		this.sectionFields.splice(this.sectionFields.indexOf(this.currentFormItem), 1);
		this.availableFields.push(this.currentFormItem);
		this.formItemPopupVisible = false;

		notify({
			message : "Field: '" + this.currentFormItem.label + "' removed.", 
			type : "info", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}

	formItemCancel(formField: FormField) {
		this.currentFormItem = formField;
		this.formItemPopupVisible = false;
	}

	formItemSave(formField: FormField) {
		this.currentFormItem = formField;

		this.formItemPopupVisible = false;

		notify({
			message : "Field: '" + this.currentFormItem.label + "' saved successfully.", 
			type : "success", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}

	launchFormSectionPopup() {
		this.formSectionPopupVisible = true;
	}

	formSectionCancel(section: Section) {
		this.section = section;
		this.formSectionPopupVisible = false;
	}

	formSectionSave(section: Section) {
		this.formSectionPopupVisible = false;

		notify({
			message : "Section: '" + this.section.sectionName + "' saved successfully.", 
			type : "success", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}

	formSectionRemove(section: Section) {
		this.section = section;
		this.removed.emit(this.section);
	}	

    searchAvailableFieldsDataGrid(data) {		
		this.availableFieldsGrid.instance.searchByText(data);
	}
}
