import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Service } from './add-building-modal.service';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'mango-add-building-modal',
  templateUrl: './add-building-modal.component.html',
  styleUrls: ['./add-building-modal.component.scss'],
})
export class AddBuildingModalComponent implements OnInit{
  public loading = true;
  public contentVisible = true;
  public modalTitle: string;
  
  @ViewChild(DxFormComponent) form: DxFormComponent;


  positions: string[];

  states: string[];

  portfolios: string[];

  countries: string[];

  constructor(
    public service: Service,
    public dialogRef: MatDialogRef<AddBuildingModalComponent>
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

  public validateForm(e: any){
    this.form.instance.validate()
  }
}
