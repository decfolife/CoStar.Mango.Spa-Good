import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {
  Service,
  ListPageQuery,
  Note,
  ListViewPrivilege,
} from '../../app.service';
import {
  DxDataGridComponent,
  DxPopupComponent,
  DxDropDownButtonComponent,
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

let formatDate = function (myDate) {
  var d = new Date(myDate),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
};

let getOrderDay = function (rowData: any): number {
  return new Date(rowData.LeaseExpiration).getDay();
};

let add1Month = function () {
  let date = new Date();
  let d = date.getDate();
  date.setMonth(date.getMonth() + 1);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return formatDate(date);
};

let add3Month = function () {
  let date = new Date();
  let d = date.getDate();
  date.setMonth(date.getMonth() + 3);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return formatDate(date);
};

let add6Month = function () {
  let date = new Date();
  let d = date.getDate();
  date.setMonth(date.getMonth() + 6);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return formatDate(date);
};

let add12Month = function () {
  let date = new Date();
  let d = date.getDate();
  date.setMonth(date.getMonth() + 12);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return formatDate(date);
};

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  providers: [Service],
})
export class ListPageComponent implements OnInit {
  isExpanded: Boolean = true;
  filterBuilderVisible: Boolean = false;
  appliedFilterCount: Number = 0;
  showClearFilters: Boolean = false;
  searchText: string = null;
  customOperations: Array<any>;
  noteModalVisible: Boolean;
  selectedRow: Object;
  query: ListPageQuery;
  showActive: Boolean = true;
  showArchived: Boolean = false;
  recordStatusDisplay: string = 'Showing active records only';
  cancelModalVisible: Boolean = false;

  @ViewChild('DataGrid') dataGrid: DxDataGridComponent;
  @ViewChild('LastNotePopup') lastNotePopup: DxPopupComponent;

  @Input() data: Array<any>;
  @Input() columns: Array<any>;
  @Input() queries: ListPageQuery[];
  @Input() rowClickRoute: String;
  @Input() keyFields: Array<any>;
  @Input() title: String = null;
  @Input() showTitle: Boolean = false;
  @Input() hasQueryChooser: Boolean = true;
  @Input() listMapToggle: Boolean = false;
  @Input() listGanttToggle: Boolean = false;
  @Input() hasSearch: Boolean = true;
  @Input() hasMoreMenu: Boolean = true;
  @Input() hasAddButton: Boolean = true;
  @Input() hasPortfolioDropdown: Boolean = true;
  @Input() archivedRecordToggle: Boolean = true;
  @Input() hasColumnChooser: Boolean = true;
  @Input() hasExport: Boolean = true;
  @Input() hasGrouping: Boolean = true;
  @Input() hasPagination: Boolean = false;
  @Input() hasFilterButton: Boolean = true;
  @Input() addWizards: Array<any>;
  @Input() columnAutoWidth: Boolean = true;
  @Input() isTasksList: Boolean = false;
  @Input() addButtonText: string = 'Add';
  @Input() hasBoardView: Boolean = false;
  @Input() showStatusDisplay: Boolean = true;
  @Input() hasItemMoreMenu: Boolean = true;
  @Output() actionMenuCallbackItem = new EventEmitter<String>();

  viewToggleValue: String = 'list';

  constructor(
    private service: Service,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customOperations = [
      {
        name: 'weekends',
        caption: 'Weekends',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,
        calculateFilterExpression: function (filterValue, field) {
          let filterExpression = [
            [getOrderDay, '=', 0],
            'or',
            [getOrderDay, '=', 6],
          ];
          return filterExpression;
        },
      },
      {
        name: 'next1Month',
        caption: 'Next 1 Month',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,
        calculateFilterExpression: function (filterValue, field) {
          let today = new Date();
          let array1 = [];
          let array2 = [];

          // array1.push(field.dataField);
          // array1.push(">=");
          // array1.push(formatDate(today));
          // array1.columnIndex = field.visibleIndex;
          // array1.filterValue = formatDate(today);

          // array2.push(field.dataField);
          // array2.push("<=");
          // array2.push(add1Month());
          // array2.columnIndex = field.visibleIndex;
          // array2.filterValue = add1Month();

          // let filterExpression = [[field.dataField, ">=", formatDate(today), columnIndex: field.visibleIndex, filterValue: formatDate(today)], "and", [field.dataField, "<=", add1Month(), columnIndex: field.visibleIndex, filterValue: add1Month()]];
          let filterExpression = [
            [field.dataField, '>=', formatDate(today)],
            'and',
            [field.dataField, '<=', add1Month()],
          ];
          // let filterExpression = [[field.dataField, ">=", today.toString()], "and", [field.dataField, "<=", add1Month()]];
          // let filterExpression = [array1, "and", array2];
          return filterExpression;
        },
      },
      {
        name: 'next3Month',
        caption: 'Next 3 Months',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,
        calculateFilterExpression: function (filterValue, field) {
          let today = Date.now();
          let filterExpression = [
            [field.dataField, '>=', formatDate(today)],
            'and',
            [field.dataField, '<=', add3Month()],
          ];
          return filterExpression;
        },
      },
      {
        name: 'next6Month',
        caption: 'Next 6 Months',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,
        calculateFilterExpression: function (filterValue, field) {
          let today = Date.now();
          let filterExpression = [
            [field.dataField, '>=', formatDate(today)],
            'and',
            [field.dataField, '<=', add6Month()],
          ];
          return filterExpression;
        },
      },
      {
        name: 'next12Month',
        caption: 'Next 12 Months',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,
        calculateFilterExpression: function (filterValue, field) {
          let today = Date.now();
          let filterExpression = [
            [field.dataField, '>=', formatDate(today)],
            'and',
            [field.dataField, '<=', add12Month()],
          ];
          return filterExpression;
        },
      },
    ];
  }

