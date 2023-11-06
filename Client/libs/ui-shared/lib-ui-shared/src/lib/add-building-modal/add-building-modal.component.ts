import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'mango-add-building-modal',
  templateUrl: './add-building-modal.component.html',
  styleUrls: ['./add-building-modal.component.scss'],
})
export class AddBuildingModalComponent implements OnInit {
  public contentVisible = true;
  public countryDropdownItem: any = [];
  public enableStateTextBox: boolean = false;
  public hierarchyDropdownItem: any = [];
  private newBuildingSaved = false;
  public loading = true;
  public modalTitle: string;
  public portfolioDropdownItem: any = [];
  public stateDropdownItem: any = [];
  public subGroupDropdownItem: any = [];
  public templateDropdownItem: any = [];

  @Output() isLoading = new EventEmitter();
  @ViewChild(DxFormComponent) form: DxFormComponent;

  constructor(
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
    this.loading = false;
  }

  ngAfterViewInit(): void {
    this.isLoading.emit(this.loading);
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

  onCountryChanged(e: any) {
    if (e.value == 225) {
      this.enableStateTextBox = false;
    } else {
      this.enableStateTextBox = true;
    }
  }

  onPortFolioValueChanged(e: any) {
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
    if (!this.newBuildingSaved) {
      this.dialogRef.close();
    }
  }

  public showMessage() {
    notify({
      message: 'Building saved successfully.',
      type: 'success',
      displayTime: 2000,
      position: { at: 'bottom right', my: 'bottom right', offset: '-16 -16' },
      maxWidth: "400px",
      closeOnClick: true,
    });
  }

  // button functions
  public validateForm(e: any) {
    this.form.instance.validate();
  }

  private getBuildingFromFormData(): any {
    const formData = this.form.formData;
    return {
      buildingAddress: formData.buildingAddress,
      buildingCity: formData.buildingCity,
      buildingCountry: formData.buildingCountry,
      buildingMasterGroupID: formData.Portfolio,
      buildingName: formData.buildingName,
      buildingState: formData.buildingState,
      buildingZipCode: formData.buildingZipCode,
      objectTypeTypeID: formData.template,
      portfolioSubGroupID: formData.tenantID,
      tenantID: formData.hierarchy
    };
  }

  private handleAddBuildingResult(success: boolean, isSaveAndNew: boolean) {
    if (success) {
      this.showMessage();
      if (isSaveAndNew) {
        this.newBuildingSaved = true;
        this.form.instance.resetValues();
      } else {
        setTimeout(() => {
          this.dialogRef.close();
          location.reload();
        }, 1000);
      }
    }
    this.loading = false;
  }

  public save(e: any) {
    const isFormValid = this.form.instance.validate();
    if (isFormValid.isValid) {
      const building = this.getBuildingFromFormData();
      this.loading = true;
      this.formWizardService.addBuilding(building).subscribe((result) => {
        this.handleAddBuildingResult(result.success, false);
      });
    }
  }

  public saveAndNew(e: any) {
    const isFormValid = this.form.instance.validate();
    if (isFormValid.isValid) {
      const building = this.getBuildingFromFormData();
      this.loading = true;
      this.formWizardService.addBuilding(building).subscribe((result) => {
        this.handleAddBuildingResult(result.success, true);
      });
    }
  }
  //button functions end


  public setLoadCondition(loadCondition) {
    this.loading = loadCondition;
  }

}
