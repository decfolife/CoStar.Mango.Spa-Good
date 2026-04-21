import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '@mango/core-shared';
import {
  ToastState,
  VALIDATION_ERROR,
} from '@mango/data-models/lib-data-models';
import { CremToastService } from '@mango/ui-shared/lib-ui-elements';
import { AiLeaseService } from 'libs/forms-shared/src/lib/ai/services/ai-lease.service';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { AddLeaseModalComponent } from '../add-lease-modal/add-lease-modal.component';
import { forkJoin } from 'rxjs';

interface SelectedAiLeaseFile {
  id: string;
  file: File;
  buildingId: number | null;
  buildingName: string | null;
}

@Component({
  selector: 'mango-add-ai-lease-modal',
  templateUrl: './add-ai-lease-modal.component.html',
  styleUrls: ['./add-ai-lease-modal.component.scss'],
})
export class AddAiLeaseModalComponent extends AddLeaseModalComponent {
  selectedFiles: SelectedAiLeaseFile[] = [];
  isSubmitting = false;
  buildingAssignmentMode: 'same' | 'per-document' = 'same';
  sharedBuildingId: number | null = null;
  sharedBuildingName: string | null = null;

  private readonly ALLOWED_EXTENSIONS = new Set([
    'pdf',
    'doc',
    'docx',
    'jpg',
    'jpeg',
    'png',
    'tif',
    'tiff',
  ]);

  // Extensions blocked for security — executable / script / system file types
  private readonly BLOCKED_EXTENSIONS = new Set([
    'exe',
    'bat',
    'cmd',
    'sh',
    'ps1',
    'vbs',
    'msi',
    'dll',
    'com',
    'scr',
    'jar',
    'app',
    'deb',
    'rpm',
    'dmg',
    'pkg',
    'bin',
    'run',
    'pif',
    'ws',
    'wsf',
    'wsh',
    'hta',
    'reg',
    'inf',
    'lnk',
  ]);

