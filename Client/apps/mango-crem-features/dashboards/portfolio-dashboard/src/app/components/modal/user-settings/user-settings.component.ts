/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  Inject,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDetails, FilterDetail, userSettings } from '../../../models';
import { PortfolioDashboardService } from '../../../services/portfolio-dashboard.service';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  @Output() changeSettingsEvent = new EventEmitter<any>();
  @Output() updateMetricDetailEvent = new EventEmitter<any>();

  filters: FilterDetail[];
  cards: CardDetails[];
  metrics: any[];
  cardUserSettingsData: userSettings[] = [];
  public DialogData: any;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public modalTitle: string = 'Portfolio Dashboard Settings';
  public closeButton = true;
  public secondaryFooterButtonText = 'Close';
  public modalId = 'userSettings';
  public userSettingsData: userSettings[] = [];
  public filtersDisplay: any[] = [];
  public metricsDisplay: any[] = [];
  public cardsDisplay: any[] = [];
  public currencyData: any;
  public uomData: any;
  public currUomRetrieved: boolean = false;
  public cardOrderChanged: boolean = false;
  selectedUnitOfMeasure: string;
  selectedCurrency: string;
  userId: number;
  exchangeRateId: number;
  unitOfMeasureId: number;
  schemaMetrics: any[];
  subs: Subscription[] = [];
  constructor(
    private portfolioDataService: PortfolioDataService,
    private portfolioDashboardService: PortfolioDashboardService,
    public dialogRef: MatDialogRef<UserSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.filters = this.data.filters;
    this.cards = this.data.cards;
    this.metrics = this.data.metrics;
    this.userId = this.data.userId;
    this.exchangeRateId = this.data.exchangeRateId;
    this.unitOfMeasureId = this.data.unitOfMeasureId;
    this.selectedUnitOfMeasure = String(this.unitOfMeasureId);
    this.selectedCurrency = String(this.exchangeRateId);
    if (this.filters) {
      this.filtersDisplay = this.sorted(this.filters.map(this.extract));
    }
    if (this.metrics) {
      this.metricsDisplay = this.sorted(this.metrics.map(this.extract));
    }
    if (this.cards) {
      this.cardsDisplay = this.sorted(this.cards.map(this.extract));
    }
    this.populateUOMAndCurrency();
    this.getStoragePreferences();
  }

  extract(element: any) {
    let subObj: {};
    if (element.placeHolderText) {
      subObj = {
        titleText: element.placeHolderText,
        isActive: element.isActive,
        elementId: element.elementId,
        elementTypeId: element.elementTypeId,
        elementTypeName: element.id,
      };
    } else if (element.elementType) {
      subObj = {
        titleText: element.title,
        isActive: element.isActive,
        elementId: element.id,
        elementTypeId: element.elementType.id,
        elementTypeName: element.elementType.elementTypeName,
      };
    } else {
      subObj = {
        titleText: element.title,
        isActive: element.isActive,
        elementId: element.elementId,
        elementTypeId: element.elementTypeId,
        elementTypeName: element.id,
      };
    }
    return subObj;
  }

  sorted(e: any) {
    return e.sort((a, b) => a.titleText.localeCompare(b.titleText));
  }

  toggleChangeEvent(event, currElement: any, elements: any) {
    let elementIndex;

    if (elements[0].elementType) {
      elementIndex = elements.findIndex(
        (e) =>
          currElement.elementId == e.id &&
          currElement.elementTypeId == e.elementType.id
      );
    } else {
      elementIndex = elements.findIndex(
        (e) =>
          currElement.elementId == e.elementId &&
          currElement.elementTypeId == e.elementTypeId
      );
    }

    let element = elements[elementIndex];
    element.isActive = currElement.isActive;
    const userSettingsData: userSettings[] = [];
    userSettingsData.push(
      this.portfolioDataService.createUserSettingRec(
        element,
        element.elementOrder
      )
    );

    if (
      element.isActive &&
      (element.dataSource === null || element.dataSource === undefined)
    ) {
      if (currElement.elementTypeName.endsWith('_filter'))
        //We only have to subscribe to the observable because we set the datasource of the element detail in the function
        this.subs.push(
          this.portfolioDataService.getDataForFilterDetail(element).subscribe()
        );
      else if (currElement.elementTypeName.endsWith('_metric'))
        this.updateMetricDetailEvent.emit(element);
    }

    return this.subs.push(
      this.portfolioDashboardService
        .postUserSettings(userSettingsData)
        .subscribe(
          // (returnData: any) => (console.log("Returned results after User Settings Change: ", returnData)),
          (returnData: any) => returnData,
          (error: any) =>
            console.log('Error occurred updating userSettings: ', error)
        )
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    this.cardOrderChanged = true;
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    this.cardUserSettingsData = [];

    this.cards.forEach((card, index) => {
      this.cardUserSettingsData[index] =
        this.portfolioDataService.createUserSettingRec(card, index);
    });
  }

  populateUOMAndCurrency() {
    this.currUomRetrieved = false;
    this.subs.push(
      this.portfolioDashboardService.getGetUOMAndCurrency().subscribe(
        (res: any) => {
          if (res.success) {
            this.currencyData = res.data.currencyData.map((currency) => {
              return {
                exchangeRateID: currency.exchangeRateID,
                targetCurrency: currency.targetCurrency,
                targetCurrencyDesc: `${currency.targetCurrencyDesc} (${currency.targetCurrency})`,
              };
            });

            this.uomData = res.data.uomData;
            this.currUomRetrieved = true;
          }
        },
        (error: any) =>
          console.log(
            'Error occurred getting Currency and Unit of Measure Data: ',
            error
          ),
        () => {}
      )
    );
  }

  getStoragePreferences() {
    let currency = sessionStorage.getItem(
      `PortfolioDashboardCurrency_${this.userId}`
    );
    let unitOfMeasure = sessionStorage.getItem(
      `PortfolioDashboardUOM_${this.userId}`
    );

    if (currency !== undefined && currency !== null && currency !== '') {
      this.exchangeRateId = Number(currency);
    }

    if (
      unitOfMeasure !== undefined &&
      unitOfMeasure !== null &&
      unitOfMeasure !== ''
    ) {
      this.unitOfMeasureId = Number(unitOfMeasure);
    }

    this.portfolioDataService.userId = this.userId;
    this.portfolioDataService.exchangeRateId = this.exchangeRateId;
    this.portfolioDataService.unitOfMeasureId = this.unitOfMeasureId;
  }

  currencySelected(e, id) {
    // console.log(e);
    this.selectedCurrency = e[0].exchangeRateID;
  }

  unitOfMeasureSelected(e, id) {
    // console.log(e);
    this.selectedUnitOfMeasure = e[0].uomid;
  }

  applySettings() {
    if (this.cardOrderChanged) {
      return this.subs.push(
        this.portfolioDashboardService
          .postUserSettings(this.cardUserSettingsData)
          .subscribe(
            (returnData: any) =>
              console.log(
                'Returned results after card dragNDrop: ',
                returnData
              ),
            (error: any) =>
              console.log('Error occurred updating userSettings: ', error)
          )
      );
    }

    sessionStorage.setItem(
      `PortfolioDashboardCurrency_${this.userId}`,
      this.selectedCurrency
    );
    sessionStorage.setItem(
      `PortfolioDashboardUOM_${this.userId}`,
      this.selectedUnitOfMeasure
    );
    this.portfolioDataService.exchangeRateId = Number(this.selectedCurrency);
    this.portfolioDataService.unitOfMeasureId = Number(
      this.selectedUnitOfMeasure
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
