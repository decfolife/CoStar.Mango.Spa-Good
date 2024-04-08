import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { DxPivotGridComponent } from "devextreme-angular/ui/pivot-grid";

@Component({
    selector: 'mango-iad-card',
    templateUrl: './iad-card.component.html',
    styleUrls: ['./iad-card.component.scss'],
  })

  export class IADCardComponent implements OnInit {

    @Input() config;
    @Input() dataSource;
    @Input() fieldConfig;
    
    public fullWidth: boolean = true;

    @ViewChild("PivotGrid") pivotGrid: DxPivotGridComponent;

    ngOnInit(): void {
    }

    public onCellPrepared(e) {
        if (e.area === "data" && e.cell.text === "") {
            e.cellElement.textContent = "0";
        }
        if (e.cell.text === "ROU Asset Balance" || e.cell.text === "Total Liability Balance") {
          e.cellElement.style.fontWeight = 'bold';
        }
        if (e.area === "column") { // Apply background color when cell's header is total
          if (e.cell.text === "Total"){
            e.cellElement.classList.add("total");
          }
        }
        if (e.rowType === "data" || e.area === "data") { // Apply background color when cell is a total
          if (e.cell.columnPath[e.cell.columnPath.length - 1] === "Total"){
            e.cellElement.classList.add("total");
          }
          if (e.cell.rowPath[e.cell.rowPath.length - 1] === "Thereafter"){
            e.cellElement.classList.add("total");
          }
        }
        if (e.cell.text === "Thereafter"){
          e.cellElement.classList.add("total");
        }
      }

      public toggleCardWidth() {
        this.fullWidth = !this.fullWidth;
        this.updateDimention();
      }

      public updateDimention() {
        this.pivotGrid?.instance.updateDimensions();
        setTimeout(() => {
          this.pivotGrid?.instance.updateDimensions();
        })
      }

  }