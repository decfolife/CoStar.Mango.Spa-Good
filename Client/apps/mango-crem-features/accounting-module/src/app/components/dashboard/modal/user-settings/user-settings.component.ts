import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userSettings } from '@accounting-dashboard/shared/models';

@Component({
  selector: 'mango-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  @Output() changeSettingsEvent = new EventEmitter<any>();
  @Output() updateMetricDetailEvent = new EventEmitter<any>();

  metrics: any[];
  cardUserSettingsData: userSettings[] = []
  public DialogData: any;
  public modalTitle: string = 'Accounting Dashboard Settings';
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

  constructor(
    public dialogRef: MatDialogRef<UserSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modalTitle = data && data.modalTitle ? data.modalTitle + ' Settings' : 'Accounting Dashboard Settings';
  }

  ngOnInit(): void {}

}