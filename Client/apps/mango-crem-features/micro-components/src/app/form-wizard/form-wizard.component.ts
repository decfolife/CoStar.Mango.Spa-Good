import { combineLatest, Subject } from 'rxjs';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { FormWizardService } from '../services/form-wizard.service';
import { IForm } from 'libs/ui-shared/lib-ui-elements/src/lib/dynamic-form/definitions';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { DynamicFormComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/dynamic-form/dynamic-form.component';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

interface ISaveObject {
  CompanyID?: number;
  TaskType?: number;
  TaskName?: string;
  CurrencyID?: number;
  MeasureUnitID?: number;
  Units?: number;
  Country?: string;
  State?: string;
  TransactionSubTaskType?: number;
  TransactionInternalID?: string;
  WorkDaysOnly?: boolean;
  CalcDays?: boolean;
  CompanyBusinessUnitID?: number;
  MakePrivate?: boolean;
  AutoCalc?: boolean;
  TransactionAdjustTimeline?: boolean;
  GroupID?: number;
  ManagerContactID?: number;
  StartDate?: string;
  ProjectTemplateID?: number;
  BuildingID?: number;
  LeaseAbstractID?: number;
}

@Component({
  selector: 'mango-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss'],
})
export class FormWizardAppComponent implements OnInit, OnDestroy {
  public formConfig: IForm;
  public formData: any = {};
  public typeDropdownItem: any = [];
  public subTypeDropdownItem: any = [];
  public clientDropdownItem: any = [];
  public countryDropdownItem: any = [];
  public templateDropdownItem: any = [];
  public stateProvinceDropdownItem: any = [];
  public teamDropdownItem: any = [];
  public businessUnitDropdownItem: any = [];
  public buildingDropdownItem: any = [];
  public leaseDropdownItem: any = [];
  public managerDropdownItem: any = [];
  public measurementsDropdownItem: any = [];
  public buildingLeaseDefaultInfo: any = [];
  public currencyDropdownItem: any = [];
  public showInternalID: boolean;
  public loading = true;
  public dateFormat: string = 'MM/dd/yyyy';
  public clientProjectsPrivate: boolean = false;
  public hideClientProjectsPrivate: boolean = true;
  public linkBuildingsLeases: boolean = false;
  public defaultValues: any = {};
  public measureUnit: number;
  public currency: number;
  @Input() objectTypeName: string;
  @Input() objectTypeId: number;
  @Input() objectId: number;
  @Input() userId: number;
  @Output() loadCondition: EventEmitter<any> = new EventEmitter();

  @ViewChild('FormWizardDynamicForm')
  dynamicForm: DynamicFormComponent;
  private onDestroy$: Subject<void> = new Subject<void>();
  public loadedBuildings = new Map<number, any>();
  private MAX_PAGE_SIZE = 100000;

