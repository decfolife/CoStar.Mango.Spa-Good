import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subject, forkJoin, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import type { DocumentSource, HighlightRange } from 'document-viewer-sdk';
import type {
  AiAbstractionDocument,
  AiAbstractionDocumentArtifact,
} from '../models/ai-abstraction.model';
import { AiLeaseService } from '../services/ai-lease.service';

interface DocumentOption {
  key: string;
  type: 'document' | 'artifact';
  documentGuid: string | null;
  documentId: number;
  url?: string;
  artifactGuid?: string | null;
  artifactId?: number;
  fileName: string;
  displayLabel: string;
  artifactType?: string;
  attachmentTypeId?: number;
  mimeType?: string;
  contentText?: string;
  externalStatus?: string;
  externalAbstractionStatus?: string;
  externalStatusDetail?: string;
  externalAiOutputJson?: string;
}

@Component({
  selector: 'mango-ai-document-page',
  templateUrl: './ai-document-page.component.html',
  styleUrls: ['./ai-document-page.component.scss'],
})
export class AiDocumentPageComponent implements OnInit, OnDestroy {
  documentOptions: DocumentOption[] = [];
  selectedDocumentKey: string | null = null;
  documentSource: DocumentSource | null = null;
  documentFileName: string | null = null;
  currentBookmarks: HighlightRange[] = [];
  private citationBookmarksByDocumentGuid = new Map<string, HighlightRange[]>();
  private savedBookmarksByDocumentGuid = new Map<string, HighlightRange[]>();
  private _viewerHasUserChanges = false;
  isLoading = false;
  errorMessage: string | null = null;

