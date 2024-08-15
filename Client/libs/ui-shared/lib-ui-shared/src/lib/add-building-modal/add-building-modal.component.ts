import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InputComponent, DropdownComponent } from '@mango/ui-shared/lib-ui-elements';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import notify from 'devextreme/ui/notify';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CremToastService } from '@mango/ui-shared/lib-ui-elements';
import { ToastState, ObjectType, RequestType } from '@mango/data-models/lib-data-models';
import { DataService } from '@mango/core-shared';

@Component({
  selector: 'mango-add-building-modal',
  templateUrl: './add-building-modal.component.html',
  styleUrls: ['./add-building-modal.component.scss'],
})

export class AddBuildingModalComponent implements OnInit, OnDestroy {
  contentVisible = true;
  countryDropdownItem: any = [];
  enableStateTextBox: boolean = false;
  hierarchyDropdownItem: any = [];
  private newBuildingSaved = false;
  loading = true;
  modalTitle: string;
  dynName: string;
  portfolioDropdownItem: any = [];
  stateDropdownItem: any = [];
  subGroupDropdownItem: any = [];
  templateDropdownItem: any = [];
  enableHierachyDropDown: any = [];
  enableSubGroupDropDown: boolean = false;
  enableStateDropDown: boolean = true;
  private subscriptions = new Subscription();
  initialFocusElement: string;
  saveClicked: boolean;
  saveNewClicked: boolean;
  saveLaunchClicked: boolean;
  private redirectorLinks: any[] = null;

  addBuildingFormGroup: FormGroup

  @Output() isLoading = new EventEmitter();
  @ViewChild("BuildingName") buildingNameTextBox: InputComponent;
  @ViewChild("buildingPortfolioId") buildingPortfolioIdDropdown: DropdownComponent;
  @ViewChild("buildingTemplateId") buildingTemplateIdDropdown: DropdownComponent;
  @ViewChild("buildingHierarchyId") buildingHierarchyIdDropdown: DropdownComponent;
  @ViewChild("buildingCountryId") buildingCountryIdDropdown: DropdownComponent;
  @ViewChild("buildingCountryId") buildingSubGroupIdIdDropdown: DropdownComponent;

  constructor(
    public dialogRef: MatDialogRef<AddBuildingModalComponent>,
    private formWizardService: FormWizardService,
    private dashboardService: DashboardService,
    private router: Router,
    private dataService: DataService,
    private toastService: CremToastService,
    @Inject(MAT_DIALOG_DATA) public data: {
      objectTypeName: string;
      objectTypeId: number;
    }
  ) { }

  ngOnInit(): void {

    this.setupAddBuildingForm()

    this.subscriptions.add(this.loadDropdownData().subscribe())
    this.subscriptions.add(this.loadClientHierarchy().subscribe())
    this.subscriptions.add(this.loadPortfolioSubGroup().subscribe())
    this.subscriptions.add(this.onPortfolioValueChange().subscribe())
    this.subscriptions.add(this.onCountryValueChange().subscribe())
    this.subscriptions.add(this.setupModalKeyboardClose().subscribe())


    if (!this.data.objectTypeName) {
      this.subscriptions.add(
        this.dashboardService.getObjectTypeNames([ObjectType.BUILDING]).subscribe(
          (result) => {
            this.data.objectTypeName = result?.data?.[0]?.objectTypeName;
            this.buildModalTitle();
          }
        )
      );
    } else {
      this.buildModalTitle();
    }

    if (this.redirectorLinks === null) {
      this.subscriptions.add(
        this.dataService.getRedirectorLinkList().subscribe(res => {
          this.redirectorLinks = res.data;
        })
      );
    }
  }

  ngAfterViewInit(): void {
    this.buildingNameTextBox.focusTextBox();
    this.isLoading.emit(this.loading);
  }

