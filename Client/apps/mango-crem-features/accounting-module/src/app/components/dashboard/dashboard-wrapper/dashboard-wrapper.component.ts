/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */

import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Asc842AnnualDisclosuresComponent } from '../views/asc-842-annual-disclosures/asc-842-annual-disclosures.component';

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

  @ViewChild(Asc842AnnualDisclosuresComponent) asc842AnnualDisclosuresComponent;
 
  constructor(
    private inAppDisclosureService: InAppDisclosureService
  ) {}
  ngOnInit() {
    this.featureFlagEnabled = true;
    this.inAppDisclosureService.getAccountingCriteriaSets().subscribe((result) => {
      this.criteriaSet = result.data[0].CriteriaSetID;
      const observableItem = forkJoin({
        segments: this.inAppDisclosureService.getSegments(this.criteriaSet, false)
      });
  
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
          {
            value: 2020
          },
          {
            value: 2021,
          },
          {
            value: 2022,
          },
          {
            value: 2023,
          }
        ];
        //fetch criteriaSetID for each view;
        if(this.selectedView == 2) {
          this.accountingSegmentData = data.segments.data;
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

}
