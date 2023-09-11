import { Component, Input, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormWizardService } from '../services/form-wizard.service';
import { DynamicFormComponent, IForm } from 'libs/ui-shared/lib-ui-elements/src/lib/dynamic-form/dynamic-form.component';
import { forkJoin } from 'rxjs';
import { environment } from '@mangoSpa/src/environments/environment.local';

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
  styleUrls: ['./form-wizard.component.scss']
})
export class FormWizardAppComponent implements OnInit {
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
  public currencyDropdownItem: any = [];
  public showInternalID: boolean;
  public loading = true;
  public dateFormat: string = "MM/dd/yyyy"
  public clientProjectsPrivate: boolean = false;
  public hideClientProjectsPrivate: boolean = true;
  public linkBuildingsLeases: boolean = false;
  public defaultValues: any = {};
  public measureUnit: number;
  public currency : number;
  @Input() objectTypeName: string;
  @Input() objectTypeId: number;
  @Input() objectId: number;
  @Input() userId: number;
  @Output() loadCondition: EventEmitter<any> = new EventEmitter();

  @ViewChild('FormWizardDynamicForm')
  dynamicForm: DynamicFormComponent;

  constructor(
    private formWizardService: FormWizardService
  ) { }
  ngOnInit(): void {
    this.formWizardService.getUserPreferences().subscribe((response) => {
      if (response?.data?.isDatesEU === true) {
        this.dateFormat = "dd.MM.yyyy"
      }
      this.measureUnit = response?.data?.unitOfMeasureId;
      this.currency = response?.data?.currencyId;
      this.getDropdownData();
    })
  

  }

