import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastState } from '@mango/data-models/lib-data-models';
import { CremToastService } from '@mango/ui-shared/lib-ui-elements';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { DynamicFormsService } from 'libs/forms-shared/src/lib/services/dynamic-forms.service';
import {
  AiFieldDefinition,
  AiFieldMapping,
  AiLeaseService,
  GetAiFieldMappingsResponse,
} from 'libs/forms-shared/src/lib/ai/services/ai-lease.service';

interface LeaseTemplateOption {
  objectTypeTypeID: number;
  objectTypeTypeName: string;
}

interface FormFieldOption {
  formItemId: number;
  label: string;
  sectionName: string;
  displayName: string;
}

interface MappingRow {
  fieldKey: string;
  displayName: string;
  formItemId: number | null;
}

@Component({
  selector: 'mango-ai-field-mappings-dialog',
  templateUrl: './ai-field-mappings-dialog.component.html',
  styleUrls: ['./ai-field-mappings-dialog.component.scss'],
})
export class AiFieldMappingsDialogComponent implements OnInit {
  isLoading = true;
  isSaving = false;
  isCopying = false;
  errorMessage: string | null = null;
  sourceTemplateId: number | null = null;
  mappingContext: GetAiFieldMappingsResponse | null = null;
  fieldOptions: FormFieldOption[] = [];
  mappingRows: MappingRow[] = [];

  constructor(
    public readonly dialogRef: MatDialogRef<AiFieldMappingsDialogComponent>,
    private readonly aiLeaseService: AiLeaseService,
    private readonly dynamicFormsService: DynamicFormsService,
    private readonly toastService: CremToastService,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      templateId: number;
      templateName: string;
      templateOptions: LeaseTemplateOption[];
    }
  ) {}

  ngOnInit(): void {
    this.loadMappings();
  }

  get availableSourceTemplates(): LeaseTemplateOption[] {
    return (this.data.templateOptions ?? []).filter(
      (option) => option.objectTypeTypeID !== this.data.templateId
    );
  }

  trackByFieldKey(_index: number, row: MappingRow): string {
    return row.fieldKey;
  }

  save(): void {
    if (!this.mappingContext || this.isSaving) {
      return;
    }

    this.isSaving = true;

    const mappings = this.mappingRows
      .filter((row) => !!row.formItemId)
      .map((row) => ({
        fieldKey: row.fieldKey,
        formItemId: Number(row.formItemId),
      }));

    this.aiLeaseService
      .saveAiFieldMappings({
        aiFormId: this.mappingContext.aiFormId,
        formId: this.mappingContext.formId,
        mappings,
      })
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => {
          this.toastService.show(
            'AI field mappings were saved successfully.',
            '',
            ToastState.SUCCESS,
            { position: 'bottom right', maxWidth: '350px' }
          );
          this.dialogRef.close(true);
        },
        error: () => {
          this.toastService.show(
            'Failed to save AI field mappings. Please try again.',
            '',
            ToastState.ERROR,
            { position: 'bottom right', maxWidth: '350px' }
          );
        },
      });
  }

  copyMappings(): void {
    if (!this.mappingContext || !this.sourceTemplateId || this.isCopying) {
      return;
    }

    this.isCopying = true;

    this.aiLeaseService
      .getAiFieldMappingsByTemplate(this.sourceTemplateId)
      .pipe(
        switchMap((sourceContext) =>
          this.aiLeaseService.copyAiFieldMappings({
            sourceAiFormId: sourceContext.aiFormId,
            sourceFormId: sourceContext.formId,
            targetAiFormId: this.mappingContext!.aiFormId,
            targetFormId: this.mappingContext!.formId,
          })
        ),
        finalize(() => (this.isCopying = false))
      )
      .subscribe({
        next: () => {
          this.toastService.show(
            'AI field mappings were copied successfully.',
            '',
            ToastState.SUCCESS,
            { position: 'bottom right', maxWidth: '350px' }
          );
          this.loadMappings();
        },
        error: () => {
          this.toastService.show(
            'Failed to copy AI field mappings from the selected template.',
            '',
            ToastState.ERROR,
            { position: 'bottom right', maxWidth: '350px' }
          );
        },
      });
  }

  private loadMappings(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.aiLeaseService
      .getAiFieldMappingsByTemplate(this.data.templateId)
      .pipe(
        switchMap((context) =>
          this.dynamicFormsService.getFormSections(context.formId, 0).pipe(
            switchMap((sectionsResponse) => {
              const sections = sectionsResponse?.data ?? [];
              return forkJoin({
                context: of(context),
                sections: of(sections),
                fieldsResponse: this.dynamicFormsService
                  .getFormFieldsForAllSections(context.formId, 4, sections)
                  .pipe(catchError(() => of({ data: [] }))),
              });
            })
          )
        ),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: ({ context, sections, fieldsResponse }) => {
          const fields = fieldsResponse?.data ?? [];
          this.mappingContext = context;
          this.fieldOptions = this.buildFieldOptions(fields, sections);
          this.mappingRows = this.buildMappingRows(
            context.definitions,
            context.mappings
          );
        },
        error: () => {
          this.mappingContext = null;
          this.fieldOptions = [];
          this.mappingRows = [];
          this.errorMessage =
            'Failed to load the target form or existing AI field mappings.';
        },
      });
  }

  private buildMappingRows(
    definitions: AiFieldDefinition[],
    mappings: AiFieldMapping[]
  ): MappingRow[] {
    const mappedFormItemIds = new Map<string, number>(
      (mappings ?? []).map((mapping) => [mapping.fieldKey, mapping.formItemId])
    );

    return (definitions ?? []).map((definition) => ({
      fieldKey: definition.fieldKey,
      displayName: definition.displayName,
      formItemId: mappedFormItemIds.get(definition.fieldKey) ?? null,
    }));
  }

  private buildFieldOptions(fields: any[], sections: any[]): FormFieldOption[] {
    const sectionNames = new Map<number, string>(
      (sections ?? []).map((section: any) => [
        Number(section.formSectionID),
        String(section.formSectionName ?? ''),
      ])
    );
    const options = new Map<number, FormFieldOption>();

    (fields ?? []).forEach((field: any) => {
      const formItemId = Number(field.formItemID ?? field.formItemId ?? 0);
      if (!formItemId || options.has(formItemId)) {
        return;
      }

      const sectionId = Number(
        field.formItemSectionDetail?.formSectionID ??
          field.formSectionID ??
          field.formSectionId ??
          0
      );
      const label =
        field.formItemSectionDetail?.formItemLabel ||
        field.formItemLabel ||
        field.formItemFriendlyName ||
        field.formItemName ||
        `Form Item ${formItemId}`;
      const sectionName = sectionNames.get(sectionId) ?? 'General';

      options.set(formItemId, {
        formItemId,
        label,
        sectionName,
        displayName: `${sectionName} - ${label} (#${formItemId})`,
      });
    });

    return Array.from(options.values()).sort((a, b) =>
      a.displayName.localeCompare(b.displayName)
    );
  }
}
