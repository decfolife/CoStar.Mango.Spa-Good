import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output,OnChanges,SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Subscription, timer } from 'rxjs';  
import * as dayjs from 'dayjs'
import { MatDialog } from '@angular/material/dialog';
import { AddFormWizardComponent } from '@micro-components/form-wizard/modal/add-form-wizard/add-form-wizard.component';
import {AddBuildingModalComponent} from '../add-building-modal/add-building-modal.component'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dashboard-filters',
  templateUrl: './dashboard-filters.component.html',
  styleUrls: ['./dashboard-filters.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardFiltersComponent implements OnInit,OnChanges {
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
  isDateEUValue:boolean;
  subscription: Subscription;

  constructor( private dialog: MatDialog ) { }
  ngOnInit() {
    if (sessionStorage.getItem('project_cached_date')||sessionStorage.getItem('portfolio_cached_date') && sessionStorage.getItem('project_cached_flag')||sessionStorage.getItem('portfolio_cached_flag'))
     {
      this.determineTimerState();
      let flag ;
    if(this.dashboardId==1)
     {
       flag = this.getBoolean(sessionStorage.getItem('project_cached_flag'));
       this.CacheButtonClicked = flag;
     }
    else if(this.dashboardId==2)
    {
       flag = this.getBoolean(sessionStorage.getItem('portfolio_cached_flag'));
       this.CacheButtonClicked = flag;
    }
    }
    }

    ngOnChanges(changes: SimpleChanges): void {
      const isDateEUValue = changes['isDateEU']
      if (isDateEUValue.currentValue == true) {
        this.isDateEUValue = true
      } else{
        this.isDateEUValue = false
      }
  }
    ngOnDestroy() {
      if(this.subscription !== undefined){
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

  public getFilters () {
    if (this.filters) {
      return this.filters.filter(filter => filter.isActive);
    }
  }

  selected(e, elementTypeName) {
    //Create a SelectedFilter object and emit it to the parent
    const selFilter = {
      elementTypeName: elementTypeName,
      dropdown: null
    };

    if (e !== null && e.length > 0) {
      selFilter.dropdown = [];

      e.forEach(element => {
        selFilter.dropdown.push({
          displayKey: element.displayKey,
          valueKey: element.valueKey
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
    let dialogRef = this.dialog.open(AddFormWizardComponent, {
      disableClose: true,
      height: '81%',
      width: '75%',
      maxWidth: '1100px',
      data: {
        objectTypeId: this.objectTypeId?.length && this.objectTypeId[0],
        objectTypeName: this.objectTypeName,
        userId: this.userId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  public btnAddBuildingNewClick(addObject) {
    if(addObject.moduleId == 3) {
      let dialogRef = this.dialog.open(AddBuildingModalComponent, {
        disableClose: true,
        height: '81%',
        width: '75%',
        maxWidth: '1100px',
        data: {
          objectTypeId: this.objectTypeId,
          userId: this.userId
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
  
        }
      });
    }

  }


  btnAddItemClick() {
    this.addItemEvent.emit();
  }

  //clearCacheButton/RefreshButton Timer
  startTimer(){
		this.CacheButtonClicked=true;

    switch (this.dashboardId) {
      case 1:
             sessionStorage.setItem('project_cached_date',formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US'));
             sessionStorage.setItem('project_cached_flag','true');
             break;
      case 2:
        sessionStorage.setItem('portfolio_cached_date',formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US'));
        sessionStorage.setItem('portfolio_cached_flag','true');
             break;
    }
    this.clearCacheEvent.emit();
    this.determineTimerState();
	}

  determineTimerState() {
    let start_date;
    switch (this.dashboardId) {
      case 1:
         start_date= sessionStorage.getItem('project_cached_date');
             break;
      case 2:
         start_date= sessionStorage.getItem('portfolio_cached_date');
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
      }
      else 
      {
        let remainingTime = 30-diff;
        const source = timer( this.convertMinutesToMilliSeconds(remainingTime));  
        this.subscription = source.subscribe(val => this.CacheButtonClicked = false);  
       }
  }
  
  getDateDiff(startDate, endDate) {
    const diff = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    return minutes + (hours * 60);
  }

  convertMinutesToMilliSeconds(minutes)
  {
    return 60000*minutes;
  }
  
  // logic for tooltip on dashbaords' refresh button
  getRefreshDateTime(){
    let refreshDateTime;
    switch (this.dashboardId) {
      case 1:
        refreshDateTime=   sessionStorage.getItem('project_cached_date');
             break;
      case 2:
        refreshDateTime=sessionStorage.getItem('portfolio_cached_date');
             break;
    }
    if (refreshDateTime === null) {
      refreshDateTime = 'last login.';
      return refreshDateTime;
    }else if (this.isDateEUValue == true) {
      refreshDateTime = dayjs(refreshDateTime).format('h:mm a, DD.MM.YYYY.');
      return refreshDateTime;
    }else {
      refreshDateTime = dayjs(refreshDateTime).format('h:mm a, MM/DD/YYYY.');
      return refreshDateTime;
    };
  }
}