  setupAddBuildingForm() {
    this.addBuildingFormGroup = new FormGroup({
      buildingName: new FormControl('', [Validators.required]),
      buildingAddress: new FormControl(''),
      buildingCity: new FormControl(''),
      buildingState: new FormControl(''),
      buildingZipCode: new FormControl(''),
      selectedPortfolio: new FormControl('', [Validators.required]),
      selectedTemplate: new FormControl('', [Validators.required]),
      selectedHierarchy: new FormControl(''),
      selectedCountry: new FormControl(''),
      selectedSubGroup: new FormControl(''),
      buildingStateInput: new FormControl(''),
    })
  }

  setupModalKeyboardClose(): Observable<any> {
    return this.dialogRef.keydownEvents().pipe(
      filter(event => !!event && event.key === 'Escape'),
      tap(_ => this.close())
    )
  }

  loadDropdownData(): Observable<any> {
    return combineLatest([
      this.formWizardService.getRenderSelect("0", RequestType.COUNTRIES_ALL),
      this.formWizardService.getRenderSelect("", RequestType.PORTFOLIO_LIST),
      this.formWizardService.getRenderSelect("United States", RequestType.STATES_BY_COUNTRYNAME)
    ]).pipe(
      filter(([
        countryDropdownItem,
        portfolioDropdownItem,
        stateDropDownItem
      ]) => !!countryDropdownItem && !!portfolioDropdownItem && !!stateDropDownItem),
      tap(([
        countryDropdownItem,
        portfolioDropdownItem,
        stateDropDownItem
      ]) => {
        this.countryDropdownItem = countryDropdownItem.data;
        this.portfolioDropdownItem = portfolioDropdownItem.data;
        this.stateDropdownItem = stateDropDownItem.data;
        this.loading = false;
      })
    )
  }

  loadClientHierarchy(): Observable<any> {
    return this.formWizardService.getClientPreferenceByField("ClientHierarchyLevel").pipe(
      tap(result => {
        const mappedValues = result.data.map(ClientSetupFieldValue => ClientSetupFieldValue.ClientSetupFieldValue);
        this.enableHierachyDropDown = mappedValues?.some(value => value.toLowerCase().includes('building') || value.toLowerCase().includes('both'));
      }
      ))
  }

  loadPortfolioSubGroup(): Observable<any> {
    return this.formWizardService.getClientPreferenceByField("portfolioSubGroupRequired").pipe(
      tap(result => {
        const mappedValues = result.data.map(ClientSetupFieldValue => ClientSetupFieldValue.ClientSetupFieldValue);
        this.enableSubGroupDropDown = mappedValues?.some(value => value.includes('1'));
      }
      ))
  }

  onCountryValueChange(): Observable<any> {
    return this.addBuildingFormGroup.get('selectedCountry').valueChanges.pipe(
      filter(country => !!country),
      tap(country => {
        this.enableStateDropDown = (country === "United States");
      })
    );
  }

  onPortfolioValueChange(): Observable<any> {
    return this.addBuildingFormGroup.get('selectedPortfolio').valueChanges.pipe(
      filter(companyID => !!companyID),
      switchMap(companyID =>
        combineLatest([
          this.formWizardService.getRenderSelect(companyID, RequestType.TEMPLATE_ID).pipe(filter(v => !!v)),
          this.formWizardService.getRenderSelect(companyID, RequestType.HIERARCHY_ID).pipe(filter(v => !!v)),
          this.formWizardService.getRenderSelect(companyID, RequestType.SUBGROUP_ID).pipe(filter(v => !!v))
        ])
      ),
      tap(([templates, hierachies, subgroups]) => {
        this.templateDropdownItem = templates.data;
        this.hierarchyDropdownItem = hierachies.data;
        this.subGroupDropdownItem = subgroups.data
      })
    )
  }


  buildModalTitle() {
    this.modalTitle = "Create " + this.data.objectTypeName;
    this.dynName = this.data.objectTypeName
  }

