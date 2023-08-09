import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Service, ChangeHistory } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
  selector: 'app-object-history',
  templateUrl: './object-history.component.html',
  styleUrls: ['./object-history.component.scss'],
  providers : [Service]
})
export class ObjectHistoryComponent implements OnInit {
	changeHistory : ChangeHistory[];
	filteredChangeHistory : ChangeHistory[];
	objectTypes : String[];
	objectType : String;
	isExpanded : Boolean = false;
	
	@ViewChild("HistoryContainerDataGrid") dataGrid: DxDataGridComponent;

	constructor(service : Service) { 

		this.changeHistory = service.getChangeHistory();

		this.objectTypes = this.changeHistory.map(item => item.objectType).filter((value, index, self) => self.indexOf(value) === index);

		this.objectType = this.objectTypes[0];

		this.changeObjectType(this.objectType);		
	}

	ngOnInit() {
	}	

	changeObjectType(ot) {
		this.objectType = ot;
		this.filteredChangeHistory = this.changeHistory.filter(function(itm) {
			return itm.objectType == this.objectType;
		}, this);
	}

	toggleExpanded() {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

	showColumnChooser() {
		this.dataGrid.instance.showColumnChooser();
	}

	searchDataGrid(searchText) {
		this.dataGrid.instance.searchByText(searchText);
	}
}
