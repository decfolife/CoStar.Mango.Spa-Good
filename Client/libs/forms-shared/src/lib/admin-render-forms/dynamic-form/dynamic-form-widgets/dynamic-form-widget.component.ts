import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';

import {
  ButtonModule,
  DropdownModule,
  LibUiElementsModule,
  ModalModule,
  SkeletonModule,
} from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { EMPTY, Observable, Subscription, of } from 'rxjs';
import { IFields, Widget } from '@forms/model/dynamic-forms.interface';
import {
  catchError,
  filter,
  switchMap,
  take,
  map,
  concatMap,
} from 'rxjs/operators';
import {
  DxDataGridComponent,
  DxDataGridTypes,
} from 'devextreme-angular/ui/data-grid';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { AddLeaseModalComponent } from 'libs/ui-shared/lib-ui-shared/src/lib/add-lease-modal/add-lease-modal.component';
import { AddFormWizardComponent } from '@micro-components/form-wizard/modal/add-form-wizard/add-form-wizard.component';
import { AddEquipmentModalComponent } from 'libs/ui-shared/lib-ui-shared/src/lib/add-equipment-modal/add-equipment-modal.component';
import { AddPremiseModalComponent } from 'libs/ui-shared/lib-ui-shared/src/lib/add-premise-modal/add-premise-modal.component';
import { DynamicPopupComponent } from '@forms/modals/dynamic-popup/dynamic-popup.component';
import { DynamicFormsService } from '@forms/services/dynamic-forms.service';
import * as fileSaver from 'file-saver-es';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { ContactRecord } from '@mango/data-models/lib-data-models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mango-dynamic-form-widget',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibUiElementsModule,
    SearchModule,
    ButtonModule,
    MatIconModule,
    ModalModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDialogModule,
    MatCardModule,
    DropdownModule,
    DevExpressModule,
    FontAwesomeModule,
    SkeletonModule,
  ],
  providers: [DynamicFormsService],
  templateUrl: './dynamic-form-widget.component.html',
  styleUrls: ['./dynamic-form-widget.component.scss'],
})
export class DynamicFormWidgetComponent
  implements OnInit, OnDestroy, OnChanges
{
  private subs: Subscription = new Subscription();
  @Input() section!: any;
  @Input() form!: FormGroup;
  @Input() field!: IFields;
  @Input() editMode: boolean;
  /**
   * Hides the button locally. Useful to hide the button here but still
   * show it on a parent component via canShowDownload output
   *
   * @type {boolean}
   * @memberof DynamicFormWidgetComponent
   */
  @Input() showDownloadButton = true as boolean;
  /**
   * Emits the widgetResponse.data.allowExcelExport value to show/hide download
   * button on the parent component
   *
   * @type {EventEmitter<boolean>}
   * @memberof DynamicFormWidgetComponent
   */
  @Output() canShowDownload: EventEmitter<boolean> = new EventEmitter();

  faCog = faCog;
  isLoading: boolean;
  private _skeletonInstances: number;
  errorLoading: boolean;
  userMessage: string;
  objTypeList: number[] = [1, 2, 3, 4, 120];
  selectWidget$: Observable<Widget>;
  isRenderForm = this.dynamicFormsFacade.selectIsRenderForm$;
  showFileIcon = false;
  showActionColumn = false;
  dateFormat: string;
  objectId: number;
  objectTypeId: number;
  objectTypeTypeId: number;
  loadedWidgetData: boolean;
  loadedUserPreferences: boolean;
  columnFormatMap: Map<string, string>;

  numberColumnTypeIds = new Set(['4', '5', '14', '131', '139', '206']);
  DATE_COL_ID = '7';

  @ViewChild('widgetDataGrid', { static: false })
  widgetDataGrid: DxDataGridComponent;

  showFormWidgetHistory = false;
  allowLinking = false;
  allowEdits = false;

  actionsInclusions = {
    openFile: ['Document Index'],
  };

  constructor(
    private dynamicFormsFacade: DynamicFormsFacade,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private dynamicFormsService: DynamicFormsService,
    private facade: MangoAppFacade
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    this._skeletonInstances = 3; // TODO: This should be dynamically calculated based on the shape of the data
    this.route.queryParamMap.subscribe((queryParamMap) => {
      const getQueryParamValue = (key: string): number | null => {
        const lowerCaseKey = key.toLowerCase();
        const value =
          queryParamMap.get(lowerCaseKey) ||
          queryParamMap.get(lowerCaseKey.toUpperCase());
        return value !== null ? parseInt(value) : null;
      };
      this.objectId = getQueryParamValue('oid');
      this.objectTypeId = getQueryParamValue('otid');
      this.objectTypeTypeId = getQueryParamValue('ottid');
    });
    of(this.getContactPreferences(), this.loadWidget())
      .pipe(concatMap((obs) => obs))
      .subscribe({
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editMode']) {
      this.showActionColumn = this.checkShowActionColumn();
    }
  }

  private loadWidget(): Observable<void> {
    this.dynamicFormsFacade.loadWidgetByWidgetId(this.field.widgetID);

    return this.dynamicFormsFacade
      .selectFormItemWidgetsApiResponseByWidgetId(this.field.widgetID)
      .pipe(
        filter((res) => res !== null && res !== undefined),
        take(1),
        map((widgetResponse) => {
          const clone = JSON.parse(JSON.stringify(widgetResponse));
          clone.data = this.convertDateStrings(clone.data);
          this.columnFormatMap = this.buildColumnFormatting(clone.data);
          return clone;
        }),
        switchMap((widgetResponse) => {
          if (!widgetResponse.success) {
            this.errorLoading = true;
            if (widgetResponse.statusCode === 400) {
              this.userMessage = widgetResponse.clientErrorMessage;
            }
            return EMPTY;
          } else {
            this.showFileIcon = this.actionsInclusions.openFile.includes(
              widgetResponse.data?.widgetName
            );
            this.allowEdits = widgetResponse.data.allowEdits;
            this.allowLinking = widgetResponse.data.allowLinking;
            this.showFormWidgetHistory =
              widgetResponse.data.showFormWidgetHistory;
            this.showActionColumn = this.checkShowActionColumn();

            this.selectWidget$ = of(widgetResponse.data);
            this.canShowDownload.emit(widgetResponse.data.allowExcelExport);
            return of(null);
          }
        }),
        catchError((error) => {
          console.error('Error loading widget:', error);
          return of(null);
        })
      );
  }

  private getContactPreferences(): Observable<ContactRecord> {
    return this.facade.contactRecord$.pipe(
      take(1),
      map((contact) => {
        this.dateFormat = contact.preferences.contactDatesEU
          ? 'dd.MM.yyyy'
          : 'MM/dd/yyyy';
        return contact;
      })
    );
  }

  convertDateStrings(widget: any): any {
    const columnFields = widget.columnGroup?.columnFields as Array<any>;
    const columnRowData = widget?.renderFormWidgetData;

    if (!(columnFields && columnRowData)) {
      return;
    }

    const dateFields = columnFields
      .filter((x) => x.dataFieldDataType === this.DATE_COL_ID)
      .map((x) => x.dataFieldTableField?.toLowerCase());

    for (let i = 0; i < columnRowData.length; i++) {
      for (let j = 0; j < dateFields.length; j++) {
        if (
          columnRowData[i][dateFields[j]] &&
          !Number.isNaN(Date.parse(columnRowData[i][dateFields[j]]))
        ) {
          columnRowData[i][dateFields[j]] = new Date(
            columnRowData[i][dateFields[j]]
          );
        }
      }
    }

    return widget;
  }

  // Used to get column formatting so it can be applied again on excel export
  buildColumnFormatting(widget: any): Map<string, string> {
    const columnFields = widget?.columnGroup?.columnFields as Array<any>;

    if (!columnFields) {
      return;
    }

    const columnFormatMap = columnFields.reduce(
      (acc: Map<string, string>, columnField) => {
        if (columnField.dataTypeFormatString) {
          acc.set(columnField.columnHeader, columnField.dataTypeFormatString);
        } else if (
          this.numberColumnTypeIds.has(columnField.dataFieldDataType)
        ) {
          const twoDecimalsFmt = '#,##0.00';
          acc.set(columnField.columnHeader, twoDecimalsFmt);
          // Set so we can read this property in the template instead of calling a function
          // and creating more work in each re-render.
          columnField.dataTypeFormatString = twoDecimalsFmt;
        }

        return acc;
      },
      new Map()
    ) as Map<string, string>;

    return columnFormatMap;
  }

  checkShowActionColumn(): boolean {
    if (this.editMode) {
      return this.allowLinking || this.allowEdits || this.showFormWidgetHistory;
    }

    return this.allowLinking || this.showFormWidgetHistory;
  }

  onAddWidget(widget: any) {
    const LEASE_OPTIONS: number[] = [1, 2];
    if (
      widget?.columnGroup != null &&
      widget.columnGroup.widgetJSClickEvent != null
    ) {
      const modalConfig = {
        disableClose: true,
        width: '70vw',
        minWidth: '320px',
        maxWidth: '1100px',
        minHeight: '420px',
        maxHeight: '90vh',
        data: {
          objectTypeId: Number(widget.objectTypeID),
        },
      };
      if (widget?.columnGroup.widgetJSClickEvent?.indexOf('Add Lease') > 0) {
        const dialogLeaseRef = this.dialog.open(
          AddLeaseModalComponent,
          modalConfig
        );
        dialogLeaseRef.afterClosed();
      }
      if (
        widget.columnGroup.widgetJSClickEvent?.indexOf('Add Equipment Lease') >
        0
      ) {
        const dialogRef = this.dialog.open(
          AddEquipmentModalComponent,
          modalConfig
        );

        dialogRef.afterClosed();
      }
      if (widget.columnGroup.widgetJSClickEvent.indexOf('AddNewPremise') > 0) {
        const dialogRef = this.dialog.open(
          AddPremiseModalComponent,
          modalConfig
        );

        dialogRef.afterClosed();
      }
      if (
        widget.columnGroup.widgetJSClickEvent?.indexOf(
          'openNewProjectWizardModal'
        ) > 0
      ) {
        const dialogRef = this.dialog.open(AddFormWizardComponent, modalConfig);

        dialogRef.afterClosed();
      }
    } else {
      //Dynamic Popup Logic
      if (LEASE_OPTIONS.indexOf(widget.leaseOptionTypeID) > -1) {
        //TODO - Skip Dynamicpopup & OpenLeasePopup Page temp
      } else {
        const dialogRef = this.dialog.open(DynamicPopupComponent, {
          disableClose: true,
          width: '40vw',
          minWidth: '320px',
          minHeight: '150px',
          data: {
            formId: widget.formID,
            objectTypeId: widget.objectTypeID,
            objectTypeTypeId: widget.objectTypeTypeID,
            relatedObjectId: this.objectId,
            relatedObjectTypeId: this.objectTypeId,
            relatedDefinitionId: widget.relationshipDefinitionID,
          },
        });

        dialogRef.afterClosed();
      }
    }
  }

  onImport() {
    //Import Logic
  }

  onCompare() {
    //Compare Lofgic
  }

  async exportExcel() {
    const workbook = new Workbook();
    const workSheetName = (await this.selectWidget$.toPromise()).widgetName;
    const worksheet = workbook.addWorksheet(workSheetName);

    exportDataGrid({
      component: this.widgetDataGrid.instance,
      worksheet,
      autoFilterEnabled: true,
    })
      .then(() => {
        const worksheet = workbook.worksheets[0];

        const columnNames = [];
        worksheet.getRow(1).eachCell((cell, colNumber) => {
          columnNames.push(cell.value); // Get the value from each cell in the first row
        });

        worksheet.columns.forEach((col, index) => {
          const header = columnNames[index];

          if (this.columnFormatMap.get(header)) {
            col.eachCell((cell, rowNum) => {
              if (typeof cell.value === 'number') {
                cell.numFmt = this.columnFormatMap.get(header);
              }
            });
          }
        });

        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            `${workSheetName}.xlsx`
          );
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  onOpenFileClick(e: DxDataGridTypes.ColumnButtonClickEvent): void {
    e.event.preventDefault();

    const path: Array<string> = e.row.data.doclinkpath?.split('/').slice(-2);

    if (!path) {
      console.error('Error getting doclinkPath');
      return;
    }

    const urlPath = `${path[0]}/${path[1]}`;

    this.dynamicFormsService.downloadDocument(urlPath).subscribe(
      (data) => {
        fileSaver.saveAs(data.body, path[1]);
      },
      (error) => {
        console.error('Error downloading file', error);
      }
    );
  }

  onEditClick(e: DxDataGridTypes.ColumnButtonClickEvent): void {
    console.log('onEditClick', e);
  }

  onDeleteClick(e: DxDataGridTypes.ColumnButtonClickEvent): void {
    console.log('onDeleteClick', e);
  }

  onGoClick(e: DxDataGridTypes.ColumnButtonClickEvent): void {
    console.log('onGoClick', e);
  }

  onHistoryClick(e: DxDataGridTypes.ColumnButtonClickEvent): void {
    console.log('onHistoryClick', e);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
