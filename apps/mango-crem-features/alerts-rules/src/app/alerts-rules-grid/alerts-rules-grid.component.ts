/* eslint-disable rxjs-angular/prefer-composition */
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';

import { DxDataGridComponent } from 'devextreme-angular';
import { custom } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';

import { AlertsRulesService } from '../shared/services/alerts-rules.service';
import {
  AlertRule,
  AlertRuleSeverity,
  AlertRuleUpdate,
  AlertType,
  ApiResponse,
} from '../shared/models/';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FilterObj = { text: string, value: any };
type NameValuePair = { value: number; name: string; };

@Component({
  selector: 'mango-alerts-rules-grid',
  templateUrl: './alerts-rules-grid.component.html',
  styleUrls: ['./alerts-rules-grid.component.scss']
})
export class AlertsRulesGridComponent implements AfterViewInit, OnInit {
  @Input()
  editable: boolean;

  @Output()
  filterCountChanged = new EventEmitter<number>();

  @Output()
  dirtyStateChanged = new EventEmitter<boolean>();

  @Output()
  isLoading = new EventEmitter<boolean>();

  @ViewChild('rulesGrid')
  rulesGrid: DxDataGridComponent;

  gridData: AlertRule[];
  severitySelections: NameValuePair[];
  alertTypeSelections: NameValuePair[];
  isLoadingData = false;

  currentObjectTypeId: number = this.getOTID();

  filterBuilderVisible = false;

  severityFilterOptions: FilterObj[];
  alertFilterOptions: FilterObj[];
  boolFilterOptions: FilterObj[] = [{
    text: 'True', value: true
  }, {
    text: 'False', value: false
  }];

  private alertTypes: AlertType[];
  private alertRuleSeverities: AlertRuleSeverity[];
  private alertRules: AlertRule[];
  private changedAlertRules: AlertRule[] = [];
  private ruleMadeInactive: boolean;

  constructor(private location: Location,  private rulesService: AlertsRulesService) { }

  ngAfterViewInit() {
    this.rulesGrid.instance.beginCustomLoading('Loading...');
  }

