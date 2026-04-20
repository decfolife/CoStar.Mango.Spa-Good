import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, EMPTY, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import type { HighlightRange } from 'document-viewer-sdk';
import { DxDataGridComponent } from 'devextreme-angular';
import { IAIOutput } from '../models/ai-output.model';
import {
  AiAbstractionDocument,
  AiAbstractionDocumentArtifact,
  AiLeaseService,
} from '../services/ai-lease.service';
import { AiSidebarService } from './ai-sidebar.service';
import type { DocumentSource } from 'document-viewer-sdk';

interface SidebarField {
  label: string;
  value: string;
  citation?: string;
}

interface SidebarSection {
  title: string;
  fields: SidebarField[];
  isExpanded: boolean;
}

interface DocumentOption {
  key: string;
  type: 'document' | 'artifact';
  documentGuid: string | null;
  documentId: number;
  groupId: string;
  groupLabel: string;
  url?: string;
  artifactGuid?: string | null;
  artifactId?: number;
  fileName: string;
  artifactType?: string;
  attachmentTypeId?: number;
  mimeType?: string;
  contentText?: string;
  externalStatus?: string;
  externalAbstractionStatus?: string;
  externalStatusDetail?: string;
  externalAiOutputJson?: string;
}

interface DocumentOptionGroup {
  key: string;
  items: DocumentOption[];
}

@Component({
  selector: 'mango-ai-sidebar',
  templateUrl: './ai-sidebar.component.html',
  styleUrls: ['./ai-sidebar.component.scss'],
})
export class AiSidebarComponent implements OnInit, OnDestroy {
  @ViewChildren(DxDataGridComponent) dataGrids: QueryList<DxDataGridComponent>;

  isOpen = false;
  isLoading = false;
  errorMessage: string | null = null;
  sections: SidebarSection[] = [];
  rentScheduleItems: any[] = [];
  abatementItems: any[] = [];
  currentWidth = 420;
  activeTabIndex = 1;
  documentSource: DocumentSource | null = null;
  documentFileName: string | null = null;
  documentLoadError: string | null = null;
  documentOptions: DocumentOption[] = [];
  groupedDocumentOptions: DocumentOptionGroup[] = [];
  selectedDocumentKey: string | null = null;
  isDocumentLoading = false;
  currentAiAbstractionId: number | null = null;
  documentSearchQuery: string | null = null;
  /** Saved highlights passed to [initialBookmarks] — set once per document load. */
  currentBookmarks: HighlightRange[] = [];
  /** True once the user adds a highlight; prevents loadHighlights from overwriting. */
  private _viewerHasUserChanges = false;
  private loadedDocumentContextId: number | null = null;
  private handledDocumentRequestId = 0;
  private readonly bookmarkSave$ = new Subject<{
    documentGuid: string;
    bookmarks: HighlightRange[];
  }>();

  private isDragging = false;
  private dragStartX = 0;
  private dragStartWidth = 0;
  private readonly MIN_WIDTH = 250;
  private readonly MAX_WIDTH = 800;
  private resizeObserver: ResizeObserver;

  readonly rentScheduleColumns = [
    {
      dataField: 'startDate',
      caption: 'Start',
      dataType: 'date',
      format: 'MM/dd/yyyy',
    },
    {
      dataField: 'endDate',
      caption: 'End',
      dataType: 'date',
      format: 'MM/dd/yyyy',
    },
    {
      dataField: 'monthlyBaseRent',
      caption: 'Monthly Rent',
      dataType: 'number',
      format: { type: 'currency', precision: 0 },
    },
  ];

