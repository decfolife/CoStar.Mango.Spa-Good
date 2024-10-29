import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormWizardAppComponent } from '@micro-components/form-wizard/form-wizard.component';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { ObjectType } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-add-form-wizard',
  templateUrl: './add-form-wizard.component.html',
  styleUrls: ['./add-form-wizard.component.scss'],
})
export class AddFormWizardComponent implements OnInit {
  public loading = true;
  public contentVisible = true;
  public modalTitle: string;
  private newProjectSaved = false;
  @ViewChild('FormWizard') formWizard: FormWizardAppComponent;

  constructor(
    public dialogRef: MatDialogRef<AddFormWizardComponent>,
    private dashboardService: DashboardService,
    private formWizardService: FormWizardService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      objectTypeId: number;
      objectTypeName: string;
      objectId: number;
      userId: number;
    }
  ) {}

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.close(event);
      }
    });
    if (!this.data.objectTypeName) {
      this.dashboardService.getObjectTypeNames([1]).subscribe((result) => {
        this.data.objectTypeName = result?.data?.[0]?.objectTypeName;
        this.buildModalTitle();
      });
    } else {
      this.buildModalTitle();
    }
  }

  public close(data: any) {
    if (
      (this.data.objectTypeId === 3 || this.data.objectTypeId === 4) &&
      this.newProjectSaved
    ) {
      this.dialogRef.close();
      location.reload();
    } else {
      this.dialogRef.close(data);
    }
  }

  public save(data: any) {
    this.formWizard.trimItems();
    const isFormValid = this.formWizard.validate();
    if (isFormValid) {
      const formData = this.formWizard.getSaveObject();
      this.loading = true;
      this.formWizardService.addTransaction(formData).subscribe((result) => {
        if (result.success) {
          this.showMessage();
          if (
            this.data.objectTypeId === ObjectType.BUILDING ||
            this.data.objectTypeId === ObjectType.LEASE
          ) {
            setTimeout(() => {
              this.dialogRef.close();
              location.reload();
            }, 1000);
          } else {
            this.dialogRef.close(data);
          }
        }
        this.loading = false;
      });
    }
  }

  public saveAndNew() {
    this.formWizard.trimItems();
    const isFormValid = this.formWizard.validate();
    if (isFormValid) {
      const formData = this.formWizard.getSaveObject();
      this.loading = true;
      this.formWizardService.addTransaction(formData).subscribe((result) => {
        if (result.success) {
          this.newProjectSaved = true;
          this.showMessage();
          this.formWizard.clearForm();
          this.contentVisible = false;
          setTimeout(() => {
            this.contentVisible = true;
          }, 100);
        }
        this.loading = false;
      });
    }
  }

  public showMessage() {
    notify({
      message: this.data.objectTypeName
        ? this.data.objectTypeName + ' saved successfully.'
        : 'Record saved successfully.',
      type: 'success',
      displayTime: 2000,
      position: { at: 'bottom right', my: 'bottom right', offset: '-16 -16' },
      maxWidth: '400px',
      closeOnClick: true,
    });
  }

  public launch(data: any) {
    this.formWizard.trimItems();

    if (!this.formWizard.validate()) {
      this.loading = false;
      return;
    }

    const formData = this.formWizard.getSaveObject();
    this.loading = true;

    this.formWizardService.addTransaction(formData).subscribe((result) => {
      if (!result.success) {
        this.loading = false;
        return;
      }

      const transactionID: number = result.data;
      this.redirectToUrl(formData, transactionID, data);
    });
  }

  private redirectToUrl(formData: any, transactionID: number, data: any) {
    this.formWizardService
      .getRedirectorLink(ObjectType.PROJECT, formData.TaskType)
      .subscribe((result) => {
        let url = '';
        if (result.success && result.data?.length > 0) {
          url = this.buildUrl(result.data[0], transactionID, formData.TaskType);
        } else {
          url = `/Project/Tasks/View.asp?OID=${transactionID}&OTID=1&OTTID=${formData.TaskType}`;
        }
        this.router.navigateByUrl(url);
        this.showMessage();
        this.dialogRef.close(data);
        this.loading = false;
      });
  }

  private buildUrl(data: any, transactionID: number, taskType: number): string {
    let url = data.basePageUrl;
    let RDID = this.getRDID(url);

    if (url?.includes('project-gantt-chart')) {
      url += `/${transactionID}`;
    }

    const separator = url?.includes('?') ? '&' : '?';
    url += `${separator}OID=${transactionID}&OTID=1&OTTID=${taskType}&RDID=${RDID}`;
    return url;
  }

  private getRDID(baseUrl: string): string {
    if (baseUrl?.includes('FID=165')) return '70';
    if (baseUrl?.includes('FID=162')) return '31';
    return '';
  }

  public buildModalTitle() {
    this.modalTitle = 'Create ' + this.data.objectTypeName;
  }

  public setLoadCondition(loadCondition) {
    this.loading = loadCondition;
  }
}