  ngOnInit(): void {
    // These calls are nested to guarantee all have completed
    // before creating the grid datasource.
    this.rulesService.getAlertTypes().subscribe((res: ApiResponse) => {
      this.alertTypes = res.data as AlertType[];

      this.rulesService.getAlertRuleSeverities().subscribe((res: ApiResponse) => {
        this.alertRuleSeverities = res.data as AlertRuleSeverity[];

        this.setIsLoading(true);
        this.setDefaultFilters();
        this.loadAlertRules();
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateFilterCount(filters: any[]) {
    const numberOfFilters = this.getFilterCount(filters);

    this.filterCountChanged.emit(numberOfFilters);
  }

  severityChanged(evt, data: AlertRule) {
    this.updateAlertRuleChanges('alertRuleSeverityID', evt.value, data);
  }

  dismissableChanged(evt, data: AlertRule) {
    this.updateAlertRuleChanges('isDismissable', evt.value, data);
  }

  activeChanged(evt, data: AlertRule) {
    this.updateAlertRuleChanges('isActive', evt.value, data);

    if (!evt.value) {
      this.ruleMadeInactive = true;
    }
  }

  getAlertType(alertTypeID: number): string {
    return this.alertTypes.find(x => x.alertTypeID === alertTypeID).alertType;
  }

  setIsLoading(isCurrentlyLoading: boolean) {
    this.isLoading.emit(isCurrentlyLoading);
    this.isLoadingData = isCurrentlyLoading;
  }

  async saveChanges() {
    const changes = this.changedAlertRules.slice();

    if (changes.find(x => x.isActive === false) && this.ruleMadeInactive) {
      const decision = await this.confirmInactiveChange();

      if (!decision) {
        return;
      }
    }

    this.setIsLoading(true);

    const ruleUpdates = changes.map(x => {
      return {
        AlertRuleID: x.alertRuleID,
        AlertRuleSeverityID: x.alertRuleSeverityID,
        IsActive: x.isActive,
        IsDismissable: x.isDismissable,
      };
    }) as AlertRuleUpdate[];

    this.rulesService.updateAlertRules(ruleUpdates).subscribe(res => {
      this.loadAlertRules();

      notify({
        message: res.message,
        type: res.succeeded ? 'success' : 'error',
        displayTime: 3000,
        position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
        maxWidth: '400px',
        closeOnClick: true,
      });
    });
  }

  private setDefaultFilters() {
    this.rulesGrid.filterValue = ['isActive', '=', true];
    this.filterCountChanged.emit(1);
  }

  private async confirmInactiveChange() {
    const confirmDialog = custom({
      messageHtml: `<p>Turning off a rule will delete any existing alerts for
      the rule. This action cannot be undone.</p><p>Are you sure you want to
      turn off the selected alert rule(s)?`,

      title: 'Confirm Changes?',

      buttons: [{
        elementAttr: { class: 'btn btn-primary' },
        text: 'Confirm',
        onClick: () => true
      }, {
        elementAttr: { class: 'btn' },
        text: 'Cancel',
        onClick: () => false
      }]
    });

    const choice = await confirmDialog.show();

    return choice;
  }

  // This recursively counts the applied filters taking into account the unusual
  // structure of filters in a DataGrid. DevExtreme doesn't even bother providing
  // a type for the filters, hence the linting disable below.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getFilterCount(filter: any[]): number {
    if (!filter || filter.length === 0) {
      return 0;
    }

    const hasArrays = filter.find(x => Array.isArray(x));
    let filterCount = 0;

    if (!hasArrays) {
      return 1;
    }

    for (let i = 0; i < filter.length; ++i) {
      if (Array.isArray(filter[i])) {
        filterCount += this.getFilterCount(filter[i]);
      }
    }

    return filterCount;
  }

  private loadAlertRules() {
    this.rulesGrid.instance.beginCustomLoading('Loading...');

    this.rulesService.getAlertRules(this.currentObjectTypeId).subscribe((res: ApiResponse) => {
      this.alertRules = res.data as AlertRule[];

      this.loadFilterOptions();
      this.buildGridDataSource();

      this.rulesGrid?.instance.endCustomLoading();
      this.dirtyStateChanged.emit(false);
      this.changedAlertRules = [];
      this.ruleMadeInactive = false;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private updateAlertRuleChanges(propertyName: string, value: any, data: AlertRule) {
    const changedIdx = this.changedAlertRules.findIndex(x => x.alertRuleID === data.alertRuleID);
    const isInChangesArray = changedIdx >= 0;

    const changedRule = isInChangesArray
      ? this.changedAlertRules[changedIdx]
      : data;

    changedRule[propertyName] = value;

    if (!isInChangesArray) {
      this.changedAlertRules.push(changedRule);
      this.dirtyStateChanged.emit(true);

      return;
    }

    this.changedAlertRules[changedIdx] = changedRule;
  }

  private loadFilterOptions() {
    this.severityFilterOptions = this.alertRuleSeverities?.map(x => {
      return {
        text: x.ruleSeverityName,
        value: ['alertRuleSeverityID', '=', x.alertRuleSeverityID]
      };
    });

    this.alertFilterOptions = this.alertTypes?.map(x => {
      return {
        text: x.alertType,
        value: ['alertTypeID', '=', x.alertTypeID]
      };
    });
  }

  private buildGridDataSource() {
    if (!this.alertRules) {
      return;
    }

    this.gridData = this.alertRules.slice();

    this.severitySelections = this.alertRuleSeverities?.map(x => ({
      value: x.alertRuleSeverityID,
      name: x.ruleSeverityName
    }));

    this.alertTypeSelections = this.alertTypes?.map(x => ({
      value: x.alertTypeID,
      name: x.alertType
    }));
  }

  private getOTID() {
    const OTIDpart = this.location.path().split('&')
      .find(x => x.toLowerCase().includes('objecttypeid'));

    return OTIDpart ? +OTIDpart.split('=')[1] : undefined;
  }
}
