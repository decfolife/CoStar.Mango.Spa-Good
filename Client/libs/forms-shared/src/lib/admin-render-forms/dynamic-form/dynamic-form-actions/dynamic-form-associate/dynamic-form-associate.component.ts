import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '@mango/core-shared';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { Subscription, combineLatest, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import {
  ButtonModule,
  CremFormsModule,
  CremToastService,
  DatePickerModule,
  DropdownComponent,
  DropdownModule,
  InputComponent,
  LibUiElementsModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { DynamicFormsService } from '@forms/services/dynamic-forms.service';
import { ToastState } from '@mango/data-models/lib-data-models';
import { CheckBoxComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/checkbox';
import { DashboardService } from '@project-dashboard/services/dashboard.service';

@Component({
  selector: 'mango-dynamic-form-associate',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ModalModule,
    DropdownModule,
    LibUiElementsModule,
    InputComponent,
    ReactiveFormsModule,
    CremFormsModule,
    DatePickerModule,
    CheckBoxComponent,
  ],
  templateUrl: './dynamic-form-associate.component.html',
  styleUrls: ['./dynamic-form-associate.component.scss'],
})
export class DynamicFormAssociateComponent implements OnInit, OnDestroy {
  @ViewChild('countryDropdown') countryDropdown: DropdownComponent;
  @ViewChild('stateDropdown') stateDropdown: DropdownComponent;
  @ViewChild('buildingDropdown') buildingDropdown: DropdownComponent;
  @ViewChild('premiseDropdown') premiseDropdown: DropdownComponent;
  @ViewChild('leaseDropdown') leaseDropdown: DropdownComponent;

  constructor(
    public dialogRef: MatDialogRef<DynamicFormAssociateComponent>,
    private dynamicFormsService: DynamicFormsService,
    private dashboardService: DashboardService,
    private toastService: CremToastService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      objectId: number;
      associateType: string;
      objectTypeId: number;
    }
  ) {}

  public hidePremise: boolean;
  public associateType: string;
  private subscriptions = new Subscription();
  saveClicked: boolean = false;
  componentName: string = 'Lease';
  associateForm: any;

  countryList: any;
  stateList: any;
  buildingList: any;
  premiseList: any;
  leaseList: any;

  public countryDropdownItem: any = [];
  public stateDropdownItem: any = [];
  public buildingDropdownItem: any = [];
  public premiseDropdownItem: any = [];
  public leaseDropdownItem: any = [];

  public selectedCountry: string = '';
  public selectedState: string = '';
  public selectedBuildingID: number = 0;
  public selectedPremiseID: number = 0;
  public selectedLeaseID: number = 0;
  public removeAssociation: boolean = false;

  associatedData: any;
  associateBuildingInfo: any;
  associateLeaseInfo: any;

  onCountryValueChange(e: any) {
    this.selectedCountry = e[0].name;
    this.getStatesData(this.selectedCountry);
  }

  onStateValueChange(e: any) {
    this.selectedState = e[0].name;
    this.getBuildings(this.selectedCountry, this.selectedState);
  }

  onBuildingValueChange(e: any) {
    this.selectedBuildingID = e[0].buildingID;
    this.getPremiseData(this.selectedBuildingID);
  }

  onPremiseValueChange(e: any) {
    this.selectedPremiseID = e[0].premiseID;
    this.getLeasesData(this.selectedBuildingID, this.selectedPremiseID);
  }

  onLeaseValueChange(e: any) {
    this.selectedLeaseID = e[0].leaseAbstractID;
  }

  getCountryData() {
    this.subscriptions.add(
      this.dynamicFormsService
        .getCountries()
        .subscribe((countryDropdownItem) => {
          if (countryDropdownItem) {
            this.countryDropdownItem = countryDropdownItem.data.map((o) => {
              return { name: o, value: o };
            });
          }
          if (countryDropdownItem === null || !countryDropdownItem.success) {
            this.toastService.show(
              'COUNTRY_DROPDOWN_ERROR',
              '',
              ToastState.ERROR,
              {
                position: 'bottom right',
                maxWidth: '350px',
              }
            );
          }
        })
    );
  }

  getStatesData(country: string) {
    this.subscriptions.add(
      this.dynamicFormsService
        .getStates(country)
        .subscribe((stateDropdownItem) => {
          if (stateDropdownItem) {
            this.stateDropdownItem = stateDropdownItem.data.map((o) => {
              return { name: o, value: o };
            });
          }
          if (stateDropdownItem === null || !stateDropdownItem.success) {
            this.toastService.show(
              'STATE_DROPDOWN_ERROR',
              '',
              ToastState.ERROR,
              {
                position: 'bottom right',
                maxWidth: '350px',
              }
            );
          }
        })
    );
  }

  getBuildings(country: string, state: string) {
    this.subscriptions.add(
      this.dynamicFormsService
        .getBuildingsForActions(country, state)
        .subscribe((buildingDropdownItem) => {
          if (buildingDropdownItem) {
            this.buildingDropdownItem = buildingDropdownItem.data;
          }
          if (buildingDropdownItem === null || !buildingDropdownItem.success) {
            this.toastService.show(
              'BUILDING_DROPDOWN_ERROR',
              '',
              ToastState.ERROR,
              {
                position: 'bottom right',
                maxWidth: '350px',
              }
            );
          }
        })
    );
  }

  getPremiseData(buildingId: number) {
    this.subscriptions.add(
      this.dynamicFormsService
        .getPremises(buildingId)
        .subscribe((premiseDropdownItem) => {
          if (premiseDropdownItem) {
            this.premiseDropdownItem = premiseDropdownItem.data;
          }
          if (premiseDropdownItem === null || !premiseDropdownItem.success) {
            this.toastService.show(
              'PREMISE_DROPDOWN_ERROR',
              '',
              ToastState.ERROR,
              {
                position: 'bottom right',
                maxWidth: '350px',
              }
            );
          }
        })
    );
  }

  getLeasesData(buildingId: number, premiseId) {
    this.subscriptions.add(
      this.dynamicFormsService
        .getLeases(buildingId, premiseId)
        .subscribe((leaseDropdownItem) => {
          if (leaseDropdownItem) {
            this.leaseDropdownItem = leaseDropdownItem.data;
          }
          if (leaseDropdownItem === null || !leaseDropdownItem.success) {
            this.toastService.show(
              'LEASE_DROPDOWN_ERROR',
              '',
              ToastState.ERROR,
              {
                position: 'bottom right',
                maxWidth: '350px',
              }
            );
          }
        })
    );
  }

  getAssociateBuildingToProject(projectId: number) {
    this.subscriptions.add(
      this.dynamicFormsService
        .getAssociateBuildingToProject(projectId)
        .subscribe((associateBuildingData) => {
          if (associateBuildingData) {
            this.associatedData = associateBuildingData.data;
            this.populateAssociatedInfo();
          }
          if (
            associateBuildingData === null ||
            !associateBuildingData.success
          ) {
            this.toastService.show(
              'GET_ASSOCIATE_BUILDING_DATA',
              '',
              ToastState.ERROR,
              {
                position: 'bottom right',
                maxWidth: '350px',
              }
            );
          }
        })
    );
  }

  setAssociateBuildingToProject(buildingInfo: any) {
    this.subscriptions.add(
      this.dynamicFormsService
        .setAssociateBuildingToProject(buildingInfo)
        .subscribe((resp) => {
          if (resp === null || !resp.success) {
            this.toastService.show(
              'SET_ASSOCIATE_BUILDING_INFO',
              '',
              ToastState.ERROR,
              {
                position: 'bottom right',
                maxWidth: '350px',
              }
            );
          }
        })
    );
  }

  getAssociateLeaseToProject(projectId: number) {
    this.subscriptions.add(
      this.dynamicFormsService
        .getAssociateLeaseToProject(projectId)
        .subscribe((associateLeaseData) => {
          if (associateLeaseData) {
            this.associatedData = associateLeaseData.data;
            this.populateAssociatedInfo();
          }
          if (associateLeaseData === null || !associateLeaseData.success) {
            this.toastService.show(
              'GET_ASSOCIATE_LEASE_DATA',
              '',
              ToastState.ERROR,
              {
                position: 'bottom right',
                maxWidth: '350px',
              }
            );
          }
        })
    );
  }

  setAssociateLeaseToProject(leaseInfo: any) {
    this.subscriptions.add(
      this.dynamicFormsService
        .setAssociateLeaseToProject(leaseInfo)
        .subscribe((resp) => {
          if (resp === null || !resp.success) {
            this.toastService.show(
              'SET_ASSOCIATE_LEASE_INFO',
              '',
              ToastState.ERROR,
              {
                position: 'bottom right',
                maxWidth: '350px',
              }
            );
          }
        })
    );
  }

  save() {
    if (this.associateType === 'lease') {
      let leaseInfo = {
        projectID: this.data.objectId,
        leaseAbstractID: this.selectedLeaseID,
        buildingID: this.selectedBuildingID,
        premiseID: this.selectedPremiseID,
        remove: this.removeAssociation,
      };
      this.setAssociateLeaseToProject(leaseInfo);
    } else if (this.associateType === 'building') {
      let buildingInfo = {
        projectID: this.data.objectId,
        buildingID: this.selectedBuildingID,
        remove: this.removeAssociation,
      };
      this.setAssociateBuildingToProject(buildingInfo);
    }
  }

  close() {
    this.dialogRef.close();
  }

  getId(
    componentName: string,
    uniqueName: string,
    elementType: string,
    componentType?: string
  ) {
    return componentType
      ? `${componentName}-${componentType}-${uniqueName}-${elementType}`
      : `${componentName}-${uniqueName}-${elementType}`;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getHidePremise();
    this.associateType = this.data.associateType;

    if (this.associateType === 'lease') {
      this.getAssociateLeaseToProject(this.data.objectId);
    } else if (this.associateType === 'building') {
      this.getAssociateBuildingToProject(this.data.objectId);
    }
  }

  getHidePremise() {
    this.subscriptions.add(
      this.dashboardService
        .getClientPreference('HidePremise')
        .pipe(
          tap((res) => {
            this.hidePremise =
              res && res.success ? (res.data == '1' ? true : false) : false;
          })
        )
        .subscribe()
    );
  }

  populateAssociatedInfo() {
    this.getCountryData();

    this.selectedCountry = this.associatedData.buildingCountry;
    this.selectedState = this.associatedData.buildingState;
    this.selectedBuildingID = this.associatedData.buildingID;

    if (this.selectedCountry !== '' && this.selectedState !== '') {
      this.getStatesData(this.selectedCountry);
    }

    if (
      this.selectedBuildingID != 0 &&
      this.selectedCountry !== '' &&
      this.selectedState !== ''
    ) {
      this.getBuildings(this.selectedCountry, this.selectedState);
    }

    if (this.associateType === 'lease') {
      this.selectedPremiseID = this.associatedData.premiseID;
      this.selectedLeaseID = this.associatedData.leaseAbstractID;

      if (this.selectedPremiseID != 0 && this.selectedBuildingID != 0) {
        this.getPremiseData(this.selectedBuildingID);
      }

      if (
        this.selectedLeaseID != 0 &&
        this.selectedPremiseID != 0 &&
        this.selectedBuildingID != 0
      ) {
        this.getLeasesData(this.selectedBuildingID, this.selectedPremiseID);
      }
    }
  }

  removeAssociationChanged(e) {
    if (!e.event) {
      return;
    }
    this.removeAssociation = e.value;
  }
}
