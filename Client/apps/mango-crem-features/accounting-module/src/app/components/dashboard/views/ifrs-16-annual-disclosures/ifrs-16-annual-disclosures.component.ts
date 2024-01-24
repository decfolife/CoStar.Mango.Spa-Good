import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, Input } from '@angular/core';
import { CardConfig, CardDataItem } from '@mango/data-models/lib-data-models';
import { DxPivotGridComponent } from 'devextreme-angular';
import { switchMap, tap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

@Component({
  selector: 'ifrs-16-annual-disclosures',
  templateUrl: './ifrs-16-annual-disclosures.component.html',
  styleUrls: ['./ifrs-16-annual-disclosures.component.scss'],
})
export class Ifrs16AnnualDisclosuresComponent implements OnInit, OnDestroy {

  public loading = true as boolean;
  public selectedCurrency: string;

  private observableList$: Subscription;
  protected pivotDataSources: Array<PivotGridDataSource>;

  // General Parameters
  @Input() pendoId: string;

  // Cards Parameters
  @Input() dashboardId: number;
  @Input() cardData: CardConfig[];
  private fieldConfigs: CardConfig[]; // todo: Define Type

  // Dynamic Header Parameters
  @Input() selectedSegment: number;
  @Input() reportingYear: number;

  @ViewChild("PivotGrid") pivotGrid: DxPivotGridComponent;

  constructor(private inAppDisclosureService: InAppDisclosureService) {
    this.pendoId = "IFSAnnualDisclosures";
    this.dashboardId = 6; // 6: IFRS Annual Disclosure
    this.cardData = [ // todo: exception handling when data coming from API doesn't match parameters provided
      {
        index: 0,
        id: 'LeaseCounts',
        name: 'Lease Counts',
        format: ",###",
        sortingOrder: { // todo: use sortingOrder for fieldTransform
          "Opening Lease Count": 1,
          "- Leases Added": 2,
          "- Leases Expired/Cancelled": 3,
          "Closing Lease Count": 4,
        },
        fieldTransform: [ // todo: rename to API data mapping
          {
            DisclosureClassification: 'DisclosureClassification',
            LeaseType: 'LeaseType',
            Display: 'Display',
            PeriodYear: 'PeriodYear',
            data: 'OpeningCount',
          },
          {
            DisclosureClassification: 'DisclosureClassification',
            LeaseType: 'LeaseType',
            Display: 'Display',
            PeriodYear: 'PeriodYear',
            data: 'AddedCount',
          },
          {
            DisclosureClassification: 'DisclosureClassification',
            LeaseType: 'LeaseType',
            Display: 'Display',
            PeriodYear: 'PeriodYear',
            data: 'EndedCount',
          },
          { 
            DisclosureClassification: 'DisclosureClassification',
            LeaseType: 'LeaseType',
            Display: 'Display',
            PeriodYear: 'PeriodYear',
            data: 'ClosingCount',
          },
        ]
      },
    ];
    this.pivotDataSources = [];
  }

  ngOnInit() {
    this.getCards();
  }

  public cardMove(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.cardData, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy(): void {
    if(this.observableList$){
      this.observableList$.unsubscribe();
    }
  }

  private getCards(): void{
    /*
     * Get Cards Info
     * 1. Get Card Configuration: getIADCardConfigs
     * 2. Get All necessary additional data: getCurrencyDecimalPrecision
     * 3. Get Pivot Configuration: getIADCardData
     */
    this.observableList$ = this.inAppDisclosureService.getIADCardConfigs(this.dashboardId, this.cardData)
      .pipe(
        switchMap( (cardConfig) => {
          this.fieldConfigs = cardConfig.data;
          this.selectedCurrency = 'usd';
          return this.inAppDisclosureService.getCurrencyDecimalPrecision(this.selectedCurrency);
        }),
        switchMap( (decimalPrecision) => {
          return this.inAppDisclosureService.getIADCardData(
            this.dashboardId,
            this.selectedSegment,
            this.reportingYear,
            this.selectedCurrency,
          );
        }),
        tap( (cardData) => {
          // Configure the Pivot Grid combining the 'getIADCardConfigs', 'getIADCardData' and the cartData parameter
          cardData.data.map( (cardData, i) => { // For each card create the corresponding Grid/Table
            const pivotGrid: PivotGridDataSource = this.setPivotGrid(
                cardData,
                this.fieldConfigs[i],
                this.cardData[i].fieldTransform,
                this.cardData[i].sortingOrder,
              );
            this.pivotDataSources.push(pivotGrid); // Add Pivot Grid to DataSources
          });

        })
      ).subscribe(
        () => {
          this.loading = false;
        },
        error => {
          console.error('An error occurred: ', error);
        }
      );
  }

  updateCards() {
    this.pivotDataSources = [];
    this.getCards();
  }

  setPivotGrid(cardData: Array<any>, fieldConfig: any, fieldTransform?: Partial<CardDataItem[]>, sortingOrder?: any): PivotGridDataSource {
    let dataSource: PivotGridDataSource;
    let pivotCardDataStore: Partial<CardDataItem>[] = [];

    pivotCardDataStore = this.mapFields(cardData, fieldTransform, sortingOrder);

    // Create Pivot Grid
    dataSource = new PivotGridDataSource({
      store: pivotCardDataStore,
      fields: fieldConfig,
    });

    return dataSource;
  }

  mapFields(cardData: Array<any>, fieldTransform?: Partial<CardDataItem[]>, sortingOrder?: any){
    const transformedStore: any = [];
    const sortingItems = Object.entries(sortingOrder).map( ([key]) => key);
    if(fieldTransform){
      // Build new structure
      cardData.map( (e) => {
        const builtEntries: Partial<CardDataItem>[] = [];
        // Re-map fields using the cardDataTransformer data provided
        Object.entries(fieldTransform).forEach(( [key, value], i) => {
          const transformedObject: Partial<CardDataItem> = {};
          //Build rows
          Object.entries(value).forEach(([key, value], i) => {
            if(value) {
              transformedObject[`${key}`] = e[`${value}`];
            }
          });
          transformedObject['Display'] = sortingItems[i];
          // Count sequence
          builtEntries.push(transformedObject);
        });
        transformedStore.push(...builtEntries);
      });
      return transformedStore;
    } else {
      return cardData;
    }
  }

}