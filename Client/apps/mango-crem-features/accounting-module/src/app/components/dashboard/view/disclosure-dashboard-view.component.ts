import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

import {
  CardConfig,
  CardRequest,
  Dropdown,
} from '@mango/data-models/lib-data-models';
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
  private gridDataSources: Array<any>;
  protected pivotDataSources: Array<PivotGridDataSource>;

  @Input() selectedView: number;
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
  _skeletonInstances: number;

  constructor(
    private inAppDisclosureService: InAppDisclosureService,
    private dashboardService: DashboardService
  ) {
    this.pivotDataSources = [];
  }

  ngOnInit() {
    if (!this.selectedView) {
      // Abort card loading if selectedView is missing
      this.dashboardService.showToast(
        'The disclosure view configuration is undefined',
        'error'
      );
      return;
    }
    this.updateCards();
  }

  updateCards(forceReload?: boolean) {
    const cardRequest: CardRequest = {
      dashboardId: this._getDashboardId(this.selectedView),
      selectedCurrency: this.selectedCurrency,
      selectedSegment: this.selectedSegment,
      reportingYear: this.reportingYear,
    };

    const dashboardView = this.inAppDisclosureService
      .onLoad(cardRequest, forceReload, false)
      .pipe(switchMap(() => this.inAppDisclosureService.DashboardViewData$))
      .subscribe((result) => {
        this.gridDataSources = result.gridDataSources;
        this.pivotDataSources = result.pivotDataSources;
        this.cardFieldConfigs = result.cardFieldConfigs;
        this.decimalPrecision = result.decimalPrecision;
        this.localCardConfig = result.localCardConfig;
      });

    this._subs$.push(
      this.inAppDisclosureService.IsLoading$.subscribe(
        (isLoading) => (this.isLoading = isLoading)
      ),
      this.inAppDisclosureService.Skeletons$.subscribe(
        (skeletons) => (this._skeletonInstances = skeletons)
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
    // TODO: Update index to reorder, currently order is not being saved
  }

  // temporary solution: Selected view should correspond w/ dashboardId
  // this translate the two conventions while selectedView is transformed into dashboardId
  private _getDashboardId(selectedView: number): number {
    let dashboardId;
    switch (selectedView) {
      case 2: {
        dashboardId = 4;
        break;
      }
      case 3: {
        dashboardId = 5;
        break;
      }
      case 4: {
        dashboardId = 6;
        break;
      }
      case 5: {
        dashboardId = 7;
        break;
      }
    }
    return dashboardId;
  }

  resetCard(cardToReset: CardConfig) {
    this.inAppDisclosureService.resetCard(cardToReset);
  }

  saveCard(newCardConfig: CardConfig) {
    this.inAppDisclosureService.saveCard(newCardConfig, this.selectedView);
  }

  ngOnDestroy(): void {
    this.cancelAllRequests();
  }

  /**
   * Destroys all active subscriptions
   *
   * @return {*}
   * @memberof DashboardWrapperComponent
   */
  public cancelAllRequests(): void {
    this._subs$.forEach((s) => s.unsubscribe());
    this._subs$ = [];
  }
}
