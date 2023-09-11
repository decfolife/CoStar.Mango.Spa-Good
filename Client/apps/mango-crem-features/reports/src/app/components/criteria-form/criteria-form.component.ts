/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportsService } from '@reports/services/reports.service';
import { DynamicFormComponent, IForm } from 'libs/ui-shared/lib-ui-elements/src/lib/dynamic-form/dynamic-form.component';
import notify from 'devextreme/ui/notify';
import { DropdownComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/dropdown/dropdown.component';

@Component({
  selector: 'mango-criteria-form',
  templateUrl: './criteria-form.component.html',
  styleUrls: ['./criteria-form.component.scss']
})
export class CriteriaFormComponent {

    @Input() criteriaSetId: number;
    @Input() isReportCriteriaSet: boolean;
    @Input() defaultValues: any;
    @Input() readOnly: boolean;
    @Input() idPrefix: string = "criteriaForm";
    @Output() loadingCallback = new EventEmitter<boolean>();
    @Output() onFormItemChange = new EventEmitter<boolean>();
    @Output() onCriteriaLoadedChange = new EventEmitter<boolean>();
    public dependentCriteriaConfig: IForm;
    public criteriaConfig: IForm;
    public portfolioConfig: IForm;
    public portfolioSelected: boolean = true;
    public addSegment: boolean = false;
    public portfolioData: any = [];
    public loading: boolean = true;
    public criteriaLoading: boolean = true;
    public dependentCriteriaLoading: boolean = true;
    public isItemSelected: boolean = false;
    public isDependentItemSelected: boolean = false;
    public dropdownKey: any = {};
    public dependentDropdownKey: any = {};
    public saveObject: any = {};
    public reportProcessingPage: string;
    public reportObject: string;
    public selectedPortfolio: number;
    public isSegment: boolean = false;
    public portfolioSelectionModified: boolean = false;
    public criteriaDataFieldKey: any = {};
    @ViewChild('SegmentPortfolioDropdown') segmentPortfolioDropdown: DropdownComponent;
    @ViewChild('CriteriaDynamicForm') criteriaDynamicForm: DynamicFormComponent;
    @ViewChild('DependentCriteriaDynamicForm') dependentCriteriaDynamicForm: DynamicFormComponent;
    @ViewChild('PortfolioForm') portfolioForm: DynamicFormComponent;
    constructor(
        private reportsService: ReportsService,
    ) { }

    ngOnInit(): void {
        this.reportsService.getPortfolios().subscribe((result) => {
            this.portfolioData = result.data;
            this.setconfigObjects();
        })
    }

    public setconfigObjects() {
        this.loading = true;
        let selectedPortfolioIndex;
        if (this.defaultValues) {
            selectedPortfolioIndex = this.portfolioData.find((portfolio) => {
                return portfolio.masterGroupID === this.defaultValues.PortfolioID;
            })
        }
        this.portfolioConfig = {
            section: [
                {
                sectionId: "Portfolio",
                hideBorder: true,
                colCount: 2,
                formObjects: [
                    {
                    sectionItems: [
                        {
                        dataField: "PortfolioID",
                        fieldType: "custom",
                        caption: "Portfolio",
                        required: true,
                        displayExpr: "companyName",
                        valueExpr: "masterGroupID",
                        customRequireValidation: true,
                        dataSource: this.portfolioData,
                        selectMode: "single",
                        hoverText: "Select the portfolio of the project",
                        disabled: false,
                        value: selectedPortfolioIndex ? [selectedPortfolioIndex] : []
                        },
                    ],
                    }
                ]
                }
            ]
        };
        if (selectedPortfolioIndex) {
            this.onDropdownChange({values: {PortfolioID: {value: [selectedPortfolioIndex]}}})
        } else if (!this.isReportCriteriaSet) {
            this.onDropdownChange({values: { IsReportCriteriaSet: {value: false}}})
        }
        this.loading = false;
        this.setLoadingCallback(false);
    }

    public onChange(config) {
        this.isItemSelected = this.criteriaDynamicForm?.isItemSelected();
        this.portfolioSelected = this.portfolioConfig.section[0].formObjects[0].sectionItems[0].value?.length || (!this.isReportCriteriaSet && this.isDependentItemSelected);
        if (this.portfolioConfig.section[0].formObjects[0].sectionItems[0].value?.length) {
            this.portfolioSelectionModified = true;
        }
        this.onFormItemChange.emit(this.isItemSelected || this.portfolioSelected);
    }

    public onDependentChange(config) {
        this.criteriaLoading = true;
        this.setLoadingCallback(true);
        this.onCriteriaLoadedChange.emit(true);
        this.isDependentItemSelected = this.dependentCriteriaDynamicForm?.isItemSelected();
        var isReportCriteria = true;
        if (this.isDependentItemSelected && config !== null) {
            const config = this.dependentCriteriaDynamicForm.getConfig();
            let saveObject = [];
            //This needs to be reworked to not be hardcoded asap
            if (this.criteriaSetId == 8 || this.criteriaSetId == 9) {
                isReportCriteria = false;
            }
            saveObject = this.getSaveObject(config, saveObject, true);
            this.reportsService.getCriteria(this.criteriaSetId, this.selectedPortfolio, saveObject, isReportCriteria).subscribe((result) => {
                if (result.data) {
                    this.setCriteriaFields(result.data, false);
                }
            });
        } else {
            this.setLoadingCallback(false);
        }
    }

    public clearPortfolioDropdown() {
        this.segmentPortfolioDropdown.clearSelectBox();
    }

    public onDropdownChange(event) {
        if (event.values.PortfolioID) {
            const portfolioItem = event.values.PortfolioID.value;
            this.portfolioConfig.section[0].formObjects[0].sectionItems[0].value = event.values.PortfolioID.value;

            setTimeout(() => {
                if (portfolioItem?.length) {
                    setTimeout(() => {
                        this.criteriaLoading = true;
                        this.setLoadingCallback(true);
                        this.onCriteriaLoadedChange.emit(true);
                        this.onFormItemChange.emit(true)
                        this.dependentCriteriaLoading = true;
                        this.selectedPortfolio = portfolioItem[0].masterGroupID;
                        this.reportsService.getNonDependentCriteria(this.criteriaSetId, this.selectedPortfolio).subscribe((result) => {
                            this.dropdownKey = {};
                            this.dependentDropdownKey = {};
                            if (result.data?.dependentCriteriaCount > 0) {
                                this.setCriteriaFields(result.data?.criteria, true)
                            } else {
                                this.setCriteriaFields(result.data?.criteria, false)
                            }
                            
                        })
                    })
    
                } else if (this.selectedPortfolio !== 0){
                    setTimeout(() => {
                        this.selectedPortfolio = 0;
                        this.setLoadingCallback(false);
                        this.onCriteriaLoadedChange.emit(false);
                        this.onFormItemChange.emit(false);
                        this.dependentCriteriaLoading = true;
                        this.criteriaLoading = true;
                    })
    
                }
            })

        } else if (event.values.IsReportCriteriaSet) {
            setTimeout(() => {
                this.criteriaLoading = true;
                this.setLoadingCallback(true);
                this.onCriteriaLoadedChange.emit(true);
                this.onFormItemChange.emit(true)
                this.dependentCriteriaLoading = true;
                this.reportsService.getNonDependentCriteria(this.criteriaSetId, -1).subscribe((result) => {
                    this.dropdownKey = {};
                    this.dependentDropdownKey = {};
                    if (result.data?.dependentCriteriaCount > 0) {
                        this.setCriteriaFields(result.data?.criteria, true)
                    } else {
                        this.setCriteriaFields(result.data?.criteria, false)
                    }
                    
                })
            })
        }
    }

    public setCriteriaFields(criteriaItem, isDependent: boolean) {
        if (isDependent) {
            this.dependentCriteriaConfig = {
                section: [
                    {
                        sectionId: "DependentCriteria",
                        colCount: 2,
                        hideBorder: true,
                        formObjects: [
                            {
                            sectionItems: []
                            }
                        ]
                    }
                ]
            }
        } else {
            this.criteriaConfig = {
                section: [
                    {
                        sectionId: "Criteria",
                        colCount: 2,
                        hideBorder: true,
                        formObjects: [
                            {
                            sectionItems: []
                            }
                        ]
                    }
                ]
            }
        }

        let skipNextItem = false;
        criteriaItem.forEach((item, index) => {
            if (!skipNextItem) {
                let itemObject;
                if (item.criteriaControlType === "LISTBOX") {
                    let valueKey = item.criteriaSourceFieldName
                    let displayName= item.criteriaSourceDisplayFieldName
                    if (item.values?.length) {
                        if (item.values?.[0]?.[valueKey.toUpperCase()] || item.values?.[1]?.[valueKey.toUpperCase()]){
                            valueKey = valueKey.toUpperCase();
                            displayName = displayName.toUpperCase();
                        }
                    }
                    if (isDependent) {
                        this.dependentDropdownKey[item.criteriaID] = valueKey;
                        this.dropdownKey[item.criteriaID] = valueKey;
                    } else {
                        this.dropdownKey[item.criteriaSourceFieldName] = valueKey;
                    }

                    if (item.criteriaAllowMultiSelect) {
                        //multi select dropdown
                        let defaultValueArray = [];
                        if (this.defaultValues?.[item.criteriaID]) {
                            if (Array.isArray(this.defaultValues?.[item.criteriaID])) {
                                defaultValueArray = this.defaultValues?.[item?.criteriaID];
                            } else {
                                defaultValueArray = this.defaultValues?.[item?.criteriaID].split(",");
                            }
                        }
                        
                        
                        itemObject = {
                            dataField: isDependent ? item.criteriaID : item.criteriaSourceFieldName,
                            fieldType: "dropdown",
                            caption: item.criteriaDesc,
                            required: false,
                            displayExpr: displayName,
                            valueExpr: valueKey,
                            dataSource: item.values,
                            selectMode: "multiple",
                            hoverText: "Select the " + item.criteriaDesc +" of the project",
                            disabled: false,
                            value: defaultValueArray ? defaultValueArray : [],
                            data: {
                                criteriaID: item.criteriaID
                            }
                        }
                        if (this.defaultValues) {
                            this.defaultValues[item.criteriaID] = "";
                        }
                        
                    } else {
                        //single select dropdown

                        const selectedIndex = item.values.find((object) => {
                            return object[valueKey]?.toString() === this.defaultValues?.[item.criteriaID]?.toString();
                        })

                        itemObject = {
                            dataField: isDependent ? item.criteriaID : item.criteriaSourceFieldName,
                            fieldType: "dropdown",
                            caption: item.criteriaDesc,
                            required: false,
                            displayExpr: displayName,
                            valueExpr: valueKey,
                            dataSource: item.values,
                            selectMode: "single",
                            hoverText: "Select the " + item.criteriaDesc +" of the project",
                            disabled: false,
                            value: selectedIndex ? [selectedIndex] : [],
                            data: {
                                criteriaID: item.criteriaID
                            }
                        }
                        if (this.defaultValues?.[item.criteriaID]) {
                            this.defaultValues[item.criteriaID] = [];
                        }
                    }  

                } else if (item.criteriaControlType === "TEXTBOX" && item.criteriaDataType === "7") {
                    if (criteriaItem?.[index + 1]?.criteriaControlType === "TEXTBOX" && criteriaItem?.[index + 1]?.criteriaDataType === "7") {
                        //combo datebox
                        itemObject = {
                            dataField: isDependent ? item.criteriaID : item.criteriaSourceFieldName,
                            dataField1: isDependent ? item.criteriaID : item.criteriaSourceFieldName,
                            dataField2: isDependent ? criteriaItem?.[index + 1].criteriaID : criteriaItem?.[index + 1].criteriaSourceFieldName,
                            dataField1Caption: item.criteriaDesc,
                            dataField2Caption: criteriaItem?.[index + 1].criteriaDesc,
                            fieldType: "toFromDate",
                            caption: item.criteriaDesc,
                            required: false,
                            disabled: false,
                            hideLabel: true,
                            value: null,
                            value1: this.defaultValues ? this.defaultValues[item.criteriaID]: undefined,
                            value2: this.defaultValues ? this.defaultValues[criteriaItem?.[index + 1].criteriaID] : undefined,
                            data: {
                                criteriaID1: item.criteriaID,
                                criteriaID2: criteriaItem?.[index + 1].criteriaID
                            }
                        }
                        if (this.defaultValues) {
                            this.defaultValues[item.criteriaID] = undefined;
                            this.defaultValues[criteriaItem?.[index + 1].criteriaID] = undefined
                        }

                        skipNextItem = true;
                    } else {
                        //single datebox
                        itemObject = {
                            dataField: isDependent ? item.criteriaID : item.criteriaSourceFieldName,
                            fieldType: "date",
                            caption: item.criteriaDesc,
                            showClearButton: true,
                            disabled: false,
                            required: false,
                            value: this.defaultValues ? this.defaultValues[item.criteriaID]: undefined,
                            data: {
                                criteriaID: item.criteriaID
                            }
                        }
                        if (this.defaultValues) {
                            this.defaultValues[item.criteriaID] = undefined
                        }
                    }

                } else if (item.criteriaControlType === "HIDDEN") {
                    //do nothing
                } else {
                    //textbox
                    itemObject = {
                        dataField: isDependent ? item.criteriaID : item.criteriaSourceFieldName,
                        fieldType: "text",
                        caption: item.criteriaDesc,
                        required: false,
                        value: this.defaultValues ? this.defaultValues[item.criteriaID]: undefined,
                        disabled: false,
                        data: {
                            criteriaID: item.criteriaID
                        }
                    }
                    if (this.defaultValues) {
                        this.defaultValues[item.criteriaID] = undefined
                    }
                }
                if (itemObject && !isDependent) {
                    this.criteriaConfig.section[0].formObjects[0].sectionItems.push(itemObject)
                } else if (itemObject && isDependent) {
                    this.dependentCriteriaConfig.section[0].formObjects[0].sectionItems.push(itemObject)
                }
            } else {
                skipNextItem = false;
            }
        })

        if (isDependent) {
            setTimeout(() => {
                this.dependentCriteriaLoading = false;
                this.setLoadingCallback(false);
                setTimeout(() => {
                    this.onDependentChange(null);
                })
            })
        } else {
            setTimeout(() => {
                this.criteriaLoading = false;
                this.setLoadingCallback(false);
                this.onCriteriaLoadedChange.emit(false);
                setTimeout(() => {
                    this.onChange(null);
                })
                
            })
        }
        
    }

    public onDependentLoading(event) {
        if (!event) {
            if (this.defaultValues) {
                this.onDependentChange({})
            }
        }
    }

    public setSegmentCondition() {
        this.addSegment = !this.addSegment
    }

    public getSaveObject(config, saveObject, isDependent) {
        Object.keys(config).forEach((item) => {
            let saveItem = {};
            if (config[item].fieldType === 'toFromDate') {
                let saveItem1 = {};
                let saveItem2 = {};
                if (!isDependent) {
                    saveItem1 = {
                        FieldName: config[item].dataField1,
                        DateData: config[item].value1?.toString() ||  null
                    }
    
                    saveItem2 = {
                        FieldName: config[item].dataField2,
                        DateData: config[item].value2?.toString() ||  null
                    }
                } else {
                    saveItem1 = {
                        CriteriaID: config[item].dataField1,
                        Values: config[item].value1?.toString() ||  null
                    }
    
                    saveItem2 = {
                        CriteriaID: config[item].dataField2,
                        Values: config[item].value2?.toString() ||  null
                    }
                }

                saveObject.push(saveItem1);
                saveObject.push(saveItem2);
            } else if (config[item].fieldType==='date') {
                if (!isDependent) {
                    let saveItem = {
                        FieldName: config[item].dataField,
                        DateData: config[item].value?.toString()
                    }
                } else {
                    let saveItem = {
                        CriteriaID: config[item].dataField,
                        Values: config[item].value?.toString()
                    }
                }
                
                saveObject.push(saveItem);
            } else if (config[item].fieldType === 'dropdown') {
                if (config[item].selectMode === 'single') {
                    if (!isDependent) {
                        saveItem = {
                            FieldName: config[item].dataField,
                            VarCharData: config[item].value?.length ? config[item].value[0][this.dropdownKey[item]]?.toString() : null
                        }
                    } else {
                        saveItem = {
                            CriteriaID: config[item].dataField,
                            Values: config[item].value?.length ? [config[item].value[0][this.dependentDropdownKey[item]]?.toString()] : []
                        }
                    }
                    
                    
                    saveObject.push(saveItem);
                } else {
                    // multi select
                    if (!isDependent) {
                        if (config[item].value?.length) {
                            let multiDropdownValue = "";
                            config[item].value?.forEach((dropdownItem) => {
                                if (multiDropdownValue) {
                                    multiDropdownValue += ","
                                }
                                multiDropdownValue += dropdownItem?.toString() || "";
                            })
    
                            saveItem = {
                                FieldName: config[item].dataField,
                                VarCharData: multiDropdownValue
                            }
                        } else {
                            saveItem = {
                                FieldName: config[item].dataField,
                                VarCharData: null
                            }
                        }
                    } else {
                        if (config[item].value?.length) {
                            let multiDropdownValue = [];
                            config[item].value?.forEach((dropdownItem) => {
                                multiDropdownValue.push(dropdownItem?.toString())
                            })
    
                            saveItem = {
                                CriteriaID: config[item].dataField,
                                Values: multiDropdownValue
                            }
                        } else {
                            saveItem = {
                                CriteriaID: config[item].dataField,
                                Values: []
                            }
                        }
                    }
                    
                    saveObject.push(saveItem);
                }
                
            } else {
                if (!isDependent) {
                    saveItem = {
                        FieldName: config[item].dataField,
                        VarCharData: (config[item].value !== null || config[item].value !== undefined) ? config[item].value : null
                    }
                } else {
                    saveItem = {
                        CriteriaID: config[item].dataField,
                        Values: (config[item].value !== null || config[item].value !== undefined) ? config[item].value : null
                    }
                }
                
                saveObject.push(saveItem);
            }
        });
        return saveObject;
    }

    public setLoadingCallback(loading) {
        this.loadingCallback.emit(loading);
    }

    public getSaveSegmentObject(config, saveObject) {
        Object.keys(config).forEach((item) => {
            let saveItem = {};
            if (config[item].fieldType === 'toFromDate') {
                let saveItem1 = {};
                let saveItem2 = {};
                saveItem1 = {
                    CriteriaID: config[item].data.criteriaID1,
                    DateData: new Date(config[item].value1 + 'z')?.toJSON() ||  null
                }

                saveItem2 = {
                    CriteriaID: config[item].data.criteriaID2,
                    DateData: new Date(config[item].value2 + 'z')?.toJSON() ||  null
                }

                saveObject.push(saveItem1);
                saveObject.push(saveItem2);
            } else if (config[item].fieldType==='date') {

                let saveItem = {
                    CriteriaID: config[item].data.criteriaID,
                    DateData: new Date(config[item].value + 'z')?.toJSON()
                }
               
                
                saveObject.push(saveItem);
            } else if (config[item].fieldType === 'dropdown') {
                if (config[item].selectMode === 'single') {
                    saveItem = {
                        CriteriaID: config[item].data.criteriaID,
                        VarCharData: config[item].value?.length ? config[item].value[0][this.dropdownKey[item]]?.toString() : null
                    }
                    
                    saveObject.push(saveItem);
                } else {
                    // multi select

                    if (config[item].value?.length) {
                        let multiDropdownValue = "";
                        config[item].value?.forEach((dropdownItem) => {
                            if (multiDropdownValue) {
                                multiDropdownValue += ","
                            }
                            multiDropdownValue += dropdownItem?.toString() || "";
                        })

                        saveItem = {
                            CriteriaID: config[item].data.criteriaID,
                            VarCharData: multiDropdownValue
                        }
                    } else {
                        saveItem = {
                            CriteriaID: config[item].data.criteriaID,
                            VarCharData: null
                        }
                    }

                    saveObject.push(saveItem);
                }
                
            } else {
                saveItem = {
                    CriteriaID: config[item].data.criteriaID,
                    VarCharData: (config[item].value !== null || config[item].value !== undefined) ? config[item].value : null
                }
                
                saveObject.push(saveItem);
            }
        });
        return saveObject;
    }
}
