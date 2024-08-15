import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { UserSettingsComponent } from '../modal/user-settings/user-settings.component';
import { WorkflowAndAlertsComponent } from '../views/workflow-and-alerts/workflow-and-alerts.component';
import { Asc842AnnualDisclosuresComponent } from '../views/asc-842-annual-disclosures/asc-842-annual-disclosures.component';
import { Asc842QuarterlyDisclosuresComponent } from '../views/asc-842-quarterly-disclosures/asc-842-quarterly-disclosures.component';
import { Ifrs16AnnualDisclosuresComponent } from '../views/ifrs-16-annual-disclosures/ifrs-16-annual-disclosures.component';
import { switchMap, tap } from 'rxjs/operators';
import { LargeModal } from '@mangoSpa/src/assets/enum/modal.model';
import { ToastState } from '@mango/data-models/lib-data-models';
import { CreateSegmentComponent } from '@reports/components/modal/create-segment/create-segment.component'

import { ModuleDropdownUtil } from 'libs/ui-shared/lib-ui-elements/src/lib/dropdown/util/module.util';
import { selectBoxMenuItems, byItemMoreMenuOptions } from 'libs/ui-shared/lib-ui-elements/src/lib/dropdown/definitions';
import { ReportsService } from '@reports/services/reports.service';
import { CremToastService } from '@mango/ui-shared/lib-ui-elements';
import hideToasts from "devextreme/ui/toast/hide_toasts";

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
  public hasSegmentDeleteRight: boolean;
  public hasSegmentsAddRight: boolean;
  public hasSegmentsViewRight: boolean;
  public isSegmentEdited: boolean =  false;
  public editingSegment: number;
  /**
   * For the export button, changes the state of the button
   */
  public exportingReport: boolean = false;

  public moreMenuSegment: any;

  // itemMenuInnerOptions: Initial structure for the segment 'more menu' or ellipsis
  itemMenuInnerOptions: selectBoxMenuItems;

  // bySegmentMoreMenuOptions: Once itemMenuInnerOptions is provided 'prepareMoreMenu'
  // creates a menu for each segment with the right data, e.g. permissions or rights
  bySegmentMoreMenuOptions: byItemMoreMenuOptions;

  @ViewChild(Asc842AnnualDisclosuresComponent) asc842AnnualDisclosuresComponent;
  @ViewChild(Asc842QuarterlyDisclosuresComponent) Asc842QuarterlyDisclosuresComponent;
  @ViewChild(WorkflowAndAlertsComponent) workflowAndAlertsComponent;
  @ViewChild(Ifrs16AnnualDisclosuresComponent) ifrs16AnnualDisclosuresComponent;

  constructor(
    private inAppDisclosureService: InAppDisclosureService,
    private reportsService: ReportsService,
    public dialog: MatDialog,
    private toastService: CremToastService
  ) {
    this.itemMenuInnerOptions = [
      {
        type: 'menu',
        name: 'Make Default',
        attribute: 'segmentID',
        action: () => this.setDefaultSegment(this.moreMenuSegment.segmentID, this.selectedView == 1 ? this.workflowAlertsCriteriaSet: this.criteriaSet),
        stopPropagation: true,
        transform: [
          {
            comparingKey: 'default',
            operator: '=',
            comparingValue: 1,
            disabled: true,
            title: 'This segment is already the default option.'
          },
        ],
      },
      {
        type: 'separator',
      },
      {
        type: 'menu',
        name: 'Edit',
        attribute: 'segmentID',
        action: () => this.edit(this.moreMenuSegment),
        stopPropagation: false,
        transform: [
          {
            comparingKey: 'activeRecordsVisibleToMe',
            operator: '=',
            comparingValue: true,
            title: "This segment is automatically generated and includes all records accessible to you.",
            disabled: true,
          },
          {
            comparingKey: 'securityTypeID',
            operator: '<',
            comparingValue: 4,
            name: 'View',
          },
          {
            comparingKey: 'securityTypeID',
            operator: '>=',
            comparingValue: 4,
            name: 'Edit',
          },
        ],
        // deprecated option: 'dataTransformer' and 'comparingValue',  use the 'transform' option instead
        comparingValue: 'rights',
        dataTransformer: [
          {condition: 'View', name: 'View'},
          {condition: 'Edit', name: 'Edit'},
          {condition: 'Delete', name: 'Edit'},
        ],
      },
      {
        type: 'separator',
      },
      {
        type: 'menu',
        name: 'Archive',
        attribute: 'segmentID',
        action: () => this.archiveAction(this.moreMenuSegment),
        stopPropagation: false,
        // Possible Responses: 1 Restricted View | 2 View | 3 Add | 4 Edit | 5 delete | 6 Block
        transform: [
          {
            comparingKey: 'securityTypeID',
            operator: '=',
            comparingValue: 4,
            disabled: true,
            title:'You have Edit rights to this segment. Ask your administrator to grant you Delete rights to archive this segment.',
          },
            {
              comparingKey: 'securityTypeID',
              operator: '=',
              comparingValue: 2,
              disabled: true,
              title:'You have View rights to this segment. Ask your administrator to grant you Delete rights to archive this segment.',
            },
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
              this.bySegmentMoreMenuOptions = ModuleDropdownUtil.prepareMoreMenu(this.accountingSegmentData, this.itemMenuInnerOptions);
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
    );
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
    let visibleToMeIndex: number;
    data.map( (e,i) => {
      if( e.default === 1){ // If default is on, add a secondary text
        e['secondaryText'] = '(Default)';
      }
      if( e.activeRecordsVisibleToMe ){ // get the activeRecordsVisibleToMe's Index
        visibleToMeIndex = i;
        e['itemClass'] = 'visible-to-me'; // Add moreMenu class to segment 'Active records Visible to me'
      }
      dropdownData.push(e)
    });
    visibleToMeIndex && dropdownData.unshift(dropdownData.splice(visibleToMeIndex,1)[0]); // Move default 'Visible to Me' to index 0, if visibleToMeIndex exists
    return dropdownData;
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
          this.bySegmentMoreMenuOptions = ModuleDropdownUtil.prepareMoreMenu(this.accountingSegmentData, this.itemMenuInnerOptions);
          if (refresh && !this.isSegmentEdited) {
            this.selectedSegment = this.accountingSegmentData.find(s => s.default === 1)?.segmentID || this.accountingSegmentData[0].segmentID;
            this.appliedSegment = this.selectedSegment;
          }
          if (this.isSegmentEdited) {
            this.selectedSegment = this.editingSegment;
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
      case 3: {
        this.Asc842QuarterlyDisclosuresComponent.refreshCardData();
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
    this.exportingReport = true;
    this.toastService.show(
      "Report will be exported shortly.",
      undefined,
      ToastState.SUCCESS,
      {
        maxWidth: '360px',
        duration: 3000,
      }
    );

    this.inAppDisclosureService.exportIADData(this.selectedSegment, this.selectedYear, "usd", this.selectedView + 2).subscribe((result) => {
      if(result.data) {
        this.toastService.show(
          undefined,
          undefined,
          ToastState.SUCCESS,
          {
            maxWidth: '500px',
            duration: 999999999,
            closeOnClick: true,
          },
          this.getDownloadContentTemplate(result.data),
        );
      } else {
        this.toastService.show(
          undefined,
          'Export failed.',
          ToastState.ERROR,
          {
            maxWidth: '500px',
            duration: 5000,
          },
          this.getDownloadContentTemplate(result.data),
        );
      }
      this.exportingReport = false;
    });
  }

  getDownloadContentTemplate(data): string {
    const blob = new Blob([data.body], {type: 'application/octet-stream'});
    const downloadURL = URL.createObjectURL(blob);
    const div = document.createElement('div');
    const a = document.createElement('a');
    const span1 = document.createElement('span')
    const span2 = document.createElement('span');
    const beforeText = document.createTextNode("Report is ready for download, ");
    const afterText = document.createTextNode(" to download report.");
    span1.appendChild(beforeText);
    span2.appendChild(afterText);
    const linkText = document.createTextNode("click here");
    div.appendChild(span1)
    div.appendChild(a)
    div.appendChild(span2)
    a.appendChild(linkText);
    a.href = downloadURL;
    a.style.color = "white";
    a.style.textDecoration = "underline";
    a.onclick = () => { hideToasts(); };
    const contentDisposition = data.headers.get('content-disposition') as string;
    const fileName = contentDisposition.split(/[=;]/)[2];
    a.download = fileName;
    return div.outerHTML;
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
          archived: !data.active,
          hideToastsOn: 'Accounting Workflow and Alerts',
        }
      });
      this. editingSegment = data.segmentID;
      dialogRef.afterClosed().subscribe((data) => {
        if (this. editingSegment == this.appliedSegment) {
          if (data === "refresh") {
            this.loading = true;
            this.getSegments(this.selectedView, true);
            this.isSegmentEdited = true;
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
          this.toastService.show(
            'Segment archived successfully.',
            undefined,
            ToastState.SUCCESS,
            {
              maxWidth: '500px',
              duration: 5000,
            }
          );
        } else {
          //error
        }
      });
    } else {
      this.reportsService.unarchiveSegment(request).subscribe((result) => {
        if (result) {
          this.getSegments(this.selectedView, false);
          this.toastService.show(
            'Segment unarchived successfully.',
            undefined,
            ToastState.SUCCESS,
            {
              maxWidth: '500px',
              duration: 5000,
            }
          );
        } else {
          //error
        }
      });
    }
    this.archiveActionForDefault(data);

  }

  /**
   * Handles the archiving logic when a 'default' segment is archived
   */
  archiveActionForDefault(data:any){
    if(data.default === 1){// If user archiving the default segment, then make 'Visible to me' the default
      const visibleTomeSegmentId = this.accountingSegmentData.filter(e=>e.activeRecordsVisibleToMe)[0].segmentID;
      if(visibleTomeSegmentId){// If 'Visible to me' exists then make it the default
        this.setDefaultSegment(visibleTomeSegmentId,data.criteriaSetID);
      } else{ // If 'Visible to me' doesn't exists, select the first element of the list as default
        this.setDefaultSegment(this.accountingSegmentData[0].segmentID,this.accountingSegmentData[0].criteriaSetID);
      }
      this.apply(); // Refresh cards view
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
    this.subs.forEach(s => s.unsubscribe())
  }

}