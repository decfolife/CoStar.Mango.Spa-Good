import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

import {
  CardConfig,
  DashboardConfig,
  Dropdown,
} from '@mango/data-models/lib-data-models';
import { UtilityService } from '@accounting-dashboard/services/utility.service';
import { DashboardService } from '@accounting-dashboard/services/dashboard.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-disclosure-dashboard-view',
  templateUrl: './disclosure-dashboard-view.component.html',
  styleUrls: ['./disclosure-dashboard-view.component.scss'],
})
export class MangoDisclosureViewComponent implements OnInit, OnDestroy {
  public isLoading = true as boolean;
  public decimalPrecision: number | null;

  private _subs$: Subscription[] = [];
  private localCardConfig: CardConfig[];
  protected pivotDataSources: Array<PivotGridDataSource>;

  @Input() viewConfiguration: DashboardConfig;
  @Input() selectedCurrency: string;
  @Input() selectedSegment: number;
  @Input() reportingYear: number;

  /**
   * cardFieldConfigs is the API field configuration used to setup rows, columns and data.
   * Is used to setup the grid.
   *
   * @private
   * @type {CardConfig[]}
   * @memberof MangoDisclosureViewComponent
   */
  cardFieldConfigs: CardConfig[];

  /**
   * Determine how many skeletons should show while loading cards
   *
   * @private
   * @type {number}
   * @memberof MangoDisclosureViewComponent
   */
  skeletonInstances: number;

  constructor(
    private inAppDisclosureService: InAppDisclosureService,
    private utilityService: UtilityService,
    private dashboardService: DashboardService
  ) {
    this.pivotDataSources = [];
  }

  ngOnInit() {
    // Abort if viewConfiguration is missing
    if (!this.viewConfiguration) {
      this.dashboardService.showToast(
        'The disclosure view configuration is undefined',
        'error'
      );
      return;
    }
    this.updateCards();
  }

  updateCards(forceReload?: boolean) {
    // Load Skeletons
    this.skeletonInstances =
      this.viewConfiguration.localCardConfig?.length ?? 2;

    const dashboardView = this.inAppDisclosureService
      .onLoad(
        {
          viewConfiguration: this.viewConfiguration,
          selectedCurrency: this.selectedCurrency,
          selectedSegment: this.selectedSegment,
          reportingYear: this.reportingYear,
        },
        forceReload,
        false
      )
      .pipe(switchMap(() => this.inAppDisclosureService.DashboardViewData$))
      .subscribe((result) => {
        this.pivotDataSources = result.pivotDataSources;
        this.cardFieldConfigs = result.cardFieldConfigs;
        this.decimalPrecision = result.decimalPrecision;
        this.localCardConfig = result.localCardConfig;
      });

    this._subs$.push(
      this.inAppDisclosureService.IsLoading$.subscribe(
        (isLoading) => (this.isLoading = isLoading)
      )
    );
    this._subs$.push(dashboardView);
  }

  public refreshCards() {
    this.inAppDisclosureService.cancelAllRequests();
    this.updateCards(true);
  }

  /**
   * Card's Filter Dropdown
   *
   * @param {Event} e
   * @param {*} config
   * @memberof MangoDisclosureViewComponent
   */
  onSelectedFilter(e: Dropdown, config?: CardConfig) {
    this.inAppDisclosureService.updateCard(e, config);
  }

  /**
   * Updates the order of the cards
   * todo: this is not using the BehaviorSubject
   *
   * @param {CdkDragDrop<string[]>} event
   * @memberof MangoDisclosureViewComponent
   */
  public cardMove(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.localCardConfig,
      event.previousIndex,
      event.currentIndex
    );
  }

  ngOnDestroy(): void {
    if (this._subs$) {
      this._subs$.forEach((sub) => sub.unsubscribe());
    }
  }
}
