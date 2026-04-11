import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of, Subject, timer } from 'rxjs';
import { catchError, switchMap, take, takeUntil } from 'rxjs/operators';
import { AiDropdownItem, AiFieldType, AiFormField, AiFormSection, AiRentScheduleSection } from '../models/ai-form.model';
import { IAIOutput } from '../models/ai-output.model';
import { AiLeaseService } from '../services/ai-lease.service';
import { AiSidebarService } from '../ai-sidebar/ai-sidebar.service';
import { FormWizardDataTypeID, FormWizardTypeID } from '@forms/model/dynamic-forms.interface';
import { DynamicFormsService } from '../../services/dynamic-forms.service';

// ── Static dropdown option lists ─────────────────────────────────────────────

const DEAL_TYPE_OPTIONS: AiDropdownItem[] = [
  { id: 'New', name: 'New' },
  { id: 'Renewal', name: 'Renewal' },
  { id: 'Expansion', name: 'Expansion' },
  { id: 'Sublease', name: 'Sublease' },
  { id: 'Extension', name: 'Extension' },
  { id: 'Termination', name: 'Termination' },
  { id: 'Other', name: 'Other' },
];

const SPACE_USE_OPTIONS: AiDropdownItem[] = [
  { id: 'Office', name: 'Office' },
  { id: 'Retail', name: 'Retail' },
  { id: 'Industrial', name: 'Industrial' },
  { id: 'Medical', name: 'Medical' },
  { id: 'Mixed Use', name: 'Mixed Use' },
  { id: 'Data Center', name: 'Data Center' },
  { id: 'Other', name: 'Other' },
];

const SERVICE_TYPE_OPTIONS: AiDropdownItem[] = [
  { id: 'Full Service Gross', name: 'Full Service Gross' },
  { id: 'Modified Gross', name: 'Modified Gross' },
  { id: 'NNN', name: 'NNN (Triple Net)' },
  { id: 'Net', name: 'Net' },
  { id: 'Modified Net', name: 'Modified Net' },
  { id: 'Gross', name: 'Gross' },
  { id: 'Other', name: 'Other' },
];

const PAYOR_OPTIONS: AiDropdownItem[] = [
  { id: 'tenant', name: 'Tenant' },
  { id: 'landlord', name: 'Landlord' },
  { id: 'shared', name: 'Shared' },
  { id: 'pro-rata', name: 'Pro-Rata' },
  { id: 'n/a', name: 'N/A' },
];

@Component({
  selector: 'mango-ai-lease-form',
  templateUrl: './ai-lease-form.component.html',
  styleUrls: ['./ai-lease-form.component.scss'],
})
export class AiLeaseFormComponent implements OnInit, OnDestroy {
  @ViewChild('mainScrollContainer')
  private mainScrollContainer?: ElementRef<HTMLDivElement>;

  form: FormGroup = new FormGroup({});
  sections: AiFormSection[] = [];
  sectionsExpanded: boolean[] = [];
  isLoading = true;
  editMode = false;
  errorMessage: string | null = null;
  abstractionStatus: string | null = null;
  pageTitle = 'AI Lease Abstraction';
  hasRenderableContent = false;

  private leaseId: number;
  private cachedFormId = 0;
  private hasStartedRendering = false;
  private readonly destroy$ = new Subject<void>();
  private readonly stopPolling$ = new Subject<void>();

  // Object type ID for leases
  private static readonly LEASE_OBJECT_TYPE_ID = 4;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly aiLeaseService: AiLeaseService,
    private readonly aiSidebarService: AiSidebarService,
    private readonly dynamicFormsService: DynamicFormsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.leaseId = Number(params.get('id'));
          this.cachedFormId = Number(this.route.snapshot.queryParamMap.get('formId') ?? 0);
          this.isLoading = true;
          this.errorMessage = null;
          this.abstractionStatus = null;
          this.hasRenderableContent = false;
          this.hasStartedRendering = false;
          this.sections = [];
          this.sectionsExpanded = [];
          this.form = new FormGroup({});
          this.stopPolling$.next(); // cancel any poll running from a previous route

          if (!this.cachedFormId) {
            this.errorMessage =
              'Missing required formId. AI abstraction detail cannot be rendered without a mapped form definition.';
            this.isLoading = false;
            return of(null);
          }

