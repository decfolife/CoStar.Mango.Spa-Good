import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { environment } from '../../../../../../../mango/src/environments/environment.local';
import { CardDetails, MilestoneCardDetails, userSettings } from '../../models';
import { CardsService } from '../../services/cards.service';
import { DashboardService } from '../../services/dashboard.service';
import { CardContentDirective } from './cardContent.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [ DashboardService, CardContentDirective],
})
export class CardsComponent implements OnInit {
  data: Subject<CardDetails>;
  @Input() cards: CardDetails[];
  @Input() projectMilestoneCard: MilestoneCardDetails;
  @Input() objectType: string;
  @ViewChildren("cardsList") cardsList: QueryList<ElementRef>;
  
  constructor(private cardsService: CardsService,
    private dashboardService: DashboardService,
    private router: Router,
    private dialog: MatDialog) {}

  ngOnInit() {}

  //This function is necessary because the cards component cardservice needs to call the sendFilterString function 
  //instead of the index component cardservice instance because the cardservice in the cards component has the observers
  //tied to it that triggers the event to refresh the cards.

  sendFilterString(filters: string) {
    this.cardsService.sendFilterString(filters);  //*** Does this ever work???? */
  }
  
  listSubscription: Subscription;
  activeCardElementId: number;

  ngAfterViewInit() {
    this.listSubscription = this.cardsList.changes.subscribe((_) => {
      this.setFocus();
    });
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
  }

  setFocus() {
    let cardIndex = this.cardsList.toArray().findIndex(item => item.nativeElement.cdkDropListData.card.elementId == this.activeCardElementId);
    
    var activeCardElement = this.cardsList.toArray()[cardIndex].nativeElement;
    activeCardElement.focus();
    activeCardElement.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  removeFocus() {
    if (this.cardsList && this.cardsList.length > 0) {
      this.cardsList.toArray().forEach((item, index) => {
          item.nativeElement.blur();
      });
    }
  }
    
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    const userSettingsData: userSettings[] = [];

    //**  Once the card is dropped, the DashboardUserSettings table is updated with the order. */
    //**  When the user logins, the order from DashboardUserSettings table is selected, if the table is empty, */
    //**  the default order is selected. */

    this.cards.forEach((card, index) => {
      userSettingsData[index] = this.cardsService.createUserSettingRec(card, index);
    })

    return this.dashboardService.postUserSettings(userSettingsData).subscribe(
      (returnData: any) => (console.log("Returned results after card dragNDrop: ", returnData)),
      (error: any) => console.log("Error occurred updating userSettings: ", error)
    );
  }

  //**  Enable the cards drag and drop accessible by keyboard and screen reader users */

  cardKeyDown(event: KeyboardEvent, cardid) {
    let card = this.cards.find(item => item.id == cardid);
    let currentIndex = this.cards.findIndex(item => item.id == cardid);
    let newIndex = currentIndex;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      if (currentIndex >= this.cards.length - 1) {
        return;
      }
      while (true) {
        if (this.cards[newIndex + 1].isActive == false) {
          newIndex += 1;
        }
        else {
          newIndex += 1;
          break;
        }
      }
      moveItemInArray(this.cards, currentIndex, newIndex);
      this.activeCardElementId = card.elementId;

      const userSettingsData: userSettings[] = [];
      this.cards.forEach((card, index) => {
      userSettingsData[index] = this.cardsService.createUserSettingRec(card, index);
    })

    return this.dashboardService.postUserSettings(userSettingsData).subscribe(
      (returnData: any) => (console.log("Returned results after card dragNDrop: ", returnData)),
      (error: any) => console.log("Error occurred updating userSettings: ", error)
    );
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      if (currentIndex == 0) {
        return;
      }
      while (true) {
        
        if (this.cards[newIndex - 1].isActive == false) {
          newIndex -= 1;
        }
        else {
          newIndex -= 1;
          break;
        }
      }
      moveItemInArray(this.cards, currentIndex, newIndex);
      this.activeCardElementId = card.elementId;
      const userSettingsData: userSettings[] = [];
      this.cards.forEach((card, index) => {
      userSettingsData[index] = this.cardsService.createUserSettingRec(card, index);
    })

    return this.dashboardService.postUserSettings(userSettingsData).subscribe(
      (returnData: any) => (console.log("Returned results after card dragNDrop: ", returnData)),
      (error: any) => console.log("Error occurred updating userSettings: ", error)
    );
    }

    if (event.code === "Enter" || event.code === "Space") {
      this.removeFocus();
    }

  }

  projectRowClick(e: any) {
    if (e.rowType === 'group' || e.event.target.localName == 'crem-button') {
      return;
    }

    if (environment.isRestful) {
      this.router.navigate(
        ['crem/forms/render-form'],
        {
          queryParams: { fid: 312, oid: e.data.transactionID ?? e.data.transactionId, otid: e.data.objectTypeId, ottid: e.data.objectTypeTypeId }
        });
    } else {
      const urlLink = `/Project/Tasks/View.asp?OID=${
        e.data.transactionID ?? e.data.transactionId
      }&OTID=${
        e.data.objectTypeId
      }&OTTID=${
        e.data.objectTypeTypeId
      }`;

      document.location.href = urlLink;
    }
  }

  public getCards() {
    if (this.cards) {
      return this.cards.filter(card => card.isActive == true);
    }
  }

}
