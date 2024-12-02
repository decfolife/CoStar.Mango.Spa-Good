import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ButtonModule,
  CardModule,
  CremToastService,
} from '@mango/ui-shared/lib-ui-elements';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { AddEditScheduleService } from '@accounting-summary/services/add-edit-schedule.service';
import { AddEventFormService } from '@accounting-summary/services/add-event-form.service';
import { SchedulePaymentsGridColumnsService } from '@accounting-summary/services/schedule-payments-grid-columns.service';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { DevExtremeModule, DxDataGridComponent } from 'devextreme-angular';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { SchedulePayment } from '@accounting-summary/models/schedule-payment-model';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { RemeasureType } from '@accounting-summary/enums/remeasure-type.enum';
import { ToastState } from '@mango/data-models/lib-data-models';
import { ScheduleTransactionsPopupComponent } from './schedule-transactions-popup/schedule-transactions-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEditOtherChargeModalComponent } from '../add-edit-other-charge-modal/add-edit-other-charge-modal.component';
import { SelectedPayments } from '@accounting-summary/models/interfaces/selected-payments.interfaces';

@Component({
  selector: 'mango-payments-grid',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DevExtremeModule,
    ScheduleTransactionsPopupComponent,
  ],
  templateUrl: './payments-grid.component.html',
  styleUrls: ['./payments-grid.component.scss'],
})
export class PaymentsGridComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent, { static: false })
  schedulePaymentsGrid!: DxDataGridComponent;

  componentName = 'schedule-payments';
  title: string;
  subtitle =
    'Undiscounted Amount: 0 | Transaction Amount: 0 | Option Amount: 0 | Other Charges: 0';
  schedulePaymentsData: SchedulePayment[];
  isEuroDateFormat = false;
  dateFormat = 'MM/dd/yyyy';
  scheduelPaymentsGridColumns: any;
  directCostAmount: number;
  undiscountedAmount: number;
  transactionAmount: number;
  optionCharges: number;
  otherCharges: number;
  terminationFee: number;
  /**
   * paymentAmounts is the aggregation of undiscountedAmount, transactionAmount, transactionAmount
   * and other charges, to facilitate passing multiple values.
   * @type {{[key: string]: any}}
   * @memberof PaymentsGridComponent
   */
  paymentAmounts: { [key: string]: any };
  scheduledPaymentGridData: any;
  schedulePayments: SchedulePayment;
  showScheduleTransaction: boolean;
  isPaymentsGridLoading: boolean;

  classificationID: number;
  isIncome: boolean;
  scheduleCurrencyID: number;
  leaseRecognitionScheduleID: number;
  copiedFromScheduleID: number;
  includeFromFirst: boolean;
  fromDate: string;
  toDate: string;
  selectedPayments: SelectedPayments[];
  amortizationProfile: number;
  overrideAmortizationProfile: boolean;
  pageMode: string;
  measureEvent: RemeasureType;
  glAccountIDsCSV: any;
  previousState: any = {};
  localCurrency: string;
  localCurrencyDecimalPrecision: number;
  manualAmortizationProfileName: string;

  private commonDropdownsData: any;
  private subscription$ = new Subject<void>();
  private subs: Subscription[] = [];

  constructor(
    public accountingSummaryService: AccountingSummaryService,
    private addEditScheduleService: AddEditScheduleService,
    private addEventFormService: AddEventFormService,
    private schedulePaymentsGridColumnsService: SchedulePaymentsGridColumnsService,
    private dialog: MatDialog,
    private formattingService: FormattingService,
    private toastService: CremToastService
  ) {}

  ngOnInit(): void {
    this.isPaymentsGridLoading = true;
    this.getSelectedPayments();
    combineLatest([
      this.addEventFormService.scheduleDetailsFormData$,
      this.addEventFormService.financialFormData$,
      this.addEventFormService.commonDropdownsData$,
    ])
      .pipe(takeUntil(this.subscription$), debounceTime(600))
      .subscribe(([scheduleDetails, financialData, commonDropdownsData]) => {
        if (scheduleDetails && financialData) {
          this.processScheduleDetails(scheduleDetails);
          this.processFinancialData(financialData);
          this.title = this.generateTitle(financialData.localCurrencyName);
          this.localCurrency = financialData.localCurrencyName;
          this.reloadPaymentsOnChange();
        }

        if (commonDropdownsData) {
          this.commonDropdownsData = commonDropdownsData;
        }
      });
  }

  reloadPaymentsOnChange() {
    const currentState = {
      classificationID: this.classificationID,
      isIncome: this.isIncome,
      scheduleCurrencyID: this.scheduleCurrencyID,
      includeFromFirst: this.includeFromFirst,
      fromDate: this.fromDate,
      toDate: this.toDate,
      amortizationProfile: this.amortizationProfile,
      overrideAmortizationProfile: this.overrideAmortizationProfile,
    };

    const hasChanged = Object.keys(currentState).some(
      (key) => currentState[key] !== this.previousState[key]
    );

    if (hasChanged) {
      this.previousState = { ...currentState };
      this.getSchedulePayments();
    }
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
    this.schedulePaymentsGrid.instance.option('dataSource', null);
  }

  private processScheduleDetails(scheduleDetails: any): void {
    const {
      accountingEventBeginDate,
      accountingEventEndDate,
      classificationId,
      notFirstDayOfTheMonth,
    } = scheduleDetails;
    this.includeFromFirst = notFirstDayOfTheMonth ?? false;
    this.fromDate =
      this.addEditScheduleService.toShortDateString(accountingEventBeginDate) ||
      null;
    this.toDate =
      this.addEditScheduleService.toShortDateString(accountingEventEndDate) ||
      null;
    this.classificationID = Array.isArray(classificationId)
      ? classificationId[0]
      : classificationId;
  }

  private processFinancialData(financialData: any): void {
    const {
      financialFormData,
      leaseRecognitionScheduleID,
      copiedFromScheduleID,
      useDateEU,
      pageMode,
      measureEvent,
      glAccountIDsCSV,
      localCurrencyDecimalPrecision,
    } = financialData;
    const {
      chargeType,
      localCurrency,
      amortizationProfile,
      overrideAmortizationProfile,
      manualAmortizationProfileName,
    } = financialFormData ?? {};

    this.isIncome = chargeType !== 'Expense';
    this.scheduleCurrencyID = Array.isArray(localCurrency)
      ? localCurrency[0]
      : localCurrency;
    this.isEuroDateFormat = useDateEU === 'dd.MM.yyyy' ? true : false;
    this.pageMode = pageMode;
    this.measureEvent = this.mapStringToRemeasureType(
      measureEvent ?? 'Initial'
    );
    this.amortizationProfile = amortizationProfile;
    this.overrideAmortizationProfile = overrideAmortizationProfile || false;
    this.glAccountIDsCSV = glAccountIDsCSV;
    this.manualAmortizationProfileName = manualAmortizationProfileName;
    this.localCurrencyDecimalPrecision = localCurrencyDecimalPrecision;
    if (this.amortizationProfile) {
      this.glAccountIDsCSV = this.glAccountIDsCSV.find(
        (profile) => profile.profileID === this.amortizationProfile
      );
    }

    if (this.pageMode === 'Add Event') {
      // Clear both IDs for 'Add Event' mode
      this.copiedFromScheduleID = null;
      this.leaseRecognitionScheduleID = null;
    } else if (this.pageMode === 'Edit Event') {
      // For 'Edit Event', set both IDs or just one based on measure event
      this.leaseRecognitionScheduleID = leaseRecognitionScheduleID;
      this.copiedFromScheduleID =
        this.measureEvent === 0 ? null : copiedFromScheduleID;
    } else if (this.pageMode === 'Remeasure Event') {
      // For 'Remeasure' with non-initial measure event
      this.leaseRecognitionScheduleID = null;
      this.copiedFromScheduleID = leaseRecognitionScheduleID;
    }
  }

  private generateTitle(localCurrencyName?: string): string {
    return `Payments${localCurrencyName ? ` (${localCurrencyName})` : ''}`;
  }

  private findMinAndMaxDateOptionFromPaymentCharges() {
    let dates = [];

    this.schedulePaymentsData.forEach((element) => {
      if (element.paymentEventSource === 'Transaction') {
        if (
          dates.indexOf(element.eventBeginDate) === -1 &&
          element.eventBeginDate !== null &&
          element.eventBeginDate !== undefined
        ) {
          dates.push(new Date(element.eventBeginDate));
        }
        if (
          dates.indexOf(element.eventEndDate) === -1 &&
          element.eventEndDate !== null &&
          element.eventEndDate !== undefined
        ) {
          dates.push(new Date(element.eventEndDate));
        }
      }
    });

    if (dates.length > 0) {
      dates.sort((a, b) => a.getTime() - b.getTime());
      // Earliest Payment Begin Date
      const minDateOption = dates[0].toLocaleDateString('en-US');

      // Max Payment End Date
      const maxDateOption = dates[dates.length - 1].toLocaleDateString('en-US');
      this.addEditScheduleService.chargeMinAndMaxDateOptionPopulated.next({
        minDateOption,
        maxDateOption,
      });
    }
  }

  mapStringToRemeasureType(value: string): RemeasureType {
    switch (value) {
      case 'Initial':
        return RemeasureType.Initial;
      case 'Renewal':
        return RemeasureType.Renewal;
      case 'Data Correction':
        return RemeasureType.DataCorrection;
      case 'Rent Review IFRS':
        return RemeasureType.RentReviewIFRS;
      case 'CPI Cumulative Cap Reached':
        return RemeasureType.CPICumulativeCapReached;
      case 'Other':
        return RemeasureType.Other;
      case 'Impairment':
        return RemeasureType.Impairment;
      case 'Partial Termination':
        return RemeasureType.PartialTermination;
      case 'Termination':
        return RemeasureType.Termination;
      case 'Full Termination':
        return RemeasureType.FullTermination;
      default:
        throw new Error(`Unknown measure event: ${value}`);
    }
  }

  addOtherCharges() {
    let openDialogRef: MatDialogRef<any, any>;
    openDialogRef = this.dialog.open(AddEditOtherChargeModalComponent, {
      height: 'auto',
      width: '550px',
      panelClass: 'addEditOtherChargeModal',
      data: {
        isEdit: false,
        remeasureType: this.measureEvent,
        dateFormat: this.dateFormat,
        eventBeginDate: this.fromDate,
        eventEndDate: this.toDate,
        leaseRecognitionScheduleID:
          this.pageMode === 'Remeasure Event'
            ? this.copiedFromScheduleID
            : this.leaseRecognitionScheduleID,
        scheduleCurrencyID: this.scheduleCurrencyID,
        commonDropdownsData: this.commonDropdownsData,
      },
      disableClose: true,
    });

    this.subs.push(
      openDialogRef
        .afterClosed()
        .pipe(filter((res) => !!res))
        .subscribe((saveRes) => {
          if (saveRes.chargeSaved) {
            if (saveRes.showSaveMsg) {
              this.toastService.show(
                'The other charge was saved successfully.',
                'Save Other Charge',
                ToastState.SUCCESS
              );
            }
            this.getSchedulePayments();
          }
        })
    );
  }

  editOtherCharges(data: any) {
    let editDialogRef: MatDialogRef<any, any>;
    this.accountingSummaryService
      .getOtherCharge(data.glEventID)
      .subscribe((response) => {
        editDialogRef = this.dialog.open(AddEditOtherChargeModalComponent, {
          height: 'auto',
          width: '550px',
          panelClass: 'addEditOtherChargeModal',
          data: {
            isEdit: true,
            remeasureType: this.measureEvent,
            dateFormat: this.dateFormat,
            eventBeginDate: this.fromDate,
            eventEndDate: this.toDate,
            leaseRecognitionScheduleID: this.leaseRecognitionScheduleID,
            scheduleCurrencyID: this.scheduleCurrencyID,
            commonDropdownsData: this.commonDropdownsData,
            otherCharge: response.data,
          },
          disableClose: true,
        });
        this.subs.push(
          editDialogRef
            .afterClosed()
            .pipe(filter((res) => !!res))
            .subscribe((saveRes) => {
              if (saveRes.chargeSaved || saveRes.chargeDeleted) {
                if (saveRes.showSaveMsg) {
                  this.toastService.show(
                    'The other charge was saved successfully.',
                    'Save Other Charge',
                    ToastState.SUCCESS
                  );
                }
                if (saveRes.showDeleteMsg) {
                  this.toastService.show(
                    'Delete charge successful.',
                    'SUCCESS',
                    ToastState.SUCCESS
                  );
                }
                this.getSchedulePayments();
              }
            })
        );
      });
  }

  onRowClick(event: any) {
    if (event.event.target.title === 'Edit') {
      this.editOtherCharges(event.data);
      return;
    }
    this.schedulePayments = event.data;
    this.scheduledPaymentGridData = {
      showScheduleTransaction: this.showScheduleTransaction,
      isEuroDateFormat: this.isEuroDateFormat,
      fromDate: this.fromDate ? this.parseDateString(this.fromDate) : null,
      toDate: this.toDate ? this.parseDateString(this.toDate) : null,
      includeFromFirst: this.includeFromFirst,
    };
  }

  parseDateString(dateString) {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day);
  }

  onPaymentGridContentReady(event: any) {
    const grid = this.schedulePaymentsGrid?.instance;
    const dataSource = grid?.getDataSource();
    if (!grid || !dataSource) return;

    const data = dataSource.items();
    const glAccountIDs = this.glAccountIDsCSV?.glAccountIDsCSV || [];
    const isReasonablyCertainOption =
      this.glAccountIDsCSV?.isReasonablyCertainOption || false;
    const isManualAmortizationProfile = this.amortizationProfile < 0;

    // Filter and map selected payments based on the amortization profile
    const selectedPayments = this.selectedPayments
      .filter(
        (item) =>
          item.classificationID === this.classificationID &&
          (isManualAmortizationProfile
            ? item.manualProfileName === this.manualAmortizationProfileName
            : item.amortizationProfileID === this.amortizationProfile)
      )
      .map((item) =>
        item.selectedGLEventIDList.split(',').map((entry) => {
          const [glAccountID, accountType] = entry.split('|');
          return { glAccountID, accountType };
        })
      )
      .reduce((acc, curr) => acc.concat(curr), []);

    const extractedData = selectedPayments.map(
      ({ glAccountID, accountType }) => ({ glAccountID, accountType })
    );
    grid.clearSelection();

    const glAccountIDsToSelect = data.filter((item) =>
      extractedData.some(
        (extracted) =>
          item.glEventID === +extracted.glAccountID &&
          item.paymentEventSource === extracted.accountType
      )
    );

    const selectAmortizationDefaultGLAccountIDs = data?.filter(
      (item) =>
        glAccountIDs.includes(item.glAccountID) &&
        item.glAccountID !== 0 &&
        !(item.paymentEventSource === 'Option' && !item.isReasonablyCertain) &&
        !(
          !isReasonablyCertainOption &&
          item.paymentEventSource === 'Option' &&
          item.isReasonablyCertain
        )
    );

    const isAmortizationProfileIncludeAll =
      this.amortizationProfile === 0 && glAccountIDs.length === 0;

    const isReasonablyCertain = data?.filter(
      (item) => item.isReasonablyCertain
    );

    const isEditOrRemeasure =
      this.pageMode === 'Edit Event' || this.pageMode === 'Remeasure Event';

    const selectAllPayments = data?.filter(
      (item) =>
        !(item.paymentEventSource === 'Option' && !item.isReasonablyCertain)
    );

    if (isEditOrRemeasure) {
      grid.selectRows(glAccountIDsToSelect, true);
    } else {
      if (isAmortizationProfileIncludeAll) {
        grid.selectRows(selectAllPayments, true);
      } else {
        grid.selectRows(
          (isManualAmortizationProfile && isReasonablyCertain) ||
            selectAmortizationDefaultGLAccountIDs,
          true
        );
      }
    }
    this.addEventFormService.setPaymentAmountsData(this.paymentAmounts);
  }

  onSelectionChange(event: any) {
    const selectedRows = event.selectedRowsData;
    this.directCostAmount = selectedRows
      .filter((row) => row.isDirectCost)
      .reduce((total, row) => total + (row.targetAmountInPeriod || 0), 0);

    const filteredRows = selectedRows.filter(
      (row) => !row.isDirectCost && !row.isTerminationFee
    );

    this.terminationFee = selectedRows
      .filter((row) => row.isTerminationFee)
      .reduce((total, row) => total + (row.targetAmountInPeriod || 0), 0);

    this.undiscountedAmount = filteredRows.reduce(
      (total, row) => total + (row.targetAmountInPeriod || 0),
      0
    );

    this.transactionAmount = filteredRows
      .filter((row) => row.paymentEventSource === 'Transaction')
      .reduce((total, row) => total + (row.targetAmountInPeriod || 0), 0);

    this.otherCharges = filteredRows
      .filter((row) => row.paymentEventSource === 'Other')
      .reduce((total, row) => total + (row.targetAmountInPeriod || 0), 0);

    this.optionCharges = filteredRows
      .filter((row) => row.paymentEventSource === 'Option')
      .reduce((total, row) => total + (row.targetAmountInPeriod || 0), 0);

    const selectedPaymentsArray = selectedRows.map((item) => ({
      glEventID: item.glEventID,
      paymentEventSource: item.paymentEventSource,
    }));

    this.paymentAmounts = {
      directCostAmount: this.directCostAmount,
      undiscountedAmount: this.undiscountedAmount,
      transactionAmount: this.transactionAmount,
      optionAmount: this.optionCharges,
      otherCharges: this.otherCharges,
      terminationFee: this.terminationFee,
      selectedPayments: selectedPaymentsArray,
    };
    this.addEventFormService.setPaymentAmountsData(this.paymentAmounts);
    this.subtitle = `Undiscounted Amount: ${this.formattingService.localFormat(
      this.undiscountedAmount,
      this.localCurrencyDecimalPrecision
    )}
      | Transaction Amount: ${this.formattingService.localFormat(
        this.transactionAmount,
        this.localCurrencyDecimalPrecision
      )}
      | Option Amount: ${this.formattingService.localFormat(
        this.optionCharges,
        this.localCurrencyDecimalPrecision
      )}
      | Other Charges: ${this.formattingService.localFormat(
        this.otherCharges,
        this.localCurrencyDecimalPrecision
      )}`;
  }

  onEditorPreparing(event: any): void {
    if (event.row && event.command === 'select') {
      const isDisabled =
        !(this.amortizationProfile < -1 && !this.overrideAmortizationProfile) &&
        !this.overrideAmortizationProfile;
      event.editorOptions.disabled = isDisabled;
    }

    if (
      (this.pageMode !== 'Add Event' &&
        this.measureEvent === 9 &&
        event?.row?.data?.isTerminationFee) ||
      event?.row?.data?.paymentEventSource === 'Other'
    ) {
      event.editorOptions.disabled = false;
    } else if (this.pageMode !== 'Add Event' && this.measureEvent === 9) {
      event.editorOptions.disabled = true;
    }

    const disableSelectAll =
      !(this.amortizationProfile < -1 && !this.overrideAmortizationProfile) &&
      !this.overrideAmortizationProfile;
    const gridInstance = this.schedulePaymentsGrid.instance;
    const headerCheckbox = gridInstance
      .element()
      .querySelector('.dx-header-row .dx-checkbox');

    if (headerCheckbox) {
      if (disableSelectAll) {
        headerCheckbox.setAttribute('aria-disabled', 'true');
        headerCheckbox.classList.add('dx-state-disabled');
      } else {
        headerCheckbox.removeAttribute('aria-disabled');
        headerCheckbox.classList.remove('dx-state-disabled');
      }
    }
  }

  setupPaymentsGrid() {
    this.dateFormat = this.isEuroDateFormat ? 'dd.MM.yyyy' : 'MM/dd/yyyy';
    this.scheduelPaymentsGridColumns =
      this.schedulePaymentsGridColumnsService.getSchedulePaymentColumns(
        this.schedulePaymentsData,
        this.dateFormat,
        this.localCurrency
      );
  }

  getSchedulePayments() {
    if ((this.classificationID ?? -1) >= 0) {
      this.addEditScheduleService
        .getSchedulePayment(
          this.classificationID,
          this.isIncome,
          this.scheduleCurrencyID,
          this.leaseRecognitionScheduleID,
          this.copiedFromScheduleID,
          this.measureEvent,
          this.includeFromFirst,
          this.fromDate,
          this.toDate
        )
        .pipe(takeUntil(this.subscription$))
        .subscribe((response: any) => {
          if (response && response.success) {
            this.schedulePaymentsData = response.data;
            this.setupPaymentsGrid();
            this.findMinAndMaxDateOptionFromPaymentCharges();
          } else {
            this.toastService.show(
              response.clientErrorMessage,
              'Error',
              ToastState.ERROR
            );
          }

          setTimeout(() => {
            this.isPaymentsGridLoading = false;
          }, 100);
        });
    }
  }

  getSelectedPayments() {
    this.addEditScheduleService
      .getSelectedPayments()
      .pipe(takeUntil(this.subscription$))
      .subscribe((response: any) => {
        if (response && response.success) {
          this.selectedPayments = response.data;
        } else {
          this.toastService.show(
            response.clientErrorMessage,
            'Error',
            ToastState.ERROR
          );
        }
      });
  }
}
