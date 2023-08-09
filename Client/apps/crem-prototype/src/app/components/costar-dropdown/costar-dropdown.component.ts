import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Service, DropdownField } from '../../app.service';

@Component({
	selector: 'costar-dropdown',
	templateUrl: './costar-dropdown.component.html',
	styleUrls: ['./costar-dropdown.component.scss']
})
export class CostarDropdownComponent implements OnInit {

	@Input() dropdownData : DropdownField;
	@Input() selectMode : string;
	@Input() isReadOnly : boolean = false;
	@Output() changed : EventEmitter<any> = new EventEmitter();

	isOpened : Boolean = false;
	selectedItems : any;
	checkboxesMode : string = "none";
	
	constructor(private elRef:ElementRef) { }

	ngOnInit() {
		this.selectedItems = this.dropdownData.selected;
		if( this.dropdownData.selectMode == "multiple" ) {
			this.checkboxesMode = "always";
		}
	}	

	selectionChanged() {
		this.dropdownData.selected = this.selectedItems;
		this.changed.emit(this.selectedItems);

		if( this.dropdownData.selectMode == "single" ) {
			this.isOpened = false;
		}
	}

	dropdownChange(e) {
		if (!e.value) {
			this.changed.emit([null]);
		}
	}

	openDropdown(e) {
		let collection = document.getElementsByClassName("dx-editor-cell");	
		if( this.selectMode == "multiple") {
			setTimeout(() => {
				let arr = Array.from(collection);
				if( arr.length ) {
					arr.forEach(function(el) {
						// console.log(el);
						if( el.className == "dx-editor-cell"){
							el.setAttribute("colSpan", "2");
						}
					});
				}
			}, 100);
		}	
	}
}
