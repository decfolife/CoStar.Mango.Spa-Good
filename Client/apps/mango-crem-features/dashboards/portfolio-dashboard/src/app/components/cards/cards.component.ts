import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxChartComponent } from 'devextreme-angular/ui/chart';
import { Subject, Subscription } from 'rxjs';
import { CardDetails, userSettings } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { PortfolioDashboardService } from '../../services/portfolio-dashboard.service';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [],
})
export class CardsComponent implements OnInit, OnDestroy {
  data: Subject<CardDetails>;
  @Input() cards: CardDetails[];
  @Input() displayFinanceCard: boolean = false;

  constructor(private portfolioDashboardService: PortfolioDashboardService,
    private portfolioDataService: PortfolioDataService) { }

  subs: Subscription[] = []
  ngOnInit() {
  }

  //This function is necessary because the cards component cardservice needs to call the sendFilterString function 
  //instead of the index component cardservice instance because the cardservice in the cards component has the observers
  //tied to it that triggers the event to refresh the cards.
  sendFilterString(filters: string) {
    this.portfolioDataService.sendFilterString(filters);
  }


  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    const userSettingsData: userSettings[] = [];

    //**  Once the card is dropped, the DashboardUserSettings table is updated with the order. */
    //**  When the user logins, the order from DashboardUserSettings table is selected, if the table is empty, */
    //**  the default order is selected. */

    this.cards.forEach((card, index) => {
      userSettingsData[index] = this.portfolioDataService.createUserSettingRec(card, index);
    })

    return this.subs.push(this.portfolioDashboardService.postUserSettings(userSettingsData).subscribe(
      (returnData: any) => (console.log("Returned results after card dragNDrop: ", returnData)),
      (error: any) => console.log("Error occurred updating userSettings: ", error)
    ));

  }


  portfolioRowClick(e: any) {
    if (e.rowType === 'group' || e.event.target.localName == 'crem-button') {
      return;
    }

    const urlLink = this.portfolioDataService.findUrl(e.data[e.objectIdField], e.data.objectTypeID, e.data.objectTypeTypeID)
    document.location.href = urlLink;
  }

  public getCards() {
    if (this.cards) {
      return this.cards.filter(card => card.isActive == true);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
