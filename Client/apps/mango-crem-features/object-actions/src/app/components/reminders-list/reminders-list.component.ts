import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ButtonModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DxDataGridModule, DxDataGridComponent } from 'devextreme-angular';
import { SharedModule } from '../../shared/shared.module';
import { RemindersService } from './../../shared/services/reminders.service';
import { SearchComponent } from '@mango/ui-shared/cosmos';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook, ValueType } from 'exceljs';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver-es';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'mango-reminders-list',
  standalone: true,
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.scss'],
  imports: [
    CommonModule,
    DropdownModule,
    DxDataGridModule,
    SearchModule,
    SharedModule,
    ButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [DatePipe, RemindersService]
})
export class RemindersListComponent implements OnInit {
  @ViewChild("RemindersDataGrid") remindersDataGrid: DxDataGridComponent;
  @ViewChild('SearchBox') searchBox: SearchComponent;

  public gridData: any;
  public searchText: string = "";
  public columns: any = [];

  constructor(private service: RemindersService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadRemindersData();
    this.setReminderColumns();
  }

  private loadRemindersData(): void {
    const otid: number = Number(this.route.snapshot.queryParamMap.get('otid'));
    const oid: number = Number(this.route.snapshot.queryParamMap.get('oid'));

    this.service.getRemindersList(oid, otid).subscribe(res => {
      this.gridData = res.success ? res.data : null;
    });
  }

  public resetFilter(e) {
    e.stopPropagation();
    this.remindersDataGrid.instance.clearFilter();
    this.remindersDataGrid.instance.clearSorting();
    this.searchText = "";
    this.searchBox.handleClear();
  }

  public setReminderColumns() {
    this.columns = [
      {	dataField: "Ticklername",
				dataType: "string",
				caption: "Event",
        cellTemplate: (container, options) => {
          const hasUserDefinedDate = options.data.UserDefinedDate !== null && options.data.UserDefinedDate !== undefined;
        
          const customizedData = options.data.TicklerTypeID === 1 && hasUserDefinedDate
            ? options.data.Ticklername + options.data.UserDefinedDate
            : options.data.Ticklername;
        
          container.innerText = customizedData;
        }
			},
      {	dataField: "DisplayName",
				alignment: "left",
				dataType: "string",
				caption: "Name",
			},
			{	dataField: "CompanyName",
				dataType: "string",
				caption: "Company",
			},
      {	dataField: "TicklerDaysOut",
				dataType: "number",
        alignment: "left",
				caption: "Days",
			},
      {	dataField: "TicklerFrequency",
				dataType: "number",
				caption: "Frequency",
        alignment: "left"
			},
      {	dataField: "TicklerID",
      dataType: "number",
      caption: "Tickler ID",
      alignment: "left",
      visible: false 
      },
      {	dataField: "TicklerMessage",
      dataType: "string",
      caption: "Message",
      },
		];
  }


  public openColumnChooser() {
    this.remindersDataGrid.instance.showColumnChooser();
  }

  public searchDataGrid(data) {
    this.searchText = data;
		this.remindersDataGrid.instance.searchByText(data);
	}


  public exportExcel(event) {
    const workbook = new Workbook();
    exportDataGrid({
      component: this.remindersDataGrid.instance,
      worksheet: workbook.addWorksheet('Reminders List Page')
    }).then(function() {
      workbook.worksheets[0].columns.forEach((column) => {
        let maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length + 3 : 10;
          if (cell.type === ValueType.Date) {
              maxLength = 20;
          }
          else if (columnLength > maxLength) {
              maxLength = columnLength + 3;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      });
      workbook.xlsx.writeBuffer().then(function(buffer: BlobPart) {
        saveAs(new Blob([buffer], { type:'application/octet-stream'}), 'CoStar_RemindersList.xlsx')
      });
    });
  }

  adaAttrNoDataGrid(e:any) {
    let noDataEl = e.element.querySelector(".dx-empty");
    let spanChild = null;

    if (noDataEl) {
        spanChild = noDataEl.querySelector(".dx-datagrid-nodata");
    }

    if (!noDataEl || !spanChild) {
        return;
    }

    noDataEl.setAttribute("role", "row");
    spanChild.setAttribute("role", "gridcell");
  }

  
  adaPaginationAttr(e) {
    if (!e || !e.element) return;
    let buttons;
    if (e.element[0])
      buttons = e.element[0].querySelectorAll(".dx-selection");
    else 
      buttons = e.element.querySelectorAll(".dx-selection");
    
    buttons.forEach(button => {
      if (!button || !button.hasAttribute('aria-label') || !button.classList) return;
        button.setAttribute('aria-current', 'page');
    
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (!button.classList.contains('dx-selection')) {
            button.removeAttribute('aria-current');
          }
        });
      });
      observer.observe(button, { attributeFilter: ['class'] });
    });
  }

  public adaAttributes(e) {
    setTimeout(() => {
      const spanElements = e.element.querySelectorAll('.dx-header-filter.dx-header-filter-empty');
      if (spanElements) {
        spanElements.forEach((spanElement, index) => {
          const caption = e.component.columnOption(index, 'caption');
          spanElement.setAttribute('aria-label', 'Show filter options for column ' + caption);
          spanElement.setAttribute('role', 'button');
          spanElement.setAttribute('aria-haspopup', 'dialog');
        });
      }
    });
  };
}