import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of, Subject, timer } from 'rxjs';
import { catchError, switchMap, take, takeUntil } from 'rxjs/operators';
import { AiDropdownItem, AiFieldType, AiFormField, AiFormSection } from '../models/ai-form.model';
import { IAIOutput } from '../models/ai-output.model';
import { AiLeaseService } from '../services/ai-lease.service';
import { AiSidebarService } from '../ai-sidebar/ai-sidebar.service';
import { FormWizardDataTypeID, FormWizardTypeID } from '@forms/model/dynamic-forms.interface';
import { DynamicFormsService } from '../../services/dynamic-forms.service';
import { ObjectType } from '@mango/data-models/lib-data-models';
import { ObjectTypeType } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { BreadCrumb } from '@mango/data-models/lib-data-models';

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
  pageTitle = 'Lease:';
  pageSubtitle = '';
  hasRenderableContent = false;
  parentBuildingLink: { label: string; queryParams: Record<string, number> } | null = null;
  isSuperUser = false;

  leaseId: number;
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
    private readonly dynamicFormsService: DynamicFormsService,
    private readonly mangoAppFacade: MangoAppFacade
  ) { }

  ngOnInit(): void {
    this.mangoAppFacade.contactRecord$
      .pipe(takeUntil(this.destroy$))
      .subscribe((contact) => {
        this.isSuperUser =
          contact?.userRoleName?.toLowerCase().trim() === 'superuser';
      });

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
          this.parentBuildingLink = null;
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

    const titleName =
      aiOutput.basics?.tenant?.value ||
      detail?.aiTenant ||
      detail?.formName ||
      String(this.leaseId);
    this.pageTitle = 'Lease:';
    this.pageSubtitle = titleName;
    this.updateBreadcrumbTitle(titleName);

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
          detail?.buildingId ?? 0,
          detail?.buildingId ? ObjectType.BUILDING : 0
        ).pipe(catchError(() => of({ data: {} }))),
        buildingForm:
          detail?.buildingId
            ? this.dynamicFormsService
                .getFormForObjectTypeType(ObjectTypeType.Building)
                .pipe(catchError(() => of({ data: null })))
            : of({ data: null }),
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: ({ mappedForm, dropdownValues, buildingForm }) => {
            this.parentBuildingLink = this.buildParentBuildingLink(
              detail,
              buildingForm?.data
            );
            this.sections = this.groupIntoSections(
              mappedForm.fields,
              mappedForm.sections,
              dropdownValues?.data ?? {},
              aiOutput,
              detail
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

  printPage(): void {
    window.print();
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
    dropdownValuesByFormItemId: Record<string, any[]> = {},
    aiOutput?: IAIOutput,
    detail?: any
  ): AiFormSection[] {
    return sections
      .slice()
      .sort((a, b) => a.formSectionSortOrder - b.formSectionSortOrder)
      .filter((section) => !this.isParentLinkSection(section))
      .map((section) => {
        const normalizedColumns = this.normalizeSectionColumns(section.formSectionColumns);
        const sectionFields = fields
          .filter((f) => !this.isParentLinkField(f))
          .filter((f) => this.getFieldSectionId(f) === section.formSectionID)
          .map((f, index) =>
            this.toAiFormField(
              f,
              dropdownValuesByFormItemId,
              index,
              aiOutput,
              detail
            )
          );
        const outlierFields = sectionFields.filter(
          (field) => (field.column ?? 1) > normalizedColumns
        );
        const columnGroups = Array.from({ length: normalizedColumns }, (_, index) => {
          const columnNum = index + 1;
          let columnFields = sectionFields
            .filter((field) => (field.column ?? 1) === columnNum)
            .sort((a, b) => (a.sourceIndex ?? Number.MAX_SAFE_INTEGER) - (b.sourceIndex ?? Number.MAX_SAFE_INTEGER));

          if (columnNum === 1 && outlierFields.length) {
            columnFields = columnFields.concat(
              outlierFields.sort(
                (a, b) => (a.sourceIndex ?? Number.MAX_SAFE_INTEGER) - (b.sourceIndex ?? Number.MAX_SAFE_INTEGER)
              )
            );
          }

          return {
            columnNum,
            fields: columnFields,
          };
        }).filter((group) => group.fields.length > 0);

        return {
          key: String(section.formSectionID),
          title: section.formSectionName,
          columns: normalizedColumns,
          fields: sectionFields,
          columnGroups,
        };
      })
      .filter((s) => s.fields.length > 0);
  }

  private toAiFormField(
    field: any,
    dropdownValuesByFormItemId: Record<string, any[]> = {},
    sourceIndex = 0,
    aiOutput?: IAIOutput,
    detail?: any
  ): AiFormField {
    const sectionDetail = field.formItemSectionDetail ?? {};
    const formItemTypeName =
      field.formItemType?.formItemType ??
      field.formItemType?.FormItemType ??
      field.formItemTypeName ??
      null;
    const dropdownItems = this.normalizeDropdownItems(
      dropdownValuesByFormItemId[String(field.formItemID)] ?? []
    );
    const fieldType = this.resolveAiFieldType(field);
    const fallbackValue = this.resolveAiFieldValue(field, aiOutput, detail);
    const resolvedValue = this.hasMeaningfulValue(field.formItemAnswer)
      ? field.formItemAnswer
      : fallbackValue;

    return {
      key: String(field.formItemID),
      label:
        sectionDetail.formItemLabel ||
        field.formItemLabel ||
        field.formItemFriendlyName ||
        field.formItemName,
      type: fieldType,
      value: resolvedValue,
      dropdownId: field.dropdownID || undefined,
      requestTypeId: field.requestTypeID || undefined,
      dropdownItems: dropdownItems.length ? dropdownItems : undefined,
      column: this.getFieldColumn(field),
      sortOrder: this.getFieldSortOrder(field),
      sourceIndex,
      formItemTypeID: field.formItemTypeID ?? undefined,
      formItemTypeName,
      dataTypeID: field.dataTypeID ?? sectionDetail.dataTypeID ?? undefined,
      formItemParameters: field.formItemParameters ?? null,
      formItemViewOnly: Boolean(field.formItemViewOnly),
      formItemFieldWidth: field.formItemFieldWidth ?? undefined,
      formItemFieldHeight: field.formItemFieldHeight ?? undefined,
      radioOptions: this.parseFormItemParameters(field.formItemParameters),
      displayValue: this.resolveFieldDisplayValue(field, resolvedValue, detail),
      isAiOutputField:
        this.hasMeaningfulValue(resolvedValue),
    };
  }

  private resolveAiFieldType(field: any): AiFieldType {
    const sectionDetail = field.formItemSectionDetail ?? {};
    const formItemTypeName = (
      field.formItemType?.formItemType ??
      field.formItemType?.FormItemType ??
      field.formItemTypeName ??
      ''
    ).toString();

    switch (formItemTypeName) {
      case 'List Box':
        return 'dropdown';
      case 'Comment Area':
        return 'textarea';
      case 'EmailAddress':
        return 'email';
      case 'Image':
      case 'Dyn Form Image':
        return 'image';
      case 'Checkbox':
        return 'boolean';
      case 'Radio Button':
        return 'radio';
      case 'Multi-Select(Dropdown Based)':
      case 'Multi-Select (SQL Based)':
        return 'multiselect';
      case 'Hidden':
      case 'Filler':
        return 'hidden';
      case 'Text only':
        return 'textonly';
      case 'Password':
        return 'password';
    }

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

  private getFieldColumn(field: any): number {
    const column = Number(field.formItemSectionDetail?.columnNum ?? field.columnNum ?? 1);

    if (!Number.isFinite(column) || column <= 0) {
      return 1;
    }

    return Math.floor(column);
  }

  private normalizeSectionColumns(columns: any): number {
    const parsedColumns = Number(columns);
    if (!Number.isFinite(parsedColumns) || parsedColumns <= 0) {
      return 1;
    }

    return Math.min(Math.floor(parsedColumns), 4);
  }

  private isParentLinkSection(section: any): boolean {
    return this.normalizeCandidate(section?.formSectionName) === 'leaseparentlink';
  }

  private isParentLinkField(field: any): boolean {
    const candidates = [
      field?.formItemSystemName,
      field?.formItemName,
      field?.formItemFriendlyName,
      field?.formItemLabel,
      field?.formItemSectionDetail?.formItemLabel,
    ]
      .filter(Boolean)
      .map((value: string) => this.normalizeCandidate(value));

    return candidates.includes('leaseparentlink');
  }

  private buildParentBuildingLink(
    detail: any,
    buildingFormId: number | null | undefined
  ): { label: string; queryParams: Record<string, number> } | null {
    if (!detail?.buildingId || !detail?.buildingName || !buildingFormId) {
      return null;
    }

    return {
      label: `Building: ${detail.buildingName}`,
      queryParams: {
        fid: Number(buildingFormId),
        oid: Number(detail.buildingId),
        otid: ObjectType.BUILDING,
        ottid: ObjectTypeType.Building,
      },
    };
  }

  navigateToParentBuilding(): void {
    if (!this.parentBuildingLink) {
      return;
    }

    this.router.navigate(['/crem/forms/render-form'], {
      queryParams: this.parentBuildingLink.queryParams,
    });
  }

  private updateBreadcrumbTitle(titleName: string): void {
    this.mangoAppFacade.breadcrumbs$
      .pipe(take(1))
      .subscribe((breadcrumbs: BreadCrumb[] | null | undefined) => {
        if (!breadcrumbs?.length) {
          return;
        }

        const updated = [...breadcrumbs];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          label: titleName,
        };

        this.mangoAppFacade.setBreadcrumbs(updated);
      });
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

  private parseFormItemParameters(parameters: string | null | undefined) {
    if (!parameters) {
      return undefined;
    }

    const options = parameters
      .split('|')
      .map((param) => {
        const [valuePart, labelPart] = param.split(',');
        const value = valuePart?.split('=')[1]?.trim();
        const display = labelPart?.split('=')[1]?.trim();

        if (!value || !display) {
          return null;
        }

        return { value, display };
      })
      .filter(Boolean);

    return options.length ? options : undefined;
  }

  private resolveFieldDisplayValue(
    field: any,
    resolvedValue: any,
    detail?: any
  ): string | undefined {
    if (this.hasMeaningfulValue(resolvedValue)) {
      return undefined;
    }

    if (!detail) {
      return undefined;
    }

    const candidates = this.getFieldCandidates(field);

    if (
      candidates.some((value) =>
        ['portfolio', 'portfolioid', 'mastergroup', 'company', 'companyid'].includes(value)
      )
    ) {
      return detail?.portfolioName ?? undefined;
    }

    if (
      candidates.some((value) =>
        ['buildingid', 'parentbuildingid'].includes(value)
      )
    ) {
      return detail?.buildingName ?? undefined;
    }

    return undefined;
  }

  private resolveAiFieldValue(
    field: any,
    aiOutput?: IAIOutput,
    detail?: any
  ): any {
    if (!aiOutput) {
      return null;
    }

    const candidates = this.getFieldCandidates(field);
    const address = aiOutput.basics?.addresses?.value?.[0];
    const parsedAddress = this.parseAddress(address);
    const suite = aiOutput.basics?.suite?.value ?? null;
    const tenant = aiOutput.basics?.tenant?.value ?? null;
    const landlord = aiOutput.basics?.landlord?.value ?? null;
    const spaceUse = aiOutput.basics?.spaceUse?.value ?? null;
    const leaseType = aiOutput.basics?.leaseType?.value ?? null;
    const dealType = aiOutput.basics?.dealType?.value ?? null;
    const squareFootage = aiOutput.basics?.squareFootage?.value ?? null;
    const entireBuilding = aiOutput.basics?.entireBuilding?.value ?? null;
    const signDate = aiOutput.dates?.leaseSignDate?.value ?? null;
    const commencementDate =
      aiOutput.dates?.leaseCommencementDate?.value ??
      aiOutput.dates?.leaseStartDate?.value ??
      null;
    const rentCommencementDate = aiOutput.dates?.rentCommencementDate?.value ?? null;
    const leaseEndDate = aiOutput.dates?.leaseEndDate?.value ?? null;
    const termMonths = aiOutput.dates?.leaseTermInMonths?.value ?? null;
    const effectiveRent = aiOutput.rent?.effectiveRent?.value ?? null;
    const annualEscalation = aiOutput.rent?.annualEscalation?.value?.percent ?? null;
    const tiAllowance = aiOutput.rent?.tenantImprovementAllowance?.value ?? null;

    if (candidates.some((value) => ['tenant', 'tenantname'].includes(value))) {
      return tenant;
    }

    if (candidates.some((value) => ['landlord', 'landlordname', 'legalentity'].includes(value))) {
      return landlord;
    }

    if (candidates.some((value) => ['buildingname'].includes(value))) {
      return detail?.buildingName ?? null;
    }

    if (candidates.some((value) => ['address1', 'streetaddress', 'propertyaddress'].includes(value))) {
      return parsedAddress.address1;
    }

    if (candidates.some((value) => ['address2'].includes(value))) {
      return parsedAddress.address2;
    }

    if (candidates.some((value) => ['city'].includes(value))) {
      return parsedAddress.city;
    }

    if (candidates.some((value) => ['state'].includes(value))) {
      return parsedAddress.state;
    }

    if (candidates.some((value) => ['zip', 'zipcode', 'postalcode'].includes(value))) {
      return parsedAddress.zip;
    }

    if (candidates.some((value) => ['floorsuite', 'suite'].includes(value))) {
      return suite;
    }

    if (candidates.some((value) => ['primaryuse', 'spaceuse'].includes(value))) {
      return spaceUse;
    }

    if (candidates.some((value) => ['leasetype'].includes(value))) {
      return leaseType;
    }

    if (candidates.some((value) => ['dealtype'].includes(value))) {
      return dealType;
    }

    if (candidates.some((value) => ['squarefootage', 'rentablearea', 'grossarea', 'leasedarea', 'sqft', 'netrentablearea'].includes(value))) {
      return squareFootage;
    }

    if (candidates.some((value) => ['entirebuilding'].includes(value))) {
      return entireBuilding;
    }

    if (candidates.some((value) => ['leasesigndate', 'signdate', 'executiondate', 'signeddate'].includes(value))) {
      return signDate;
    }

    if (candidates.some((value) => ['leasecommencementdate', 'commencementdate', 'commencement', 'leasestartdate', 'begindate', 'startdate', 'leasebegindate'].includes(value))) {
      return commencementDate;
    }

    if (candidates.some((value) => ['rentcommencementdate', 'rentcommencement', 'rcd'].includes(value))) {
      return rentCommencementDate;
    }

    if (candidates.some((value) => ['leaseenddate', 'enddate', 'expirationdate', 'expiration'].includes(value))) {
      return leaseEndDate;
    }

    if (candidates.some((value) => ['leasetermmonths', 'termmonths', 'terminmonths', 'term'].includes(value))) {
      return termMonths;
    }

    if (candidates.some((value) => ['effectiverent', 'baserent', 'annualrent', 'rentpersf'].includes(value))) {
      return effectiveRent;
    }

    if (candidates.some((value) => ['annualescalation', 'escalationrate', 'escalation', 'rentescalation'].includes(value))) {
      return annualEscalation;
    }

    if (candidates.some((value) => ['tiallowance', 'tenantimprovementallowance', 'tenantimprovement', 'tiamount'].includes(value))) {
      return tiAllowance;
    }

    return null;
  }

  private getFieldCandidates(field: any): string[] {
    return [
      field?.formItemSystemName,
      field?.formItemName,
      field?.formItemFriendlyName,
      field?.formItemLabel,
      field?.formItemSectionDetail?.formItemLabel,
    ]
      .filter(Boolean)
      .map((value: string) => this.normalizeCandidate(value));
  }

  private normalizeCandidate(value: string | null | undefined): string {
    return String(value ?? '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  }

  private hasMeaningfulValue(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === 'string') {
      return value.trim().length > 0 && value.trim() !== '—';
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return true;
  }

  private parseAddress(address: any): {
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
  } {
    const address1 = address?.StreetAddress?.trim?.() || null;
    const cityStateZip = address?.CityStateZip?.trim?.() || null;

    if (!cityStateZip) {
      return {
        address1,
        address2: null,
        city: null,
        state: null,
        zip: null,
      };
    }

    const match = cityStateZip.match(/^(.*?),\s*([A-Za-z ]+?)\s+(\d{5}(?:-\d{4})?)$/);
    if (match) {
      return {
        address1,
        address2: null,
        city: match[1].trim(),
        state: match[2].trim(),
        zip: match[3].trim(),
      };
    }

    const parts = cityStateZip.split(',').map((part: string) => part.trim()).filter(Boolean);

    return {
      address1,
      address2: null,
      city: parts[0] ?? null,
      state: parts[1] ?? null,
      zip: null,
    };
  }

  // ─── Form Group Builder ──────────────────────────────────────────────────────

  private buildFormGroup(sections: AiFormSection[]): FormGroup {
    const root: { [key: string]: FormGroup } = {};

    sections.forEach((section) => {
      const sectionControls: { [key: string]: FormControl } = {};

      section.fields.forEach((field) => {
        sectionControls[field.key] = new FormControl({
          value: this.getInitialFieldValue(field),
          disabled: true,
        });
      });

      root[section.key] = new FormGroup(sectionControls);
    });

    return new FormGroup(root);
  }

  private getInitialFieldValue(field: AiFormField): any {
    if (field.type === 'boolean') {
      return this.toBoolean(field.value);
    }

    if (field.type === 'multiselect') {
      if (Array.isArray(field.value)) {
        return field.value;
      }

      if (typeof field.value === 'string' && field.value.trim().length) {
        return field.value
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean);
      }

      return [];
    }

    return field.value ?? null;
  }

  private toBoolean(value: any): boolean {
    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'number') {
      return value === 1;
    }

    if (typeof value === 'string') {
      return ['true', '1', 'yes', 'y'].includes(value.trim().toLowerCase());
    }

    return false;
  }
}
