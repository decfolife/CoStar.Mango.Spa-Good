/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CardDetails, FilterDetail, userSettings } from '../../../models';
import { DashboardService } from '../../../services/dashboard.service';
import { CardsService } from '../../../services/cards.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  @Output() changeSettingsEvent = new EventEmitter<any>();
  @Output() updateMetricDetailEvent = new EventEmitter<any>();

  filters: FilterDetail[];
  cards: CardDetails[];
  metrics: any[];
  objectType: string;
  public DialogData: any;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public modalTitle: string = 'Projects Dashboard Settings';
  public closeButton = true;
  public secondaryFooterButtonText = 'Close';
  public modalId = 'userSettings';
  public userSettingsData: userSettings[] = [];
  public cardUserSettingsData: userSettings[] = []
  public filtersDisplay: any[] = [];
  public metricsDisplay: any[] = [];
  public cardsDisplay: any[] = [];
  public cardOrderChanged: boolean = false;

  subs: Subscription[] = []
  constructor(
    private dashboardService: DashboardService,
    private cardsService: CardsService,
    public dialogRef: MatDialogRef<UserSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.filters = this.data.filters;
    this.cards = this.data.cards;
    this.metrics = this.data.metrics;
    this.objectType = this.data.objectType;
    this.modalTitle = this.objectType + 's Dashboard Settings';
    this.filtersDisplay = this.sorted(this.filters.map(this.extract));
    this.metricsDisplay = this.sorted(this.metrics.map(this.extract));
    this.cardsDisplay = this.sorted(this.cards.map(this.extract));
  }


  extract(element: any) {
    let subObj: {}
    if (element.placeHolderText) {
      subObj = {
        "titleText": element.placeHolderText,
        "isActive": element.isActive,
        "elementId": element.elementId,
        "elementTypeId": element.elementTypeId,
        "elementTypeName": element.id
      }
    } else if (element.elementType) {
      subObj = {
        "titleText": element.title,
        "isActive": element.isActive,
        "elementId": element.id,
        "elementTypeId": element.elementType.id,
        "elementTypeName": element.elementType.elementTypeName
      }
    }
    else {
      subObj = {
        "titleText": element.title,
        "isActive": element.isActive,
        "elementId": element.elementId,
        "elementTypeId": element.elementTypeId,
        "elementTypeName": element.id
      }
    }
    return subObj;
  }

  sorted(e: any) {
    return e.sort((a, b) => a.titleText.localeCompare(b.titleText));
  }

  toggleChangeEvent(event, currElement: any, elements: any) {
    let elementIndex;

    if (elements[0].elementType) {
      elementIndex = elements.findIndex((e) => ((currElement.elementId == e.id) && (currElement.elementTypeId == e.elementType.id)));
    } else {
      elementIndex = elements.findIndex((e) => ((currElement.elementId == e.elementId) && (currElement.elementTypeId == e.elementTypeId)));
    }

    let element = elements[elementIndex];
    element.isActive = currElement.isActive;
    const userSettingsData: userSettings[] = [];
    userSettingsData.push(this.cardsService.createUserSettingRec(element, element.elementOrder));

    if (element.isActive && (element.dataSource === null || element.dataSource === undefined)) {
      if (currElement.elementTypeName.endsWith("_filter"))
        //We only have to subscribe to the observable because we set the datasource of the element detail in the function
        this.subs.push(this.cardsService.getDataForFilterDetail(element).subscribe());
      else if (currElement.elementTypeName.endsWith("_metric"))
        this.updateMetricDetailEvent.emit(element);
    }

    return this.dashboardService.postUserSettings(userSettingsData).subscribe(
      // (returnData: any) => (console.log("Returned results after User Settings Change: ", returnData)),
      (returnData: any) => (returnData),
      (error: any) => console.log("Error occurred updating userSettings: ", error)
    );
  }

  drop(event: CdkDragDrop<string[]>) {

    this.cardOrderChanged = true;
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    this.cardUserSettingsData = [];

    this.cards.forEach((card, index) => {
      this.cardUserSettingsData[index] = this.cardsService.createUserSettingRec(card, index);
    })

  }

  applySettings() {
    if (this.cardOrderChanged) {
      return this.dashboardService.postUserSettings(this.cardUserSettingsData).subscribe(
        (returnData: any) => (console.log("Returned results after card dragNDrop: ", returnData)),
        (error: any) => console.log("Error occurred updating userSettings: ", error)
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