  readonly abatementColumns = [
    {
      dataField: 'startDate',
      caption: 'Start',
      dataType: 'date',
      format: 'MM/dd/yyyy',
    },
    {
      dataField: 'endDate',
      caption: 'End',
      dataType: 'date',
      format: 'MM/dd/yyyy',
    },
    {
      dataField: 'discountAmount',
      caption: 'Amount',
      dataType: 'number',
      format: { type: 'currency', precision: 0 },
    },
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly aiSidebarService: AiSidebarService,
    private readonly aiLeaseService: AiLeaseService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    // Debounce highlight saves — user might be adding several in quick succession
    this.bookmarkSave$
      .pipe(
        debounceTime(1500),
        switchMap(({ documentGuid, bookmarks }) =>
          this.aiLeaseService
            .saveDocumentHighlights(documentGuid, bookmarks)
            .pipe(
              catchError((error) => {
                console.error('Failed to save document highlights', {
                  documentGuid,
                  error,
                });
                return EMPTY;
              })
            )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();

    // Repaint grids whenever the sidebar's width changes (drag or open/close transition)
    this.resizeObserver = new ResizeObserver(() => {
      this.dataGrids?.forEach((grid) => grid.instance?.repaint());
    });
    this.resizeObserver.observe(this.el.nativeElement);

    combineLatest([
      this.aiSidebarService.state$,
      this.route.queryParams,
      this.route.paramMap,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (
            [prevState, prevParams, prevParamMap],
            [nextState, nextParams, nextParamMap]
          ) =>
            prevState.isOpen === nextState.isOpen &&
            prevState.leaseId === nextState.leaseId &&
            prevState.documentRequestId === nextState.documentRequestId &&
            prevParams['oid'] === nextParams['oid'] &&
            prevParamMap.get('id') === nextParamMap.get('id')
        )
      )
      .subscribe(([state, params, paramMap]) => {
        this.isOpen = state.isOpen;
        this.syncGlobalSidebarState();
        // Prefer explicit sidebar state id, then AI abstraction route param,
        // then dynamic form ?oid= query param.
        const oid =
          state.leaseId ??
          (paramMap.get('id') ? Number(paramMap.get('id')) : null) ??
          (params['oid'] ? Number(params['oid']) : null);

        if (state.isOpen && oid) {
          const abstractionChanged = this.currentAiAbstractionId !== oid;
          this.currentAiAbstractionId = oid;
          if (abstractionChanged) {
            this.documentSource = null;
            this.documentFileName = null;
            this.documentLoadError = null;
            this.documentOptions = [];
            this.groupedDocumentOptions = [];
            this.selectedDocumentKey = null;
            this.isDocumentLoading = false;
            this.documentSearchQuery = null;
            this.loadedDocumentContextId = null;
          }

          if (state.documentRequestId !== this.handledDocumentRequestId) {
            this.handledDocumentRequestId = state.documentRequestId;
            this.documentSearchQuery =
              state.documentSearchQuery?.trim() || null;
            this.activeTabIndex = 0;
          }

          if (this.activeTabIndex === 0) {
            this.ensureDocumentContextLoaded();
          }
          if (state.aiOutput && state.leaseId === oid) {
            this.populateFromAiOutput(state.aiOutput);
          } else {
            this.loadData(oid);
          }
        } else if (!state.isOpen) {
          this.sections = [];
          this.rentScheduleItems = [];
          this.abatementItems = [];
          this.errorMessage = null;
          this.documentSource = null;
          this.documentFileName = null;
          this.documentLoadError = null;
          this.documentOptions = [];
          this.groupedDocumentOptions = [];
          this.selectedDocumentKey = null;
          this.isDocumentLoading = false;
          this.currentAiAbstractionId = null;
          this.documentSearchQuery = null;
          this.loadedDocumentContextId = null;
          this.handledDocumentRequestId = 0;
          this.activeTabIndex = 1;
        }
      });
  }

  ngOnDestroy(): void {
    this.clearGlobalSidebarState();
    this.resizeObserver?.disconnect();
    this.destroy$.next();
    this.destroy$.complete();
  }

  close(): void {
    this.aiSidebarService.close();
  }

  get selectedDocument(): DocumentOption | null {
    return (
      this.documentOptions.find(
        (item) => item.key === this.selectedDocumentKey
      ) ?? null
    );
  }

  get selectedDocumentContent(): string | null {
    return this.prettifyJson(this.selectedDocument?.contentText);
  }

  toggleSection(section: SidebarSection): void {
    section.isExpanded = !section.isExpanded;
  }

  hasAbatements(): boolean {
    return this.abatementItems.length > 0;
  }

  copyCitation(text: string): void {
    navigator.clipboard?.writeText(text);
  }

  onTabChange(index: number): void {
    this.activeTabIndex = index;

    if (index === 0) {
      this.ensureDocumentContextLoaded();
    }
  }

  onDocumentSelectionChange(documentKey: string): void {
    if (!documentKey || documentKey === this.selectedDocumentKey) {
      return;
    }

    const document = this.documentOptions.find(
      (item) => item.key === documentKey
    );
    if (!document) {
      return;
    }

    this.loadDocumentFile(document);
  }

  onDocumentDropdownChange(selection: DocumentOption[]): void {
    const selectedDocument = selection?.[0];
    if (!selectedDocument) {
      return;
    }

    this.onDocumentSelectionChange(selectedDocument.key);
  }

  openDocumentInNewWindow(): void {
    if (!this.currentAiAbstractionId) {
      return;
    }

    const tree = this.router.createUrlTree(
      ['/crem/portfolio/ai-abstractions/document', this.currentAiAbstractionId],
      {
        queryParams:
          this.selectedDocument?.type === 'artifact'
            ? { artifactGuid: this.selectedDocument.artifactGuid }
            : this.selectedDocument?.documentGuid
            ? { documentGuid: this.selectedDocument.documentGuid }
            : {},
      }
    );

    const url = this.router.serializeUrl(tree);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // ─── Resize ──────────────────────────────────────────────────────────────────

  onResizeStart(event: MouseEvent): void {
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartWidth = this.currentWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    // Sidebar is on the right edge; dragging left (smaller clientX) increases width
    const delta = this.dragStartX - event.clientX;
    this.currentWidth = Math.min(
      this.MAX_WIDTH,
      Math.max(this.MIN_WIDTH, this.dragStartWidth + delta)
    );
    this.syncGlobalSidebarState();
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  // ─── Data ────────────────────────────────────────────────────────────────────

  private loadData(oid: number): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.aiLeaseService
      .getLeaseById(oid)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (!data) {
            this.errorMessage = 'No AI abstraction found for this lease.';
          } else {
            this.aiSidebarService.setAiOutput(oid, data);
            this.populateFromAiOutput(data);
          }
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load AI summary data.';
          this.isLoading = false;
        },
      });
  }

