import { forkJoin } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { DxFormComponent } from 'devextreme-angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormWizardService } from '@micro-components/services/form-wizard.service';


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
  public enableHierachyDropDown: any = [];
  public enableSubGroupDropDown: any = [];

  @Output() isLoading = new EventEmitter();
  @ViewChild('addBuildingForm') addBuildingForm: DxFormComponent;

  constructor(
    public dialogRef: MatDialogRef<AddBuildingModalComponent>,
    private formWizardService: FormWizardService,
    private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: {
      objectTypeName: string;
      objectTypeId: number;
    }

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

    if (!this.data.objectTypeName) {
      this.dashboardService.getObjectTypeNames([3]).subscribe(
        (result) => {
          this.data.objectTypeName = result?.data?.[0]?.objectTypeName
          this.buildModalTitle();
        }
      );   
    } else {
      this.buildModalTitle();
    }

    this.formWizardService.getClientPreferenceByField("ClientHierarchyLevel").subscribe(
      (result) => {
        const mappedValues = result.data.map(ClientSetupFieldValue => ClientSetupFieldValue.ClientSetupFieldValue);
        this.enableHierachyDropDown = mappedValues?.some(value => value.toLowerCase().includes('building') || value.toLowerCase().includes('both'));
      }
    ); 

    this.formWizardService.getClientPreferenceByField("portfolioSubGroupRequired").subscribe(
      (result) => {
        const mappedValues = result.data.map(ClientSetupFieldValue => ClientSetupFieldValue.ClientSetupFieldValue);
        this.enableSubGroupDropDown = mappedValues?.some(value => value.toLowerCase().includes('1'));
      }
    ); 
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
    if (e.value == 'United States') {
      this.enableStateTextBox = false;
    } else {
      this.enableStateTextBox = true;
    }
  }

  public buildModalTitle() {
    this.modalTitle = "Create " + this.data.objectTypeName;
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

  public validateForm(e: any) {
    this.addBuildingForm.instance.validate();
  }

  private getBuildingFromFormData() {
    const formData = this.addBuildingForm.formData;
    let building = {
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
    return building;
  }

  private handleAddBuildingResult(success: boolean, isSaveAndNew: boolean) {
    if (success) {
      this.showMessage();
      if (isSaveAndNew) {
        this.newBuildingSaved = true;
        this.addBuildingForm.instance.resetValues();
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
    const isFormValid = this.addBuildingForm.instance.validate();
    if (isFormValid.isValid) {
      const building = this.getBuildingFromFormData();
      this.loading = true;
      this.formWizardService.addBuilding(building).subscribe((result) => {
        this.handleAddBuildingResult(result.success, false);
      });
    }
  }

  public saveAndNew(e: any) {
    const isFormValid = this.addBuildingForm.instance.validate();
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