          return forkJoin({
            detail: this.aiLeaseService.getAbstractionById(this.leaseId),
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          if (!result) {
            return;
          }

          const { detail } = result;
          this.handleAbstractionDetail(detail);
        },
        error: () => {
          this.errorMessage = 'Failed to load lease abstraction data. Please try again.';
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.aiSidebarService.close();
    this.stopPolling$.next();
    this.stopPolling$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ─── Data-loading helpers ────────────────────────────────────────────────────

  private handleAbstractionDetail(detail: any): void {
    if (!detail) {
      this.errorMessage = 'Abstraction not found.';
      this.isLoading = false;
      return;
    }

    this.abstractionStatus = detail.status;

    if (detail.aiOutputJson) {
      this.renderDetail(detail);
    }

    if (detail.status !== 'Complete' && detail.status !== 'Error' && detail.status !== 'Cancelled') {
      this.startPolling();
    }

    if (detail.status === 'Error' && !this.hasRenderableContent) {
      this.errorMessage = detail.errorMessage ?? 'The AI abstraction encountered an error.';
      this.isLoading = false;
      return;
    }

    if (detail.status === 'Cancelled' && !this.hasRenderableContent) {
      this.errorMessage = 'The AI abstraction was cancelled before any results were available.';
      this.isLoading = false;
      return;
    }

    if (detail.status === 'Complete' && !this.hasRenderableContent) {
      this.errorMessage = 'AI output is missing for this abstraction.';
      this.isLoading = false;
      return;
    }

    if (!this.hasRenderableContent && detail.status !== 'Complete') {
      if (detail.status === 'Error') {
        this.errorMessage = detail.errorMessage ?? 'The AI abstraction encountered an error.';
      }
      this.isLoading = false;
      return;
    }
  }

  /** Poll every 5 s for status updates and render as soon as AI output exists. */
  private startPolling(): void {
    this.stopPolling$.next(); // cancel any prior poll
    timer(5000, 5000)
      .pipe(
        switchMap(() => this.aiLeaseService.getAbstractionById(this.leaseId)),
        takeUntil(this.stopPolling$),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (detail) => {
          if (!detail) {
            this.errorMessage = 'Abstraction not found.';
            return;
          }

          this.abstractionStatus = detail.status;

          if (detail.aiOutputJson) {
            this.renderDetail(detail);
          }

          if (detail.status === 'Error' && !this.hasRenderableContent) {
            this.errorMessage = detail.errorMessage ?? 'The AI abstraction encountered an error.';
            this.isLoading = false;
            this.stopPolling$.next();
            return;
          }

          if (detail.status === 'Cancelled' && !this.hasRenderableContent) {
            this.errorMessage = 'The AI abstraction was cancelled before any results were available.';
            this.isLoading = false;
            this.stopPolling$.next();
            return;
          }

          if (detail.status === 'Complete' && !this.hasRenderableContent) {
            this.errorMessage = 'AI output is missing for this abstraction.';
            this.isLoading = false;
            this.stopPolling$.next();
            return;
          }

          if (['Complete', 'Error', 'Cancelled'].includes(detail.status)) {
            this.stopPolling$.next();
          }
        },
      });
  }

  private renderDetail(detail: any): void {
    if (this.hasStartedRendering) {
      this.hasRenderableContent = true;
      this.isLoading = false;
      return;
    }

    if (!detail.aiOutputJson) {
      this.errorMessage = 'AI output is missing for this abstraction.';
      this.isLoading = false;
      return;
    }

    let aiOutput: IAIOutput;
    try {
      aiOutput = JSON.parse(detail.aiOutputJson) as IAIOutput;
    } catch {
      this.errorMessage = 'Failed to parse AI output data.';
      this.isLoading = false;
      return;
    }

    if (aiOutput.basics?.tenant?.value) {
      this.pageTitle = `AI Lease Abstraction — ${aiOutput.basics.tenant.value}`;
    }

    this.hasStartedRendering = true;
    this.hasRenderableContent = true;
    this.aiSidebarService.setAiOutput(this.leaseId, aiOutput);

    // ── Dynamic sections from form definition (backend-mapped) ──────────
    // When a formId is provided (via ?formId=N query param), the backend
    // fetches form fields, applies AI output mapping, and returns fields
    // with formItemAnswer populated. Angular groups them into sections.
    if (this.cachedFormId) {
      forkJoin({
        mappedForm: this.aiLeaseService.getMappedFormFields(
          this.leaseId,
          this.cachedFormId,
          AiLeaseFormComponent.LEASE_OBJECT_TYPE_ID
        ),
        dropdownValues: this.dynamicFormsService.getRenderFormFormItemDropdowns(
          this.cachedFormId,
          0,
          AiLeaseFormComponent.LEASE_OBJECT_TYPE_ID,
          0,
          0
        ).pipe(catchError(() => of({ data: {} }))),
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: ({ mappedForm, dropdownValues }) => {
            this.sections = this.groupIntoSections(
              mappedForm.fields,
              mappedForm.sections,
              dropdownValues?.data ?? {}
            );
            this.sectionsExpanded = this.sections.map(() => true);
            this.form = this.buildFormGroup(this.sections);
            this.isLoading = false;
          },
          error: () => {
            this.errorMessage =
              'Failed to load mapped form fields for this AI abstraction.';
            this.isLoading = false;
          },
        });
      return;
    }

    this.errorMessage =
      'Missing required formId. AI abstraction detail cannot be rendered without a mapped form definition.';
    this.isLoading = false;
  }

  toggleSidebar(): void {
    this.aiSidebarService.toggle(this.leaseId);
  }

  expandAll(): void {
    this.sectionsExpanded = this.sectionsExpanded.map(() => true);
  }

  collapseAll(): void {
    this.sectionsExpanded = this.sectionsExpanded.map(() => false);
  }

  scrollToTop(): void {
    this.mainScrollContainer?.nativeElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  onSave(): void {
    const reviewedFormData = JSON.stringify(this.form.getRawValue());
    this.aiLeaseService
      .saveReviewedFormData(this.leaseId, reviewedFormData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.editMode = false;
          this.form.disable();
        },
      });
  }