  private loadDocumentContext(aiAbstractionId: number): void {
    this.documentLoadError = null;
    this.documentSource = null;
    this.documentFileName = null;
    this.documentOptions = [];
    this.groupedDocumentOptions = [];
    this.selectedDocumentKey = null;
    this.isDocumentLoading = true;

    this.aiLeaseService
      .getAbstractionDocumentsWithPipelineArtifacts(aiAbstractionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (documents) => {
          this.populateDocumentContextFromDocuments(aiAbstractionId, documents);
        },
        error: () => {
          this.loadedDocumentContextId = null;
          this.documentSource = null;
          this.documentFileName = null;
          this.documentOptions = [];
          this.groupedDocumentOptions = [];
          this.documentLoadError = 'Failed to load document metadata.';
          this.isDocumentLoading = false;
        },
      });
  }

  private populateDocumentContextFromDocuments(
    aiAbstractionId: number,
    documents: AiAbstractionDocument[] | null | undefined
  ): boolean {
    const validDocuments =
      documents?.reduce<DocumentOption[]>((allOptions, document) => {
        allOptions.push(...this.mapDocumentOptions(document));
        return allOptions;
      }, []) ?? [];

    this.documentOptions = validDocuments;
    this.groupedDocumentOptions = this.groupDocumentOptions(validDocuments);

    if (!validDocuments.length) {
      this.isDocumentLoading = false;
      this.loadedDocumentContextId = null;
      this.documentLoadError =
        'No documents were found for this AI abstraction.';
      return false;
    }

    this.loadedDocumentContextId = aiAbstractionId;
    this.loadDocumentFile(validDocuments[0]);

    return true;
  }

  private loadDocumentFile(document: DocumentOption): void {
    this.selectedDocumentKey = document.key;
    this.documentFileName = document.fileName;
    this.documentLoadError = null;
    this.documentSource = null;
    this.currentBookmarks = [];
    this._viewerHasUserChanges = false;
    this.isDocumentLoading = true;

    if (this.shouldRenderAsText(document) && !document.contentText) {
      this.aiLeaseService
        .getAbstractionDocumentText({
          documentGuid: document.documentGuid ?? undefined,
          documentId: document.documentId,
          artifactGuid: document.artifactGuid ?? undefined,
          artifactId: document.artifactId,
          fileName: document.fileName,
          mimeType: document.mimeType,
          url: document.url,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (text) => {
            document.contentText = text;
            this.documentSource = null;
            this.documentLoadError = null;
            this.isDocumentLoading = false;
          },
          error: () => {
            this.documentSource = null;
            this.documentLoadError = 'Failed to load document file.';
            this.isDocumentLoading = false;
          },
        });
      return;
    }

    this.aiLeaseService
      .getAbstractionDocumentFile({
        documentGuid: document.documentGuid ?? undefined,
        documentId: document.documentId,
        artifactGuid: document.artifactGuid ?? undefined,
        artifactId: document.artifactId,
        fileName: document.fileName,
        mimeType: document.mimeType,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (file) => {
          this.documentSource = file;
          this.documentLoadError = null;
          this.isDocumentLoading = false;
          if (document.documentGuid) {
            this.loadHighlights(document.documentGuid);
          }
        },
        error: () => {
          this.documentSource = null;
          this.documentLoadError = 'Failed to load document file.';
          this.isDocumentLoading = false;
        },
      });
  }

  onBookmarksChange(bookmarks: HighlightRange[]): void {
    this._viewerHasUserChanges = true;
    this.currentBookmarks = bookmarks;
    if (
      this.selectedDocument?.type === 'document' &&
      this.selectedDocument.documentGuid
    ) {
      this.bookmarkSave$.next({
        documentGuid: this.selectedDocument.documentGuid,
        bookmarks,
      });
    }
  }

  private loadHighlights(documentGuid: string): void {
    this.aiLeaseService
      .getDocumentHighlights(documentGuid)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (savedBookmarks) => {
          // If the user already highlighted before the response arrived, don't
          // overwrite their work — the SDK's internal state already has their changes.
          if (this._viewerHasUserChanges) return;
          this.currentBookmarks = savedBookmarks;
        },
        error: () => {
          /* non-critical */
        },
      });
  }

  private ensureDocumentContextLoaded(): void {
    if (!this.currentAiAbstractionId || this.isDocumentLoading) {
      return;
    }

    if (this.loadedDocumentContextId === this.currentAiAbstractionId) {
      if (!this.documentSource) {
        const selectedDocument =
          this.documentOptions.find(
            (document) => document.key === this.selectedDocumentKey
          ) ?? this.documentOptions[0];

        if (selectedDocument) {
          this.loadDocumentFile(selectedDocument);
        }
      }

      return;
    }

    this.loadDocumentContext(this.currentAiAbstractionId);
  }

  private syncGlobalSidebarState(): void {
    document.documentElement.style.setProperty(
      '--ai-sidebar-width',
      this.isOpen ? `${this.currentWidth}px` : '0px'
    );
  }

  private clearGlobalSidebarState(): void {
    document.documentElement.style.setProperty('--ai-sidebar-width', '0px');
  }

  private prettifyJson(value?: string | null): string | null {
    if (!value?.trim()) {
      return null;
    }

    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }

  private mapDocumentOptions(
    document: AiAbstractionDocument
  ): DocumentOption[] {
    const baseDocument: DocumentOption[] = document.documentGuid
      ? [
          {
            key: `document:${document.documentGuid}`,
            type: 'document',
            documentGuid: document.documentGuid ?? null,
            documentId: document.documentId ?? 0,
            groupId: this.getGroupId(document),
            groupLabel: this.getGroupLabel(document),
            fileName:
              document.fileName ??
              document.documentFileName ??
              `Document ${
                document.documentGuid ?? document.documentId ?? ''
              }`.trim(),
            mimeType: document.mimeType,
            externalStatus: document.externalStatus,
            externalAbstractionStatus: document.externalAbstractionStatus,
            externalStatusDetail: document.externalStatusDetail,
            externalAiOutputJson: document.externalAiOutputJson,
          },
        ]
      : [];

    const artifacts = (document.artifacts ?? [])
      .map((artifact) => this.mapArtifact(document, artifact))
      .filter((artifact): artifact is DocumentOption => Boolean(artifact));

    return [...baseDocument, ...artifacts];
  }

  private mapArtifact(
    document: AiAbstractionDocument,
    artifact: AiAbstractionDocumentArtifact
  ): DocumentOption | null {
    const artifactKey =
      artifact.artifactGuid?.trim() ||
      (artifact.artifactId != null ? String(artifact.artifactId) : '') ||
      artifact.url?.trim() ||
      artifact.displayName?.trim() ||
      artifact.artifactType?.trim() ||
      '';
    if (!artifactKey) {
      return null;
    }

    return {
      key: `artifact:${artifactKey}`,
      type: 'artifact',
      documentGuid: document.documentGuid ?? null,
      documentId: document.documentId ?? 0,
      url: artifact.url,
      groupId: this.getGroupId(document),
      groupLabel: this.getGroupLabel(document),
      artifactGuid: artifact.artifactGuid ?? null,
      artifactId: artifact.artifactId,
      fileName: this.buildArtifactLabel(artifact),
      artifactType: artifact.artifactType,
      attachmentTypeId: artifact.attachmentTypeId,
      mimeType: artifact.mimeType,
      contentText: artifact.contentText,
      externalStatus: document.externalStatus,
      externalAbstractionStatus: document.externalAbstractionStatus,
      externalStatusDetail: document.externalStatusDetail,
      externalAiOutputJson: document.externalAiOutputJson,
    };
  }

  private buildArtifactLabel(artifact: AiAbstractionDocumentArtifact): string {
    const artifactName =
      artifact.displayName?.trim() ||
      artifact.artifactType?.trim() ||
      'Artifact';

    return artifactName;
  }

  private shouldRenderAsText(document: DocumentOption): boolean {
    if (document.type !== 'artifact') {
      return false;
    }

    if (document.contentText?.trim()) {
      return true;
    }

    if (document.attachmentTypeId === 20 || document.attachmentTypeId === 70) {
      return true;
    }

    const mimeType = document.mimeType?.toLowerCase() ?? '';
    if (
      mimeType.includes('json') ||
      mimeType.startsWith('text/') ||
      mimeType.includes('markdown')
    ) {
      return true;
    }

    return /\.(json|txt|md)$/i.test(document.fileName);
  }

  private groupDocumentOptions(
    options: DocumentOption[]
  ): DocumentOptionGroup[] {
    const grouped = new Map<string, DocumentOptionGroup>();

    options.forEach((option) => {
      const existingGroup = grouped.get(option.groupId);
      if (existingGroup) {
        existingGroup.items.push(option);
        return;
      }

      grouped.set(option.groupId, {
        key: option.groupLabel,
        items: [option],
      });
    });

    return Array.from(grouped.values());
  }

  private getGroupId(document: AiAbstractionDocument): string {
    return (
      document.documentGuid?.trim() ||
      String(document.documentId ?? '') ||
      'document-unavailable'
    );
  }

  private getGroupLabel(document: AiAbstractionDocument): string {
    return (
      document.fileName?.trim() ||
      document.documentFileName?.trim() ||
      `Document ${
        document.documentGuid ?? document.documentId ?? 'Unavailable'
      }`
    );
  }

  private populateFromAiOutput(data: IAIOutput): void {
    this.errorMessage = null;
    this.sections = this.buildSections(data);
    this.rentScheduleItems = data.rent?.baseRentSchedule?.value ?? [];
    this.abatementItems = data.rent?.rentAbatements?.value ?? [];
    this.isLoading = false;
  }

  private buildSections(data: IAIOutput): SidebarSection[] {
    return [
      {
        title: 'Overview',
        isExpanded: true,
        fields: [
          { label: 'Tenant', value: data.basics?.tenant?.value ?? '—' },
          { label: 'Landlord', value: data.basics?.landlord?.value ?? '—' },
          {
            label: 'Address',
            value:
              data.basics?.addresses?.value
                ?.map((a) =>
                  [a.StreetAddress, a.CityStateZip].filter(Boolean).join(', ')
                )
                .join('; ') ?? '—',
          },
          {
            label: 'Square Footage',
            value: this.formatNumber(data.basics?.squareFootage?.value),
          },
          { label: 'Suite', value: data.basics?.suite?.value ?? '—' },
          { label: 'Lease Type', value: data.basics?.leaseType?.value ?? '—' },
          { label: 'Deal Type', value: data.basics?.dealType?.value ?? '—' },
          { label: 'Space Use', value: data.basics?.spaceUse?.value ?? '—' },
          {
            label: 'Entire Building',
            value: this.formatBoolean(data.basics?.entireBuilding?.value),
          },
        ],
      },
      {
        title: 'Key Dates',
        isExpanded: true,
        fields: [
          {
            label: 'Lease Sign Date',
            value: this.formatDate(data.dates?.leaseSignDate?.value),
          },
          {
            label: 'Commencement Date',
            value: this.formatDate(data.dates?.leaseCommencementDate?.value),
          },
          {
            label: 'Rent Commencement',
            value: this.formatDate(data.dates?.rentCommencementDate?.value),
          },
          {
            label: 'Lease End Date',
            value: this.formatDate(data.dates?.leaseEndDate?.value),
          },
          {
            label: 'Term (Months)',
            value: this.formatNumber(data.dates?.leaseTermInMonths?.value),
          },
        ],
      },
      {
        title: 'Rent',
        isExpanded: true,
        fields: [
          {
            label: 'Effective Rent ($/SF)',
            value: this.formatCurrency(data.rent?.effectiveRent?.value),
          },
          {
            label: 'Annual Escalation',
            value: this.formatPercent(
              data.rent?.annualEscalation?.value?.percent
            ),
          },
          {
            label: 'TI Allowance',
            value: this.formatCurrency(
              data.rent?.tenantImprovementAllowance?.value
            ),
            citation: data.rent?.tenantImprovementAllowance?.citation,
          },
          {
            label: 'TI ($/SF)',
            value: this.formatCurrency(
              data.rent?.tenantImprovementAllowance?.subfields?.allowances?.[0]
                ?.amount
            ),
          },
        ],
      },
      {
        title: 'Expenses',
        isExpanded: true,
        fields: [
          {
            label: 'Service Type',
            value: data.expenses?.serviceTypeEstimate?.value ?? '—',
          },
          {
            label: 'Operating Expenses',
            value: this.formatPayor(data.expenses?.operatingExpenses?.value),
            citation: data.expenses?.operatingExpenses?.citation,
          },
          {
            label: 'Common Area Maintenance',
            value: this.formatPayor(data.expenses?.cam?.value),
            citation: data.expenses?.cam?.citation,
          },
          {
            label: 'Insurance',
            value: this.formatPayor(data.expenses?.insurance?.value),
          },
          {
            label: 'Taxes',
            value: this.formatPayor(data.expenses?.taxes?.value),
          },
          {
            label: 'Water',
            value: this.formatPayor(data.expenses?.water?.value),
          },
          { label: 'Gas', value: this.formatPayor(data.expenses?.gas?.value) },
          {
            label: 'Electricity',
            value: this.formatPayor(data.expenses?.electricity?.value),
          },
          {
            label: 'HVAC',
            value: this.formatPayor(data.expenses?.hvac?.value),
            citation: data.expenses?.hvac?.citation,
          },
          {
            label: 'Cleaning',
            value: this.formatPayor(data.expenses?.cleaning?.value),
          },
        ],
      },
    ];
  }

  // ─── Formatters ─────────────────────────────────────────────────────────────

  private formatDate(value: string | undefined): string {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('en-US');
  }

  private formatCurrency(value: number | undefined): string {
    if (value == null) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }

  private formatNumber(value: number | undefined): string {
    if (value == null) return '—';
    return value.toLocaleString();
  }

  private formatPercent(value: number | undefined): string {
    if (value == null) return '—';
    return `${value.toFixed(2)}%`;
  }

  private formatBoolean(value: boolean | undefined): string {
    if (value == null) return '—';
    return value ? 'Yes' : 'No';
  }

  private formatPayor(value: string | boolean | number | undefined): string {
    if (value == null || value === '') return '—';
    const str = String(value);
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
