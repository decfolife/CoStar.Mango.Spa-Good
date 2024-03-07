import { Subscription, Observable } from 'rxjs';
import { saveAs } from "file-saver-es";
import { CommonModule,DatePipe } from "@angular/common";
import { Workbook, ValueType } from "exceljs";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { UserRoleType } from "@mango/data-models/lib-data-models";
import { SearchComponent, SearchModule } from "@mango/ui-shared/cosmos";
import { ButtonModule, DropdownModule } from "@mango/ui-shared/lib-ui-elements";
import { MangoAppFacade } from "@mangoSpa/src/app/+state/app/app.facade";
import { DxDataGridComponent, DxDataGridModule } from "devextreme-angular";
import { exportDataGrid } from "devextreme/excel_exporter";
import { Reminder } from "libs/data-models/lib-data-models/src/lib/models/Reminder";
import { filter, map } from "rxjs/operators";
import { SharedModule } from "../../shared/shared.module";
import { AddReminderComponent } from "../add-reminder/add-reminder.component";
import { RemindersService } from "./../../shared/services/reminders.service";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { Component, OnDestroy, OnInit, ViewChild, Input, EventEmitter,Output} from "@angular/core";
import { DeleteReminderComponent } from '../modal/delete-reminder/delete-reminder.component';

