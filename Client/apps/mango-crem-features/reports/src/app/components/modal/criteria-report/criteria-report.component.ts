/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Component, Inject, ViewChild } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ReportsService } from '@reports/services/reports.service';
import { DynamicFormComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/dynamic-form/dynamic-form.component';
import notify from 'devextreme/ui/notify';
import { CriteriaFormReportComponent } from '@reports/components/criteria-form-report/criteria-form-report.component';
import { DropdownComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/dropdown/dropdown.component';
import { CreateSegmentComponent } from '../create-segment/create-segment.component';
import { LargeModal } from '@mangoSpa/src/assets/enum/modal.model';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'mango-criteria-reports',
  templateUrl: './criteria-report.component.html',
  styleUrls: ['./criteria-report.component.scss'],
})
export class CriteriaReportComponent {
  public idPrefix: string = 'criteriaReport';
  public loading: boolean = true;
  public criteriaLoading: boolean = true;
  public isItemSelected: boolean = false;
  public saveObject: any = {};
  public reportProcessingPage: string;
  public reportObject: string;
  public criteriaSetId: number;
  public showLoading: boolean = true;
  public segmentLoading: boolean = false;
  public segmentConfig: any;
  public segmentData: any = [];
  public defaultValues: any = null;
  public hasSegmentsAddRight: boolean = false;
  public hasSegmentsViewRight: boolean = false;
  public showSegment: boolean = true;
  public segmentDropdownDisabled: boolean = true;
  public allowSegments: boolean = false;
  @ViewChild('SegmentDropdown') segmentDropdown: DropdownComponent;
  @ViewChild('CriteriaFormReport') criteriaForm: CriteriaFormReportComponent;
  @ViewChild('SegmentForm') segmentForm: DynamicFormComponent;

