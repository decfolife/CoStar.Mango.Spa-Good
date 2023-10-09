/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */

import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DxPivotGridComponent } from 'devextreme-angular/ui/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

@Component({
  selector: 'asc-842-annual-disclosures',
  templateUrl: './asc-842-annual-disclosures.component.html',
  styleUrls: ['./asc-842-annual-disclosures.component.scss'],
})
export class Asc842AnnualDisclosuresComponent implements OnInit {
  public cardData: any;
  public pivotCardData: any;
  public loading: boolean = true;
  public fieldConfigs: any;
  public dataSources: any;
  public pendoId: string = "Asc842AnnualDisclosures"
  public fullWidth: boolean = true;
  private cardConfigs: string[];
  
  @Input() selectedSegment: number;
  @Input() reportingYear: number;

  @ViewChild("PivotGrid") pivotGrid: DxPivotGridComponent;
 
  constructor(
    private inAppDisclosureService: InAppDisclosureService
  ) {}
  ngOnInit() {
  //  this.inAppDisclosureService.getIADCardData(127).subscribe((data) => {
    // this.cardData = data.data;
    this.dataSources = [];
    this.fieldConfigs = [];
    this.refreshCardData();
    //this.setCardData(this.cardData);
  //  });
  }

  public refreshCardData() {
    this.loading = true;
    this.setFieldConfigs();
    this.inAppDisclosureService.getIADCardData(this.selectedSegment, this.reportingYear).subscribe((result) => {
      this.setLeaseCountCardData(result.data[0])
      this.setROUAssetBalanceCardData(result.data[1])
      //this.setCardData(result.data[0])
      this.loading = false;
    });
  }

  public setLeaseCountCardData(data) {
    this.pivotCardData = [];
    data.forEach((item) => {
      let item1 = 
      { 
        DisclosureClassification:  item.DisclosureClassification,
        Display: "Opening Lease Counter",
        PeriodYear: item.PeriodYear,
        data: item.OpeningCount,
      }
      let item2 = 
      { 
        DisclosureClassification:  item.DisclosureClassification,
        Display: " - Lease Added",
        PeriodYear: item.PeriodYear,
        data: item.AddedCount,
      }
      let item3 = 
      { 
        DisclosureClassification:  item.DisclosureClassification,
        Display: " - Leases Expired/Cancelled",
        PeriodYear: item.PeriodYear,
        data: item.EndedCount,
      }
      let item4 = 
      { 
        DisclosureClassification:  item.DisclosureClassification,
        Display: "CLosing Lease Count",
        PeriodYear: item.PeriodYear,
        data: item.ClosingCount,
      }
      let item5 = 
      { 
        DisclosureClassification:  "Total",
        Display: "Opening Lease Counter",
        PeriodYear: item.PeriodYear,
        data: item.OpeningCount,
      }
      let item6 = 
      { 
        DisclosureClassification:  "Total",
        Display: " - Lease Added",
        PeriodYear: item.PeriodYear,
        data: item.AddedCount,
      }
      let item7 = 
      { 
        DisclosureClassification:  "Total",
        Display: " - Leases Expired/Cancelled",
        PeriodYear: item.PeriodYear,
        data: item.EndedCount,
      }
      let item8 = 
      { 
        DisclosureClassification:  "Total",
        Display: "CLosing Lease Count",
        PeriodYear: item.PeriodYear,
        data: item.ClosingCount,
      }
      this.pivotCardData.push(item1)
      this.pivotCardData.push(item2)
      this.pivotCardData.push(item3)
      this.pivotCardData.push(item4)
      this.pivotCardData.push(item5)
      this.pivotCardData.push(item6)
      this.pivotCardData.push(item7)
      this.pivotCardData.push(item8)
    })
    this.dataSources.push( new PivotGridDataSource({
      store: this.pivotCardData,
      fields: this.fieldConfigs[0]
    }))
    this.loading = false;
  }