  constructor(private formWizardService: FormWizardService) {}
  ngOnInit(): void {
    this.formWizardService.getUserPreferences().subscribe((response) => {
      if (response?.data?.isDatesEU === true) {
        this.dateFormat = 'dd.MM.yyyy';
      }
      this.measureUnit = response?.data?.unitOfMeasureId;
      this.currency = response?.data?.currencyId;
      this.userId = response?.data?.userId;
      this.getDropdownData();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public getDropdownData() {
    const observableList = combineLatest([
      this.formWizardService.getRenderSelect('1', 23),
      this.formWizardService.getRenderSelect('0', 15),
      this.formWizardService.getRenderSelect('', 18),
      this.formWizardService.getRenderSelect('0', 16),
      this.formWizardService.getRenderSelect('', 19),
      this.formWizardService.getRenderSelect('', 21),
      this.formWizardService.getRenderSelect('', 20),
      this.formWizardService.getProjectWizardClientPreferences(),
      this.formWizardService.getManagers(0),
      this.formWizardService.getBuildingLeaseDefaultInfo(
        this.objectId,
        this.objectTypeId
      ),
    ]).pipe(
      takeUntil(this.onDestroy$),
      tap(
        ([
          typeDropdownItem,
          clientDropdownItem,
          templateDropdownItem,
          countryDropdownItem,
          teamDropdownItem,
          currencyDropdownItem,
          measurementsDropdownItem,
          clientPreferences,
          managerDropdownItem,
          buildingLeaseDefaultInfo,
        ]) => {
          this.typeDropdownItem = typeDropdownItem.data;
          this.clientDropdownItem = clientDropdownItem.data;
          this.templateDropdownItem = templateDropdownItem.data;
          this.countryDropdownItem = countryDropdownItem.data;
          this.teamDropdownItem = teamDropdownItem.data;
          this.currencyDropdownItem = currencyDropdownItem.data;
          this.measurementsDropdownItem = measurementsDropdownItem.data;
          this.buildingLeaseDefaultInfo = buildingLeaseDefaultInfo?.data;
          this.clientProjectsPrivate =
            clientPreferences.data?.[0]?.clientSetupFieldValue === '2' ||
            clientPreferences.data?.[0]?.clientSetupFieldValue === '4';
          this.hideClientProjectsPrivate =
            clientPreferences.data?.[0]?.clientSetupFieldValue === '3' ||
            clientPreferences.data?.[0]?.clientSetupFieldValue === '4';
          this.showInternalID =
            clientPreferences.data?.[5]?.clientSetupFieldValue === '1';
          this.defaultValues.calculateDates =
            clientPreferences.data?.[2]?.clientSetupFieldValue === '1';
          this.defaultValues.calculatedBy =
            clientPreferences.data?.[6]?.clientSetupFieldValue === '1';
          this.defaultValues.autoCalculate =
            clientPreferences.data?.[1]?.clientSetupFieldValue === '1';
          this.defaultValues.shiftTimeline =
            clientPreferences.data?.[4]?.clientSetupFieldValue === '1';
          this.linkBuildingsLeases =
            clientPreferences.data?.[3]?.clientSetupFieldValue === '1';

          this.defaultValues.currency = [];
          this.defaultValues.measurements = [];
          this.defaultValues.manager = [];
          this.managerDropdownItem = [];
        }
      ),
      filter(
        () =>
          this.currency !== null ||
          this.measureUnit !== null ||
          this.userId !== null
      ),
      tap(() => {
        if (this.currency !== null) {
          const defaultCurrency = this.currencyDropdownItem.find(
            (x) => x?.exchangeRateID == this.currency
          );
          if (defaultCurrency) {
            this.defaultValues.currency = [defaultCurrency];
          }
        }

        if (this.measureUnit !== null) {
          const defaultMeasureUnit = this.measurementsDropdownItem.find(
            (x) => x?.measureUnitsID == this.measureUnit
          );
          if (defaultMeasureUnit) {
            this.defaultValues.measurements = [defaultMeasureUnit];
          }
        }

        if (this.userId !== null) {
          const defaultManager = this.managerDropdownItem.find(
            (x) => x?.contactID == this.userId
          );
          if (defaultManager) {
            this.managerDropdownItem = [defaultManager];
            this.defaultValues.manager = [defaultManager];
          }
        }

        this.teamDropdownItem.sort((a, b) => {
          return this.compareObjectByKey(a, b, 'groupName');
        });

        if (this.objectTypeId === 3 || this.objectTypeId === 4) {
          const defaultInfo = this.buildingLeaseDefaultInfo?.data?.[0];
          let country;
          let noStateCountry;
          if (defaultInfo) {
            if (defaultInfo.country) {
              const defaultCountry = this.countryDropdownItem.find(
                (country) => {
                  return country.country === defaultInfo.country;
                }
              );

              if (defaultCountry) {
                this.defaultValues.country = [defaultCountry];

                const selectedCountry = this.defaultValues.country[0].country;
                if (selectedCountry) {
                  country = '"' + selectedCountry + '"';
                  noStateCountry = '"' + selectedCountry + '--' + '"';

                  this.formWizardService
                    .getRenderSelect(country, 17)
                    .subscribe((stateData) => {
                      this.stateProvinceDropdownItem = stateData.data;
                      if (stateData?.data?.length === 0) {
                        if (defaultInfo.country) {
                          this.defaultValues.stateProvince = defaultInfo.state;
                        }

                        this.formWizardService
                          .getRenderSelect(
                            noStateCountry,
                            73,
                            '0',
                            '0',
                            '0',
                            '0',
                            1,
                            this.MAX_PAGE_SIZE,
                            false
                          )
                          .subscribe((buildingData) => {
                            this.buildingDropdownItem = buildingData.data;
                            this.buildingDropdownItem.sort((a, b) => {
                              return this.compareObjectByKey(
                                a,
                                b,
                                'buildingName'
                              );
                            });
                            const defaultBuilding =
                              this.buildingDropdownItem.find((building) => {
                                return (
                                  building.buildingID === defaultInfo.buildingID
                                );
                              });
                            if (defaultBuilding) {
                              this.defaultValues.building = [defaultBuilding];

                              const LeaseAbstractID =
                                defaultInfo.leaseAbstractID;
                              if (LeaseAbstractID) {
                                this.formWizardService
                                  .getRenderSelect(defaultInfo.buildingID, 61)
                                  .subscribe((data) => {
                                    this.leaseDropdownItem = data.data;
                                    this.leaseDropdownItem.sort((a, b) => {
                                      return this.compareObjectByKey(
                                        a,
                                        b,
                                        'leaseName'
                                      );
                                    });
                                    const defaultLease =
                                      this.leaseDropdownItem.find((lease) => {
                                        return (
                                          lease.leaseAbstractID ===
                                          defaultInfo.leaseAbstractID
                                        );
                                      });
                                    if (defaultLease) {
                                      this.defaultValues.lease = [defaultLease];
                                    }
                                    this.buildFormConfig();
                                  });
                              } else {
                                this.formWizardService
                                  .getRenderSelect(defaultInfo.buildingID, 61)
                                  .subscribe((data) => {
                                    this.leaseDropdownItem = data.data;
                                    this.buildFormConfig();
                                  });
                              }
                            } else {
                              this.buildFormConfig();
                            }
                          });
                      } else {
                        const defaultState =
                          this.stateProvinceDropdownItem.find((state) => {
                            return state.State === defaultInfo.state;
                          });

                        if (defaultState) {
                          this.defaultValues.stateProvince = [defaultState];

                          let countryState;
                          const countryName = defaultInfo.country;
                          const stateName = defaultInfo.state;

                          countryState =
                            '"' + countryName + '--' + stateName + '"';

                          this.formWizardService
                            .getRenderSelect(
                              countryState,
                              73,
                              '0',
                              '0',
                              '0',
                              '0',
                              1,
                              this.MAX_PAGE_SIZE,
                              false
                            )
                            .subscribe((data) => {
                              this.buildingDropdownItem = data.data;
                              this.buildingDropdownItem.sort((a, b) => {
                                return this.compareObjectByKey(
                                  a,
                                  b,
                                  'buildingName'
                                );
                              });
                              const defaultBuilding =
                                this.buildingDropdownItem.find((building) => {
                                  return (
                                    building.buildingID ==
                                    defaultInfo.buildingID
                                  );
                                });
                              if (defaultBuilding) {
                                this.defaultValues.building = [defaultBuilding];
                                const LeaseAbstractID =
                                  defaultInfo.leaseAbstractID;

                                this.formWizardService
                                  .getRenderSelect(defaultInfo.buildingID, 61)
                                  .subscribe((data) => {
                                    this.leaseDropdownItem = data.data;
                                    this.leaseDropdownItem.sort((a, b) => {
                                      return this.compareObjectByKey(
                                        a,
                                        b,
                                        'leaseName'
                                      );
                                    });

                                    if (LeaseAbstractID) {
                                      const defaultLease =
                                        this.leaseDropdownItem.find((lease) => {
                                          return (
                                            lease.leaseAbstractID ==
                                            defaultInfo.leaseAbstractID
                                          );
                                        });
                                      if (defaultLease) {
                                        this.defaultValues.lease = [
                                          defaultLease,
                                        ];
                                      }
                                      this.buildFormConfig();
                                    } else {
                                      this.buildFormConfig();
                                    }
                                  });
                              } else {
                                this.buildFormConfig();
                              }
                            });
                        } else {
                          this.buildFormConfig();
                        }
                      }
                    });
                } else {
                  this.buildFormConfig();
                }
              } else {
                this.buildFormConfig();
              }
            } else {
              this.buildFormConfig();
            }
          }
        } else {
          this.buildFormConfig();
        }
      })
    );

    observableList.subscribe();
  }

  public buildFormConfig() {
    this.formConfig = {
      section: [
        {
          sectionTitle: this.objectTypeName + ' Details',
          sectionId: 'project_details',
          formObjects: [
            {
              sectionItems: [
                {
                  dataField: 'name',
                  fieldType: 'text',
                  caption: 'Name',
                  maxLengthMessage: 'Character limit of 100 reached.',
                  maxLength: 100,
                  value: '',
                  required: true,
                  disabled: false,
                  initialFocus: true,
                },
                {
                  dataField: 'type',
                  fieldType: 'dropdown',
                  caption: 'Type',
                  required: true,
                  displayExpr: 'objectTypeTypeName',
                  valueExpr: 'objectTypeTypeID',
                  dataSource: this.typeDropdownItem,
                  hoverText: 'Select the type of the project',
                  disabled: false,
                },
                {
                  dataField: 'subtype',
                  fieldType: 'dropdown',
                  caption: 'Subtype',
                  displayExpr: 'objectTypeTypeName',
                  valueExpr: 'objectTypeTypeID',
                  required: false,
                  dataSource: [],
                  hoverText: 'Select the subtype of the project',
                  disabled: false,
                },
                {
                  dataField: 'team',
                  fieldType: 'dropdown',
                  caption: 'Team',
                  displayExpr: 'groupName',
                  valueExpr: 'groupID',
                  required: false,
                  hoverText: 'Select the team of the project',
                  dataSource: this.teamDropdownItem,
                  disabled: false,
                },
                {
                  dataField: 'manager',
                  fieldType: 'dropdown',
                  caption: 'Manager',
                  displayExpr: 'contactName',
                  valueExpr: 'contactID',
                  required: false,
                  dataSource: this.managerDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.manager,
                  hoverText: 'Select the manager of the project',
                  defaultValue: this.defaultValues?.manager,
                },
                {
                  dataField: 'client',
                  fieldType: 'dropdown',
                  caption: 'Client',
                  displayExpr: 'companyName',
                  valueExpr: 'companyID',
                  required: true,
                  dataSource: this.clientDropdownItem,
                  hoverText: 'Select the client of the project',
                  disabled: false,
                },
                {
                  dataField: 'businessUnit',
                  fieldType: 'dropdown',
                  caption: 'Business Unit',
                  required: false,
                  displayExpr: 'companyBusinessUnitName',
                  valueExpr: 'companyBusinessUnitID',
                  dataSource: this.businessUnitDropdownItem,
                  hoverText: 'Select the business unit of the project',
                  disabled: false,
                },
              ],
            },
            {
              sectionItems: [
                {
                  dataField: 'TransactionInternalID',
                  fieldType: 'text',
                  caption: 'Internal ID',
                  maxLengthMessage: 'Character limit of 50 reached.',
                  maxLength: 50,
                  required: false,
                  value: '',
                  disabled: false,
                  hidden: this.showInternalID !== true,
                },
                {
                  dataField: 'MeasureUnitID',
                  fieldType: 'dropdown',
                  caption: 'Measurements',
                  required: true,
                  displayExpr: 'measureArea',
                  valueExpr: 'measureUnitsID',
                  dataSource: this.measurementsDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.measurements,
                  hoverText: 'Select the measurements of the project',
                  defaultValue: this.defaultValues?.measurements,
                },
                {
                  dataField: 'CurrencyID',
                  fieldType: 'dropdown',
                  caption: 'Currency',
                  required: true,
                  displayExpr: 'targetCurrencyDesc',
                  valueExpr: 'exchangeRateID',
                  dataSource: this.currencyDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.currency,
                  hoverText: 'Select the currency of the project',
                  defaultValue: this.defaultValues?.currency,
                },
                {
                  dataField: 'country',
                  fieldType: 'dropdown',
                  caption: 'Country',
                  required: true,
                  displayExpr: 'country',
                  valueExpr: 'country',
                  dataSource: this.countryDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.country,
                  hoverText: 'Select the country of the project',
                  defaultValue: this.defaultValues?.country,
                },
                {
                  dataField: 'stateProvince',
                  fieldType: 'customCombination',
                  caption: 'State/Province',
                  displayExpr: 'state',
                  valueExpr: 'state',
                  maxLengthMessage: 'Character limit of 50 reached.',
                  maxLength: 50,
                  required: false,
                  dataSource: this.stateProvinceDropdownItem,
                  disabled: false,
                  combinationType:
                    this.stateProvinceDropdownItem?.length > 0
                      ? 'dropdown'
                      : 'text',
                  value: this.defaultValues?.stateProvince || '',
                  hoverText: 'Select the state/province of the project',
                  defaultValue: this.defaultValues?.stateProvince,
                },
                {
                  dataField: 'building',
                  fieldType: 'dropdown',
                  caption: 'Link with building?',
                  displayExpr: 'buildingName',
                  valueExpr: 'buildingID',
                  required: false,
                  hidden:
                    !this.linkBuildingsLeases &&
                    !(this.objectTypeId === 3 || this.objectTypeId === 4),
                  dataSource: this.buildingDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.building,
                  hoverText: 'Link a building with this project',
                  defaultValue: this.defaultValues?.building,
                },
                {
                  dataField: 'lease',
                  fieldType: 'dropdown',
                  displayExpr: 'leaseName',
                  valueExpr: 'leaseAbstractID',
                  caption: 'Link with lease?',
                  hidden:
                    !this.linkBuildingsLeases &&
                    !(this.objectTypeId === 3 || this.objectTypeId === 4),
                  dataSource: this.leaseDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.lease,
                  hoverText: 'Link a lease with this project',
                  defaultValue: this.defaultValues?.lease,
                },
              ],
            },
          ],
        },
        {
          sectionTitle: 'Task Details',
          sectionId: 'task_details',
          formObjects: [
            {
              sectionItems: [
                {
                  dataField: 'taskTemplate',
                  fieldType: 'dropdown',
                  caption: 'Task Template',
                  hoverText: 'Select the task template of the project',
                  displayExpr: 'projectTemplateName',
                  valueExpr: 'projectTemplateID',
                  required: false,
                  dataSource: this.templateDropdownItem,
                  disabled: true,
                },
                {
                  dataField: 'taskStartDate',
                  fieldType: 'date',
                  caption: 'Task Start Date',
                  showClearButton: true,
                  disabled: false,
                  required: true,
                  value: new Date(),
                  defaultValue: new Date(),
                },
                {
                  dataField: 'isPrivate',
                  fieldType: 'checkbox',
                  caption: 'Make Private?',
                  textDisplay:
                    'Note: If left unchecked, your group will receive view rights to this project. You will be able to override this when adding team members by turning on or off sharing with group for each team member.',
                  textDisplayFontSize: 10,
                  value: !!this.clientProjectsPrivate,
                  hidden: this.hideClientProjectsPrivate,
                  required: false,
                  disabled: false,
                  defaultValue: !!this.clientProjectsPrivate,
                },
              ],
            },
            {
              subSectionId: 'calculate_date_section',
              sectionItems: [
                {
                  dataField: 'calculateDates',
                  fieldType: 'toggle',
                  trueDisplay: 'Yes',
                  falseDisplay: 'No',
                  caption: 'Calculate Dates?',
                  value: !!this.defaultValues?.calculateDates,
                  disabled: false,
                  defaultValue: !!this.defaultValues?.calculateDates,
                },
                {
                  dataField: 'calculatedBy',
                  fieldType: 'toggle',
                  trueDisplay: 'Work Days Only',
                  falseDisplay: 'All Calendar Days',
                  caption: 'Calculated By:',
                  value: !!this.defaultValues?.calculatedBy,
                  hidden: !this.defaultValues?.calculateDates,
                  disabled: false,
                  defaultValue: !!this.defaultValues?.calculatedBy,
                },
                {
                  dataField: 'autoCalculate',
                  fieldType: 'toggle',
                  trueDisplay: 'Yes',
                  falseDisplay: 'No',
                  caption: 'Auto Calculate?',
                  value: !!this.defaultValues?.autoCalculate,
                  hidden: !this.defaultValues?.calculateDates,
                  disabled: false,
                  defaultValue: !!this.defaultValues?.autoCalculate,
                },
                {
                  dataField: 'shiftTimeline',
                  fieldType: 'toggle',
                  caption: 'Shift Timeline?',
                  trueDisplay: 'Yes',
                  falseDisplay: 'No',
                  value: !!this.defaultValues?.shiftTimeline,
                  hidden:
                    !this.defaultValues?.autoCalculate ||
                    !this.defaultValues?.calculateDates,
                  disabled: false,
                  defaultValue: !!this.defaultValues?.shiftTimeline,
                },
              ],
            },
          ],
        },
      ],
    };
    this.loading = false;
    this.setLoadingCondition(false);
  }

  public onChange(config) {
    let selectedId;
    switch (config.dataField) {
      case 'calculateDates':
        if (config.values[config.dataField]?.value === true) {
          config.values['autoCalculate'].hidden = false;
          config.values['calculatedBy'].hidden = false;
          config.values['shiftTimeline'].hidden =
            !config.values['autoCalculate'].value;
        } else {
          config.values['shiftTimeline'].hidden = true;
          config.values['autoCalculate'].hidden = true;
          config.values['calculatedBy'].hidden = true;
          config.values['shiftTimeline'].value =
            config.values['shiftTimeline'].defaultValue;
          config.values['autoCalculate'].value =
            config.values['autoCalculate'].defaultValue;
          config.values['calculatedBy'].value =
            config.values['calculatedBy'].defaultValue;
        }
        break;
      case 'autoCalculate':
        if (config.values[config.dataField]?.value === true) {
          config.values['shiftTimeline'].hidden = false;
        } else {
          config.values['shiftTimeline'].hidden = true;
          config.values['shiftTimeline'].value =
            config.values['shiftTimeline'].defaultValue;
        }
        break;
      case 'type':
        selectedId = config?.values?.type?.value?.[0]?.objectTypeTypeID;
        if (selectedId) {
          this.setLoadingCondition(true);
          this.formWizardService
            .getRenderSelect(selectedId, 13)
            .subscribe((data) => {
              this.subTypeDropdownItem = data.data;
              config.values['subtype'].dataSource = this.subTypeDropdownItem;
              this.formWizardService
                .getRenderSelect(selectedId, 38)
                .subscribe((data) => {
                  this.templateDropdownItem = data.data;
                  config.values['taskTemplate'].dataSource =
                    this.templateDropdownItem;
                  config.values['taskTemplate'].disabled = false;
                });
              this.setLoadingCondition(false);
            });
        } else {
          config.values['subtype'].dataSource = [];
        }
        config.values['subtype'].value = [];
        break;
      case 'country':
        selectedId = config?.values?.country?.value?.[0]?.country;
        let country;
        let noStateCountry;
        if (selectedId) {
          country = '"' + selectedId + '"';
          noStateCountry = '"' + selectedId + '--' + '"';
          this.setLoadingCondition(true);
          this.formWizardService
            .getRenderSelect(country, 17)
            .subscribe((data) => {
              this.stateProvinceDropdownItem = data.data;
              config.values['stateProvince'].dataSource =
                this.stateProvinceDropdownItem;
              if (data?.data?.length === 0) {
                config.values['building'].dataSource =
                  this.buildBuildingDataSource(noStateCountry);
                config.values['building'].searchExpr = 'buildingName';

                config.values['stateProvince'].combinationType = 'text';
                config.values['stateProvince'].value = '';
              } else {
                config.values['stateProvince'].combinationType = 'dropdown';
                config.values['stateProvince'].value = [];
                this.setLoadingCondition(false);
              }
            });
        } else {
          config.values['stateProvince'].value = '';
          config.values['stateProvince'].dataSource = [];
          config.values['building'].dataSource = [];
          config.values['lease'].dataSource = [];
        }

        config.values['building'].value = [];
        config.values['lease'].value = [];

        break;
      case 'client':
        selectedId = config?.values?.client?.value?.[0]?.companyID;
        if (selectedId) {
          this.setLoadingCondition(true);
          this.formWizardService
            .getRenderSelect(selectedId, 58)
            .subscribe((data) => {
              this.businessUnitDropdownItem = data.data;
              config.values['businessUnit'].dataSource =
                this.businessUnitDropdownItem;
              this.setLoadingCondition(false);
            });
        } else {
          config.values['businessUnit'].dataSource = [];
        }
        config.values['businessUnit'].value = [];
        break;
      case 'stateProvince':
        let countryState;
        const countryName = config?.values?.country?.value?.[0]?.country;
        const stateName = config?.values?.stateProvince?.value?.[0]?.state;

        if (config.values['stateProvince'].combinationType === 'text') {
          break;
        }
        countryState = '"' + countryName + '--' + stateName + '"';

        if (countryName && stateName) {
          this.setLoadingCondition(true);
          config.values['building'].dataSource =
            this.buildBuildingDataSource(countryState);
          config.values['building'].searchExpr = 'buildingName';
        } else {
          config.values['building'].dataSource = [];
        }
        config.values['building'].value = [];
        break;
      case 'building':
        selectedId = config?.values?.building?.value?.[0]?.buildingID;
        if (selectedId) {
          this.setLoadingCondition(true);
          this.formWizardService
            .getRenderSelect(selectedId, 61)
            .subscribe((data) => {
              this.leaseDropdownItem = data.data;
              this.leaseDropdownItem.sort((a, b) => {
                return this.compareObjectByKey(a, b, 'leaseName');
              });
              config.values['lease'].dataSource = this.leaseDropdownItem;
              this.setLoadingCondition(false);
            });
        } else {
          config.values['lease'].dataSource = [];
        }
        config.values['lease'].value = [];
        break;
      case 'team':
        selectedId = config?.values?.team?.value?.[0]?.groupID;
        if (selectedId) {
          this.setLoadingCondition(true);
          this.formWizardService.getManagers(selectedId).subscribe((data) => {
            this.managerDropdownItem = data.data;
            this.managerDropdownItem.sort((a, b) => {
              return this.compareObjectByKey(a, b, 'contactName');
            });
            config.values['manager'].dataSource = this.managerDropdownItem;
            this.setLoadingCondition(false);
          });
        } else {
          config.values['manager'].dataSource = [this.defaultValues.manager];
          this.setLoadingCondition(false);
        }
        config.values['manager'].value = [];
        break;
      default:
    }
    this.formData = config.values;
  }

  public trimItems() {
    if (
      this.formData.name?.value &&
      typeof this.formData.name.value === 'string'
    ) {
      this.formData.name.value = this.formData.name?.value?.trim();
    }

    if (
      this.formData.TransactionInternalID?.value &&
      typeof this.formData.TransactionInternalID.value === 'string'
    ) {
      this.formData.TransactionInternalID.value =
        this.formData.TransactionInternalID?.value?.trim();
    }

    if (
      this.formData.stateProvince?.value &&
      typeof this.formData.stateProvince.value === 'string' &&
      this.formData.stateProvince.combinationType === 'text'
    ) {
      this.formData.stateProvince.value =
        this.formData.stateProvince?.value?.trim();
    }
  }

  public validate() {
    const validate = this.dynamicForm.validate();
    return validate;
  }

  public clearForm() {
    this.dynamicForm.clearForm();
    this.formConfig.section[1].formObjects[1].sectionItems.forEach((toggle) => {
      if (toggle.dataField !== 'calculateDates') {
        toggle.hidden = true;
      }
    });
    this.formData.MakePrivate = this.clientProjectsPrivate;
  }

  public getSaveObject() {
    const saveObject: ISaveObject = {};

    if (this.formData.name?.value) {
      saveObject.TaskName = this.formData.name?.value;
    }

    if (this.formData.TransactionInternalID?.value) {
      saveObject.TransactionInternalID =
        this.formData.TransactionInternalID?.value;
    }

    if (this.formData.type?.value?.[0]?.objectTypeTypeID) {
      saveObject.TaskType = this.formData.type?.value?.[0]?.objectTypeTypeID;
    }

    if (this.formData.subtype?.value?.[0]?.objectTypeTypeID) {
      saveObject.TransactionSubTaskType =
        this.formData.subtype?.value?.[0]?.objectTypeTypeID;
    }

    if (this.formData.client?.value?.[0]?.companyID) {
      saveObject.CompanyID = this.formData.client?.value?.[0]?.companyID;
    }

    if (this.formData.team?.value?.[0]?.groupID) {
      saveObject.GroupID = this.formData.team?.value?.[0]?.groupID;
    }

    if (this.formData.manager?.value?.[0]?.contactID) {
      saveObject.ManagerContactID =
        this.formData.manager?.value?.[0]?.contactID;
    }

    if (this.formData.businessUnit?.value?.[0]?.companyBusinessUnitID) {
      saveObject.CompanyBusinessUnitID =
        this.formData.businessUnit?.value?.[0]?.companyBusinessUnitID;
    }

    if (this.formData.MeasureUnitID?.value?.[0]?.measureUnitsID) {
      saveObject.MeasureUnitID =
        this.formData.MeasureUnitID?.value?.[0]?.measureUnitsID;
    }

    if (this.formData.CurrencyID?.value?.[0]?.exchangeRateID) {
      saveObject.CurrencyID =
        this.formData.CurrencyID?.value?.[0]?.exchangeRateID;
    }

    if (this.formData.country?.value) {
      saveObject.Country = this.formData.country?.value?.[0]?.country;
    }

    if (this.formData.stateProvince.combinationType === 'text') {
      if (this.formData.stateProvince?.value) {
        saveObject.State = this.formData.stateProvince?.value;
      }
    } else {
      if (this.formData.stateProvince?.value?.[0]?.state) {
        saveObject.State = this.formData.stateProvince?.value?.[0]?.state;
      }
    }

    // need Building
    if (this.formData.building?.value?.[0]?.buildingID) {
      saveObject.BuildingID = this.formData.building?.value[0].buildingID;
    }

    // need Lease
    if (this.formData.lease?.value?.[0]?.leaseAbstractID) {
      saveObject.LeaseAbstractID =
        this.formData.lease?.value[0].leaseAbstractID;
    }

    if (this.formData.taskTemplate?.value?.[0]?.projectTemplateID) {
      saveObject.ProjectTemplateID =
        this.formData.taskTemplate?.value[0].projectTemplateID;
    }

    saveObject.StartDate = this.formData.taskStartDate?.value
      ? this.formData.taskStartDate.value.toJSON()
      : new Date(Date.now()).toJSON();

    saveObject.CalcDays = !!this.formData.calculateDates?.value;
    saveObject.WorkDaysOnly =
      saveObject.CalcDays && !!this.formData.calculatedBy?.value;
    saveObject.AutoCalc =
      saveObject.CalcDays && !!this.formData.autoCalculate?.value;
    saveObject.TransactionAdjustTimeline =
      saveObject.AutoCalc && !!this.formData.shiftTimeline?.value;
    saveObject.MakePrivate = !!this.formData.isPrivate?.value;

    return saveObject;
  }

  private compareObjectByKey(object1, object2, key) {
    let o1Name = object1?.[key]?.toLowerCase() || '';
    let o2Name = object2?.[key]?.toLowerCase() || '';

    if (o1Name > o2Name) {
      return 1;
    } else if (o1Name < o2Name) {
      return -1;
    }
    return 0;
  }

  private setLoadingCondition(loadCondition) {
    this.loadCondition.emit(loadCondition);
  }

  private buildBuildingDataSource(lookupId: string) {
    return new DataSource({
      paginate: true,
      pageSize: 25,
      searchExpr: 'buildingName',
      searchOperation: 'contains',
      store: new CustomStore({
        key: 'buildingID',
        load: async (loadOptions) => {
          try {
            const params = {
              page: loadOptions.skip / loadOptions.take + 1 || 1,
              pageSize: loadOptions.take || 25,
              searchValue: loadOptions.searchValue || '',
            };
            const result = await this.formWizardService
              .getRenderSelect(
                lookupId,
                73,
                params.searchValue,
                '',
                '',
                '',
                params.page,
                params.pageSize
              )
              .toPromise();

            if (!result.success) {
              return { data: [], totalCount: 0 };
            }

            // Cache every loaded item. "byKey" is required to be defined for the DataSource to work,
            // even if we are not using it to load single items. This is because when an item is selected in the dropdown,
            // it tries to find that item in the cache using "byKey" before displaying it
            (result.data ?? []).forEach((item) =>
              this.loadedBuildings.set(item.buildingID, item)
            );

            return {
              data: result.data,
              // Make devextreme think there are more items to load unless
              // the number of results returned is less than the page size,
              // then we know for sure there are no more items to load and we can stop further calls to the API.
              totalCount:
                result.data?.length < params.pageSize
                  ? loadOptions.skip + result.data.length
                  : loadOptions.skip + loadOptions.take + 100000,
            };
          } catch (error) {
            return { data: [], totalCount: 0 };
          } finally {
            this.setLoadingCondition(false);
          }
        },
        byKey: async (key) => {
          return this.loadedBuildings.get(key) ?? null;
        },
      }),
    });
  }
}
