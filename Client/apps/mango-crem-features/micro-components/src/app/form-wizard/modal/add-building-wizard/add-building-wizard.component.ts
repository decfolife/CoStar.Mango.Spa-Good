import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PortfolioDashboardService} from '@portfolio-dashboard/services/portfolio-dashboard.service'
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'mango-add-building-wizard',
  templateUrl: './add-building-wizard.component.html',
  styleUrls: ['./add-building-wizard.component.scss'],
})
export class AddBuildingWizardComponent implements OnInit {
  
  public loading = true;
  public contentVisible = true;
  public modalTitle: string;

  constructor(
    public dialogRef: MatDialogRef<AddBuildingWizardComponent>,
    private dashboardService: PortfolioDashboardService,

  ) { }

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
