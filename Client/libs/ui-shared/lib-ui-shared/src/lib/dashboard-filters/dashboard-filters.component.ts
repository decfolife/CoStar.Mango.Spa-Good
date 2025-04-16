import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import * as dayjs from 'dayjs';
import { MatDialog } from '@angular/material/dialog';
import { AddFormWizardComponent } from '@micro-components/form-wizard/modal/add-form-wizard/add-form-wizard.component';
import { AddBuildingModalComponent } from '../add-building-modal/add-building-modal.component';
import { AddSupplierModalComponent } from '@mango/ui-shared/lib-ui-shared';
import {
  BUILDING_WIZARD_OTID,
  LEASE_WIZARD_OTID,
  PREMISE_WIZARD_OTID,
  SUPPLIER_WIZARD_OTID,
} from '@mango/data-models/lib-data-models';
import { AddEquipmentModalComponent } from '../add-equipment-modal/add-equipment-modal.component';
import { EQUIPMENT_WIZARD_OTID } from '@mango/data-models/lib-data-models';
import { AddLeaseModalComponent } from '../add-lease-modal/add-lease-modal.component';
import { AddPremiseModalComponent } from '../add-premise-modal/add-premise-modal.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dashboard-filters',
  templateUrl: './dashboard-filters.component.html',
  styleUrls: ['./dashboard-filters.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DashboardFiltersComponent implements OnInit, OnChanges, OnDestroy {
  @Input() showAddButton;
  @Input() showEnterBill;
  @Input() addObjects: any;
  @Input() filters: any;
  @Input() dashboardId: number;
  @Input() isDateEU: boolean;
  @Input() cachingEnabled: boolean;
  @Input() objectTypeId: number[];
  @Input() objectTypeName: string;
  @Input() userId: number;

  @Output() selections = new EventEmitter<any>();
  @Output() applyFilterEvent = new EventEmitter();
  @Output() displayUserSettingsEvent = new EventEmitter<any>();

  @Output() addMenuItemEvent = new EventEmitter<any>();
  @Output() addItemEvent = new EventEmitter<any>();
  @Output() clearCacheEvent = new EventEmitter<any>();

  @Output() enterBillClicked = new EventEmitter();

  //This one is binding to parentGroup property to display children
  parentId = 'parentGroup';
  CacheButtonClicked = false;
  date = new Date();
  isDateEUValue: boolean;
  subscription: Subscription;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.checkIfCacheButtonClicked();
  }

  checkIfCacheButtonClicked(): void {
    if (
      sessionStorage.getItem('project_cached_date') ||
      (sessionStorage.getItem('portfolio_cached_date') &&
        sessionStorage.getItem('project_cached_flag')) ||
      sessionStorage.getItem('portfolio_cached_flag')
    ) {
      this.determineTimerState();
      let flag;
      if (this.dashboardId == 1) {
        flag = this.getBoolean(sessionStorage.getItem('project_cached_flag'));
        this.CacheButtonClicked = flag;
      } else if (this.dashboardId == 2) {
        flag = this.getBoolean(sessionStorage.getItem('portfolio_cached_flag'));
        this.CacheButtonClicked = flag;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isDateEUValue = changes['isDateEU'];
    if (isDateEUValue.currentValue == true) {
      this.isDateEUValue = true;
    } else {
      this.isDateEUValue = false;
    }
  }
  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
  public getBoolean(value) {
    switch (value) {
      case true:
      case 'true':
        return true;
      default:
        return false;
    }
  }

  public getFilters() {
    if (this.filters) {
      return this.filters.filter((filter) => filter.isActive);
    }
  }

  selected(e, elementTypeName) {
    //Create a SelectedFilter object and emit it to the parent
    const selFilter = {
      elementTypeName: elementTypeName,
      dropdown: null,
    };

    if (e !== null && e.length > 0) {
      selFilter.dropdown = [];

      e.forEach((element) => {
        selFilter.dropdown.push({
          displayKey: element.displayKey,
          valueKey: element.valueKey,
        });
      });
    }

    this.selections.emit(selFilter);
  }

  createApplyFilterEvent() {
    this.applyFilterEvent.emit();
  }

  launchSettingsModal() {
    this.displayUserSettingsEvent.emit();
  }

  btnAddMenuItemClick(addObject) {
    this.addMenuItemEvent.emit(addObject);
  }

  btnAddItemNewClick() {
    const dialogRef = this.dialog.open(AddFormWizardComponent, {
      disableClose: true,
      height: '70vh',
      width: '70vw',
      minWidth: '320px',
      maxWidth: '1100px',
      minHeight: '420px',
      data: {
        objectTypeId: this.objectTypeId?.length && this.objectTypeId[0],
        objectTypeName: this.objectTypeName,
        userId: this.userId,
      },
    });

    dialogRef.afterClosed();
  }

  /**
   * This method is for pretty much every 'Add' modal
   *
   * @param {*} addObject
   * @memberof DashboardFiltersComponent
   */
  public btnAddBuildingNewClick(addObject) {
    switch (addObject.moduleId) {
      // Add Store
      case PREMISE_WIZARD_OTID: {
        const dialogRef = this.dialog.open(AddPremiseModalComponent, {
          disableClose: true,
          width: '45vw',
          minWidth: '320px',
          maxWidth: '1100px',
          minHeight: '420px',
          maxHeight: '90vh',
          data: {
            objectTypeId: this.objectTypeId,
            userId: this.userId,
          },
        });

        dialogRef.afterClosed();
        break;
      }
      // Add Building
      case BUILDING_WIZARD_OTID: {
        const dialogBldgRef = this.dialog.open(AddBuildingModalComponent, {
          disableClose: true,
          width: '70vw',
          minWidth: '320px',
          maxWidth: '1100px',
          minHeight: '420px',
          maxHeight: '90vh',
          data: {
            objectTypeId: this.objectTypeId,
            userId: this.userId,
          },
        });

        dialogBldgRef.afterClosed();
        break;
      }
      // Add Lease
      case LEASE_WIZARD_OTID: {
        let dialogLeaseRef = this.dialog.open(AddLeaseModalComponent, {
          disableClose: true,
          width: '70vw',
          minWidth: '320px',
          maxWidth: '1100px',
          minHeight: '420px',
          maxHeight: '90vh',
          data: {
            objectTypeId: this.objectTypeId,
            objectTypeName: addObject.moduleDesc,
            userId: this.userId,
          },
        });
        dialogLeaseRef.afterClosed();
        break;
      }
      default:
        break;
    }
  }

  // Add Supplier Modal
  btnAddSupplierNewClick(addObject: any) {
    if (addObject.moduleId === SUPPLIER_WIZARD_OTID) {
      const dialogRef = this.dialog.open(AddSupplierModalComponent, {
        disableClose: false,
        width: '45vw',
        minWidth: '320px',
        maxWidth: '1100px',
        minHeight: '320px',
        maxHeight: '90vh',
        data: {
          objectTypeId: this.objectTypeId,
          userId: this.userId,
        },
      });
      dialogRef.afterClosed();
    }
  }

  // Add Equipment Lease
  public btnAddEquipmentNewClick(addObject) {
    if (addObject.moduleId == EQUIPMENT_WIZARD_OTID) {
      const dialogRef = this.dialog.open(AddEquipmentModalComponent, {
        disableClose: true,
        width: '70vw',
        minWidth: '320px',
        maxWidth: '1100px',
        minHeight: '420px',
        maxHeight: '90vh',
        data: {
          objectTypeId: this.objectTypeId,
          userId: this.userId,
        },
      });

      dialogRef.afterClosed();
    }
  }

  btnAddItemClick() {
    this.addItemEvent.emit();
  }

  //clearCacheButton/RefreshButton Timer
  startTimer() {
    this.CacheButtonClicked = true;

    switch (this.dashboardId) {
      case 1:
        sessionStorage.setItem(
          'project_cached_date',
          formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US')
        );
        sessionStorage.setItem('project_cached_flag', 'true');
        break;
      case 2:
        sessionStorage.setItem(
          'portfolio_cached_date',
          formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US')
        );
        sessionStorage.setItem('portfolio_cached_flag', 'true');
        break;
    }
    this.clearCacheEvent.emit();
    this.determineTimerState();
  }

  determineTimerState() {
    let start_date;
    switch (this.dashboardId) {
      case 1:
        start_date = sessionStorage.getItem('project_cached_date');
        break;
      case 2:
        start_date = sessionStorage.getItem('portfolio_cached_date');
        break;
    }

    if (!start_date) {
      return;
    }

    const current_date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
    const diff = this.getDateDiff(new Date(start_date), new Date(current_date));

    if (diff >= 30) {
      this.CacheButtonClicked = false;
      switch (this.dashboardId) {
        case 1:
          sessionStorage.setItem('project_cached_flag', 'false');
          break;
        case 2:
          sessionStorage.setItem('portfolio_cached_flag', 'false');
          break;
      }
    } else {
      const remainingTime = 30 - diff;
      const source = timer(this.convertMinutesToMilliSeconds(remainingTime));
      this.subscription = source.subscribe(
        () => (this.CacheButtonClicked = false)
      );
    }
  }

  getDateDiff(startDate, endDate) {
    const diff = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
    const minutes =
      Math.floor(diff / (60 * 1000)) - (days * 24 * 60 + hours * 60);
    return minutes + hours * 60;
  }

  convertMinutesToMilliSeconds(minutes) {
    return 60000 * minutes;
  }

  // logic for tooltip on dashbaords' refresh button
  getRefreshDateTime() {
    let refreshDateTime;
    switch (this.dashboardId) {
      case 1:
        refreshDateTime = sessionStorage.getItem('project_cached_date');
        break;
      case 2:
        refreshDateTime = sessionStorage.getItem('portfolio_cached_date');
        break;
    }
    if (refreshDateTime === null) {
      refreshDateTime = 'last login.';
      return refreshDateTime;
    } else if (this.isDateEUValue == true) {
      refreshDateTime = dayjs(refreshDateTime).format('h:mm a, DD.MM.YYYY.');
      return refreshDateTime;
    } else {
      refreshDateTime = dayjs(refreshDateTime).format('h:mm a, MM/DD/YYYY.');
      return refreshDateTime;
    }
  }
}
