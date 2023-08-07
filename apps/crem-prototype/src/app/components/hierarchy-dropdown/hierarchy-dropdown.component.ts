import { Component, OnInit, Input } from '@angular/core';
import { Service, DropdownField } from '../../app.service';
import { DxTreeViewComponent } from 'devextreme-angular';

@Component({
	selector: 'hierarchy-dropdown',
	templateUrl: './hierarchy-dropdown.component.html',
	styleUrls: ['./hierarchy-dropdown.component.scss'],
	providers: [Service]
})
export class HierarchyDropdownComponent implements OnInit {

	@Input() portfolioId : number;
	hierarchyDropdown : DropdownField;
	selectedItems : string[];

	constructor( private service : Service ) { 	
	}

	ngOnInit() {
		// this.hierarchyDropdown = new DropdownField(this.service.getPortfolioHierarchy(this.portfolioId), "id", "name", "Hierarchy", "hierarchy", [], true, null, null, null, null);
		this.hierarchyDropdown = new DropdownField(this.service.getPortfolioHierarchies(), "id", "name", "Hierarchy", "hierarchy", [], true, null, null, null, null);
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
