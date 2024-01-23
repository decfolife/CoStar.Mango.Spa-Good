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

  private getRetrospectiveAdjustmentGridColumns() {
    let amortizationDetailCols = [];
    this.amortizationDetailColumns.filter(adc1 => !adc1.caption.startsWith("Functional Asset")).forEach(adc2 => amortizationDetailCols = amortizationDetailCols.concat(adc2.columns));
    amortizationDetailCols = JSON.parse(JSON.stringify(amortizationDetailCols));

    const columnsFound = [];
    const columnCaptions = [
      "Period Index",
      "Period Name",
      "Asset Balance - Opening",
      "Asset Balance - Closing",
      "Asset Amortization",
      "Total Asset Adjustment",
      "Termination Fee",
      "Liability Balance - Opening",
      "Liability Balance - Closing",
      "Liability Reduction",
      "Level Expense",
      "Liability Adjustment",
      "Short Term Liability - Opening",
      "Short Term Liability - Closing",
      "Short Term Liability Reduction",
      "Short Term Liability Adjustment",
      "Long Term Liability - Opening",
      "Long Term Liability - Closing",
      "Long Term Liability Reduction",
      "Long Term Liability Adjustment",
      "Scheduled Payments",
      "Remaining Payments",
      "Lease Liability Interest Expense",
      "JE Status"];

      let index = 1

      columnCaptions.forEach(columnName => {
        const foundColumn = amortizationDetailCols.find(adsc => adsc.caption === columnName);
        if(foundColumn !== undefined) {
          if(columnName !== "Period Index" && columnName !== "Period Name" && columnName !== "JE Status")
          {
            foundColumn.caption = foundColumn.caption + ' (USD)';
            foundColumn.calculateCellValue = rowData => {
              if(isNaN(rowData[foundColumn.dataField])) {
                return '';
              }

              return this.formattingService.formatNumber(rowData[foundColumn.dataField], 2);
            }
          }
          else if(columnName === "JE Status"){
            foundColumn.cellTemplate = "clickableLink"
          }

          foundColumn.visible = true;
          foundColumn.visibleIndex = index;
          columnsFound.push(foundColumn);
          index++;
        }
      });

    return columnsFound;
  }
}
