import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Service, DropdownField } from '../../app.service';
import { DxTreeViewComponent } from 'devextreme-angular';

@Component({
	selector: 'integration-filter',
	templateUrl: './integration-filter.component.html',
	styleUrls: ['./integration-filter.component.scss']
})
export class IntegrationFilterComponent implements OnInit {

	@Input() filterData : any;
	@Input() selectMode : string;
	@Output() changed : EventEmitter<any> = new EventEmitter();

	selectedItems : string[];
	
	constructor() { }

	ngOnInit() {
		this.selectionChanged();

		if( this.filterData.controlType == 'portfolio' ) {
			this.filterData = new DropdownField([{ value : 'RE Portfolio' }, { value : 'EQ Portfolio' }], "value", "value", "Portfolio", "dropdown", [], true, this.filterData.selectMode ? this.filterData.selectMode : "single" , true, false, true);
		}

	}

	selectionChanged() {
		this.filterData.selected = this.selectedItems;
		this.changed.emit(this.selectedItems);
	}

	treeViewSelectionChanged(e) {
		this.syncSelection(e.component);
	}

	treeViewContentReady(e) {
		this.syncSelection(e.component);
	}

	syncSelection(treeView) {
        let selectedItems = treeView.getSelectedNodes()
            .map(node => node.itemData.name);
 
        this.selectedItems = selectedItems;
    }

}