  ngOnInit() {}

  navigateToObject(event) {
    const dynamicReplace = this.rowClickRoute.includes('%%_');
    if (this.rowClickRoute) {
      if (this.keyFields.length > 1 || dynamicReplace) {
        let newRoute = this.rowClickRoute;
        this.keyFields.forEach(function (itm) {
          let searchString = '%%_' + itm + '_%%';
          newRoute = newRoute.replace(searchString, event.data[itm].toString());
        }, this);
        this.router.navigate([newRoute], { relativeTo: this.route });
      } else {
        if (event.data.reportUrl) {
          this.router.navigate([this.rowClickRoute, event.data.reportUrl], {
            relativeTo: this.route,
          });
        } else {
          this.router.navigate(
            [this.rowClickRoute, event.data[this.keyFields[0]]],
            { relativeTo: this.route }
          );
        }
      }
    }
  }

  navigateToAddRoute(addWizardRoute) {
    this.router.navigate([addWizardRoute], { relativeTo: this.route });
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

  searchDataGrid(data) {
    this.dataGrid.instance.searchByText(data);
  }

  showFilterBuilder() {
    this.filterBuilderVisible = true;
  }

  updateRecordDisplayStatus(e) {
    this[e.source.name] = e.checked;

    if (this.showActive && !this.showArchived) {
      this.recordStatusDisplay = 'Showing active records only';
    } else if (this.showActive && this.showArchived) {
      this.recordStatusDisplay = 'Showing both active and archived records';
    } else if (!this.showActive && this.showArchived) {
      this.recordStatusDisplay = 'Showing archived records only';
    } else {
      this.recordStatusDisplay = 'Showing neither active nor archived records';
    }
  }

  calculateAppliedFilterCount(event) {
    let filters = this.dataGrid.instance.getCombinedFilter(true);
    let filterArrays = [];
    let filterProperties = [];
    if (filters) {
      if (this.searchText != null && this.searchText != '') {
        filterArrays = filters[2].filter(
          (itm) => typeof itm === 'object' && itm.constructor === Array
        );
      } else {
        filterArrays = filters.filter(
          (itm) => typeof itm === 'object' && itm.constructor === Array
        );
      }

      if (filterArrays.length == 0) {
        filterProperties.push(filters[0]);
      } else {
        filterArrays.forEach(function (itm) {
          if (!filterProperties.includes(itm[0][0])) {
            filterProperties.push(itm[0][0]);
          }
        });
      }

      this.appliedFilterCount = filterProperties.length;
    } else {
      this.appliedFilterCount = 0;
    }
  }

  onCellPrepared(e) {
    if (e.rowType === 'data' && e.column.type === 'buttons') {
      // e.cellElement.innerHTML = e.cellElement.innerHTML.replaceAll("&nbsp;", "")
      // e.cellElement.innerHTML = e.cellElement.innerHTML.slice(0, -6);
    }
  }

  toggleClearFilters() {
    this.showClearFilters = !this.showClearFilters;
  }

  clearGridFilters(e) {
    e.stopPropagation();
    this.dataGrid.instance.clearFilter();
    this.showClearFilters = false;
    this.searchText = null;
    // this.searchDataGrid(null)
  }

  launchNoteModal(data) {
    this.selectedRow = data.key;
    this.noteModalVisible = true;
  }

  noteModalCancel() {
    this.noteModalVisible = false;
  }

  noteModalSave() {}

  cancelModalToggle() {
    this.cancelModalVisible = !this.cancelModalVisible;
  }

  onQueryChanged(query: ListPageQuery) {
    this.query = query;
  }

  saveNewQuery() {
    notify({
      message: 'List view saved successfully.',
      type: 'success',
      displayTime: 2000,
      position: { at: 'bottom right', my: 'bottom right', offset: '-16 -16' },
      maxWidth: '400px',
      closeOnClick: true,
    });
  }

  cancelNewQuery() {
  }

  actionMenuCallback(method) {
    this.actionMenuCallbackItem?.emit(method);
  }
}
