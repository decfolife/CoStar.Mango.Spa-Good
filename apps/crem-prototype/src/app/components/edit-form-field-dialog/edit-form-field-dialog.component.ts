import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service, FormField, FormFieldUse, Dropdown, DropdownValue } from '../../app.service';
import { DxPopupComponent, DxDataGridComponent } from "devextreme-angular";

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
	selector: 'edit-form-field-dialog',
	templateUrl: './edit-form-field-dialog.component.html',
	styleUrls: ['./edit-form-field-dialog.component.scss'],
	providers: [Service]
})
export class EditFormFieldDialogComponent implements OnInit {

	@Input() formField : FormField;
	@Output() removed = new EventEmitter<FormField>();
	@Output() saved = new EventEmitter<FormField>();
	@Output() cancelled = new EventEmitter<FormField>();
	@ViewChild("dropdownValueGrid") dropdownValueDataGrid: DxDataGridComponent;

	controlTypes : ControlType[];
	dataTypes : String[] = [];
	formFieldUse : FormFieldUse[];

	dropdowns : Dropdown[];
	dropdownValues : DropdownValue[];
	sortOrders : String[];

	creatingDropdown : Boolean = false;
	newDropdownName : string = null;
	newDropdownSaveButton: any;
	newDropdownCancelButton: any;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {	
		this.onReorder = this.onReorder.bind(this);	
	}

	ngOnInit() {

		this.controlTypes = [		
			new ControlType('Calculated', "calculatedTemplate", ['Boolean', 'Currency', 'Date', 'Decimal', 'Currency', 'Integer', 'Percent', 'Text < 50', 'Text < 400', 'Text < 8000']),
			new ControlType('Checkbox', "checkboxTemplate", ['Boolean'] ),
			new ControlType('Clause', "clauseTemplate", ['Text < 8000'] ),
			new ControlType('Date Picker', "dateBoxTemplate", ['Date'] ),
			new ControlType('Dropdown', "selectBoxTemplate", ['Currency', 'Date', 'Decimal', 'Currency', 'Integer', 'Percent', 'Text < 50', 'Text < 400', 'Text < 8000'] ),
			new ControlType('Hierarchy', "hierarchyTemplate", ['Text < 400'] ),
			new ControlType('Input', "textBoxTemplate", ['Currency', 'Date', 'Decimal', 'Currency', 'Integer', 'Percent', 'Text < 50', 'Text < 400', 'Text < 8000'] ),
			new ControlType('Radio Button', "radioButtonTemplate", ['Currency', 'Date', 'Decimal', 'Currency', 'Integer', 'Percent', 'Text < 50', 'Text < 400', 'Text < 8000'] ),
			new ControlType('Read Only', "readOnlyTemplate", ['Currency', 'Date', 'Decimal', 'Currency', 'Integer', 'Percent', 'Text < 50', 'Text < 400', 'Text < 8000'] ),
			new ControlType('Text Area', "textAreaTemplate", ['Currency', 'Date', 'Decimal', 'Currency', 'Integer', 'Percent', 'Text < 50', 'Text < 400', 'Text < 8000'] ),
			new ControlType('Toggle', "slideToggleTemplate", ['Boolean']),
		];	

		this.dropdowns = this.service.getDropdowns();		
		this.sortOrders = [ "Display | ASC", "Display | DESC", "Sort Order | ASC", "Sort Order | DESC", "Value | ASC", "Value | DESC"];
		if( this.formField.dropdownId != null ) {
			this.dropdownValues = this.service.getDropdownValues(this.formField.dropdownId);
		} else {
			this.dropdownValues = [];
		}

		this.dataTypes = this.controlTypes.find(itm => itm.devExTemplate == this.formField.dxTemplate).dataTypes;	
		this.formFieldUse = this.service.getFormFieldUse(this.formField.id);

		this.newDropdownSaveButton = {
			icon: "check",
			stylingMode: "text",
			onClick: (e) => {
				let newDropdown = this.service.postDropdown(this.newDropdownName);
				this.creatingDropdown = false;
                this.newDropdownName = null;
                this.dropdowns = this.service.getDropdowns();
                this.formField.dropdownId = newDropdown.id;
            }
		}

		this.newDropdownCancelButton = {
			icon: "close",	
			stylingMode: "text",		
			onClick: (e) => {
				this.creatingDropdown = false;
                this.newDropdownName = null;
            }
		}
	}	

	remove() {
		this.removed.emit(this.formField);
	}

	cancel() {
		this.cancelled.emit(this.formField);
	}

	save() {
		this.saved.emit(this.formField);
	}

	handleToggleChange(e) {
		this.formField[e.source.name] = e.checked;
	}

	controlTypeChanged(e) {		
		this.dataTypes = this.controlTypes.find(itm => itm.devExTemplate == this.formField.dxTemplate).dataTypes;	
	}

	dropdownChanged(e) {
		let newValues = this.service.getDropdownValues(e.value);
		if( newValues.length > 0 ) {
			this.dropdownValues = newValues;
		} else {
			this.dropdownValues = [];
		}
	}

	onReorder(e) {
        var visibleRows = e.component.getVisibleRows(),
            toIndex = this.dropdownValues.indexOf(visibleRows[e.toIndex].data),
            fromIndex = this.dropdownValues.indexOf(e.itemData);

        this.dropdownValues.splice(fromIndex, 1);
        this.dropdownValues.splice(toIndex, 0, e.itemData);
    }

    addDropdownValue() {
    	this.dropdownValueDataGrid.instance.addRow();
    }

    postDropdownValue(e) {
    	let newDropdownValue = this.service.postDropdownValue( e.data.display, e.data.value, e.data.isActive, this.formField.dropdownId );
		this.dropdownValues = this.service.getDropdownValues(this.formField.dropdownId);
    }

    createNewDropdown() {
    	this.creatingDropdown = true;
    }

}
