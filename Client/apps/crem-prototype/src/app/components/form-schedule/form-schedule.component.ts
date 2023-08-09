import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";
import { DxTooltipComponent } from 'devextreme-angular';
import { on } from "devextreme/events";
// import { AlertType } from '../shared/my-facilities/accounting/accounting-dashboard/accounting-dashboard.service';

export class Section {
    sectionName: string;
    classNames : Object;
    isTableData: Boolean;
    allowEditing : Boolean;
    allowAdding: Boolean;
    data : [];
    columns : [];
    marketActivityTime : string;
    marketActivityTimes : [];
    preventExport : Boolean;
    listMapToggle : Boolean;


    constructor(sectionName,classNames,isTableData,allowEditing,allowAdding,data,columns,marketActivityTime,marketActivityTimes,preventExport,listMapToggle) {
		this.sectionName = sectionName;
		this.classNames = classNames;
		this.isTableData = isTableData;
		this.allowEditing = allowEditing;
		this.allowAdding = allowAdding;
		this.data = data;
		this.columns = columns;
		this.marketActivityTime = marketActivityTime;
		this.marketActivityTimes = marketActivityTimes;
		this.preventExport = preventExport;
		this.listMapToggle = listMapToggle;
	}
}

@Component({
  selector: 'form-schedule',
  templateUrl: './form-schedule.component.html',
  styleUrls: ['./form-schedule.component.scss']
})
export class FormScheduleComponent implements OnInit {

	@Input() section : Section;
	@Input() hasHistory : Boolean = true;
	@ViewChild("DataGrid") dataGrid: DxDataGridComponent;
  @ViewChild(DxTooltipComponent) tooltip: DxTooltipComponent;

	isExpanded : Boolean = false;
	viewToggleValue : string = "list";

	historyPopupVisible : Boolean = false;
    historyPopupTitle : string;

  singleCellConfig: string = null;

	constructor() {
		this.showRowHistory = this.showRowHistory.bind(this);
	}

	ngOnInit() {
	}

	addRow() {
		this.dataGrid.instance.addRow();
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

	showRowHistory(e) {
		this.historyPopupTitle = "Change History: " + this.section.sectionName + " (" + e.row.data.id +")";
		this.historyPopupVisible = true;
	}

	historyDialogClosed(e) {
		this.historyPopupVisible = false;
	}

  onSearch(url: string, target: string){
    window.open(url, target || '_self');
  }

  navigateToObject(event) {
    event.data.link ? window.open(event.data.link, event.data.target || '_self') : undefined
  }

  onCustomTemplate(e) {
    if (e.rowType === "data" && e.column.cellTemplate === "customTemplate") {
      on(e.cellElement, "mouseover", arg => {
          this.singleCellConfig = e.value;
          this.tooltip.instance.show(arg.target);
      });
      on(e.cellElement, "mouseout", arg => {
        this.tooltip.instance.hide();
      });
    }
  }

}