  public getDropdownData() {
    let observableList;

    if (this.objectTypeId === 3 || this.objectTypeId === 4) {
      observableList = forkJoin({
        typeDropdownItem: this.formWizardService.getRenderSelect("1", 23),
        clientDropdownItem: this.formWizardService.getRenderSelect("0", 15),
        templateDropdownItem: this.formWizardService.getRenderSelect("", 18),
        countryDropdownItem: this.formWizardService.getRenderSelect("0", 16),
        teamDropdownItem: this.formWizardService.getRenderSelect("", 19),
        currencyDropdownItem: this.formWizardService.getRenderSelect("", 21),
        measurementsDropdownItem:this.formWizardService.getRenderSelect("", 20),
        clientPreferences: this.formWizardService.getProjectWizardClientPreferences(),
        managerDropdownItem: this.formWizardService.getManagers(0),
        buildingLeaseDefaultInfo: this.formWizardService.getBuildingLeaseDefaultInfo(this.objectId, this.objectTypeId)
      });
    } else {
      observableList = forkJoin({
        typeDropdownItem: this.formWizardService.getRenderSelect("1", 23),
        clientDropdownItem: this.formWizardService.getRenderSelect("0", 15),
        templateDropdownItem: this.formWizardService.getRenderSelect("", 18),
        countryDropdownItem: this.formWizardService.getRenderSelect("0", 16),
        teamDropdownItem: this.formWizardService.getRenderSelect("", 19),
        currencyDropdownItem: this.formWizardService.getRenderSelect("", 21),
        measurementsDropdownItem: this.formWizardService.getRenderSelect("", 20),
        clientPreferences: this.formWizardService.getProjectWizardClientPreferences(),
        managerDropdownItem: this.formWizardService.getManagers(0),
      });
    }
    

    observableList.subscribe((data: any) => {
      this.typeDropdownItem = data.typeDropdownItem.data;
      this.clientDropdownItem = data.clientDropdownItem.data;
      this.templateDropdownItem = data.templateDropdownItem.data;
      this.countryDropdownItem = data.countryDropdownItem.data;
      this.teamDropdownItem = data.teamDropdownItem.data;
      this.currencyDropdownItem = data.currencyDropdownItem.data;
      this.measurementsDropdownItem = data.measurementsDropdownItem.data;
      if (environment.name === 'LOCAL') {
        this.clientProjectsPrivate = false;
        this.showInternalID = true;
        this.defaultValues.calculateDates = true;
        this.defaultValues.calculatedBy = true;
        this.defaultValues.autoCalculate = true;
        this.defaultValues.shiftTimeline = false;
      } else {
        this.clientProjectsPrivate = data.clientPreferences.data?.[0]?.ClientSetupFieldValue === "2"
          || data.clientPreferences.data?.[0]?.ClientSetupFieldValue === "4";
        this.hideClientProjectsPrivate = data.clientPreferences.data?.[0]?.ClientSetupFieldValue === "3"
          || data.clientPreferences.data?.[0]?.ClientSetupFieldValue === "4";
        this.showInternalID = data.clientPreferences.data?.[5]?.ClientSetupFieldValue === "1";
        this.defaultValues.calculateDates = data.clientPreferences.data?.[2]?.ClientSetupFieldValue === "1";
        this.defaultValues.calculatedBy = data.clientPreferences.data?.[6]?.ClientSetupFieldValue === "1";
        this.defaultValues.autoCalculate = data.clientPreferences.data?.[1]?.ClientSetupFieldValue === "1";
        this.defaultValues.shiftTimeline = data.clientPreferences.data?.[4]?.ClientSetupFieldValue === "1";
        this.linkBuildingsLeases = data.clientPreferences.data?.[3]?.ClientSetupFieldValue === "1";
      }
      this.defaultValues.currency = [];
      this.defaultValues.measurements = [];
      this.defaultValues.manager = [];
      this.managerDropdownItem = [];
      if (this.currency !== null) {
        const defaultCurrency = data.currencyDropdownItem.data.find(x => x?.ExchangeRateID == this.currency);
        if (defaultCurrency) {
          this.defaultValues.currency = [defaultCurrency];
        }
      }

      if (this.measureUnit !== null) {
        const defaultMeasureUnit = data.measurementsDropdownItem.data.find(x => x?.MeasureUnitsID == this.measureUnit);
        if (defaultMeasureUnit) {
          this.defaultValues.measurements = [defaultMeasureUnit];
        }
        
      }
      
      if (this.userId !== null) {
        const defaultManager = data.managerDropdownItem.data.find(x => x?.ContactID == this.userId);
        if (defaultManager) {
          this.managerDropdownItem = [defaultManager];
          this.defaultValues.manager = [defaultManager];
        }
      }
      
      this.teamDropdownItem.sort((a, b) => {return this.compareObjectByKey(a, b, "GroupName")});

      if (this.objectTypeId === 3 || this.objectTypeId === 4) {
        const defaultInfo = data.buildingLeaseDefaultInfo?.data?.[0];
        if (defaultInfo) {
          if (defaultInfo.Country) {
            const defaultCountry = this.countryDropdownItem.find((country) => {
              return country.Country === defaultInfo.Country
            })
  
            if (defaultCountry) {
              this.defaultValues.country = [defaultCountry];
  
              let country;
              let noStateCountry
              const isLocal = environment.name === "LOCAL";
              const selectedCountry = this.defaultValues.country[0].Country;
              if (selectedCountry) {
                if (isLocal) {
                  country = selectedCountry;
                  noStateCountry = selectedCountry + "--";
                } else {
                  country = '"' + selectedCountry + '"';
                  noStateCountry = '"' + selectedCountry + "--" + '"';
                }
  
                this.formWizardService.getRenderSelect(country, 17).subscribe((stateData) => {
                  this.stateProvinceDropdownItem = stateData.data;
                  if (stateData?.data?.length === 0) {
                    if (defaultInfo.Country) {
                      this.defaultValues.stateProvince = defaultInfo.State;
                    }
                    
                    this.formWizardService.getRenderSelect(noStateCountry, 73).subscribe((buildingData) => {
                      this.buildingDropdownItem = buildingData.data;
                      this.buildingDropdownItem.sort((a, b) => {return this.compareObjectByKey(a, b, "BuildingName")});
                      const defaultBuilding = this.buildingDropdownItem.find((building) => {
                        return building.BuildingID === defaultInfo.BuildingID
                      })
                      if (defaultBuilding) {
                        this.defaultValues.building = [defaultBuilding]
                        //set lease default
                        const LeaseAbstractID = defaultInfo.LeaseAbstractID;
                        if (LeaseAbstractID) {
                          this.formWizardService.getRenderSelect(defaultInfo.BuildingID, 61).subscribe((data) => {
                            this.leaseDropdownItem = data.data;
                            this.leaseDropdownItem.sort((a, b) => {return this.compareObjectByKey(a, b, "LeaseName")});
                            const defaultLease = this.leaseDropdownItem.find((lease) => {
                              return lease.LeaseAbstractID === defaultInfo.LeaseAbstractID
                            })
                            if (defaultLease) {
                              this.defaultValues.lease = [defaultLease]
                            }
                            this.buildFormConfig();
                          })
                        } else {
                          this.formWizardService.getRenderSelect(defaultInfo.BuildingID, 61).subscribe((data) => {
                            this.leaseDropdownItem = data.data;
                            this.buildFormConfig();
                          });
                        }
                      } else {
                        this.buildFormConfig();
                      }
                    });                   
                  } else {
                    const defaultState = this.stateProvinceDropdownItem.find((state) => {
                      return state.State === defaultInfo.State
                    })
                    
                    if (defaultState) {
                      this.defaultValues.stateProvince = [defaultState];
  
                      //set building default
                      let countryState
                      const countryName = defaultInfo.Country
                      const stateName = defaultInfo.State                   
    
                      if (isLocal) {
                        countryState = countryName + "--" + stateName;
                      } else {
                        countryState = '"' + countryName + "--" + stateName + '"'
                      }
                      this.formWizardService.getRenderSelect(countryState, 73).subscribe((data) => {
                        this.buildingDropdownItem = data.data;
                        this.buildingDropdownItem.sort((a, b) => {return this.compareObjectByKey(a, b, "BuildingName")});
                        const defaultBuilding = this.buildingDropdownItem.find((building) => {
                          return building.BuildingID == defaultInfo.BuildingID
                        })
                        if (defaultBuilding){
                          this.defaultValues.building = [defaultBuilding]
                          //set lease default
                          const LeaseAbstractID = defaultInfo.LeaseAbstractID;
    
                          this.formWizardService.getRenderSelect(defaultInfo.BuildingID, 61).subscribe((data) => {
                            this.leaseDropdownItem = data.data;
                            this.leaseDropdownItem.sort((a, b) => {return this.compareObjectByKey(a, b, "LeaseName")});                       
                            
                            if (LeaseAbstractID) {
                              const defaultLease = this.leaseDropdownItem.find((lease) => {
                                return lease.LeaseAbstractID == defaultInfo.LeaseAbstractID
                              })
                              if (defaultLease) {
                                this.defaultValues.lease = [defaultLease]
                              }
                              this.buildFormConfig();
                            } else {
                              this.buildFormConfig();
                            }
                          })
                        } else {
                          this.buildFormConfig();
                        }
                        
                      })
                    } else {
                      this.buildFormConfig();
                    }
                                      
                  }
                })
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
    });
  }

  public buildFormConfig() {
    this.formConfig = {
      section: [
        {
          sectionTitle: this.objectTypeName + " Details",
          sectionId: "project_details",
          formObjects: [
            {
              sectionItems: [
                {
                  dataField: "name",
                  fieldType: "text",
                  caption: "Name",
                  maxLengthMessage: "Character limit of 100 reached.",
                  maxLength: 100,
                  required: true,
                  disabled: false,
                  initialFocus: true
                },
                {
                  dataField: "type",
                  fieldType: "dropdown",
                  caption: "Type",
                  required: true,
                  displayExpr: "ObjectTypeTypeName",
                  valueExpr: "ObjectTypeTypeID",
                  dataSource: this.typeDropdownItem,
                  hoverText: "Select the type of the project",
                  disabled: false
                },
                {
                  dataField: "subtype",
                  fieldType: "dropdown",
                  caption: "Subtype",
                  displayExpr: "ObjectTypeTypeName",
                  valueExpr: "ObjectTypeTypeID",
                  required: false,
                  dataSource: [],
                  hoverText: "Select the subtype of the project",
                  disabled: false
                },
                {
                  dataField: "team",
                  fieldType: "dropdown",
                  caption: "Team",
                  displayExpr: "GroupName",
                  valueExpr: "GroupID",
                  required: false,
                  hoverText: "Select the team of the project",
                  dataSource: this.teamDropdownItem,
                  disabled: false
                },
                {
                  dataField: "manager",
                  fieldType: "dropdown",
                  caption: "Manager",
                  displayExpr: "ContactName",
                  valueExpr: "ContactID",
                  required: false,
                  dataSource: this.managerDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.manager,
                  hoverText: "Select the manager of the project",
                  defaultValue: this.defaultValues?.manager
                },
                {
                  dataField: "client",
                  fieldType: "dropdown",
                  caption: "Client",
                  displayExpr: "CompanyName",
                  valueExpr: "CompanyID",
                  required: true,
                  dataSource: this.clientDropdownItem,
                  hoverText: "Select the client of the project",
                  disabled: false
                },
                {
                  dataField: "businessUnit",
                  fieldType: "dropdown",
                  caption: "Business Unit",
                  required: false,
                  displayExpr: "CompanyBusinessUnitName",
                  valueExpr: "CompanyBusinessUnitID",
                  dataSource: this.businessUnitDropdownItem,
                  hoverText: "Select the business unit of the project",
                  disabled: false
                },
              ],
            },
            {
              sectionItems: [
                {
                  dataField: "TransactionInternalID",
                  fieldType: "text",
                  caption: "Internal ID",
                  maxLengthMessage: "Character limit of 50 reached.",
                  maxLength: 50,
                  required: false,
                  disabled: false,
                  hidden: this.showInternalID !== true
                },
                {
                  dataField: "MeasureUnitID",
                  fieldType: "dropdown",
                  caption: "Measurements",
                  required: true,
                  displayExpr: "MeasureArea",
                  valueExpr: "MeasureUnitsID",
                  dataSource: this.measurementsDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.measurements,
                  hoverText: "Select the measurements of the project",
                  defaultValue: this.defaultValues?.measurements
                },
                {
                  dataField: "CurrencyID",
                  fieldType: "dropdown",
                  caption: "Currency",
                  required: true,
                  displayExpr: "TargetCurrencyDesc",
                  valueExpr: "ExchangeRateID",
                  dataSource: this.currencyDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.currency,
                  hoverText: "Select the currency of the project",
                  defaultValue: this.defaultValues?.currency
                },
                {
                  dataField: "country",
                  fieldType: "dropdown",
                  caption: "Country",
                  required: true,
                  displayExpr: "Country",
                  valueExpr: "Country",
                  dataSource: this.countryDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.country,
                  hoverText: "Select the country of the project",
                  defaultValue: this.defaultValues?.country
                },
                {
                  dataField: "stateProvince",
                  fieldType: "customCombination",
                  caption: "State/Province",
                  displayExpr: "State",
                  valueExpr: "State",
                  maxLengthMessage: "Character limit of 50 reached.",
                  maxLength: 50,
                  required: false,
                  dataSource: this.stateProvinceDropdownItem,
                  disabled: false,
                  combinationType: this.stateProvinceDropdownItem?.length > 0 ? 'dropdown' : 'text',
                  value: this.defaultValues?.stateProvince,
                  hoverText: "Select the state/province of the project",
                  defaultValue: this.defaultValues?.stateProvince
                },
                {
                  dataField: "building",
                  fieldType: "dropdown",
                  caption: "Link with building?",
                  displayExpr: "BuildingName",
                  valueExpr: "BuildingID",
                  required: false,
                  hidden: !this.linkBuildingsLeases && !(this.objectTypeId === 3 || this.objectTypeId === 4),
                  dataSource: this.buildingDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.building,
                  hoverText: "Link a building with this project",
                  defaultValue: this.defaultValues?.building
                },
                {
                  dataField: "lease",
                  fieldType: "dropdown",
                  displayExpr: "LeaseName",
                  valueExpr: "LeaseAbstractID",
                  caption: "Link with lease?",
                  hidden: !this.linkBuildingsLeases  && !(this.objectTypeId === 3 || this.objectTypeId === 4),
                  dataSource: this.leaseDropdownItem,
                  disabled: false,
                  value: this.defaultValues?.lease,
                  hoverText: "Link a lease with this project",
                  defaultValue: this.defaultValues?.lease
                }
              ]
            }
          ]
        },
        {
          sectionTitle: "Task Details",
          sectionId: "task_details",
          formObjects: [
            {
              sectionItems: [
                {
                  dataField: "taskTemplate",
                  fieldType: "dropdown",
                  caption: "Task Template",
                  hoverText: "Select the task template of the project",
                  displayExpr: "ProjectTemplateName",
                  valueExpr: "ProjectTemplateID",
                  required: false,
                  dataSource: this.templateDropdownItem,
                  disabled: true
                },
                {
                  dataField: "taskStartDate",
                  fieldType: "date",
                  caption: "Task Start Date",
                  showClearButton: true,
                  disabled: false,
                  required: true,
                  value: new Date(),
                  defaultValue: new Date()
                  
                },
                {
                  dataField: "isPrivate",
                  fieldType: "checkbox",
                  caption: "Make Private?",
                  textDisplay: "Note: If left unchecked, your group will receive view rights to this project. You will be able to override this when adding team members by turning on or off sharing with group for each team member.",
                  textDisplayFontSize: 10,
                  value: !!this.clientProjectsPrivate,
                  hidden: this.hideClientProjectsPrivate,
                  required: false,
                  disabled: false,
                  defaultValue: !!this.clientProjectsPrivate
                },
              ],
            },
            {
              subSectionId: "calculate_date_section",
              sectionItems: [
                {
                  dataField: "calculateDates",
                  fieldType: "toggle",
                  trueDisplay: "Yes",
                  falseDisplay: "No",
                  caption: "Calculate Dates?",
                  value: !!this.defaultValues?.calculateDates,
                  disabled: false,
                  defaultValue: !!this.defaultValues?.calculateDates
                },
                {
                  dataField: "calculatedBy",
                  fieldType: "toggle",
                  trueDisplay: "Work Days Only",
                  falseDisplay: "All Calendar Days",
                  caption: "Calculated By:",
                  value: !!this.defaultValues?.calculatedBy,
                  hidden: !this.defaultValues?.calculateDates,
                  disabled: false,
                  defaultValue: !!this.defaultValues?.calculatedBy
                },
                {
                  dataField: "autoCalculate",
                  fieldType: "toggle",
                  trueDisplay: "Yes",
                  falseDisplay: "No",
                  caption: "Auto Calculate?",
                  value: !!this.defaultValues?.autoCalculate,
                  hidden: !this.defaultValues?.calculateDates,
                  disabled: false,
                  defaultValue: !!this.defaultValues?.autoCalculate
                },
                {
                  dataField: "shiftTimeline",
                  fieldType: "toggle",
                  caption: "Shift Timeline?",
                  trueDisplay: "Yes",
                  falseDisplay: "No",
                  value: !!this.defaultValues?.shiftTimeline,
                  hidden: !this.defaultValues?.autoCalculate || !this.defaultValues?.calculateDates,
                  disabled: false,
                  defaultValue: !!this.defaultValues?.shiftTimeline
                }
              ]
            }
          ]
        }
      ]
    }
    this.loading = false;
    this.setLoadingCondition(false);
  }

  public onChange(config) {
    let selectedId
    const isLocal = environment.name === "LOCAL";
    switch (config.dataField) {
      case "calculateDates":
        if (config.values[config.dataField]?.value === true) {
          config.values['autoCalculate'].hidden = false;
          config.values['calculatedBy'].hidden = false;
          config.values['shiftTimeline'].hidden = !config.values['autoCalculate'].value;
        } else {
          config.values['shiftTimeline'].hidden = true;
          config.values['autoCalculate'].hidden = true;
          config.values['calculatedBy'].hidden = true;
          config.values['shiftTimeline'].value = config.values['shiftTimeline'].defaultValue;
          config.values['autoCalculate'].value = config.values['autoCalculate'].defaultValue;
          config.values['calculatedBy'].value = config.values['calculatedBy'].defaultValue;
        }
        break;
      case "autoCalculate":
        if (config.values[config.dataField]?.value === true) {
          config.values['shiftTimeline'].hidden = false;
        } else {
          config.values['shiftTimeline'].hidden = true;
          config.values['shiftTimeline'].value = config.values['shiftTimeline'].defaultValue;
        }
        break;
      case "type":
        selectedId = config?.values?.type?.value?.[0]?.ObjectTypeTypeID;
        if (selectedId) {
          this.setLoadingCondition(true);
          this.formWizardService.getRenderSelect(selectedId, 13).subscribe((data) => {
            this.subTypeDropdownItem = data.data;
            config.values['subtype'].dataSource = this.subTypeDropdownItem;
            this.formWizardService.getRenderSelect(selectedId, 38).subscribe((data) => {
              this.templateDropdownItem = data.data;
              config.values['taskTemplate'].dataSource = this.templateDropdownItem;
              config.values['taskTemplate'].disabled = false;
            })
          this.setLoadingCondition(false);
          })
        } else {
          config.values['subtype'].dataSource = [];
        }
        config.values['subtype'].value = [];
        break;
      case "country":
        selectedId = config?.values?.country?.value?.[0]?.Country;
        let country;
        let noStateCountry
        if (selectedId) {
          if (isLocal) {
            country = selectedId;
            noStateCountry = selectedId + "--";
          } else {
            country = '"' + selectedId + '"';
            noStateCountry = '"' + selectedId + "--" + '"';
          }
          this.setLoadingCondition(true);
          this.formWizardService.getRenderSelect(country, 17).subscribe((data) => {
            this.stateProvinceDropdownItem = data.data;
            config.values['stateProvince'].dataSource = this.stateProvinceDropdownItem;
            config.values['building'].dataSource = [];
            if (data?.data?.length === 0) {
              this.formWizardService.getRenderSelect(noStateCountry, 73).subscribe((data) => {
                this.buildingDropdownItem = data.data;
                this.buildingDropdownItem.sort((a, b) => {return this.compareObjectByKey(a, b, "BuildingName")});
                config.values['building'].dataSource = this.buildingDropdownItem;
                this.setLoadingCondition(false);
              });
              config.values['stateProvince'].combinationType = "text";
              config.values['stateProvince'].value = '';
            } else {
              config.values['stateProvince'].combinationType = "dropdown";
              config.values['stateProvince'].value = [];
              this.setLoadingCondition(false);
            }
          })
        } else {
          config.values['stateProvince'].value = '';
          config.values['stateProvince'].dataSource = [];
          config.values['building'].dataSource = [];
          config.values['lease'].dataSource = [];
        }
        
        config.values['building'].value = [];
        config.values['lease'].value = [];
        
        break;
      case "client":
        selectedId = config?.values?.client?.value?.[0]?.CompanyID;
        if (selectedId) {
          this.setLoadingCondition(true);
          this.formWizardService.getRenderSelect(selectedId, 58).subscribe((data) => {
            this.businessUnitDropdownItem = data.data;
            config.values['businessUnit'].dataSource = this.businessUnitDropdownItem;
            this.setLoadingCondition(false);
          })
        } else {
          config.values['businessUnit'].dataSource = [];
        }
        config.values['businessUnit'].value = [];
        break;
      case "stateProvince":
        let countryState
        const countryName = config?.values?.country?.value?.[0]?.Country;
        const stateName = config?.values?.stateProvince?.value?.[0]?.State;
        
        if (config.values['stateProvince'].combinationType === "text") {
          break;
        }
        

        if (isLocal) {
          countryState = countryName + "--" + stateName;
        } else {
          countryState = '"' + countryName + "--" + stateName + '"'
        }
        if (countryName && stateName) {
          this.setLoadingCondition(true);
          this.formWizardService.getRenderSelect(countryState, 73).subscribe((data) => {
            this.buildingDropdownItem = data.data;
            this.buildingDropdownItem.sort((a, b) => {return this.compareObjectByKey(a, b, "BuildingName")});
            config.values['building'].dataSource = this.buildingDropdownItem;
            this.setLoadingCondition(false);
          })
        } else {
          config.values['building'].dataSource = [];
        }
        config.values['building'].value = [];
        break;
      case "building":
        selectedId = config?.values?.building?.value?.[0]?.BuildingID;
        if (selectedId) {
          this.setLoadingCondition(true);
          this.formWizardService.getRenderSelect(selectedId, 61).subscribe((data) => {
            this.leaseDropdownItem = data.data;
            this.leaseDropdownItem.sort((a, b) => {return this.compareObjectByKey(a, b, "LeaseName")});
            config.values['lease'].dataSource = this.leaseDropdownItem;
            this.setLoadingCondition(false);
          })
        } else {
          config.values['lease'].dataSource = [];
        }
        config.values['lease'].value = [];
        break;
      case "team":
        selectedId = config?.values?.team?.value?.[0]?.GroupID;
        if (selectedId) {
          this.setLoadingCondition(true);
          this.formWizardService.getManagers(selectedId).subscribe((data) => {
            this.managerDropdownItem = data.data;
            this.managerDropdownItem.sort((a, b) => {return this.compareObjectByKey(a, b, "ContactName")});
            config.values['manager'].dataSource = this.managerDropdownItem;
            this.setLoadingCondition(false);
          }) 
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
    if (this.formData.name?.value && (typeof this.formData.name.value === 'string')) {
      this.formData.name.value = this.formData.name?.value?.trim();
    }

    if (this.formData.TransactionInternalID?.value && (typeof this.formData.TransactionInternalID.value === 'string')) {
      this.formData.TransactionInternalID.value = this.formData.TransactionInternalID?.value?.trim();
    }

    if (this.formData.stateProvince?.value && (typeof this.formData.stateProvince.value === 'string') && this.formData.stateProvince.combinationType === "text") {
      this.formData.stateProvince.value = this.formData.stateProvince?.value?.trim();
    }
  }

  public validate() {
    const validate = this.dynamicForm.validate();
    return validate;
  }

  public clearForm() {
    this.dynamicForm.clearForm();
    this.formConfig.section[1].formObjects[1].sectionItems.forEach(toggle => {
      if (toggle.dataField !== 'calculateDates') {
        toggle.hidden = true;
      }
    })
    this.formData.MakePrivate = this.clientProjectsPrivate;
  }

  public getSaveObject() {
    const saveObject: ISaveObject = {}
    
    if (this.formData.name?.value) {
      saveObject.TaskName = this.formData.name?.value;
    }

    if (this.formData.TransactionInternalID?.value) {
      saveObject.TransactionInternalID = this.formData.TransactionInternalID?.value;
    }

    if (this.formData.type?.value?.[0]?.ObjectTypeTypeID) {
      saveObject.TaskType = this.formData.type?.value?.[0]?.ObjectTypeTypeID;
    }

    if (this.formData.subtype?.value?.[0]?.ObjectTypeTypeID) {
      saveObject.TransactionSubTaskType = this.formData.subtype?.value?.[0]?.ObjectTypeTypeID;
    }

    if (this.formData.client?.value?.[0]?.CompanyID) {
      saveObject.CompanyID = this.formData.client?.value?.[0]?.CompanyID;
    }

    if (this.formData.team?.value?.[0]?.GroupID) {
      saveObject.GroupID = this.formData.team?.value?.[0]?.GroupID;
    }

    if (this.formData.manager?.value?.[0]?.ContactID) {
      saveObject.ManagerContactID = this.formData.manager?.value?.[0]?.ContactID;
    }

    if (this.formData.businessUnit?.value?.[0]?.CompanyBusinessUnitID) {
      saveObject.CompanyBusinessUnitID = this.formData.businessUnit?.value?.[0]?.CompanyBusinessUnitID;
    }

    if (this.formData.MeasureUnitID?.value?.[0]?.MeasureUnitsID) {
      saveObject.MeasureUnitID = this.formData.MeasureUnitID?.value?.[0]?.MeasureUnitsID;
    }

    if (this.formData.CurrencyID?.value?.[0]?.ExchangeRateID) {
      saveObject.CurrencyID = this.formData.CurrencyID?.value?.[0]?.ExchangeRateID;
    }

    if (this.formData.country?.value?.[0]?.Country) {
      saveObject.Country = this.formData.country?.value?.[0]?.Country;
    }

    if (this.formData.stateProvince.combinationType === "text") {
      if (this.formData.stateProvince?.value) {
        saveObject.State = this.formData.stateProvince?.value;
      }
    } else {
      if (this.formData.stateProvince?.value?.[0]?.State) {
        saveObject.State = this.formData.stateProvince?.value?.[0]?.State;
      }
    }
    

    // need Building
    if (this.formData.building?.value?.[0]?.BuildingID) {
      saveObject.BuildingID = this.formData.building?.value[0].BuildingID
    }

    // need Lease
    if (this.formData.lease?.value?.[0]?.LeaseAbstractID) {
      saveObject.LeaseAbstractID = this.formData.lease?.value[0].LeaseAbstractID
    }

    if (this.formData.taskTemplate?.value?.[0]?.ProjectTemplateID) {
      saveObject.ProjectTemplateID = this.formData.taskTemplate?.value[0].ProjectTemplateID;
    }
    
    
    saveObject.StartDate = this.formData.taskStartDate?.value ? this.formData.taskStartDate.value.toJSON() : new Date(Date.now()).toJSON();
    

    saveObject.CalcDays = !!this.formData.calculateDates?.value;
    saveObject.WorkDaysOnly = saveObject.CalcDays && !!this.formData.calculatedBy?.value;
    saveObject.AutoCalc = saveObject.CalcDays && !!this.formData.autoCalculate?.value;
    saveObject.TransactionAdjustTimeline = saveObject.AutoCalc && !!this.formData.shiftTimeline?.value;
    saveObject.MakePrivate = !!this.formData.isPrivate?.value;

    return saveObject;
  }

  private compareObjectByKey(object1, object2, key) {
    let o1Name = object1?.[key]?.toLowerCase() || "";
    let o2Name = object2?.[key]?.toLowerCase() || "";
    
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
}