  onCancel(): void {
    this.editMode = false;
    this.form.disable();
  }

  navigateBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getSectionFormGroup(sectionKey: string): FormGroup {
    return this.form.get(sectionKey) as FormGroup;
  }

  // ─── Dynamic section helpers ─────────────────────────────────────────────────

  private groupIntoSections(
    fields: any[],
    sections: any[],
    dropdownValuesByFormItemId: Record<string, any[]> = {}
  ): AiFormSection[] {
    return sections
      .slice()
      .sort((a, b) => a.formSectionSortOrder - b.formSectionSortOrder)
      .map((section) => ({
        key: String(section.formSectionID),
        title: section.formSectionName,
        columns: this.normalizeSectionColumns(section.formSectionColumns),
        fields: fields
          .filter((f) => this.getFieldSectionId(f) === section.formSectionID)
          .sort((a, b) => this.getFieldSortOrder(a) - this.getFieldSortOrder(b))
          .map((f) => this.toAiFormField(f, dropdownValuesByFormItemId)),
      }))
      .filter((s) => s.fields.length > 0);
  }

  private toAiFormField(
    field: any,
    dropdownValuesByFormItemId: Record<string, any[]> = {}
  ): AiFormField {
    const sectionDetail = field.formItemSectionDetail ?? {};
    const dropdownItems = this.normalizeDropdownItems(
      dropdownValuesByFormItemId[String(field.formItemID)] ?? []
    );

    return {
      key: String(field.formItemID),
      label:
        sectionDetail.formItemLabel ||
        field.formItemLabel ||
        field.formItemFriendlyName ||
        field.formItemName,
      type: this.resolveAiFieldType(field),
      value: field.formItemAnswer ?? null,
      dropdownId: field.dropdownID || undefined,
      requestTypeId: field.requestTypeID || undefined,
      dropdownItems: dropdownItems.length ? dropdownItems : undefined,
    };
  }

  private resolveAiFieldType(field: any): AiFieldType {
    const sectionDetail = field.formItemSectionDetail ?? {};

    if (field.formItemTypeID === FormWizardTypeID.LIST_BOX) return 'dropdown';
    switch (field.dataTypeID ?? sectionDetail.dataTypeID) {
      case FormWizardDataTypeID.DATE: return 'date';
      case FormWizardDataTypeID.CURRENCY: return 'currency';
      case FormWizardDataTypeID.PERCENT: return 'percent';
      case FormWizardDataTypeID.INTEGER:
      case FormWizardDataTypeID.SMALL_INT:
      case FormWizardDataTypeID.DOUBLE:
      case FormWizardDataTypeID.NUMBER: return 'number';
      default: return 'text';
    }
  }

  private getFieldSectionId(field: any): number | null {
    return field.formSectionID ?? field.formItemSectionDetail?.formSectionID ?? null;
  }

  private getFieldSortOrder(field: any): number {
    return field.formItemSortOrder ?? field.formItemSectionDetail?.formItemSortOrder ?? Number.MAX_SAFE_INTEGER;
  }

  private normalizeSectionColumns(columns: any): number {
    const parsedColumns = Number(columns);
    if (!Number.isFinite(parsedColumns) || parsedColumns <= 0) {
      return 1;
    }

    return Math.min(Math.floor(parsedColumns), 4);
  }