@Component({
  selector: "mango-reminders-list",
  standalone: true,
  templateUrl: "./reminders-list.component.html",
  styleUrls: ["./reminders-list.component.scss"],
  imports: [
    CommonModule,
    DropdownModule,
    DxDataGridModule,
    SearchModule,
    SharedModule,
    ButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [DatePipe, RemindersService],
})
export class RemindersListComponent implements OnInit, OnDestroy {
  @ViewChild("RemindersDataGrid") remindersDataGrid: DxDataGridComponent;
  @ViewChild("SearchBox") searchBox: SearchComponent;
  @Output() saveDefault = new EventEmitter(null);

  @Input() otid: number;
  @Input() oid: number;

  public gridData: any;
  public reminderGridData: Reminder[];
  public searchText: string = "";
  public columns: any = [];
  
  currentUserRole$: Observable<number>;

  USER_ROLES = UserRoleType

  private subscriptions = new Subscription();

  constructor(
    private reminderService: RemindersService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private facade: MangoAppFacade,
  ) {
    this.otid = Number(this.route.snapshot.queryParamMap.get("otid"));
    this.oid = Number(this.route.snapshot.queryParamMap.get("oid"));
  }

  ngOnInit(): void {
    this.currentUserRole$ = this.facade.userInfo$.pipe(filter(userInfo => !!userInfo), map(userInfo => userInfo.securityLevelID))    
    this.loadRemindersData(this.otid, this.oid);
    this.setReminderColumns();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadRemindersData(otid: number, oid: number): void {
    this.reminderService.getRemindersList(oid, otid).subscribe((res) => {
      this.gridData = res?.success ? res.data : null;
    });
  }

  openAddEditReminderDialog(tFunc: string, data?: any) {
    let dialogRef = this.dialog.open(AddReminderComponent, {
      height: '600px',
      width: '2000px',
      maxWidth: "1100px",
      panelClass: 'addEditReminderModal',
      data: {
        teamFunction: tFunc,
        objectTypeId: this.otid,
        objectId: this.oid,
        data: data
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.loadRemindersData(this.otid, this.oid);
      }
    });
  }

  public resetFilter(e) {
    e.stopPropagation();
    this.searchText = "";
    this.searchBox.handleClear();
    this.remindersDataGrid.instance.clearFilter();
    this.remindersDataGrid.instance.clearSorting();
    this.remindersDataGrid.instance.clearGrouping();
    this.remindersDataGrid.instance.refresh();
  }

  public setReminderColumns() {
    this.columns = [
      {
        dataField: "Ticklername",
        dataType: "string",
        caption: "Event",
        cellTemplate: (container, options) => {
          const hasUserDefinedDate =
            options.data.UserDefinedDate !== null &&
            options.data.UserDefinedDate !== undefined;

          const customizedData =
            options.data.TicklerTypeID === 1 && hasUserDefinedDate
              ? options.data.Ticklername + ' ' + '(' + options.data.UserDefinedDate.split('T')[0] + ')'
              : options.data.Ticklername;

          container.innerText = customizedData;
        },
      },
      {
        dataField: "DisplayName",
        alignment: "left",
        dataType: "string",
        caption: "Name",
        cellTemplate: (container, options) => {
          container.innerText = options.data.ContactFirstName + ' '+  options.data.ContactLastName;;
        },
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
        alignment: "left",
      },
      {
        dataField: "TicklerID",
        dataType: "number",
        caption: "Reminder Id",
        sortOrder:"desc",
        alignment: "left",
        visible: false,
      },
      {
        dataField: "TicklerMessage",
        dataType: "string",
        caption: "Message",
      },
      {
        dataField: "LastModified",
        dataType: "date",
        caption: "Last Modified Date",
        sortOrder:"desc",
        visible: false,
      },
      {
        dataField: "AutoLoadReminderType",
        dataType: "string",
        caption: "Auto Load Reminder Type",
        sortOrder:"desc",
        visible: false,
      },
      {
        dataField: "LastModifiedBy",
        dataType: "string",
        caption: "Last Modified By",
        visible: false,
      },
      {
        dataField: "contactEmailAddress",
        dataType: "string",
        caption: "Recepient Email",
        visible: false,
      },
      {
        dataField: "AutoLoadReminderID",
        dataType: "boolean",
        caption: "Is Auto Load Reminder",
        visible: false,
        cellTemplate: (container, options) => {
          container.innerText = options.data.AutoLoadReminderID? true : false;
        },
      },
    ];
  }

  addOrEditReminder(tFunc: any, data: any) {
    let team = <Reminder>{};
    let dialogRef = this.dialog.open(AddReminderComponent, {
      height: '600px',
      width: '2000px',
      data: { info: data },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.loadRemindersData(this.otid, this.oid);
      }
    });
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
      worksheet: workbook.addWorksheet("Reminders List Page"),
    }).then(function () {
      workbook.worksheets[0].columns.forEach((column) => {
        let maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value
            ? cell.value.toString().length + 3
            : 10;
          if (cell.type === ValueType.Date) {
            maxLength = 20;
          } else if (columnLength > maxLength) {
            maxLength = columnLength + 3;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      });
      workbook.xlsx.writeBuffer().then(function (buffer: BlobPart) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "CoStar_RemindersList.xlsx"
        );
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
    if (e.element[0]) buttons = e.element[0].querySelectorAll(".dx-selection");
    else buttons = e.element.querySelectorAll(".dx-selection");

    buttons.forEach((button) => {
      if (!button || !button.hasAttribute("aria-label") || !button.classList)
        return;
      button.setAttribute("aria-current", "page");

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (!button.classList.contains("dx-selection")) {
            button.removeAttribute("aria-current");
          }
        });
      });
      observer.observe(button, { attributeFilter: ["class"] });
    });
  }

  public adaAttributes(e) {
    setTimeout(() => {
      const spanElements = e.element.querySelectorAll(
        ".dx-header-filter.dx-header-filter-empty"
      );
      if (spanElements) {
        spanElements.forEach((spanElement, index) => {
          const caption = e.component.columnOption(index, "caption");
          spanElement.setAttribute(
            "aria-label",
            "Show filter options for column " + caption
          );
          spanElement.setAttribute("role", "button");
          spanElement.setAttribute("aria-haspopup", "dialog");
        });
      }
    });
  }
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
        this.performDeleteReminder(reminder);
      }

    });
  }

  public performDeleteReminder(reminderObj: any) {
    this.subscriptions.add(
      this.reminderService.deleteReminder(reminderObj.TicklerID,reminderObj.ObjectID ,reminderObj.ObjectTypeID ).subscribe(
        (res: any) => {
          if (res.success) {
            this.gridData = this.gridData.filter(reminder => reminder.TicklerID !== reminderObj.TicklerID)
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
