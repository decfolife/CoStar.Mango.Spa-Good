import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'mango-retrospective-adjustment-info',
  templateUrl: './retrospective-adjustment-info.component.html',
  styleUrls: ['./retrospective-adjustment-info.component.scss'],
})
export class RetrospectiveAdjustmentInfoComponent {
  @ViewChild("RetrospectiveAdjustment") retrospectiveAdjustment: DxDataGridComponent;
  @Input() retrospectiveAdjustmentPopupData: any;
  @Input() gridColumnsForRetroPopup: any[];
  @Input() classificationType: string;
  @Input() amortizationProfileName: string;
  @Output() retroAdustmentGridRowClickEvent: EventEmitter<any> = new EventEmitter();


  componentName = "retrospective_adjustment-info";

  gridData = []
  gridColumns = []

  constructor(private formattingService: FormattingService, public accountingSummaryService: AccountingSummaryService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes.gridColumnsForRetroPopup && changes.gridColumnsForRetroPopup.currentValue !== undefined){
      this.getRetrospectiveAdjustmentGridColumns();
      this.gridColumns = this.gridColumnsForRetroPopup
      this.gridData = this.retrospectiveAdjustmentPopupData;
    }
  }

  dateTimeStamp() {
    return new Date();
  }

  exportToExcelFileName() {
    const dateTimeStamp = new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const fileName = this.amortizationProfileName + "-" + this.classificationType + "-Retro Adjustment Details_" + dateTimeStamp +'.xlsx';
    return fileName;
  }

  onRetroAmortizationCellClick(event) {
    if (event.column.name === 'JEStatus' && event.displayValue !== null) {
      this.retroAdustmentGridRowClickEvent.emit(event);
    }
  }

  onExporting(event) {
    const fileName = this.exportToExcelFileName();
    this.retrospectiveAdjustment.loadPanel.enabled = false;
    this.accountingSummaryService.exportToExcel(this.retrospectiveAdjustment.instance, fileName, 'Sheet');
  }

  private getRetrospectiveAdjustmentGridColumns() {
    let breakLoop = false;

      this.gridColumnsForRetroPopup.some(bandedCol => {
        bandedCol.columns.some(col => {
            if(col.dataField.toLowerCase() === "jestatus"){
              col.cellTemplate = "clickableLink";
              breakLoop = true
            }

            return breakLoop;
        });

        return breakLoop;
      });
  }
}