  private aiAbstractionId: number | null = null;
  private activeDocumentLoadToken = 0;
  private readonly destroy$ = new Subject<void>();
  private readonly bookmarkSave$ = new Subject<{
    documentGuid: string;
    bookmarks: HighlightRange[];
  }>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly aiLeaseService: AiLeaseService
  ) {}

  ngOnInit(): void {
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

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.aiAbstractionId = Number(params.get('id') ?? 0) || null;
      if (!this.aiAbstractionId) {
        this.errorMessage = 'Missing AI abstraction id.';
        return;
      }

      this.loadDocuments(this.aiAbstractionId);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  onBookmarksChange(bookmarks: HighlightRange[]): void {
    this._viewerHasUserChanges = true;
    this.currentBookmarks = bookmarks;
    const userBookmarks = bookmarks.filter(
      (bookmark) => !bookmark.id?.startsWith('ai-citation-')
    );
    if (
      this.selectedDocument?.type === 'document' &&
      this.selectedDocument.documentGuid
    ) {
      this.bookmarkSave$.next({
        documentGuid: this.selectedDocument.documentGuid,
        bookmarks: userBookmarks,
      });
    }
  }

  private loadDocuments(aiAbstractionId: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.documentSource = null;
    this.documentFileName = null;
    this.documentOptions = [];
    this.selectedDocumentKey = null;
    this.currentBookmarks = [];
    this.citationBookmarksByDocumentGuid.clear();
    this.savedBookmarksByDocumentGuid.clear();

    forkJoin({
      documents:
        this.aiLeaseService.getAbstractionDocumentsWithPipelineArtifacts(
          aiAbstractionId
        ),
      detail: this.aiLeaseService.getAbstractionById(aiAbstractionId).pipe(
        catchError(() => of(null))
      ),
    })
      .pipe(
        switchMap(({ documents, detail }) =>
          forkJoin({
            documents: of(documents),
            citationBookmarksByDocumentGuid: detail?.formId
              ? this.aiLeaseService
                  .getMappedFormFields(aiAbstractionId, detail.formId)
                  .pipe(
                    map((mappedForm) =>
                      this.indexCitationBookmarks(mappedForm.fields ?? [])
                    ),
                    catchError(() => of(new Map<string, HighlightRange[]>()))
                  )
              : of(new Map<string, HighlightRange[]>()),
          })
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: ({ documents, citationBookmarksByDocumentGuid }) => {
          this.citationBookmarksByDocumentGuid =
            citationBookmarksByDocumentGuid;
          const options = this.mapDocuments(documents);
          this.documentOptions = options;

          if (!options.length) {
            this.errorMessage =
              'No documents were found for this AI abstraction.';
            this.isLoading = false;
            return;
          }

          const requestedDocumentGuid =
            this.route.snapshot.queryParamMap.get('documentGuid')?.trim() ||
            null;
          const requestedArtifactGuid =
            this.route.snapshot.queryParamMap.get('artifactGuid')?.trim() ||
            null;
          const initialDocument =
            options.find((item) =>
              requestedArtifactGuid
                ? item.artifactGuid === requestedArtifactGuid
                : item.documentGuid === requestedDocumentGuid
            ) ?? options[0];

          this.loadDocumentFile(initialDocument);
        },
        error: () => {
          this.errorMessage = 'Failed to load document metadata.';
          this.isLoading = false;
        },
      });
  }

  private loadDocumentFile(document: DocumentOption): void {
    const loadToken = ++this.activeDocumentLoadToken;
    this.selectedDocumentKey = document.key;
    this.documentFileName = document.fileName;
    this.documentSource = null;
    this.currentBookmarks = [];
    this._viewerHasUserChanges = false;
    this.errorMessage = null;
    this.isLoading = true;

    if (this.shouldRenderAsText(document) && document.contentText) {
      if (loadToken !== this.activeDocumentLoadToken) {
        return;
      }
      this.documentSource = this.buildViewerTextFile(document, document.contentText);
      this.errorMessage = null;
      this.isLoading = false;
      if (document.documentGuid) {
        this.loadHighlights(document.documentGuid, loadToken);
      }
      return;
    }

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
            if (loadToken !== this.activeDocumentLoadToken) {
              return;
            }
            document.contentText = text;
            this.documentSource = this.buildViewerTextFile(document, text);
            this.errorMessage = null;
            this.isLoading = false;
            if (document.documentGuid) {
              this.loadHighlights(document.documentGuid, loadToken);
            }
          },
          error: () => {
            if (loadToken !== this.activeDocumentLoadToken) {
              return;
            }
            this.documentSource = null;
            this.errorMessage = 'Failed to load the selected document.';
            this.isLoading = false;
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
          if (loadToken !== this.activeDocumentLoadToken) {
            return;
          }
          this.documentSource = file;
          this.errorMessage = null;
          this.isLoading = false;
          if (document.documentGuid) {
            this.loadHighlights(document.documentGuid, loadToken);
          }
        },
        error: () => {
          if (loadToken !== this.activeDocumentLoadToken) {
            return;
          }
          this.documentSource = null;
          this.errorMessage = 'Failed to load the selected document.';
          this.isLoading = false;
        },
      });
  }

  private loadHighlights(documentGuid: string, loadToken: number): void {
    this.aiLeaseService
      .getDocumentHighlights(documentGuid)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (savedBookmarks) => {
          if (
            loadToken !== this.activeDocumentLoadToken ||
            this.selectedDocument?.documentGuid !== documentGuid
          ) {
            return;
          }
          if (this._viewerHasUserChanges) return;
          this.savedBookmarksByDocumentGuid.set(documentGuid, savedBookmarks);
          this.syncCurrentBookmarks(documentGuid);
        },
        error: () => {
          /* non-critical */
        },
      });
  }

  private syncCurrentBookmarks(documentGuid?: string): void {
    if (this._viewerHasUserChanges) {
      return;
    }

    const effectiveDocumentGuid =
      documentGuid ?? this.selectedDocument?.documentGuid ?? null;
    if (!effectiveDocumentGuid) {
      this.currentBookmarks = [];
      return;
    }

    const savedBookmarks =
      this.savedBookmarksByDocumentGuid.get(effectiveDocumentGuid) ?? [];
    const citationBookmarks =
      this.citationBookmarksByDocumentGuid.get(effectiveDocumentGuid) ?? [];

    const merged = new Map<string, HighlightRange>();
    for (const bookmark of savedBookmarks) {
      merged.set(bookmark.id, bookmark);
    }
    for (const bookmark of citationBookmarks) {
      merged.set(bookmark.id, bookmark);
    }

    this.currentBookmarks = Array.from(merged.values());
  }

  private indexCitationBookmarks(
    fields: Array<{
      citationHighlight?: (HighlightRange & { documentGuid?: string }) | null;
    }>
  ): Map<string, HighlightRange[]> {
    const bookmarksByDocumentGuid = new Map<string, HighlightRange[]>();

    for (const field of fields ?? []) {
      const rawCitation = field?.citationHighlight;
      const documentGuid =
        typeof rawCitation?.documentGuid === 'string'
          ? rawCitation.documentGuid.trim()
          : '';

      if (!documentGuid) {
        continue;
      }

      const bookmark = {
        ...(rawCitation as HighlightRange & { documentGuid?: string }),
      };
      delete bookmark.documentGuid;
      const existingBookmarks =
        bookmarksByDocumentGuid.get(documentGuid) ?? [];

      if (!existingBookmarks.some((item) => item.id === bookmark.id)) {
        existingBookmarks.push(bookmark);
        bookmarksByDocumentGuid.set(documentGuid, existingBookmarks);
      }
    }

    return bookmarksByDocumentGuid;
  }
  private mapDocuments(documents: AiAbstractionDocument[]): DocumentOption[] {
    return documents.reduce<DocumentOption[]>((allOptions, document) => {
      const baseDocument: DocumentOption[] = document.documentGuid
        ? [
            {
              key: `document:${document.documentGuid}`,
              type: 'document',
              documentGuid: document.documentGuid ?? null,
              documentId: document.documentId ?? 0,
              fileName:
                document.fileName ??
                document.documentFileName ??
                `Document ${
                  document.documentGuid ?? document.documentId ?? ''
                }`.trim(),
              displayLabel: this.buildDocumentLabel(document),
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

      allOptions.push(...baseDocument);
      allOptions.push(...artifacts);

      return allOptions;
    }, []);
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
      artifactGuid: artifact.artifactGuid ?? null,
      artifactId: artifact.artifactId,
      fileName: this.buildArtifactLabel(artifact),
      displayLabel: `\u00A0\u00A0\u00A0${this.buildArtifactLabel(artifact)}`,
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

  onDocumentDropdownChange(selection: DocumentOption[]): void {
    const selectedDocument = selection?.[0];
    if (!selectedDocument) {
      return;
    }

    this.onDocumentSelectionChange(selectedDocument.key);
  }

  private buildDocumentLabel(document: AiAbstractionDocument): string {
    return `Document:${document.documentGuid ?? document.documentId ?? 'Unavailable'}`;
  }

  private prettifyJson(value?: string | null): string | null {
    if (!value?.trim()) {
      return null;
    }

    try {
      let parsedValue: unknown = JSON.parse(value);

      // Some saved artifacts arrive as JSON encoded inside a JSON string.
      while (typeof parsedValue === 'string') {
        const trimmedValue = parsedValue.trim();
        if (
          (!trimmedValue.startsWith('{') || !trimmedValue.endsWith('}')) &&
          (!trimmedValue.startsWith('[') || !trimmedValue.endsWith(']'))
        ) {
          break;
        }

        parsedValue = JSON.parse(trimmedValue);
      }

      return JSON.stringify(parsedValue, null, 2);
    } catch {
      return value;
    }
  }

  private buildViewerTextFile(
    document: DocumentOption,
    content: string
  ): File {
    const normalizedContent = this.normalizeViewerText(document, content);
    const mimeType = this.isJsonDocument(document)
      ? 'application/json'
      : document.mimeType || 'text/plain';

    return new File([normalizedContent], document.fileName, {
      type: mimeType,
    });
  }

  private normalizeViewerText(
    document: DocumentOption,
    content: string
  ): string {
    return this.isJsonDocument(document)
      ? this.prettifyJson(content) ?? content
      : content;
  }

  private isJsonDocument(document: DocumentOption): boolean {
    const mimeType = document.mimeType?.toLowerCase() ?? '';
    return (
      document.attachmentTypeId === 70 ||
      mimeType.includes('json') ||
      /\.json$/i.test(document.fileName)
    );
  }
}
