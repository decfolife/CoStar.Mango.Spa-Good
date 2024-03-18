import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Dropdown,
  Milestone,
  SelectedFilter,
} from '@mango/data-models/lib-data-models';
import { HeroMetricsContainerComponent } from '@mango/ui-shared/lib-ui-shared';
import { CardDetails, FilterDetail, MilestoneCardDetails, UserSelectedFilters } from '../../models';
import { CardsService } from '../../services/cards.service';
import { DashboardService } from '../../services/dashboard.service';
import { CardsComponent } from '../cards/cards.component';
import { UserSettingsComponent } from '../modal/user-settings/user-settings.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-project-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnInit {
  @Input() userId: number;
  showAddButton: boolean;
  isVisible: boolean;
  cachingEnabled = false;
  public filtersLoadingDone: boolean = false;
  public metricsLoadingDone: boolean = false;
  public cardsLoadingDone: boolean = false;
  public filtersAvailable: boolean = true;
  public metricsAvailable: boolean = false;
  public cardsAvailable: boolean = true;
  public filterString: string = null;
  public schemaMetrics: any;
  metrics: any[];
  search: string;
  selections: SelectedFilter[] = [];
  cards: CardDetails[];
  chips: Milestone[];
  checked = false;
  projectsMilestoneCard: MilestoneCardDetails;
  filterDetails: FilterDetail[];
  dashboardCardFiltersData: Dropdown[] = null;
  public objectType: string = "Project";
  public dashboardId: number = 1;
  @ViewChild(CardsComponent) cardsComponent: CardsComponent;
  @ViewChild(HeroMetricsContainerComponent) heroMetricsContainerComponent: HeroMetricsContainerComponent;
  public readonly objectTypeIds: number[] = [1];
  isDateEU: boolean = false;
  subs: Subscription[] = []
  constructor(
    private vcref: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private cardsService: CardsService,
    private dashboardService: DashboardService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.isVisible = true;

    this.doesUserHaveProjectAddRights();
    this.populateDashboardSchema();
    this.getUserPreferences();
    this.getObjectType();
  }
  toggleDates(e) {
    this.checked = e.checked;
  }

  doesUserHaveProjectAddRights() {
    this.dashboardService.DoesUserHaveProjectAddRights().subscribe(
      (result) => {
        this.showAddButton = result.data;
      }
    );
  }

  btnAddClick() {
    var Wizard = sessionStorage.getItem('AddProjectWizardSiteSetting');
  }

  populateDashboardSchema() {
    this.dashboardService.getDashboardByIdWithChildrenQuery(1).subscribe(
      (res: any) => {

        this.cachingEnabled = res.data.cachingEnabled;
        let filters = res.data.filters;
        let cards = res.data.cards;
        let metrics = res.data.metrics;
        let id = res.data.id;


        // Get user selected filters first. Then fetch filter and metric data.
        this.dashboardService.getUserFilters(this.dashboardId).subscribe(
          (userSelectedFiltersResult: any) => {
            if (userSelectedFiltersResult.data != null || userSelectedFiltersResult.data != undefined) {
              this.filterString = userSelectedFiltersResult.data.filterValues;
            }

            //************************** Filter Data ***************************/
            if (filters) {
              this.getFilterData(filters, this.filterString);
            } else {
              this.filtersAvailable = false;
              this.filtersLoadingDone = true;
            }

            //************************** Metric Data ***************************/
            if (metrics) {
              this.schemaMetrics = metrics;
              this.metricsAvailable = true;
            } else {
              this.metricsAvailable = false;
              this.metricsLoadingDone = true;
            }

            //************************** Cards Data ***************************/
            if (cards) {
              this.getCardFiltersandReadyCards(cards);
            }
            else {
              this.cardsAvailable = false;
              this.cardsLoadingDone = true;
            }

          },
          (error: any) => console.log("Error occurred getting User Filters Data: ", error),
          () => { }
        );
      },

      (error: any) => console.log("Error occurred getting schema data: ", error),
      () => { }
    );
  }

  public processUserSelectedFilters(userSelectedfilters) {
    if (userSelectedfilters == null || userSelectedfilters == undefined)
      return [];

    var selectedFiltersArr = userSelectedfilters.split('|');
    let userSelectedFilters = [];

    selectedFiltersArr.forEach(selectedFilter => {
      userSelectedFilters.push(selectedFilter);
    });

    return userSelectedFilters;
  }

  public saveUserFilters(userSelectedFilters: string) {
    let userSelectedFiltersDto: UserSelectedFilters = {
      dashboardId: this.dashboardId,
      filterValues: userSelectedFilters
    };

    this.dashboardService.saveUserFilters(userSelectedFiltersDto).subscribe(
      (res: any) => {

      },
      (error: any) => console.log("Error occurred getting User Filters Data: ", error),
      () => { }
    );

  }

  public getFilterData(filters, userSelectedFilterValues) {
    let userSelectedfiltersArr = this.processUserSelectedFilters(userSelectedFilterValues);

    // this.subs.push(this.cardsService.generateFilterDetailList(filters, userSelectedfiltersArr).subscribe(
    //   (data: any) => {
    //     if (data) { 
    //       this.filterDetails = data
    //     }
    //     else  { 
    //       this.filtersAvailable = false; 
    //     }
    //     this.filtersLoadingDone= true;
    //   }
    // )
    this.subs.push(this.cardsService.fetchAllProjectFilters(filters, userSelectedfiltersArr).subscribe(
      (data: any) => {
        if (data) {
          this.filterDetails = data
        }
        else {
          this.filtersAvailable = false;
        }
        this.filtersLoadingDone = true;
      }
    ))
  }

  public getCardFiltersandReadyCards(cards) {
    //this.cards =this.subs.push(this.cardsService. generateCardDetails(cards);

    this.subs.push(this.dashboardService.getCardFilters().subscribe(res => {
      if (res.data) {
        //this.dashboardCardFiltersData = res.data;

        this.dashboardCardFiltersData = [];
        res.data.forEach(cardFilter => {
          let dropdownData: Dropdown = {
            displayKey: cardFilter.display,
            valueKey: cardFilter.value,
          };
          this.dashboardCardFiltersData.push(dropdownData);
        });

        this.cards = this.cardsService.generateCardDetails(cards, this.dashboardCardFiltersData, this.filterString);
      }

      this.cardsLoadingDone = true;
    }));
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

  applyFilter() {
    this.cards.forEach(card => card.dispCard = false);
    this.metricsAvailable = false;
    const selectedFilters: string = this.createFilterString();
    this.cardsComponent.sendFilterString(selectedFilters);
    this.filterString = selectedFilters;
    this.metricsAvailable = true;

    this.saveUserFilters(selectedFilters);
    this.dashboardService.postCacheSettings(this.dashboardId).subscribe(
      (res: any) => {
        if (res.success) {

        }
      }, (error: any) => {
        console.log('Error occurred while clearing cache', error);
      }
    );

  }
  displaySettings() {
    let updateMetricDetailSubscription = null;

    const dialogRef = this.dialog.open(UserSettingsComponent, {
      width: '600px',
      height: '570px',
      panelClass: 'user-settings-dialog',
      data: { filters: this.filterDetails, metrics: this.schemaMetrics, cards: this.cards, objectType: this.objectType },
      disableClose: true
    });

    updateMetricDetailSubscription = dialogRef.componentInstance.updateMetricDetailEvent.subscribe((metric) => {
      this.heroMetricsContainerComponent.updateMetricInList(metric);
    });

    dialogRef.afterClosed().subscribe(result => {
      if (updateMetricDetailSubscription !== null)
        updateMetricDetailSubscription.unsubscribe();
    }
    );
  }

  getUserPreferences() {
    this.dashboardService.GetUserPreferences().subscribe(
      (res: any) => {
        if (res.success) {
          this.cardsService.setUserDateFormat(res.data.isDatesEU);
          this.isDateEU = res.data.isDatesEU;
        }
      }
    );
  }

  getObjectType() {
    this.dashboardService.getObjectTypeNames(this.objectTypeIds).subscribe(
      (res: any) => {
        this.objectType = res.data.find(t => t.objectTypeId === 1).objectTypeName;
      }
    );
  }

  clearCacheClicked() {
    this.dashboardService.postCacheSettings(this.dashboardId).subscribe(() => this.populateDashboardSchema);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