  constructor(
    public dialogRef: MatDialogRef<CriteriaReportComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      reportId: number;
      reportName: string;
      redirectData: any;
    },
    private dialog: MatDialog,
    private reportsService: ReportsService
  ) {}

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.closeDialog(event);
      }
    });
    let observableList;
    observableList = forkJoin({
      segmentRights: this.reportsService.getSegmentsRights(0, 2),
      reports: this.reportsService.getReport(this.data.reportId),
      criteriaSets: this.reportsService.GetCriteriaSetList(1),
    });

    observableList.subscribe((data: any) => {
      if (data.segmentRights?.data) {
        this.hasSegmentsAddRight = data.segmentRights.data.securityTypeID >= 3;
        this.hasSegmentsViewRight = data.segmentRights.data.securityTypeID >= 2;
      }

      if (data.reports?.data) {
        this.reportProcessingPage = data.reports.data.reportProcessingPage;
        this.reportObject = data.reports.data.reportObject;
        this.criteriaSetId = data.reports.data.criteriaSetID;

        if (data.criteriaSets?.data) {
          this.allowSegments = data.criteriaSets.data.find(
            (x) => x.criteriaSetID === this.criteriaSetId
          );
        }
        if (this.allowSegments) {
          this.reportsService
            .getSegments(this.criteriaSetId, false)
            .subscribe((result) => {
              if (result.data?.length === 0) {
                result.data = [{ disabled: true }];
                if (this.hasSegmentsAddRight) {
                  this.segmentDropdownDisabled = false;
                }
              } else {
                this.segmentDropdownDisabled = false;
              }
              this.segmentData = [{ key: 'group 1', items: result.data }];
              this.loading = false;
              this.showLoading = false;
              this.setSegmentConfig();
            });
        } else {
          this.showSegment = false;
          this.loading = false;
          this.showLoading = false;
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.data.redirectData?.newSegmentID) {
      this.loadSegmentValues({
        dataField: 'segmentID',
        values: {
          segmentID: {
            caption: 'Segment',
            dataField: 'segmentID',
            value: [
              {
                segmentID: this.data.redirectData?.newSegmentID,
                portfolioID: this.data.redirectData?.segmentValues.PortfolioID,
              },
            ],
          },
        },
      });
      this.segmentDropdown.selectBoxValue = this.data.redirectData.newSegmentID;
    }
  }

  private loadSegmentValues(config) {
    if (config.values['segmentID']?.value?.length) {
      this.segmentLoading = true;
      setTimeout(() => {
        this.defaultValues = {};
        const segmentID = config.values['segmentID']?.value[0].segmentID;
        this.defaultValues['PortfolioID'] =
          config.values['segmentID']?.value[0].portfolioID;
        this.reportsService.getSegmentsFields(segmentID).subscribe((result) => {
          result.data.forEach((item) => {
            if (item.dateData) {
              this.defaultValues[item.criteriaID] = item.dateData;
            } else if (item.floatData) {
              this.defaultValues[item.criteriaID] = item.floatData;
            } else if (item.intData) {
              this.defaultValues[item.criteriaID] = item.intData;
            } else if (item.moneyData) {
              this.defaultValues[item.criteriaID] = item.moneyData;
            } else if (item.varcharData) {
              this.defaultValues[item.criteriaID] = item.varcharData;
            }
          });
          this.segmentLoading = false;
        });
      });
    } else {
      this.defaultValues = null;
    }
  }

  public onChange(config) {
    switch (config.dataField) {
      case 'segmentID':
        this.loadSegmentValues(config);
      default:
    }
  }

  public setSegmentConfig() {
    this.segmentConfig = {
      section: [
        {
          sectionId: 'SelectSegment',
          showBottomBorder: true,
          hideBorder: true,
          colCount: 2,
          formObjects: [
            {
              sectionItems: [
                {
                  dataField: 'segmentID',
                  fieldType: 'custom',
                  caption: 'Segment',
                  required: true,
                  displayExpr: 'name',
                  valueExpr: 'segmentID',
                  placeHolder: 'Custom',
                  dataSource: this.segmentData,
                  disabled: this.segmentDropdownDisabled,
                  selectMode: 'single',
                  hoverText: 'Select the segment of the project',
                  value: [],
                },
              ],
            },
          ],
        },
      ],
    };
  }

  public runReport(event: Event) {
    // Consecutive of dependant values validation: Portfolio Form is validated it, and then dependant criteriaForm is
    let isValid: boolean = false;
    const { isValid: isValidPortfolio } =
      this.criteriaForm.segmentPortfolioDropdown.validate(); // Dropdown Component
    if (isValidPortfolio) {
      isValid = this.criteriaForm.criteriaDynamicForm.validate(); // Dynamic Form Component
    }

    if (!this.criteriaLoading && this.isItemSelected && isValid) {
      const config = this.criteriaForm?.criteriaDynamicForm?.getConfig();
      let saveObject = [];
      saveObject.push({
        FieldName: 'PortfolioID',
        IntData: this.criteriaForm.selectedPortfolio,
      });

      if (config) {
        saveObject = this.criteriaForm.getSaveObject(config, saveObject, false);
      }
      let splitSaveObject = [];
      saveObject.forEach((x) => {
        if (x.Delimeter) {
          let multiSelectArray = x.VarCharData.split(x.Delimeter);
          multiSelectArray.forEach((c) => {
            if (x.CriteriaDataType == 3) {
              splitSaveObject.push({
                FieldName: x.FieldName,
                IntData: c,
              });
            } else if (x.CriteriaDataType == 7) {
              splitSaveObject.push({
                FieldName: x.FieldName,
                DateData: c,
              });
            } else {
              splitSaveObject.push({
                FieldName: x.FieldName,
                VarCharData: c,
              });
            }
          });
        } else {
          splitSaveObject.push(x);
        }
      });
      saveObject = splitSaveObject;
      this.reportsService
        .insertSelectedCriteria(saveObject)
        .subscribe((result) => {
          if (this.reportObject !== 'SQLRSBatch') {
            this.reportProcessingPage = this.reportProcessingPage.replace(
              '@ReportGUID',
              '{' + result.data + '}'
            );
            this.reportsService
              .insertReportIssue(this.reportProcessingPage)
              .subscribe((reportIssue) => {
                const reportIssueId = reportIssue.data;
                const url =
                  '../../../../v06/Reporting/ReportLaunchpad.aspx?processReportObject=' +
                  this.reportObject +
                  '&reportissueid=' +
                  reportIssueId;
                notify({
                  message:
                    'Your report request has been processed and the report will be available shortly.',
                  type: 'success',
                  displayTime: 5000,
                  position: {
                    at: 'bottom right',
                    my: 'bottom right',
                    offset: '-16 -16',
                  },
                  maxWidth: '500px',
                  closeOnClick: true,
                });
                window.open(url, '_blank');
                this.dialogRef.close();
              });
          } else {
            this.reportsService
              .runBatchReport(result.data, this.data.reportId)
              .subscribe((result) => {
                if (result.data) {
                  notify({
                    message:
                      'Your report request has been processed and the report will be available shortly.',
                    type: 'success',
                    displayTime: 5000,
                    position: {
                      my: 'bottom right',
                      at: 'bottom right',
                      offset: '-16 -16',
                    },
                    maxWidth: '500px',
                    closeOnClick: true,
                  });
                } else {
                  notify({
                    message:
                      'An error occurred while trying to process your report.',
                    type: 'error',
                    displayTime: 5000,
                    position: {
                      my: 'bottom right',
                      at: 'bottom right',
                      offset: '-16 -16',
                    },
                    maxWidth: '500px',
                    closeOnClick: true,
                  });
                }
                this.dialogRef.close();
              });
          }
        });
    }
  }

  public setLoading(loading) {
    this.showLoading = loading;
  }

  public onFormItemChange(data) {
    this.isItemSelected = data;
  }

  public onCriteriaLoadedChange(data) {
    this.criteriaLoading = data;
  }

  public closeDialog(event) {
    event.preventDefault();
    this.dialogRef.close();
  }

  public customButtonClicked(event) {
    if (event === 'custom') {
      this.segmentDropdown.clearSelectBox();
      this.criteriaForm.clearPortfolioDropdown();
      this.segmentDropdown.closeSelectBox();
    } else if (event === 'create New Segment' && this.hasSegmentsAddRight) {
      const config = this.criteriaForm?.criteriaDynamicForm?.getConfig();
      const depConfig =
        this.criteriaForm?.dependentCriteriaDynamicForm?.getConfig();
      let saveObject = [];
      let depSaveObject = [];
      let newSegmentConfig = {};
      if (this.isItemSelected) {
        newSegmentConfig['PortfolioID'] = this.criteriaForm.selectedPortfolio;
      }

      if (config) {
        saveObject = this.criteriaForm.getSaveObject(config, saveObject, false);
      }
      if (depConfig) {
        depSaveObject = this.criteriaForm?.getSaveObject(
          depConfig,
          depSaveObject,
          true
        );
      }

      saveObject.forEach((x) => {
        if (config[x.FieldName]) {
          if (config[x.FieldName].fieldType === 'toFromDate') {
            newSegmentConfig[config[x.FieldName]?.data.criteriaID1] =
              config[x.FieldName].value1;
            newSegmentConfig[config[x.FieldName]?.data.criteriaID2] =
              config[x.FieldName].value2;
          } else {
            newSegmentConfig[config[x.FieldName]?.data.criteriaID] =
              Object.values(x)[1];
          }
        }
      });
      depSaveObject.forEach((x) => {
        if (depConfig[x.CriteriaID]) {
          newSegmentConfig[x.CriteriaID] = Object.values(x)[1];
        }
      });
      const redirectRef = this.dialog.open(CreateSegmentComponent, {
        height: LargeModal.Height,
        width: LargeModal.Width,
        maxWidth: LargeModal.MaxWidth,
        maxHeight: LargeModal.MaxHeight,
        disableClose: true,
        data: {
          redirectData: {
            source: 'runreport',
            reportID: this.data.reportId,
            reportName: this.data.reportName,
          },
          config: newSegmentConfig,
          criteriaSetID: this.criteriaSetId,
          archived: false,
        },
      });
      redirectRef.afterClosed().subscribe((data) => {
        if (data) {
          this.dialog.open(CriteriaReportComponent, data);
        }
      });
      this.dialogRef.close();
    }
  }
}
