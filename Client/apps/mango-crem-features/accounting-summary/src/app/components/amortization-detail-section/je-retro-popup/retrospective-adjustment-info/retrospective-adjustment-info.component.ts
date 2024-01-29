import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'mango-retrospective-adjustment-info',
  templateUrl: './retrospective-adjustment-info.component.html',
  styleUrls: ['./retrospective-adjustment-info.component.scss'],
})
export class RetrospectiveAdjustmentInfoComponent {
  @Input() retrospectiveAdjustmentPopupData: any;
  @Input() amortizationDetailColumns: any[];
  @Input() classificationType: string;
  @Input() amortizationProfileName: string;
  @Output() retroAdustmentGridRowClickEvent: EventEmitter<any> = new EventEmitter();


  componentName = "retrospective_adjustment-info";

  gridData = []
  gridColumn = []

  constructor(private formattingService: FormattingService, public accountingSummaryService: AccountingSummaryService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes.amortizationDetailColumns && changes.amortizationDetailColumns.currentValue !== undefined){
      this.gridColumn = this.getRetrospectiveAdjustmentGridColumns();
      this.gridData = this.retrospectiveAdjustmentPopupData;
    }
  }

  dateTimeStamp() {
    return new Date();
  }

  exportToExcelFileName() {
    const dateTimeStamp = new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const fileName = this.amortizationProfileName + "-" + this.classificationType + "-Retro Adjustment Details_" + dateTimeStamp;
    return fileName;
  }

  onRetroAmortizationCellClick(event) {
    if (event.column.name === 'JEStatus' && event.displayValue !== null) {
      this.retroAdustmentGridRowClickEvent.emit(event);
    }
  }

  onExporting(event){
    event.fileName = this.exportToExcelFileName()
  }

  private getRetrospectiveAdjustmentGridColumns() {
    let amortizationDetailCols = JSON.parse(JSON.stringify(this.amortizationDetailColumns));

      amortizationDetailCols.forEach(bandedCol => {
        bandedCol.columns.forEach(col => {
            if(col.name !== "PeriodIndex" && col.name !== "DisplayPeriod" && col.name !== "JEStatus")
            {
              col.calculateCellValue = rowData => {
                if(isNaN(rowData[col.dataField])) {
                  return '';
                }
  
                return this.formattingService.formatNumber(rowData[col.dataField], 2);
              }
            }
            else if(col.name === "JEStatus"){
              col.cellTemplate = "clickableLink"
            }
        });
      });

    return amortizationDetailCols;
  }
}