  private normalizeDropdownItems(items: any[]): AiDropdownItem[] {
    if (!Array.isArray(items)) {
      return [];
    }

    return items
      .map((item) => ({
        id:
          item?.id ??
          item?.value ??
          item?.Value ??
          item?.lookupID ??
          item?.formItemID,
        name:
          item?.name ??
          item?.display ??
          item?.Display ??
          item?.text ??
          item?.label ??
          item?.value ??
          item?.Value,
      }))
      .filter((item) => item.id !== undefined && item.id !== null);
  }

  // ─── Section Builders ────────────────────────────────────────────────────────

  private buildHardcodedSections(aiOutput: IAIOutput, leaseTypes: any): void {
    const leaseTypeItems: AiDropdownItem[] = (leaseTypes?.data ?? []).map((item: any) => ({
      id: item.leaseTypeID,
      name: item.leaseTypeName ?? item.leaseType ?? String(item.leaseTypeID),
    }));

    this.sections = this.buildSections(aiOutput, leaseTypeItems);
    this.sectionsExpanded = this.sections.map(() => true);
    this.form = this.buildFormGroup(this.sections);
    this.isLoading = false;
  }

  private buildSections(data: IAIOutput, leaseTypeItems: AiDropdownItem[]): AiFormSection[] {
    return [
      this.buildBasicsSection(data, leaseTypeItems),
      this.buildDatesSection(data),
      this.buildRentSection(data),
      this.buildExpensesSection(data),
    ];
  }

  private buildBasicsSection(data: IAIOutput, leaseTypeItems: AiDropdownItem[]): AiFormSection {
    const address = data.basics?.addresses?.value
      ?.map((a) => [a.StreetAddress, a.CityStateZip].filter(Boolean).join(', '))
      .join('; ') ?? null;

    const floors = Array.isArray(data.basics?.floors?.value)
      ? data.basics.floors.value.join(', ')
      : null;

    // Map the AI's string value for leaseType to the corresponding leaseTypeID
    const leaseTypeValue = data.basics?.leaseType?.value;
    const leaseTypeId = leaseTypeItems.find(
      (item) => item.name?.toLowerCase() === leaseTypeValue?.toLowerCase()
    )?.id ?? leaseTypeValue;

    return {
      key: 'basics',
      title: 'Overview',
      fields: [
        { key: 'tenant', label: 'Tenant', type: 'text', value: data.basics?.tenant?.value },
        { key: 'landlord', label: 'Landlord', type: 'text', value: data.basics?.landlord?.value },
        { key: 'address', label: 'Address', type: 'text', value: address },
        { key: 'squareFootage', label: 'Square Footage (SF)', type: 'number', value: data.basics?.squareFootage?.value },
        { key: 'suite', label: 'Suite', type: 'text', value: data.basics?.suite?.value },
        { key: 'floors', label: 'Floors', type: 'text', value: floors },
        {
          key: 'leaseType',
          label: 'Lease Type',
          type: 'dropdown',
          value: leaseTypeId,
          dropdownItems: leaseTypeItems,
        },
        {
          key: 'dealType',
          label: 'Deal Type',
          type: 'dropdown',
          value: data.basics?.dealType?.value,
          dropdownItems: DEAL_TYPE_OPTIONS,
        },
        {
          key: 'spaceUse',
          label: 'Space Use',
          type: 'dropdown',
          value: data.basics?.spaceUse?.value,
          dropdownItems: SPACE_USE_OPTIONS,
        },
        { key: 'entireBuilding', label: 'Entire Building', type: 'boolean', value: data.basics?.entireBuilding?.value },
        { key: 'includesAmendments', label: 'Includes Amendments', type: 'boolean', value: data.basics?.includesAmendments?.value },
        { key: 'abstractionDate', label: 'Abstraction Date', type: 'date', value: data.basics?.abstractionDate?.value },
      ],
    };
  }

  private buildDatesSection(data: IAIOutput): AiFormSection {
    return {
      key: 'dates',
      title: 'Key Dates',
      fields: [
        { key: 'leaseSignDate', label: 'Lease Sign Date', type: 'date', value: data.dates?.leaseSignDate?.value },
        { key: 'leaseStartDate', label: 'Lease Start Date', type: 'date', value: data.dates?.leaseStartDate?.value },
        { key: 'leaseCommencementDate', label: 'Commencement Date (CD)', type: 'date', value: data.dates?.leaseCommencementDate?.value },
        { key: 'rentCommencementDate', label: 'Rent Commencement Date (RCD)', type: 'date', value: data.dates?.rentCommencementDate?.value },
        { key: 'leaseEndDate', label: 'Lease End Date', type: 'date', value: data.dates?.leaseEndDate?.value },
        { key: 'leaseTermInMonths', label: 'Lease Term (Months)', type: 'number', value: data.dates?.leaseTermInMonths?.value },
      ],
    };
  }

