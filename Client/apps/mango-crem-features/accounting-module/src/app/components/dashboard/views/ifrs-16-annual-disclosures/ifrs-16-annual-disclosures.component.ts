import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, Input } from '@angular/core';
import { DxPivotGridComponent } from 'devextreme-angular';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Subscription, combineLatest, forkJoin } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

import { CardConfig, CardDataItem } from '@mango/data-models/lib-data-models';
import { rowSort } from './definitions';

// Configuration Data
import { cardData, dashboardId, pendoId } from './conf/cardData';

@Component({
  selector: 'ifrs-16-annual-disclosures',
  templateUrl: './ifrs-16-annual-disclosures.component.html',
  styleUrls: ['./ifrs-16-annual-disclosures.component.scss'],
})
export class Ifrs16AnnualDisclosuresComponent implements OnInit, OnDestroy {
  // Currency precision goes into the field
  // Data goes into the store
  public loading = true as boolean;
  public selectedCurrency: string;
  public decimalPrecision: number | null;

  private observableList$;
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
    this.pendoId = pendoId;
    this.dashboardId = dashboardId;
    this.cardData = cardData;
    this.selectedCurrency = 'usd';
    this.pivotDataSources = [];
  }

  ngOnInit() {
    this.getCards();
  }

  public cardMove(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.cardData, event.previousIndex, event.currentIndex);
  }

  private getCards(){
    this.observableList$ = this.inAppDisclosureService.getCurrencyDecimalPrecision(this.selectedCurrency)
      .pipe(
        switchMap( (currencyPrecision) => {
          this.decimalPrecision = currencyPrecision.data.DecimalPrecision;
          return this.inAppDisclosureService.getIADCardConfigs(this.dashboardId);
        }),
        switchMap( (cardConfig) => {
          this.fieldConfigs = this.configureFieldsPerCard(cardConfig.data, this.cardData, this.decimalPrecision);
          return this.inAppDisclosureService.getIADCardData(
                    this.dashboardId, this.selectedSegment, this.reportingYear, this.selectedCurrency
                  );
        }),
        tap( (cardData) => {
          cardData.data.map( (cardData, i) => { // For each card create the corresponding Grid/Table
            const pivotGrid: PivotGridDataSource = this.setPivotGrid(
                cardData,
                this.fieldConfigs[i],
                this.cardData[i].fieldTransform,
                this.cardData[i].sortingOrder,
              );
            this.pivotDataSources.push(pivotGrid); // Add Pivot Grid to DataSources
          });
        }),
      );

    this.observableList$.subscribe(
      () => {
        this.loading = false;
      },
      (error) => {
        console.error('An error occurred: ', error);
      }
    );

  }

  updateCards() {
    this.pivotDataSources = [];
    this.getCards();
  }

  setPivotGrid(cardData: Array<any>, fieldConfig: any, fieldTransform?: Partial<CardDataItem[]>, sortingOrder?: any): PivotGridDataSource {

    const pivotCardDataStore: Partial<CardDataItem>[] = this.mapFields(cardData, fieldTransform, sortingOrder);
    // Create Pivot Grid
    const dataSource: PivotGridDataSource = new PivotGridDataSource({
      store: pivotCardDataStore,
      fields: fieldConfig,
    });

    return dataSource;
  }

  mapFields(cardData: Array<any>, fieldTransform?: Partial<CardDataItem[]>, sortingOrder?: any){
    const transformedStore: any = [];
    const sortingItems = Object.entries(sortingOrder).map( ([key]) => key);
    if(fieldTransform){ // Transform & map values according to fieldTransform
      cardData.map( (e) => {
        const builtEntries: Partial<CardDataItem>[] = [];
        Object.entries(fieldTransform).forEach(( [_, value], i) => {
          const transformedObject: Partial<CardDataItem> = {};
          //Build rows
          Object.entries(value).forEach(([k, v], i) => {
            switch(value.LeaseTemplate) { // Depending on the 'DisclosureClassification' data will be mapped differently
              case 'Total':
                switch(k){
                  case 'LeaseTemplate':
                  case 'DisclosureClassification':
                    transformedObject[k] = v;
                    break;
                  case 'Display':
                    transformedObject['Display'] = v;
                    break;
                  default:
                    transformedObject[k] = e[v];
                    break;
                }
                break;
              default:
                transformedObject[k] = e[v];
                break;
            }
          });
          if(value.DisclosureClassification != 'Total') {
            transformedObject['Display'] = sortingItems[i];
          }
          // Count sequence
          builtEntries.push(transformedObject);
        });
        transformedStore.push(...builtEntries);
      });
      return transformedStore;
    } else { // Nothing was transformed return as is
      return cardData;
    }
  }

  configureFieldsPerCard( cardConfig, cardData, decimalPrecision: number ): CardConfig[] {
    const fieldConfigs = [];

    cardConfig?.map( (card, i) => {// todo: refactor, this should be programmatically configured
      // The array corresponds to the order coming from the API in the CardJSONSchema field
      const fieldConfig:CardConfig[] = JSON.parse(card.CardJSONSchema);
      switch(card.Title){ // todo: rework or fix cardConfig values to prevent this
        case "IFRS 16 Annual Disclosures Lease Counts":
          fieldConfig.splice(2,1);
          break;
        case "IFRS 16 Annual Disclosures Assets and Liabilities Balance":
          fieldConfig.splice(3,1);
          break;
      }
      fieldConfig[0].sortingMethod = () => rowSort(undefined, undefined, card.sortingOrder);
      fieldConfig[1].sortingMethod =  () => rowSort(undefined, undefined, card.sortingOrder);
      fieldConfig[fieldConfig.length - 1].format = {
        type: cardData[i]?.format?.type ?? 'fixedPoint',
        precision: decimalPrecision ?? 2,
      };
      fieldConfig[fieldConfig.length - 1].calculateSummaryValue = card.calculateSummaryValue;
      fieldConfig[fieldConfig.length - 1].calculateCustomSummary = card.calculateCustomSummary;
      fieldConfigs.push(fieldConfig);
    });

    return fieldConfigs;
  }

  ngOnDestroy(): void {
    if(this.observableList$){
      this.observableList$.unsubscribe();
    }
  }

}