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
import { selectBoxMenuItems, byItemMoreMenuOptions, moreMenuItem } from 'libs/ui-shared/lib-ui-elements/src/lib/dropdown/definitions';

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
  public selectedView = 1 as number;
  public selectedYear = 2022 as number;
  public loading = true as boolean;
  public criteriaSet: number;
  public workflowAlertsCriteriaSet: number;
  subs: Subscription[] = [];
  faFileExport = faFileExport;

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
    public dialog: MatDialog,
  ) {
    this.itemMenuInnerOptions = [
      {
        type: 'menu',
        name: 'Make default',
        action: () => this.segmentMoreMenuClick(),
        stopPropagation: true,
      },
      { type: 'separator' },
      {
        type: 'menu',
        name: 'Edit',
        action: () => this.segmentMoreMenuClick(),
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
        action: () => this.segmentMoreMenuClick(),
        stopPropagation: false,
        dataTransformer: [
          // Possible Responses: 1 Restricted View | 2 View | 3 Add | 4 Edit | 5 delete | 6 Block
          {condition: 'Restricted View', disabled: true,},
          {condition: 'View', disabled: true,},
          {condition: 'Add', disabled: true,},
          {condition: 'Edit', disabled: false,},
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
        const observableItem = this.inAppDisclosureService.getSegments(this.selectedView == 1 ? this.workflowAlertsCriteriaSet: this.criteriaSet, false);
        this.subs.push(
          observableItem.subscribe((data) => {
            this.accountingYearData = [];
            for(let i = 10; i > -11; i--) {
              this.accountingYearData.push({
                value: this.selectedYear + i
              });
            }
            //fetch criteriaSetID for each view;
            this.accountingSegmentData = data.data;
            this.bySegmentMoreMenuOptions = this.prepareSegmentMoreMenu(data.data, this.itemMenuInnerOptions);
            this.selectedSegment = this.accountingSegmentData?.[0].segmentID;
            this.loading = false;
          })
        );

      }
    ));

  }

  segmentMoreMenuClick(): void{
    // console.log('menu pressed');
  }

  // For each segment item create a corresponding more menu (ellipsis) option
  prepareSegmentMoreMenu(segmentsData, itemMenu: selectBoxMenuItems) {
    const segmentsWithMoreMenu = [];

    segmentsData.map( (segment) => {
      const menuItems = [];

      itemMenu.map( e => {
        let newItem: Partial<moreMenuItem> = {};
        newItem = this.prepareItemMoreMenu(e, segment.rights); // Transform more menu
        menuItems.push(newItem); // Build Array of Menu Options
      });

      // Add Array of Menu Options to Segment Object
      segmentsData = segment;
      segmentsData['moreMenu'] = menuItems;
      segmentsWithMoreMenu.push(segmentsData);

    });

    return segmentsWithMoreMenu;
  }

  prepareItemMoreMenu(menuItem: moreMenuItem, comparingValue: string | number | boolean): moreMenuItem {

    if(menuItem.dataTransformer && comparingValue){
      const elementExists = menuItem.dataTransformer.find( item => item.condition === comparingValue );
      if(elementExists){
        menuItem.name = elementExists?.name ?? menuItem.name;
        menuItem.disabled = elementExists?.disabled ? elementExists?.disabled : menuItem.disabled || false;
      }
    } else {
      console.error('error, incomplete or faulty arguments');
    }

    return menuItem;
  }

  public onAccountingViewChange(data: DropdownSelection[]) {
    switch(data[0].id) {
      default:
      case 1:
      case 2:
      case 3:
      case 4: {
        this.getSegments(data[0].id);
        break;
      }
    }
  }

  public getSegments(view: number) {
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
          this.accountingSegmentData = r.data;
          this.selectedSegment = r.data[0].segmentID;
          this.selectedView = view;
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

  public apply(data) {
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
        this.ifrs16AnnualDisclosuresComponent.refreshCardData();
        break;
      }
    }
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

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe)
  }

}