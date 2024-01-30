import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
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
import { AddReminderComponent } from '../add-reminder/add-reminder.component';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver-es';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { DeleteReminderComponent } from '../modal/delete-reminder/delete-reminder.component';

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
export class RemindersListComponent implements OnInit, OnDestroy {
  @ViewChild("RemindersDataGrid") remindersDataGrid: DxDataGridComponent;
  @ViewChild('SearchBox') searchBox: SearchComponent;

  public gridData: any;
  public searchText: string = "";
  public columns: any = [];
  @Input() OTID : number;
  @Input() OID : number;
  private subscriptions = new Subscription();

  constructor(private reminderService: RemindersService, private route: ActivatedRoute, private dialog: MatDialog) {
    this.OTID = Number(this.route.snapshot.queryParamMap.get('otid'));
    this.OID = Number(this.route.snapshot.queryParamMap.get('oid'));
  }

  ngOnInit(): void {
    this.loadRemindersData(this.OTID , this.OID );
    this.setReminderColumns();
  }

  ngOnDestroy(): void {
    //close all subscriptions in this component
    this.subscriptions.unsubscribe();
  }

  private loadRemindersData(OTID: number, OID: number): void {
    this.subscriptions.add(
      this.reminderService.getRemindersList(OID, OTID).subscribe(res => {
        this.gridData = res.success ? res.data : null;
      })
    );
  }

  addReminder() {
    let dialogRef = this.dialog.open(AddReminderComponent, {
      disableClose: true,
      height: '70%',
      width: '55%',
      maxWidth: '1100px',
      data: {
        objectTypeId: this.OTID,
        objectId: this.OID
      }
    });
    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(result => {
        if (result === "Approve") {
        this.loadRemindersData(this.OTID , this.OID);  
        }
      })
    );
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
      {
        dataField: "Ticklername",
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
      {
        dataField: "DisplayName",
        alignment: "left",
        dataType: "string",
        caption: "Name",
      },
      {
        dataField: "CompanyName",
        dataType: "string",
        caption: "Company",
      },
      {
        dataField: "TicklerDaysOut",
        dataType: "number",
        alignment: "left",
        caption: "Days",
      },
      {
        dataField: "TicklerFrequency",
        dataType: "number",
        caption: "Frequency",
        alignment: "left"
      },
      {
        dataField: "TicklerID",
        dataType: "number",
        caption: "Reminder Id",
        alignment: "left",
        visible: false
      },
      {
        dataField: "TicklerMessage",
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
    }).then(function () {
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
      workbook.xlsx.writeBuffer().then(function (buffer: BlobPart) {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'CoStar_RemindersList.xlsx')
      });
    });
  }

  adaAttrNoDataGrid(e: any) {
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

  public deleteReminder(e) {
    let reminder = e.data
    let reminderId = reminder.TicklerID
    let dialogRef = this.dialog.open(DeleteReminderComponent, {
      height: '200px',
      width: '600px',
      data: { reminder }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === "Yes") {
        this.performDeleteReminder(reminderId);
      }

    });
  }

  // RID === remindId
  public performDeleteReminder(RID: number) {
    console.log("destroy all of it: " + RID)
    this.subscriptions.add(
      this.reminderService.deleteReminder(RID).subscribe(
        (res: any) => {
          if (res.success) {
            this.gridData = this.gridData.filter(reminder => reminder.TicklerID !== RID)
          }
          else {
            console.log("The Delete Reminder API call is not successful.");
          }
        },
        (error: any) => {
          console.log("Error deleting the reminder: ", error)
        }
      )
    )
  }
}