  private buildRentSection(data: IAIOutput): AiFormSection {
    const schedule = data.rent?.baseRentSchedule;
    const rentSchedule: AiRentScheduleSection | undefined =
      (schedule?.value?.length ?? 0) > 0
        ? {
          scheduleItems: schedule!.value!,
          abatementItems: data.rent?.rentAbatements?.value ?? [],
          startsFromRCD: schedule!.subfields?.startsFromRCD ?? false,
          startsFromCD: schedule!.subfields?.startsFromCD ?? false,
        }
        : undefined;

    return {
      key: 'rent',
      title: 'Rent',
      fields: [
        {
          key: 'effectiveRent',
          label: 'Effective Rent (Annual $/SF)',
          type: 'currency',
          value: data.rent?.effectiveRent?.value,
        },
        {
          key: 'annualEscalation',
          label: 'Annual Escalation',
          type: 'percent',
          value: data.rent?.annualEscalation?.value?.percent,
        },
        {
          key: 'tiAllowance',
          label: 'TI Allowance (Total)',
          type: 'currency',
          value: data.rent?.tenantImprovementAllowance?.value,
          citation: data.rent?.tenantImprovementAllowance?.citation,
        },
        {
          key: 'tiAllowancePerSf',
          label: 'TI Allowance ($/SF)',
          type: 'currency',
          value: data.rent?.tenantImprovementAllowance?.subfields?.allowances?.[0]?.amount,
        },
      ],
      rentSchedule,
    };
  }

  private buildExpensesSection(data: IAIOutput): AiFormSection {
    const expenseFields: AiFormField[] = [
      {
        key: 'serviceType',
        label: 'Service Type',
        type: 'dropdown',
        value: data.expenses?.serviceTypeEstimate?.value,
        dropdownItems: SERVICE_TYPE_OPTIONS,
      },
      {
        key: 'operatingExpenses',
        label: 'Operating Expenses',
        type: 'dropdown',
        value: data.expenses?.operatingExpenses?.value,
        dropdownItems: PAYOR_OPTIONS,
        citation: data.expenses?.operatingExpenses?.citation,
      },
      {
        key: 'cam',
        label: 'CAM',
        type: 'dropdown',
        value: data.expenses?.cam?.value,
        dropdownItems: PAYOR_OPTIONS,
        citation: data.expenses?.cam?.citation,
      },
      {
        key: 'insurance',
        label: 'Insurance',
        type: 'dropdown',
        value: data.expenses?.insurance?.value,
        dropdownItems: PAYOR_OPTIONS,
      },
      {
        key: 'taxes',
        label: 'Taxes / Real Estate',
        type: 'dropdown',
        value: data.expenses?.taxes?.value,
        dropdownItems: PAYOR_OPTIONS,
      },
      {
        key: 'water',
        label: 'Water',
        type: 'dropdown',
        value: data.expenses?.water?.value,
        dropdownItems: PAYOR_OPTIONS,
      },
      {
        key: 'gas',
        label: 'Gas',
        type: 'dropdown',
        value: data.expenses?.gas?.value,
        dropdownItems: PAYOR_OPTIONS,
      },
      {
        key: 'electricity',
        label: 'Electricity',
        type: 'dropdown',
        value: data.expenses?.electricity?.value,
        dropdownItems: PAYOR_OPTIONS,
      },
      {
        key: 'hvac',
        label: 'HVAC',
        type: 'dropdown',
        value: data.expenses?.hvac?.value,
        dropdownItems: PAYOR_OPTIONS,
        citation: data.expenses?.hvac?.citation,
      },
      {
        key: 'cleaning',
        label: 'Cleaning',
        type: 'dropdown',
        value: data.expenses?.cleaning?.value,
        dropdownItems: PAYOR_OPTIONS,
        citation: data.expenses?.cleaning?.citation,
      },
    ];

    return { key: 'expenses', title: 'Expenses', fields: expenseFields };
  }

  // ─── Form Group Builder ──────────────────────────────────────────────────────

  private buildFormGroup(sections: AiFormSection[]): FormGroup {
    const root: { [key: string]: FormGroup } = {};

    sections.forEach((section) => {
      const sectionControls: { [key: string]: FormControl } = {};

      section.fields.forEach((field) => {
        sectionControls[field.key] = new FormControl({ value: field.value ?? null, disabled: true });
      });

      root[section.key] = new FormGroup(sectionControls);
    });

    return new FormGroup(root);
  }
}
