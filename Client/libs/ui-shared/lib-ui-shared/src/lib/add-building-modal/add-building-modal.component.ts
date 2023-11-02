import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Service } from './add-building-modal.service';
import { DxFormComponent } from 'devextreme-angular';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { forkJoin } from 'rxjs';

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

  enableStateTextBox: boolean = false;

  public countryDropdownItem: any = [];
  public portfolioDropdownItem: any = [];
  public templateDropdownItem: any = [];
  public subGroupDropdownItem: any = [];
  public hierarchyDropdownItem: any = [];
  public stateDropdownItem: any = [];

  constructor(
    public service: Service,
    public dialogRef: MatDialogRef<AddBuildingModalComponent>,
    private formWizardService: FormWizardService
    
  ) {
    this.onCountryChanged = this.onCountryChanged.bind(this);
    this.onPortFolioValueChanged = this.onPortFolioValueChanged.bind(this);
   }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === "Escape") {
        this.close();
      }
    })
    this.getDropdownData();
  }

  public getDropdownData() {
    let observableList;
    observableList = forkJoin({
        templateDropdownItem: this.formWizardService.getRenderSelect("", 18),
        countryDropdownItem: this.formWizardService.getRenderSelect("0", 16),
        portfolioDropdownItem: this.formWizardService.getRenderSelect("", 62),
        stateDropDownItem: this.formWizardService.getRenderSelect("United States", 17),
      });

      observableList.subscribe((data: any) => {
      this.countryDropdownItem = data.countryDropdownItem.data;
      this.templateDropdownItem = data.templateDropdownItem.data.map(projectTemplateName => projectTemplateName.ProjectTemplateName);
      this.portfolioDropdownItem = data.portfolioDropdownItem.data;
      this.stateDropdownItem = data.stateDropDownItem.data;
    });
  }

  onCountryChanged(e:any) {
    if (e.value == 225) {
      this.enableStateTextBox = false;
    } else {
      this.enableStateTextBox = true;
    }
  }

  onPortFolioValueChanged(e:any) {
    this.formWizardService.getRenderSelect(e.value, 57).subscribe((data) => {
      this.templateDropdownItem = data.data;
    
    })
    this.formWizardService.getRenderSelect(e.value, 9).subscribe((data) => {
      this.subGroupDropdownItem = data.data;
    })
    this.formWizardService.getRenderSelect(e.value, 10).subscribe((data) => {
      this.hierarchyDropdownItem = data.data;
    })
  }

  public close() {
      this.dialogRef.close();
  }

  public validateForm(e: any){
    this.form.instance.validate()
  }
}
