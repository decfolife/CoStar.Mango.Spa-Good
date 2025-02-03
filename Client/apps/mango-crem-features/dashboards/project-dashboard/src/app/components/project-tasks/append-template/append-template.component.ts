import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectTemplate } from '@mango/data-models/lib-data-models';
import { DropdownComponent } from '@mango/ui-shared/lib-ui-elements';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'mango-append-template',
  templateUrl: './append-template.component.html',
  styleUrls: ['./append-template.component.scss'],
})
export class AppendTemplateComponent {
  @ViewChild('ProjectTemplateDropdown', { static: false })
  cremDropdown: DropdownComponent;

  modalTitle: string = 'Append Template to Transaction';
  modalId: string = 'appendTemplateModal';
  appendTemplateResult = false;
  projectTemplateFieldInvalid = false;
  projectId = 0;
  selectedProjectTemplate: number;
  previewVisible = false;
  applyTeamToTaskValue = false;
  previewLabelText: string = null;
  disableSaveBtn: boolean = false;
  projectTemplates: ProjectTemplate[] = [];
  projectTemplatePreviewGridData: any[] = [];
  subs: Subscription[] = [];

  constructor(
    private dashboardService: DashboardService,
    private dialogService: MangoDialogService,
    public dialogRef: MatDialogRef<AppendTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectId = data.projectId;
  }

  ngOnInit() {
    this.getProjectTemplates();
  }

  onSelectedProjectTemplate(e) {
    if (e.length > 0) {
      this.selectedProjectTemplate = e[0].projectTemplateID;
      this.projectTemplateSelectedCheck();
      if (this.previewVisible) {
        this.getProjectTemplatePreview();
      }
    } else {
      this.selectedProjectTemplate = null;
    }
  }

  onKeyDownEvent(e) {
    if (e.key == 'Enter' && !this.projectTemplateSelectedCheck()) {
      this.showOrHideViewProjectPreview();
    }
  }

  showOrHideViewProjectPreview() {
    this.previewVisible = !this.previewVisible;
    if (this.previewVisible) {
      this.getProjectTemplatePreview();

      this.dialogRef.updateSize('800px', '800px');
    } else {
      this.dialogRef.updateSize('800px', '400px');
    }
  }

  saveAppendTemplate() {
    this.disableSaveBtn = true;
    this.projectTemplateFieldInvalid = !this.cremDropdown.validate().isValid;

    if (this.projectTemplateFieldInvalid) {
      this.dialogService.alert(
        'Validation Error(s)',
        'You have left at least one required field empty.\r\n\r\nPlease update and try again.',
        'OK'
      );
      this.disableSaveBtn = false;
      return;
    }

    this.subs.push(
      this.dashboardService
        .appendTemplateToProject(
          this.projectId,
          this.selectedProjectTemplate,
          this.applyTeamToTaskValue
        )
        .pipe(
          switchMap((saveRes) => {
            let alertClosedOnSuccess: Observable<boolean> = of(false);

            if (
              !!saveRes &&
              saveRes.success &&
              saveRes.data > 0 &&
              saveRes.data
            ) {
              this.appendTemplateResult = saveRes.data;
              alertClosedOnSuccess = of(true);
            } else {
              this.dialogService.alert(
                'Append Template Error',
                'There was an error with appending the task template. Please contact the system administrator.',
                'OK'
              );
            }
            this.disableSaveBtn = false;
            return alertClosedOnSuccess;
          })
        )
        .subscribe((res) => {
          if (!!res && res) {
            this.closeModal();
          }
          this.disableSaveBtn = false;
        })
    );
  }

  closeModal() {
    this.dialogRef.close(this.appendTemplateResult);
  }

  projectTemplateSelectedCheck() {
    return !(
      !!this.selectedProjectTemplate && this.selectedProjectTemplate > 0
    );
  }

  getProjectTemplates() {
    this.subs.push(
      this.dashboardService.getProjectTemplateList().subscribe((res: any) => {
        if (res && res.success) {
          if (res.data.length) {
            this.projectTemplates = res.data;
          }
        } else {
          this.dialogService.alert(
            'Get Project Template Error',
            'There was an issue with getting the Project Template Info. Please contact the system administrator.',
            'OK'
          );
        }
      })
    );
  }

  getProjectTemplatePreview() {
    this.subs.push(
      this.dashboardService
        .getProjectTemplatePreview(this.projectId, this.selectedProjectTemplate)
        .subscribe((res: any) => {
          if (res && res.success) {
            if (res.data.templatePreviewDetails.length) {
              this.projectTemplatePreviewGridData =
                res.data.templatePreviewDetails;
            }
          } else {
            this.dialogService.alert(
              'Get Project Template Preview Error',
              'There was an issue with getting the Project Template Preview Info. Please contact the system administrator.',
              'OK'
            );
          }
        })
    );
  }

  adaAttrToGridTable(e: any) {
    let noDataEl = e.element.getElementsByTagName('tbody');
    noDataEl[0]?.setAttribute('role', 'table');
  }
}
