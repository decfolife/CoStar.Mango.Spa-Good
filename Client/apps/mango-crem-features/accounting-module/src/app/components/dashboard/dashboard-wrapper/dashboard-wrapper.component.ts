import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import notify from 'devextreme/ui/notify';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { UserSettingsComponent } from '../modal/user-settings/user-settings.component';
import { WorkflowAndAlertsComponent } from '../views/workflow-and-alerts/workflow-and-alerts.component';
import { Asc842AnnualDisclosuresComponent } from '../views/asc-842-annual-disclosures/asc-842-annual-disclosures.component';
import { Ifrs16AnnualDisclosuresComponent } from '../views/ifrs-16-annual-disclosures/ifrs-16-annual-disclosures.component';
import { switchMap, tap } from 'rxjs/operators';
import { LargeModal } from '@mangoSpa/src/assets/enum/modal.model';
import { CreateSegmentComponent } from '@reports/components/modal/create-segment/create-segment.component'

import { selectBoxMenuItems, byItemMoreMenuOptions, moreMenuItem } from 'libs/ui-shared/lib-ui-elements/src/lib/dropdown/definitions';
import { ReportsService } from '@reports/services/reports.service';

export interface DropdownSelection { // Todo: Move to type definition file
  display: string,
  id: number,
}

@Component({
  selector: 'mango-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss'],
})
export class DashboardWrapperComponent implements OnInit, OnDestroy {
  public featureFlagEnabled = false as boolean;
  public accountingViewData: any[] = [
    {
      id: 1,
      displayValue: "Workflow and Alerts"
    },
    {
      id: 2,
      displayValue: "ASC 842 Annual Disclosures"
    },
    {
      id: 3,
      displayValue: "ASC 842 Quarterly Disclosures"
    },
    {
      id: 4,
      displayValue: "IFRS 16 Annual Disclosures"
    },
    {
      id: 5,
      displayValue: "IFRS 16 Quarterly Disclosures"
    }
  ];
  public accountingYearData: any[] = [];
  public accountingSegmentData: any[] = [];
  public selectedSegment: number;
  public appliedSegment: number;
  public selectedView = 1 as number;
  public selectedYear = 2022 as number;
  public loading = true as boolean;
  public criteriaSet: number;
  public workflowAlertsCriteriaSet: number;
  subs: Subscription[] = [];
  faFileExport = faFileExport;
  public hasSegmentDeleteRight: boolean;
  public hasSegmentsAddRight: boolean;
  public hasSegmentsViewRight: boolean;

  public moreMenuSegment: any;

  // itemMenuInnerOptions: Initial structure for the segment 'more menu' or ellipsis
  itemMenuInnerOptions: selectBoxMenuItems;

  // bySegmentMoreMenuOptions: Once itemMenuInnerOptions is provided 'prepareSegmentMoreMenu'
  // creates a menu for each segment with the right data, e.g. permissions or rights
  bySegmentMoreMenuOptions: byItemMoreMenuOptions;

  @ViewChild(Asc842AnnualDisclosuresComponent) asc842AnnualDisclosuresComponent;
  @ViewChild(WorkflowAndAlertsComponent) workflowAndAlertsComponent;
  @ViewChild(Ifrs16AnnualDisclosuresComponent) ifrs16AnnualDisclosuresComponent;

  constructor(
    private inAppDisclosureService: InAppDisclosureService,
    private reportsService: ReportsService,
    public dialog: MatDialog,
  ) {
    this.itemMenuInnerOptions = [
      {
        type: 'menu',
        name: 'Make Default',
        action: () => this.setDefaultSegment(this.moreMenuSegment.segmentID, this.selectedView == 1 ? this.workflowAlertsCriteriaSet: this.criteriaSet),
        stopPropagation: true,
        dataTransformer: [
          {
            condition: 1, disabled: true
          }
        ]
      },
      { type: 'separator' },
      {
        type: 'menu',
        name: 'Edit',
        action: () => this.edit(this.moreMenuSegment),
        stopPropagation: false,
        dataTransformer: [
          {condition: 'View', name: 'View'},
          {condition: 'Edit', name: 'Edit'},
          {condition: 'Delete', name: 'Edit'},
        ],
      },
      { type: 'separator' },
      {
        type: 'menu',
        name: 'Archive',
        action: () => this.archiveAction(this.moreMenuSegment),
        stopPropagation: false,
        dataTransformer: [
          // Possible Responses: 1 Restricted View | 2 View | 3 Add | 4 Edit | 5 delete | 6 Block
          {condition: 'Restricted View', disabled: true, title:'You don\'t have rights'},
          {condition: 'View', disabled: true, title:'You don\'t have rights'},
          {condition: 'Add', disabled: true, title:'You don\'t have rights'},
          {condition: 'Edit', disabled: true, title:'You don\'t have rights'},
          {condition: 'Delete', disabled: false,},
          {condition: 'Block', disabled: false,},
        ],
      },
    ];
  }

