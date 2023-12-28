import { combineLatest, forkJoin, of, Subscription } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { filter, map, switchMap, tap} from 'rxjs/operators'

//Constants
const RENDER_SELECT_TEMPLATE_ID = 57;
const RENDER_SELECT_HIERARCHY_ID = 10
const RENDER_SELECT_SUBGROUP_ID = 9;
const OTID= 3;


@Component({
  selector: 'mango-add-building-modal',
  templateUrl: './add-building-modal.component.html',
  styleUrls: ['./add-building-modal.component.scss'],
})

export class AddBuildingModalComponent implements OnInit, OnDestroy {
  public contentVisible = true;
  public countryDropdownItem: any = [];
  public enableStateTextBox: boolean = false;
  public hierarchyDropdownItem: any = [];
  private newBuildingSaved = false;
  public loading = true;
  public modalTitle: string;
  public dynName: string;
  public portfolioDropdownItem: any = [];
  public stateDropdownItem: any = [];
  public subGroupDropdownItem: any = [];
  public templateDropdownItem: any = [];
  public enableHierachyDropDown: any = [];
  public enableSubGroupDropDown: any = [];
  private subscriptions = new Subscription();


  @Output() isLoading = new EventEmitter();
  @ViewChild('addBuildingForm') addBuildingForm: DxFormComponent;

  constructor(
    public dialogRef: MatDialogRef<AddBuildingModalComponent>,
    private formWizardService: FormWizardService,
    private dashboardService: DashboardService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {
      objectTypeName: string;
      objectTypeId: number;
    }

  ) {
    this.onCountryChanged = this.onCountryChanged.bind(this);
    this.onPortFolioValueChanged = this.onPortFolioValueChanged.bind(this);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.dialogRef.keydownEvents().subscribe((event) => {
        if (event.key === "Escape") {
          this.close();
        }
      })
    );
    this.getDropdownData();

    if (!this.data.objectTypeName) {
      this.subscriptions.add(
        this.dashboardService.getObjectTypeNames([3]).subscribe(
          (result) => {
            this.data.objectTypeName = result?.data?.[0]?.objectTypeName;
            this.buildModalTitle();
          }
        )
      );
    } else {
      this.buildModalTitle();
    }


    this.subscriptions.add(
      this.formWizardService.getClientPreferenceByField("ClientHierarchyLevel").subscribe(
        (result) => {
          const mappedValues = result.data.map(ClientSetupFieldValue => ClientSetupFieldValue.ClientSetupFieldValue);
          this.enableHierachyDropDown = mappedValues?.some(value => value.toLowerCase().includes('building') || value.toLowerCase().includes('both'));
        }
      )
    )