  public setROUAssetBalanceCardData(data) {
    this.pivotCardData = [];
    data.forEach((item) => {
      let item1 = 
      { 
        DisclosureClassification:  item.disclosureClassification,
        Display: "ROU Asset Balance",
        PeriodYear: item.periodYear,
        data: item.rouAssetBalance,
      }
      let item2 = 
      { 
        DisclosureClassification:  item.disclosureClassification,
        Display: "Short Term Liability Balance",
        PeriodYear: item.periodYear,
        data: item.shortTermBalance,
      }
      let item3 = 
      { 
        DisclosureClassification:  item.disclosureClassification,
        Display: "Long Term Liability Balance",
        PeriodYear: item.periodYear,
        data: item.longTermBalance,
      }
      let item4 = 
      { 
        DisclosureClassification:  item.disclosureClassification,
        Display: "Total Liability Balance",
        PeriodYear: item.periodYear,
        data: item.totalBalance,
      }
      let item5 = 
      { 
        DisclosureClassification:  "Total",
        Display: "ROU Asset Balance",
        PeriodYear: item.periodYear,
        data: item.rouAssetBalance,
      }
      let item6 = 
      { 
        DisclosureClassification:  "Total",
        Display: "Short Term Liability Balance",
        PeriodYear: item.periodYear,
        data: item.shortTermBalance,
      }
      let item7 = 
      { 
        DisclosureClassification:  "Total",
        Display: "Long Term Liability Balance",
        PeriodYear: item.periodYear,
        data: item.longTermBalance,
      }
      let item8 = 
      { 
        DisclosureClassification:  "Total",
        Display: "Total Liability Balance",
        PeriodYear: item.periodYear,
        data: item.totalBalance,
      }
      this.pivotCardData.push(item1)
      this.pivotCardData.push(item2)
      this.pivotCardData.push(item3)
      this.pivotCardData.push(item4)
      this.pivotCardData.push(item5)
      this.pivotCardData.push(item6)
      this.pivotCardData.push(item7)
      this.pivotCardData.push(item8)
    })
    this.dataSources.push( new PivotGridDataSource({
      store: this.pivotCardData,
      fields: this.fieldConfigs[1]
    }))
    this.loading = false;
  }

  public setFieldConfigs() {
    this.inAppDisclosureService.getIADCardConfigs(1004).subscribe((result) => {
      result.data.forEach((card) => {
        let config = JSON.parse(card.CardJSONSchema)
        config[0].sortingMethod = this.rowSort;
        console.log(config)
        this.fieldConfigs.push(config);
      })
    })
  }

  public rowSort(a, b) {
    const rowSortOrderObject = {
      "Opening Lease Counter": 1,
      " - Lease Added": 2,
      " - Leases Expired/Cancelled": 3,
      "CLosing Lease Count": 4
    }
    if (rowSortOrderObject?.[a.value] > rowSortOrderObject?.[b.value])  
            return 1;  
        if (rowSortOrderObject?.[b.value] > rowSortOrderObject?.[a.value])  
            return -1;  
        else  
            return 0; 
  }

  public contextMenuPreparing(e) {
    const dataSource = e.component.getDataSource();
    const sourceField = e.field;

    if (sourceField) {
      if (sourceField.dataType === 'number') {
        let numberType = "number";
        const setSummaryType = function (args) {
          let format;
          if (numberType === "currency") {
            if (args.itemData.value === "total") {
              format = ",###";
            } else if (args.itemData.value === "sum") {
              format = ",##0.00"
            }
          } else {
            if (args.itemData.value === "total") {
              format = ",###";
            } else if (args.itemData.value === "sum") {
              format = ",###.##"
            }
          }

          if (format) {
            dataSource.field(sourceField.index, {
              summaryType: args.itemData.value,
              format: format
            });
          } else {
            dataSource.field(sourceField.index, {
              summaryType: args.itemData.value,
            });
          }


          dataSource.load();
        };
        const menuItems = [];

        e.items.push({ text: 'Summary Type', items: menuItems });

        for (const summaryType of ['Sum', 'Total']) {
          const summaryTypeValue = summaryType.toLowerCase();

          menuItems.push({
            text: summaryType,
            value: summaryType.toLowerCase(),
            onItemClick: setSummaryType,
            selected: e.field.summaryType === summaryTypeValue,
          });
        }
      }
    }
  }

  public onCellPrepared(e) {
    if (e.area === "data" && e.cell.text === "") {
        e.cellElement.textContent = "0";
    }
    if (e.cell.text === "ROU Asset Balance" || e.cell.text === "Total Liability Balance") {
      e.cellElement.style.fontWeight = 'bold';
    }
  }

  public cardMove(event: CdkDragDrop<string[]>): void {
    // moveItemInArray(this.cardData, event.previousIndex, event.currentIndex);
  }

  public toggleCardWidth() {
    this.fullWidth = !this.fullWidth;;
    this.updateDimention();
  }

  public updateDimention() {
    this.pivotGrid?.instance.updateDimensions();
  }

}