  ngOnInit() {
    this.selectedYear = new Date().getFullYear();
    this.featureFlagEnabled = true;
    this.subs.push( // todo: this sequence of subscriptions needs to be inside a pipe or a forkjoin
      this.inAppDisclosureService.getAccountingCriteriaSets().subscribe((result) => {
        this.criteriaSet = result.data[0].CriteriaSetID;

        if(result.data.length <= 1 ) {
          this.loading = false;
          return;
        }

        this.workflowAlertsCriteriaSet = result.data[1].CriteriaSetID;
        const observableItem =
          this.inAppDisclosureService.getSegments(this.selectedView == 1 ? this.workflowAlertsCriteriaSet: this.criteriaSet, false)
            .subscribe( (r) => {
              this.accountingYearData = [];
              for(let i = 10; i > -11; i--) {
                this.accountingYearData.push({
                  value: this.selectedYear + i
                });
              }
              //fetch criteriaSetID for each view;
              this.accountingSegmentData = this.prepareSegmentDropdown(r.data);
              this.bySegmentMoreMenuOptions = this.prepareSegmentMoreMenu(r.data, this.itemMenuInnerOptions);
              this.selectedSegment = this.accountingSegmentData?.find(s => s.default === 1)?.segmentID || this.accountingSegmentData?.[0].segmentID;
              this.appliedSegment = this.selectedSegment;
              this.loading = false;
            });

        this.subs.push(observableItem);

      }
    ));
    this.subs.push(
      this.reportsService.getSegmentsRights(0, 2).subscribe((result) => {
        if (result.data) {
          this.hasSegmentDeleteRight = result.data.securityTypeID >= 5;
          this.hasSegmentsAddRight = result.data.securityTypeID >= 3;
          this.hasSegmentsViewRight = result.data.securityTypeID >= 2;
        }
  
      })
    )
  }

  setDefaultSegment(segmentID: number, criteriaSetID: number): void{
    let setDefault$: Subscription;

    setDefault$ = this.inAppDisclosureService.SetDefault(segmentID, criteriaSetID)
      .subscribe(
        result => {
          if (result.data != -1) {
            this.getSegments(this.selectedView, false); //refresh
          } else {
            console.error('Failed setting the default segment', result.data);
          }
        },
        error => console.error(error),
      );

    this.subs.push(setDefault$);
  }

  prepareSegmentDropdown(data: any): any { // Transform dropdown options data to be used by crem-dropdown
    const dropdownData = [];

    data.map( e => {
      if( e.default === 1){ // If default is on, add a secondary text
        e['secondaryText'] = '(Default)';
      }
      dropdownData.push(e)
    });

    return data;
  }

  // For each segment item create a corresponding more menu (ellipsis) option
  prepareSegmentMoreMenu(segmentsData, itemMenu: selectBoxMenuItems) { // todo: This should be part of the crem-dropdown component
    const segmentsWithMoreMenu = [];

    segmentsData.map( (segment) => {
      const menuItems = [];
      itemMenu.map( e => {
        let newItem: Partial<moreMenuItem> = {};
        if (e.name === 'Make Default') {
          newItem = this.prepareItemMoreMenu(e, segment.default, segment.segmentID); // Transform more menu
        } else {
          newItem = this.prepareItemMoreMenu(e, segment.rights, segment.segmentID); // Transform more menu
        }
        menuItems.push(newItem); // Build Array of Menu Options
      });

      // Add Array of Menu Options to Segment Object
      segmentsData = segment;
      segmentsData['moreMenu'] = menuItems;
      segmentsWithMoreMenu.push(segmentsData);

    });

    return segmentsWithMoreMenu;
  }

  prepareItemMoreMenu(menuItem: moreMenuItem, comparingValue: string | number | boolean, attribute?: any, attributeName?: string): moreMenuItem {
    const item = {...menuItem}
    if(item.dataTransformer){
      if (comparingValue) { // Only proceeds if there is something to compare with
        const elementExists = item.dataTransformer.find( item => item.condition === comparingValue );
        if(elementExists){
          item.name = elementExists?.name ?? item.name;
          item.title = elementExists?.title ?? item.title;
          item.disabled = elementExists?.disabled ? elementExists?.disabled : item.disabled || false;
        }
        attribute && (item[ attributeName ?? 'attribute'] = attribute); // Additional attribute
      }
      else {
        console.error('Error: Incomplete or faulty arguments encountered when utilizing the "crem-dropdown"\'s more menu.');
      }
    }
    return item;
  }

  public onAccountingViewChange(data: DropdownSelection[]) {
    switch(data[0].id) {
      default:
      case 1:
      case 2:
      case 3:
      case 4: {
        this.getSegments(data[0].id, true);
        break;
      }
    }
  }