    this.subscriptions.add(this.formWizardService.getClientPreferenceByField("portfolioSubGroupRequired").subscribe(
      (result) => {
        const mappedValues = result.data.map(ClientSetupFieldValue => ClientSetupFieldValue.ClientSetupFieldValue);

        // this checks the client site configuration to determine if the sub group dropdown should be required or not
        this.enableSubGroupDropDown = mappedValues?.some(value => value.includes('1'));
      }
    ));
  }

  ngAfterViewInit(): void {
    this.isLoading.emit(this.loading);
  }

  ngOnDestroy(): void {
    //close all subscriptions in this component
    this.subscriptions.unsubscribe();
  }

  public getDropdownData() {
    const observableList = forkJoin({
      templateDropdownItem: this.formWizardService.getRenderSelect("", 18),
      countryDropdownItem: this.formWizardService.getRenderSelect("0", 16),
      portfolioDropdownItem: this.formWizardService.getRenderSelect("", 62),
      stateDropDownItem: this.formWizardService.getRenderSelect("United States", 17),
    });

    this.subscriptions.add(
      observableList.subscribe((data: any) => {
        this.countryDropdownItem = data.countryDropdownItem.data;
        this.templateDropdownItem = data.templateDropdownItem.data.map(projectTemplateName => projectTemplateName.ProjectTemplateName);
        this.portfolioDropdownItem = data.portfolioDropdownItem.data;
        this.stateDropdownItem = data.stateDropDownItem.data;
        this.loading = false;
        this.focusFirstItem();
      })
    )
  }

  onCountryChanged(e: any) {
    if (e.value == 'United States') {
      this.enableStateTextBox = false;
    } else {
      this.enableStateTextBox = true;
    }
  }

  // this funciton dynamically builds the form title and the name label in the form
  public buildModalTitle() {
    this.modalTitle = "Create " + this.data.objectTypeName;
    this.dynName = this.data.objectTypeName
  }
  // end 

  onPortFolioValueChanged(e: any) {
    of(e.value).pipe(
      filter(value => !!value),
      switchMap(value => 
        combineLatest([
          this.formWizardService.getRenderSelect(value, RENDER_SELECT_TEMPLATE_ID).pipe(filter(v => !!v)),
          this.formWizardService.getRenderSelect(value, RENDER_SELECT_HIERARCHY_ID).pipe(filter(v => !!v)),
          this.formWizardService.getRenderSelect(value, RENDER_SELECT_SUBGROUP_ID).pipe(filter(v => !!v))
        ])
      ),
      map(([templates, hierachies, subgroups]) => {
        this.templateDropdownItem = templates.data;
        this.hierarchyDropdownItem = hierachies.data;
        this.subGroupDropdownItem  = subgroups.data
      })
    ).subscribe()
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

  private getBuildingFromFormData() {
    const formData = this.addBuildingForm.formData;
    let building = {
      buildingAddress: formData.buildingAddress,
      buildingCity: formData.buildingCity,
      buildingCountry: formData.buildingCountry,
      buildingMasterGroupID: formData.portfolio,
      buildingName: formData.buildingName,
      buildingState: formData.buildingState,
      buildingZipCode: formData.buildingZipCode,
      objectTypeTypeID: formData.template,
      portfolioSubGroupID: formData.tenantID,
      tenantID: formData.hierarchy
    };
    return building;
  }

  private focusFirstItem() {
    setTimeout(() => {
      let buildingNameInput = this.addBuildingForm.instance.getEditor('buildingName')
      buildingNameInput.focus()
    }, 200);
  }

  //button functions
  public validateForm(e: any) {
    this.addBuildingForm.instance.validate();
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
      this.subscriptions.add(this.formWizardService.addBuilding(building).subscribe((result) => {
        this.handleAddBuildingResult(result.success, false);
      }));
    }
  }

  public saveAndNew(e: any) {
    const isFormValid = this.addBuildingForm.instance.validate();
    if (isFormValid.isValid) {
      const building = this.getBuildingFromFormData();
      this.loading = true;
      this.subscriptions.add(this.formWizardService.addBuilding(building).subscribe((result) => {
        this.handleAddBuildingResult(result.success, true);
      }));
    }
  }

  public launch(data: any) {
    const isFormValid = this.addBuildingForm.instance.validate();
  
    if (isFormValid) {
      const formData = this.getBuildingFromFormData();
      this.loading = true;
  
      this.formWizardService.addBuilding(formData).pipe(
        switchMap((addBuildingResult) => {
          if (addBuildingResult.success) {
            const buidlingID: number = addBuildingResult.data;
  
            return forkJoin({
              redirectorLinkResult: this.formWizardService.getRedirectorLink(OTID, formData.objectTypeTypeID),
              buidlingID: of(buidlingID),
            });
          } else {
            return of(null);
          }
        }),
        switchMap((results) => {
          if (results && results.redirectorLinkResult.success && results.redirectorLinkResult.data?.length > 0) {
            const RDID = '';
            const url =
              results.redirectorLinkResult.data[0].BasePageUrl +
              '&pgMode=' +
              'Edit' +
              '&OID=' +
              results.buidlingID +
              '&OTID=' +
              OTID +
              '&OTTID=' +
              formData.objectTypeTypeID;
              this.router.navigate([url]);
            this.showMessage();
            this.dialogRef.close(data);
          }
          return of(null);
        })
      ).subscribe(() => {
        this.loading = false;
      });
    }
  }
}
