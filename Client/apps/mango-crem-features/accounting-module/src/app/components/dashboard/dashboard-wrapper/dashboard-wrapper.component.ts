/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */

import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Asc842AnnualDisclosuresComponent } from '../views/asc-842-annual-disclosures/asc-842-annual-disclosures.component';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'mango-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss'],
})
export class DashboardWrapperComponent implements OnInit {
  public featureFlagEnabled: boolean = false;
  public accountingViewData: any[] = [];
  public accountingYearData: any[] = [];
  public accountingSegmentData: any[] = [];
  public selectedSegment: number;
  public selectedView: number = 2;
  public selectedYear: number = 2022;
  public loading: boolean = true;
  public criteriaSet: number;
  faFileExport = faFileExport;

  @ViewChild(Asc842AnnualDisclosuresComponent) asc842AnnualDisclosuresComponent;
 
  constructor(
    private inAppDisclosureService: InAppDisclosureService
  ) {}
  ngOnInit() {
    this.selectedYear = new Date().getFullYear();
    this.featureFlagEnabled = true;
    this.inAppDisclosureService.getAccountingCriteriaSets().subscribe((result) => {
      this.criteriaSet = result.data[0].CriteriaSetID;
      const observableItem = this.inAppDisclosureService.getSegments(this.criteriaSet, false);
  
      observableItem.subscribe((data) => {
        this.accountingViewData = [
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
  
        this.accountingYearData = [
        ];
        for(let i = 10; i > -11; i--) {
          this.accountingYearData.push({
            value: this.selectedYear + i
          });
        }
        //fetch criteriaSetID for each view;
        if(this.selectedView == 2) {
          this.accountingSegmentData = data.data;
          this.selectedSegment = this.accountingSegmentData?.[0].segmentID
        }
        this.loading = false;
  
      })
    });

    
        
  }

  public onAccountingViewChange(data) {
    if (data.length) {
      this.selectedView = data[0].id;
      if (this.selectedView == 2) {
        this.getSegments();
      }
    }
  }

  public getSegments() {
    this.accountingSegmentData = [];
    this.inAppDisclosureService.getAccountingCriteriaSets().subscribe((result) => {
      this.criteriaSet = result.data[0].CriteriaSetID;
      this.inAppDisclosureService.getSegments(this.criteriaSet, false).subscribe((result) => {
        this.accountingSegmentData = result.data;
      })
    })
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
    //console.log("apply")
    this.asc842AnnualDisclosuresComponent.refreshCardData();
  }

  public export(data) {
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

}