  public getSegments(view: number, refresh: boolean) {
    this.accountingSegmentData = [];

    this.inAppDisclosureService.getAccountingCriteriaSets()
      .pipe(
        switchMap( r => {
          switch(view){
            case 1: // Workflow and Alerts
              this.criteriaSet = r.data[1].CriteriaSetID;
              break;
            default: // ASC 842 Annual Disclosures
              this.criteriaSet = r.data[0].CriteriaSetID;
              break;
          }
          return this.inAppDisclosureService.getSegments(this.criteriaSet, false);
        }),
        tap( r => {
          this.accountingSegmentData = this.prepareSegmentDropdown(r.data);
          this.bySegmentMoreMenuOptions = this.prepareSegmentMoreMenu(r.data, this.itemMenuInnerOptions);
          if (refresh) {
            this.selectedSegment = r.data.find(s => s.default === 1)?.segmentID || r.data[0].segmentID;
            this.appliedSegment = this.selectedSegment;
          }
          this.selectedView = view;
          this.loading = false;
        })
      ).subscribe();

  }

  public onAccountingYearChange(data) {
    if (data.length) {
      this.selectedYear = data[0].value;
    }
  }

  public onAccountingSegmentChange(data) {
    if (data.length) {
      this.selectedSegment = data[0].segmentID;
    }
  }

  public apply() {
    switch(this.selectedView){
      default:
      case 1: {
        this.workflowAndAlertsComponent.refreshCardData();
        break;
      }
      case 2: {
        this.asc842AnnualDisclosuresComponent.refreshCardData();
        break;
      }
      case 4: {
        this.ifrs16AnnualDisclosuresComponent.updateCards();
        break;
      }
    }
    this.appliedSegment = this.selectedSegment;
  }

  public export() {
    this.inAppDisclosureService.exportIADData(this.selectedSegment, this.selectedYear).subscribe((result) => {
      if(result.data === 'export successful') {
        notify({
          message: 'Export Successful. You can find your report in VPDocuments.',
          type: 'success',
          displayTime: 5000,
          position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
          maxWidth: '500px',
          closeOnClick: true,
        })
      } else {
        notify({
          message: 'Export failed.',
          type: 'error',
          displayTime: 5000,
          position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
          maxWidth: '500px',
          closeOnClick: true,
        })
      }
    });
  }

  launchSettingsModal() {
    const dialogRef = this.dialog.open(UserSettingsComponent, {
       width: '600px',
       height: '570px',
       panelClass: 'user-settings-dialog',
       disableClose: true,
       data: {
        modalTitle: this.accountingViewData.find(obj => obj.id === this.selectedView).displayValue,
       }
    });
  }

  public edit(data) {
    if (this.hasSegmentsAddRight || this.hasSegmentsViewRight) {
      const dialogRef = this.dialog.open(CreateSegmentComponent, {
        height: LargeModal.Height,
        width: LargeModal.Width,
        maxWidth: LargeModal.MaxWidth,
        maxHeight: LargeModal.MaxHeight,
        disableClose: true,
        data: {
          openReportAction: "edit",
          segmentID: data.segmentID,
          criteriaSetID: data.criteriaSetID,
          portfolioID: data.portfolioID,
          name: data.name,
          archived: !data.active
        }
      });
      const editingSegment = data.segmentID;
      dialogRef.afterClosed().subscribe((data) => {
        if (editingSegment == this.appliedSegment) {
          if (data === "refresh") {
            this.loading = true;
            this.getSegments(this.selectedView, true);
          } else if (data) {
            this.redirectDialog(data)
          }
        } else {
          if (data === "refresh") {
            this.getSegments(this.selectedView, false);
          } else if (data) {
            this.redirectDialog(data)
          }
        }
      });

    }
  }

  public archiveAction(data) {
    let request = { "SegmentID": data.segmentID }
    if (data.active) {
      this.reportsService.archiveSegment(request).subscribe((result) => {
        if (result) {
          if (data.segmentID === this.appliedSegment) {
            this.loading = true;
            this.getSegments(this.selectedView, true);
          } else {
            this.getSegments(this.selectedView, false);
          }
          notify({
            message: 'Segment archived successfully.',
            type: 'success',
            displayTime: 5000,
            position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
            maxWidth: '500px',
            closeOnClick: true,
        })
        } else {
          //error
        }
      })
    } else {
      this.reportsService.unarchiveSegment(request).subscribe((result) => {
        if (result) {
          this.getSegments(this.selectedView, false);
          notify({
            message: 'Segment unarchived successfully.',
            type: 'success',
            displayTime: 5000,
            position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
            maxWidth: '500px',
            closeOnClick: true,
        })
        } else {
          //error
        }
      })
    }
  }

  public redirectDialog(config: any) {
    const redirectRef = this.dialog.open(CreateSegmentComponent, config)
    redirectRef.afterClosed().subscribe((data) => {
      if (config.data.segmentID == this.appliedSegment) {
        if (data === "refresh") {
          this.loading = true;
          this.getSegments(this.selectedView, true);
        } else if (data) {
          this.redirectDialog(config)
        }
      } else {
        if (data === "refresh") {
          this.getSegments(this.selectedView, false);
        } else if (data) {
          this.redirectDialog(config)
        }
      }
    });
  }

  public onMoreMenuItemClicked(item) {
    this.moreMenuSegment = item;
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe)
  }

}