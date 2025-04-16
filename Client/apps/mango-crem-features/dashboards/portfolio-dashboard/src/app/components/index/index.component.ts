import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Dropdown, ToastState } from '@mango/data-models/lib-data-models';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { HeroMetricsContainerComponent } from '@mango/ui-shared/lib-ui-shared';

import { PortfolioDashboardService } from '../../services/portfolio-dashboard.service';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { UserSettingsComponent } from '../modal/user-settings/user-settings.component';
import { CardsComponent } from '../cards/cards.component';
import { UserSelectedFilters } from '../../models';
import { Subscription } from 'rxjs';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { map } from 'rxjs/operators';
import { CremToastService } from '@mango/ui-shared/lib-ui-elements';

declare var parent;

@Component({
  selector: 'mango-portfolio-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  dashboardId = 2;
  showAddButton = false;
  filterDetails: any;
  metrics: any;
  cards: any;
  schemaFilters: any;
  schemaMetrics: any;
  schemaCards: any;
  selections: any = [];
  portfolioObjects: any = [];
  addWizards: any = [];
  cachingEnabled = false;
  filtersLoadingDone = false;
  metricsLoadingDone = false;
  cardsLoadingDone = false;
  filtersAvailable = true;
  metricsAvailable = false;
  cardsAvailable = true;
  showFinanceCard = false;
  showEnterBill = false;
  filterString = '';
  monthsBackFilters: Dropdown[] = null;
  monthsForwardFilters: Dropdown[] = null;
  yearFilters: Dropdown[] = null;
  userId = 2;
  exchangeRateId = 13;
  unitOfMeasureId = 1;
  isDateEU = false as boolean;
  subs: Subscription[] = [];
  @ViewChild(CardsComponent)
  cardsComponent: CardsComponent;

  @ViewChild(HeroMetricsContainerComponent)
  heroMetricsContainerComponent: HeroMetricsContainerComponent;

  constructor(
    private portfolioDashboardService: PortfolioDashboardService,
    private portfolioDataService: PortfolioDataService,
    private dashboardService: DashboardService,
    private toastService: CremToastService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.populatePortfolioDashboardSchema();
    this.getUserPreferences();
    this.getModuleRights();
  }

  getUserPreferences() {
    this.subs.push(
      this.portfolioDashboardService.getUserPreferences().subscribe(
        (res: any) => {
          if (res.success) {
            this.userId = res.data.userId;
            this.exchangeRateId = res.data.currencyId;
            this.unitOfMeasureId = res.data.unitOfMeasureId;
            this.portfolioDataService.setUserDateFormat(res.data.isDatesEU);
            this.isDateEU = res.data.isDatesEU;
            if (this.unitOfMeasureId !== 1 && this.unitOfMeasureId !== 2) {
              this.unitOfMeasureId = 1;
            }
          }
        },
        (error: any) => {
          console.warn('Error occurred getting User Preferences Data: ', error);
          this.getStoragePreferences();
        },
        () => {
          this.getStoragePreferences();
        }
      )
    );
  }

  getStoragePreferences(): boolean {
    const currency = sessionStorage.getItem(
      `PortfolioDashboardCurrency_${this.userId}`
    );
    const unitOfMeasure = sessionStorage.getItem(
      `PortfolioDashboardUOM_${this.userId}`
    );

    if (
      currency === String(this.exchangeRateId) &&
      unitOfMeasure === String(this.unitOfMeasureId)
    ) {
      this.portfolioDataService.userId = this.userId;
      this.portfolioDataService.exchangeRateId = this.exchangeRateId;
      this.portfolioDataService.unitOfMeasureId = this.unitOfMeasureId;

      return false;
    }

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

    if (this.unitOfMeasureId !== 1 && this.unitOfMeasureId !== 2) {
      this.unitOfMeasureId = 1;
    }

    this.portfolioDataService.userId = this.userId;
    this.portfolioDataService.exchangeRateId = this.exchangeRateId;
    this.portfolioDataService.unitOfMeasureId = this.unitOfMeasureId;

    return true;
  }

  getModuleRights() {
    //** we are getting module rights only for below object types*/
    //** Building (OTID = 3)
    //** Lease (OTID = 4)
    //** Supplier (OTID = 175)
    //** Equipment Lease (OTID = 174)
    //** Premise/Store (OTID = 2)
    //** Financials (OTID = 182)
    let objectIds = [3, 4, 174, 175, 182];
    this.dashboardService
      .getClientPreference('HidePremise')
      .pipe(
        map((resp) => {
          if (resp.success) {
            if (resp.data == 0) {
              objectIds = [3, 4, 2, 174, 175, 182];
            }
          }
        })
      )
      .subscribe(
        () => {
          this.showFinanceCard = false;
          this.portfolioObjects = [];
          this.subs.push(
            this.portfolioDashboardService
              .getUserModuleRights(objectIds)
              .subscribe(
                (res: any) => {
                  if (res.success) {
                    //Set showFinanceCard value
                    const financeCardRightsArray = res.data.filter(
                      (r) => r.moduleId === 182
                    );
                    if (
                      financeCardRightsArray &&
                      financeCardRightsArray.length > 0
                    ) {
                      this.showFinanceCard =
                        financeCardRightsArray[0].hasAddRights !== null;
                    }
                    this.showEnterBill = this.showFinanceCard;

                    //The portfolioObjects should be set to the rest of the values in the array
                    this.portfolioObjects = res.data.filter(
                      (r) => r.moduleId !== 182
                    );
                    this.checkAddPrivilege();
                  }
                },
                (error: any) =>
                  this.displayMessage(
                    'Error occurred getting Portfolio User Module rights:' +
                      error,
                    true
                  )
              )
          );
        },
        (error: any) =>
          this.displayMessage(
            'Error occurred getting client preferences of premise visibility: ' +
              error,
            true
          ),
        () => {}
      );
  }

  checkAddPrivilege() {
    this.showAddButton = this.portfolioObjects.some(
      (value) => value.hasAddRights
    );

    if (this.showAddButton) {
      this.addWizards = this.portfolioObjects.filter(
        (value) => value.hasAddRights
      );
    }
  }

  populatePortfolioDashboardSchema() {
    this.subs.push(
      this.portfolioDashboardService
        .getPortfolioDashboardByIdWithChildrenQuery(this.dashboardId)
        .subscribe(
          (res: any) => {
            this.cachingEnabled = res.data.cachingEnabled;
            this.schemaFilters = res.data.filters;
            this.schemaCards = res.data.cards;
            this.schemaMetrics = res.data.metrics;

            // Get user selected filters first. Then fetch filter and metric data.
            this.subs.push(
              this.portfolioDashboardService
                .getUserFilters(this.dashboardId)
                .subscribe(
                  (userSelectedFiltersResult: any) => {
                    let userSelectedFilterValues = null;

                    if (userSelectedFiltersResult.data) {
                      userSelectedFilterValues =
                        userSelectedFiltersResult.data.filterValues;
                    }

                    //************************** Filter Data ***************************/
                    if (this.schemaFilters) {
                      this.getPortfolioFilterData(
                        this.schemaFilters,
                        userSelectedFilterValues
                      );
                    } else {
                      this.filtersAvailable = false;
                      this.filtersLoadingDone = true;
                    }

                    if (this.schemaCards) {
                      this.getCardFiltersandReadyCards(
                        this.schemaCards,
                        userSelectedFilterValues
                      );
                    } else {
                      this.cardsAvailable = false;
                      this.cardsLoadingDone = true;
                    }

                    //************************** Metric Data ***************************/
                    if (this.schemaMetrics) {
                      this.metricsAvailable = true;
                      this.getFilteredMetricsData(userSelectedFilterValues);
                    } else {
                      this.metricsAvailable = false;
                      this.metricsLoadingDone = true;
                    }
                  },
                  (error: any) =>
                    this.displayMessage(
                      'Error occurred getting User Filters Data:' + error,
                      true
                    )
                )
            );
          },
          (error: any) =>
            this.displayMessage(
              'Error occurred getting Portfolio Dashboards Schema data:' +
                error,
              true
            )
        )
    );
  }

  displayMessage(message: string, isError: boolean) {
    this.toastService.show(
      message,
      '',
      isError ? ToastState.ERROR : ToastState.SUCCESS,
      {
        position: 'bottom right',
        maxWidth: '350px',
      }
    );
  }

  public processUserSelectedFilters(userSelectedfilters) {
    if (!userSelectedfilters) {
      return [];
    }

    const selectedFiltersArr = userSelectedfilters.split('|');
    const userSelectedFilters = [];

    selectedFiltersArr.forEach((selectedFilter) => {
      userSelectedFilters.push(selectedFilter);
    });

    return userSelectedFilters;
  }

  public saveUserFilters(userSelectedFilters: string) {
    const userSelectedFiltersDto: UserSelectedFilters = {
      dashboardId: this.dashboardId,
      filterValues: userSelectedFilters,
    };

    this.subs.push(
      this.portfolioDashboardService
        .saveUserFilters(userSelectedFiltersDto)
        .subscribe()
    );
  }

  public getPortfolioFilterData(filters, userSelectedFilterValues) {
    const userSelectedfiltersArr = this.processUserSelectedFilters(
      userSelectedFilterValues
    );

    this.subs.push(
      this.portfolioDataService
        .fetchAllPortfolioFilters(filters, userSelectedfiltersArr)
        .subscribe((data: any) => {
          if (data) {
            this.filterDetails = data;
          } else {
            this.filtersAvailable = false;
          }

          this.filtersLoadingDone = true;
        })
    );
  }

  // NOTE - value 1-unitofmeasureid and 13-exchangerateid below should be replace with client setting values once available
  public getFilteredMetricsData(filterString: string) {
    this.filterString = filterString;
    this.metricsAvailable = true;
  }

  displaySettings() {
    let updateMetricDetailSubscription = null;

    const dialogRef = this.dialog.open(UserSettingsComponent, {
      width: '600px',
      height: '570px',
      minWidth: '320px',
      minHeight: '420px',
      panelClass: 'user-settings-dialog',
      data: {
        filters: this.filterDetails,
        metrics: this.schemaMetrics,
        cards: this.cards,
        userId: this.userId,
        exchangeRateId: this.exchangeRateId,
        unitOfMeasureId: this.unitOfMeasureId,
      },
      disableClose: true,
    });

    updateMetricDetailSubscription =
      dialogRef.componentInstance.updateMetricDetailEvent.subscribe(
        (metric) => {
          this.heroMetricsContainerComponent.updateMetricInList(metric);
        }
      );

    dialogRef.afterClosed().subscribe(() => {
      if (updateMetricDetailSubscription !== null) {
        updateMetricDetailSubscription.unsubscribe();
      }

      if (this.getStoragePreferences()) {
        this.applyFilter();
      }
    });
  }

  selected(e) {
    //Add selected filters to list if it does not exist or update it if it does exist
    const index = this.selections.findIndex(
      (sel) => sel.elementTypeName === e.elementTypeName
    );

    if (index < 0) {
      this.selections.push(e);
    } else {
      this.selections[index] = e;
    }
  }

  applyFilter() {
    this.metricsAvailable = false;
    this.cards.forEach((card) => (card.dispCard = false));

    const selectedFilters: string = this.createFilterString();

    this.cardsComponent.sendFilterString(selectedFilters);
    this.getFilteredMetricsData(selectedFilters);
    this.saveUserFilters(selectedFilters);
    this.subs.push(
      this.portfolioDashboardService
        .postCacheSettings(this.dashboardId)
        .subscribe(
          (res: any) => {
            if (res.success) {
            }
          },
          (error: any) => {
            console.log('Error occurred while clearing cache', error);
          }
        )
    );
  }

  createFilterString() {
    //create the filter string
    //ex: countryFilter=a!@!b!@!c!@!d|projectTypeFilter=w!@!x!@!y
    let filterParam = null;

    //if the dropdown is null that means the filter was selected then cleared so we do not include it
    const filtersWithValues = this.selections.filter(
      (sel) => sel.dropdown !== null
    );

    if (filtersWithValues.length > 0) {
      const filtersArray: string[] = [];

      //loop thru all the filters with values and add each filter and values string to the array
      filtersWithValues.forEach((sel) => {
        filtersArray.push(
          sel.elementTypeName +
            '=' +
            sel.dropdown.map((dd) => dd.valueKey).join('!@!')
        );
      });

      //add the pipe to seperate out each filter and values pair
      filterParam = filtersArray.join('|');
    }

    return filterParam;
  }

  public getCardFiltersandReadyCards(cards, userSelectedFilterValues) {
    this.subs.push(
      this.portfolioDashboardService
        .getPortfolioCardFilters()
        .subscribe((res) => {
          if (res !== null && res.data) {
            this.monthsBackFilters = [];

            res.data.monthsBackFilters.forEach((cardFilter) => {
              this.monthsBackFilters.push({
                displayKey: cardFilter.display,
                valueKey: cardFilter.value,
              });
            });

            this.monthsForwardFilters = [];

            res.data.monthsForwardFilters.forEach((cardFilter) => {
              this.monthsForwardFilters.push({
                displayKey: cardFilter.display,
                valueKey: cardFilter.value,
              });
            });

            this.yearFilters = [];

            res.data.yearFilters.forEach((cardFilter) => {
              this.yearFilters.push({
                displayKey: cardFilter.display,
                valueKey: cardFilter.value,
              });
            });

            this.cards = this.portfolioDataService.generateCardDetails(
              cards,
              this.monthsBackFilters,
              this.monthsForwardFilters,
              this.yearFilters,
              userSelectedFilterValues
            );
          }

          this.cardsLoadingDone = true;
        })
    );
  }

  enterBillClicked() {
    parent.modalBoxObject = parent.modalBox.openmodal(
      'AddExpense',
      'iframe',
      '/v06/Financials/EnterBill.aspx',
      'Enter A Bill'
    );
  }

  clearCacheClicked() {
    this.subs.push(
      this.portfolioDashboardService
        .postCacheSettings(this.dashboardId)
        .subscribe(() => this.populatePortfolioDashboardSchema())
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