  constructor(
    public override dialogRef: MatDialogRef<AddAiLeaseModalComponent>,
    formWizardService: FormWizardService,
    dashboardService: DashboardService,
    router: Router,
    dataService: DataService,
    public toastService: CremToastService,
    facade: MangoAppFacade,
    private readonly aiLeaseService: AiLeaseService,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      objectTypeName: string;
      objectTypeId: number;
      objectId: number;
      objectName: string;
      premiseId: number;
      formId?: number;
    }
  ) {
    super(
      dialogRef,
      formWizardService,
      dashboardService,
      router,
      dataService,
      toastService,
      facade,
      data
    );
  }

  override setupAddLeaseFormGroup(): void {
    super.setupAddLeaseFormGroup();

    // These fields are populated by the AI from the lease PDF — remove required validation
    [
      'tenantName',
      'leaseType',
      'currencyTypeList',
      'beginDate',
      'endDate',
      'building',
      'premise',
      'premiseType',
    ].forEach((field) => {
      const ctrl = this.addLeaseFormGroup.get(field);
      if (ctrl) {
        ctrl.clearValidators();
        ctrl.updateValueAndValidity();
      }
    });

    this.addLeaseFormGroup.addControl(
      'includesAmendments',
      new FormControl(false)
    );
    this.addLeaseFormGroup.addControl('abstractionNotes', new FormControl(''));
    this.addLeaseFormGroup.addControl(
      'leaseDocument',
      new FormControl(null, Validators.required)
    );

    this.getLeaseTemplates();

    if (this.data.objectId) {
      this.sharedBuildingId = this.data.objectId;
      this.sharedBuildingName = this.data.objectName ?? null;
    }
  }

  override buildModalTitle(): void {
    this.modalTitle = 'Add AI Lease Abstraction';
    this.dynName = this.data.objectTypeName ?? 'Lease';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const rejected: string[] = [];
    Array.from(input.files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (
        this.BLOCKED_EXTENSIONS.has(ext) ||
        !this.ALLOWED_EXTENSIONS.has(ext)
      ) {
        rejected.push(file.name);
        return;
      }
      if (!this.selectedFiles.some((entry) => entry.file.name === file.name)) {
        this.selectedFiles.push({
          id: `${file.name}-${file.size}-${file.lastModified}`,
          file,
          buildingId: this.getDefaultBuildingId(),
          buildingName: this.getDefaultBuildingName(),
        });
      }
    });

    if (this.selectedFiles.length <= 1) {
      this.buildingAssignmentMode = 'same';
    }

    if (this.buildingAssignmentMode === 'same') {
      this.applySharedBuildingToAllFiles();
    } else {
      this.preloadBuildingsForPerDocumentMode();
    }

    if (rejected.length) {
      this.toastService.show(
        `Only PDF, Word, and image files are supported: ${rejected.join(', ')}`,
        '',
        ToastState.ERROR,
        { position: 'bottom right', maxWidth: '350px' }
      );
    }

    this.addLeaseFormGroup
      .get('leaseDocument')
      ?.setValue(this.selectedFiles.length ? this.selectedFiles : null);
    input.value = '';
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    if (this.selectedFiles.length <= 1) {
      this.buildingAssignmentMode = 'same';
      this.applySharedBuildingToAllFiles();
    }
    this.addLeaseFormGroup
      .get('leaseDocument')
      ?.setValue(this.selectedFiles.length ? this.selectedFiles : null);
  }

  onSharedBuildingChanged(items: Array<{ buildingID: number; buildingName: string }>): void {
    const building = items?.[0];
    this.sharedBuildingId = building?.buildingID ?? null;
    this.sharedBuildingName = building?.buildingName ?? null;
    this.selectedBuilding = this.sharedBuildingId;
    this.applySharedBuildingToAllFiles();
  }

  onFileBuildingChanged(
    file: SelectedAiLeaseFile,
    items: Array<{ buildingID: number; buildingName: string }>
  ): void {
    const building = items?.[0];
    file.buildingId = building?.buildingID ?? null;
    file.buildingName = building?.buildingName ?? null;
  }

  setBuildingAssignmentMode(mode: 'same' | 'per-document'): void {
    this.buildingAssignmentMode = mode;
    if (mode === 'same') {
      this.applySharedBuildingToAllFiles();
      return;
    }

    if (this.sharedBuildingId || this.data.objectId) {
      this.applySharedBuildingToAllFiles();
    }

    this.preloadBuildingsForPerDocumentMode();
  }

  trackSelectedFile(_index: number, file: SelectedAiLeaseFile): string {
    return file.id;
  }

  /** Launch: post to AI abstractions API, then navigate to the abstraction form. */
  override launch(e: any): void {
    if (!this.addLeaseFormGroup.valid) {
      this.toastService.show(VALIDATION_ERROR, '', ToastState.ERROR, {
        position: 'bottom right',
        maxWidth: '350px',
      });
      return;
    }

    if (!this.selectedFiles.length) {
      this.toastService.show(
        'At least one lease document is required.',
        '',
        ToastState.ERROR,
        {
          position: 'bottom right',
          maxWidth: '350px',
        }
      );
      return;
    }

    if (this.selectedFiles.some((file) => !this.resolveBuildingId(file))) {
      this.toastService.show(
        'Select a building for each uploaded document before launching.',
        '',
        ToastState.ERROR,
        {
          position: 'bottom right',
          maxWidth: '350px',
        }
      );
      return;
    }

    this.isSubmitting = true;

    forkJoin(
      this.selectedFiles.map((file) =>
        this.aiLeaseService.createAbstraction(this.buildFormData(file))
      )
    ).subscribe({
      next: (responses) => {
        this.isSubmitting = false;
        this.dialogRef.close();
        const createdIds = responses
          .map((response) => response.aiAbstractionId)
          .filter((id) => Number.isFinite(id));
        this.router.navigate(['/crem/portfolio/ai-abstractions'], {
          queryParams: {
            ...(createdIds.length === 1
              ? { createdAiAbstractionId: createdIds[0] }
              : { createdAiAbstractionIds: createdIds.join(',') }),
            ...(this.data?.formId ? { formId: this.data.formId } : {}),
          },
        });
      },
      error: () => {
        this.isSubmitting = false;
        this.toastService.show(
          'Failed to submit AI abstraction request. Please try again.',
          '',
          ToastState.ERROR,
          { position: 'bottom right', maxWidth: '350px' }
        );
      },
    });
  }

  // Save/SaveAndNew are not relevant for the AI abstraction flow — show informational toast
  override save(_e: any): void {
    this.toastService.show(
      'Use "Launch" to submit for AI abstraction.',
      '',
      ToastState.WARNING,
      { position: 'bottom right', maxWidth: '350px' }
    );
  }

  override saveAndNew(_e: any): void {
    this.save(_e);
  }

  override onPortFolioValueChanged(e: any) {
    super.onPortFolioValueChanged(e);

    if (this.data.objectId) {
      return;
    }

    this.sharedBuildingId = null;
    this.sharedBuildingName = null;
    this.selectedBuilding = null;
    this.selectedFiles = this.selectedFiles.map((file) => ({
      ...file,
      buildingId: null,
      buildingName: null,
    }));
  }

  private buildFormData(file: SelectedAiLeaseFile): FormData {
    const formData = new FormData();
    const leaseTemplateId = this.selectedTemplate ?? this.selectedLeaseTemplate;
    const accountingType = this.selectedAccountingType;
    const measurementUnitId =
      this.selectedMeasurement ?? this.selectedMeasurementIndex;

    formData.append('buildingId', String(this.resolveBuildingId(file)));
    formData.append(
      'includesAmendments',
      String(this.addLeaseFormGroup.get('includesAmendments')?.value ?? false)
    );
    formData.append(
      'abstractionNotes',
      this.addLeaseFormGroup.get('abstractionNotes')?.value ?? ''
    );

    if (this.selectedPortfolio != null) {
      formData.append('portfolioId', String(this.selectedPortfolio));
    }
    if (leaseTemplateId != null) {
      formData.append('leaseTemplateId', String(leaseTemplateId));
    }
    if (accountingType != null) {
      formData.append('accountingType', String(accountingType));
    }
    if (measurementUnitId != null) {
      formData.append('measurementUnitId', String(measurementUnitId));
    }

    formData.append('files', file.file, file.file.name);

    return formData;
  }

  private resolveBuildingId(file: SelectedAiLeaseFile): number | null {
    return this.buildingAssignmentMode === 'same'
      ? this.sharedBuildingId ?? this.data.objectId ?? null
      : file.buildingId;
  }

  private applySharedBuildingToAllFiles(): void {
    const buildingId = this.sharedBuildingId ?? this.data.objectId ?? null;
    const buildingName = this.sharedBuildingName ?? this.data.objectName ?? null;
    this.selectedFiles = this.selectedFiles.map((file) => ({
      ...file,
      buildingId,
      buildingName,
    }));
  }

  private getDefaultBuildingId(): number | null {
    return this.sharedBuildingId ?? this.data.objectId ?? null;
  }

  private getDefaultBuildingName(): string | null {
    return this.sharedBuildingName ?? this.data.objectName ?? null;
  }

  private preloadBuildingsForPerDocumentMode(): void {
    if (this.hasPassedBuilding || !this.selectedPortfolio) {
      return;
    }

    const loadPromise =
      typeof this.buildingsDataSource?.reload === 'function'
        ? this.buildingsDataSource.reload()
        : typeof this.buildingsDataSource?.load === 'function'
          ? this.buildingsDataSource.load()
          : null;

    if (loadPromise?.then) {
      loadPromise.then(() => {
        this.selectedFiles = this.selectedFiles.map((file) => ({ ...file }));
      });
    }
  }
}
