import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PortfolioDashboardService} from '@portfolio-dashboard/services/portfolio-dashboard.service';
import { Service } from './add-building-modal.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'mango-add-building-modal',
  templateUrl: './add-building-modal.component.html',
  styleUrls: ['./add-building-modal.component.scss'],
})
export class AddBuildingModalComponent implements OnInit{
  public loading = true;
  public contentVisible = true;
  public modalTitle: string;

  positions: string[];

  states: string[];

  portfolios: string[];

  countries: string[];

  constructor(
    public service: Service,
    public dialogRef: MatDialogRef<AddBuildingModalComponent>,
    private dashboardService: PortfolioDashboardService,

  ) {
    this.states = service.getStates();
    this.portfolios = service.getPortfolios();
    this.countries = service.getCountries();
   }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === "Escape") {
        this.close();
      }
    })
      
  }

  public close() {
      this.dialogRef.close();
  }
}
