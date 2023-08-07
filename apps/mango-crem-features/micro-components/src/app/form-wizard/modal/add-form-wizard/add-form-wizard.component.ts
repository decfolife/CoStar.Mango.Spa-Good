import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormWizardAppComponent } from '@micro-components/form-wizard/form-wizard.component';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'mango-add-form-wizard',
  templateUrl: './add-form-wizard.component.html',
  styleUrls: ['./add-form-wizard.component.scss']
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
    @Inject(MAT_DIALOG_DATA) public data: {
      objectTypeId: number;
      objectTypeName: string;
      objectId: number;
      userId: number;
    }) { }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === "Escape") {
        this.close(event);
      }
    })
    if (!this.data.objectTypeName) {
      this.dashboardService.getObjectTypeNames([1]).subscribe(
        (result) => {
          this.data.objectTypeName = result?.data?.[0]?.objectTypeName
          this.buildModalTitle();
        }
      );   
    } else {
      this.buildModalTitle();
    }
  }

  public close(data: any) {
    if ((this.data.objectTypeId === 3 || this.data.objectTypeId === 4) && this.newProjectSaved) {
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
            this.showMessage()
            if (this.data.objectTypeId === 3 || this.data.objectTypeId === 4) {
              setTimeout(() => {
                this.dialogRef.close();
                location.reload();
              }, 1000)
            } else {
              this.dialogRef.close(data)
            }
            
          }
          this.loading = false;
        }
      )
    }
  }

  public saveAndNew(data: any) {
    this.formWizard.trimItems();
    const isFormValid = this.formWizard.validate();
    if (isFormValid) {
      const formData = this.formWizard.getSaveObject();
      this.loading = true;
      this.formWizardService.addTransaction(formData).subscribe((result) => {
          if (result.success) {
            this.newProjectSaved = true;
            this.showMessage()
            this.formWizard.clearForm();
            this.contentVisible = false;
            setTimeout(() => {
              this.contentVisible = true;
              
            }, 100)
          }
          this.loading = false;
        }
      )
    }
  }

  public showMessage() {
    notify({
      message : this.data.objectTypeName ? this.data.objectTypeName + ' saved successfully.' : 'Record saved successfully.',
      type : 'success',
      displayTime : 2000,
      position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
      maxWidth : "400px",
      closeOnClick : true,
    });
  }

  public launch(data: any) {
    this.formWizard.trimItems();
    const isFormValid = this.formWizard.validate();
    if (isFormValid) {
      const formData = this.formWizard.getSaveObject();
      this.loading = true;
      this.formWizardService.addTransaction(formData).subscribe((result) => {
          if (result.success) {
            let transactionID : number = result.data;
            this.formWizardService.getRedirectorLink(1, formData.TaskType).subscribe((result) => {
              let url = ''
              if (result.success && result.data?.length > 0) {
                let RDID = '';
                url = result.data[0].BasePageUrl;
                if (result.data[0].BasePageUrl.includes('FID=165')) {
                  RDID = '70';
                }
                else if (result.data[0].BasePageUrl.includes('FID=162')) {
                  RDID = '31';
                }
                else if (result.data[0].BasePageUrl.includes('project-gantt-chart')) {
                  url += '/' + transactionID
                }
                url += (result.data[0].BasePageUrl.includes("?") ? '&' : '?')
                + 'OID=' + transactionID
                + '&OTID='+ 1
                + '&OTTID=' + formData.TaskType
                + '&RDID=' + RDID;
                window.location.href = url;
                this.showMessage()
                this.dialogRef.close(data)
              } else {
                window.location.href = '/Project/Tasks/View.asp?'
                    + 'OID=' + transactionID
                    + '&OTID='+ 1
                    + '&OTTID=' + formData.TaskType;
                    this.showMessage()
                    this.dialogRef.close(data)
              }
              this.loading = false;
            }) 
          } else {
            this.loading = false;
          }
        }
      )
    }
  }

  public buildModalTitle() {
    this.modalTitle = "Create " + this.data.objectTypeName;
  }

  public setLoadCondition(loadCondition) {
    this.loading = loadCondition;
  }
}
