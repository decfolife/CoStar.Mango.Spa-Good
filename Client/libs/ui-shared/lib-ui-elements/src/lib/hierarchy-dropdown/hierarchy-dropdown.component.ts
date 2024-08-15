import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { DxTreeViewComponent } from 'devextreme-angular';


@Component({
  selector: 'crem-hierarchy-dropdown',
  templateUrl: './hierarchy-dropdown.component.html',
  styleUrls: ['./hierarchy-dropdown.component.scss'],
})
export class HierarchyDropdownComponent implements OnInit {
	@ViewChild(DxTreeViewComponent, { static: false }) treeView: DxTreeViewComponent;

	@Input() public id: string;
	@Input() public initialSelectedValue: any;
	@Input() public label?: string;
	@Input() public dataSource: any[];
	@Input() public placeholder = 'Select...';
	@Input() public valueExpr?: string = 'valueKey';
	@Input() public displayExpr?: string = 'displayKey';
	@Input() public parentIdExpr?: string = 'parentIdExpr';
	@Input() public showClearButton?: boolean = true;
	@Input() public selectMode?: 'single' | 'multiple' = 'single';
	@Output() selectedItems = new EventEmitter<any[]>();
	@Input() dropDownContainerCustomClass: string;
  
	selectedDisplay: string[];
	public selections: any;
	public wrapperAttr: any;

	ngOnInit() {
		this.wrapperAttr =  {
			class: this.dropDownContainerCustomClass
		}

		if (
			this.initialSelectedValue === null ||
			this.initialSelectedValue === undefined ||
			this.dataSource === null ||
			this.dataSource === undefined
		  ) {
			return;
		  }
	  
		  //Find the display text using the value and set our selected display variable
		  this.selectedDisplay = [];
		  this.selections = [];
	  
		  if (this.selectMode == 'single'){
			this.dataSource.forEach((data) => {
			  if (data[this.valueExpr] === this.initialSelectedValue) {
				this.selectedDisplay.push(data[this.valueExpr]);
				this.selections.push(data);
			  }
			});
		  } else if (this.selectMode == 'multiple') {
			this.dataSource.forEach((data) => {
			  if (this.initialSelectedValue.includes(data[this.valueExpr].toString())) {
				this.selectedDisplay.push(data[this.valueExpr]);
				// 'selected' property required by treeview to preselect the record.
				data.selected = true;
				this.selections.push(data);
			  }
			});
	   
			const selectedItems = this.selections
            .map(node => {
				return { displayKey: node[this.displayExpr], valueKey: node[this.valueExpr] };
			});

        	this.selectedItems.emit(selectedItems);
			
		  }
	}

	treeViewSelectionChanged(e) {
		this.syncSelection(e.component);
	}
  
	syncSelection(treeView) {
		this.selectedDisplay = treeView.getSelectedNodes()
            .map(node => node.itemData[this.valueExpr]);
		
        const selectedItems = treeView.getSelectedNodes()
            .map(node => {
				return { displayKey: node.itemData[this.displayExpr], valueKey: node.itemData[this.valueExpr] };
			});
        this.selectedItems.emit(selectedItems);
    }

	dropdownOnValueChanged($event) {
		//If the value is null that means that the dropdown has been cleared of the selected value.
		//We want to emit this back to let the parent component know that the dropdown was cleared.
		
		if ($event.value === null) {
			if (this.treeView != undefined && this.treeView != null) {
				this.treeView.instance.unselectAll();
			}
			this.selectedDisplay = null;

			if(this.selections !== undefined){
				this.selections.forEach((item: any) => {
					item.selected = false;
				});
			}

			this.selectedItems.emit(null);
		}
		
	}

	

}