  close() {
    if (!this.newBuildingSaved) {
      this.dialogRef.close();
    }
  }

  showMessage() {
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
    const form = this.addBuildingFormGroup;
    return {
      buildingAddress: form.get('buildingAddress').value,
      buildingCity: form.get('buildingCity').value,
      buildingCountry: form.get('selectedCountry').value,
      buildingMasterGroupID: form.get('selectedPortfolio').value,
      buildingName: form.get('buildingName').value,
      buildingState: form.get('buildingStateInput').value
        ? form.get('buildingStateInput').value
        : form.get('buildingState').value,
      buildingZipCode: form.get('buildingZipCode').value,
      objectTypeTypeID: form.get('selectedTemplate').value,
      portfolioSubGroupID: form.get('selectedSubGroup').value,
      tenantID: form.get('selectedHierarchy').value
        ? Number(form.get('selectedHierarchy').value)
        : null,
    };
  }

  save(e: any) {
    if (this.addBuildingFormGroup.valid) {
      this.saveClicked = true;
      const building = this.getBuildingFromFormData();
      this.subscriptions.add(this.formWizardService.addBuilding(building).subscribe((result) => {
        if (result.data) {
          this.toastService.show(
            this.dynName + " created successfully",
            '',
            ToastState.SUCCESS,
            {
              maxWidth: "500px",
              duration: 5000,
            }
          );
          this.dialogRef.close();
          this.saveClicked = false;
        } else {
          this.toastService.show("Save not successful", "Save failed.", ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '350px'
          });
        }
      }));
    }
  }

  saveAndNew(e: any) {
    if (this.addBuildingFormGroup.valid) {
      const building = this.getBuildingFromFormData();
      this.saveNewClicked = true;
      this.subscriptions.add(this.formWizardService.addBuilding(building).subscribe((result) => {
        if (result.success) {
          this.toastService.show(this.dynName + " created successfully.", '', ToastState.SUCCESS, {
            position: 'bottom right',
            maxWidth: '350px'
          });
          this.saveNewClicked = false;
          this.resetInputFields();
        } else {
          this.toastService.show('An error has occurred. Please try again.', '', ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '350px'
          });
        }
      }));
    }
  }

  resetInputFields() {
    this.addBuildingFormGroup.reset();
    this.buildingPortfolioIdDropdown.clearSelectBox();
    this.buildingTemplateIdDropdown.clearSelectBox();
    this.buildingHierarchyIdDropdown.clearSelectBox();
    this.buildingCountryIdDropdown.clearSelectBox();
    this.buildingSubGroupIdIdDropdown.clearSelectBox();
  }


  launch(data: any) {
    if (this.addBuildingFormGroup.valid) {
      this.saveLaunchClicked = true;
      const formData = this.getBuildingFromFormData();
      this.subscriptions.add(this.formWizardService.addBuilding(formData).subscribe((result) => {
        if (result.success) {
          this.saveLaunchClicked = false;
          this.dialogRef.close();
          const currURL = this.getRedirectorURL(result.data, ObjectType.BUILDING, formData.objectTypeTypeID);
          this.router.navigateByUrl(currURL);
        } else {
          this.toastService.show('An error has occurred. Please try again.', '', ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '350px'
          });
        }
      }));
    }
  }

  getRedirectorURL(objectId: number, objectTypeId: number, objectTypeTypeId: number): string {
    let getURL = this.redirectorLinks.find(
      x => x.objectTypeId === objectTypeId && x.objectTypeTypeId === objectTypeTypeId
    );
    getURL = getURL ?? this.redirectorLinks.find(x => x.objectTypeId === objectTypeId);
    let urlLink = getURL ? getURL.urlLink : 'not found';
    urlLink = urlLink
      .replace(/\[OID\]/, objectId)
      .replace(/\[OTID\]/, objectTypeId)
      .replace(/\[OTTID\]/, objectTypeTypeId);
    return urlLink;
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
