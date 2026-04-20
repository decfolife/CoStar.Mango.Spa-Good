import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import type { DocumentSource, HighlightRange } from 'document-viewer-sdk';
import {
  AiAbstractionDocument,
  AiAbstractionDocumentArtifact,
  AiLeaseService,
} from '../services/ai-lease.service';

interface DocumentOption {
  key: string;
  type: 'document' | 'artifact';
  documentGuid: string | null;
  documentId: number;
  requestId: string;
  requestLabel: string;
  artifactGuid?: string | null;
  artifactId?: number;
  fileName: string;
  artifactType?: string;
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
  selector: 'mango-ai-document-page',
  templateUrl: './ai-document-page.component.html',
  styleUrls: ['./ai-document-page.component.scss'],
})
export class AiDocumentPageComponent implements OnInit, OnDestroy {
  documentOptions: DocumentOption[] = [];
  groupedDocumentOptions: DocumentOptionGroup[] = [];
  selectedDocumentKey: string | null = null;
  documentSource: DocumentSource | null = null;
  documentFileName: string | null = null;
  currentBookmarks: HighlightRange[] = [];
  private _viewerHasUserChanges = false;
  isLoading = false;
  errorMessage: string | null = null;

  private aiAbstractionId: number | null = null;
  private readonly destroy$ = new Subject<void>();
  private readonly bookmarkSave$ = new Subject<{ documentGuid: string; bookmarks: HighlightRange[] }>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly aiLeaseService: AiLeaseService
  ) {}

  ngOnInit(): void {
    this.bookmarkSave$
      .pipe(
        debounceTime(1500),
        switchMap(({ documentGuid, bookmarks }) =>
          this.aiLeaseService.saveDocumentHighlights(documentGuid, bookmarks).pipe(
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
    if (this.selectedDocument?.type === 'document' && this.selectedDocument.documentGuid) {
      this.bookmarkSave$.next({
        documentGuid: this.selectedDocument.documentGuid,
        bookmarks,
      });
    }
  }

  private loadDocuments(aiAbstractionId: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.documentSource = null;
    this.documentFileName = null;
    this.documentOptions = [];
    this.groupedDocumentOptions = [];
    this.selectedDocumentKey = null;

    this.aiLeaseService
      .getAbstractionDocuments(aiAbstractionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (documents) => {
          const options = this.mapDocuments(documents);
          this.documentOptions = options;
          this.groupedDocumentOptions = this.groupDocumentOptions(options);

          if (!options.length) {
            this.errorMessage = 'No documents were found for this AI abstraction.';
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
            ) ??
            options[0];

          this.loadDocumentFile(initialDocument);
        },
        error: () => {
          this.errorMessage = 'Failed to load document metadata.';
          this.isLoading = false;
        },
      });
  }

  private loadDocumentFile(document: DocumentOption): void {
    this.selectedDocumentKey = document.key;
    this.documentFileName = document.fileName;
    this.documentSource = null;
    this.currentBookmarks = [];
    this._viewerHasUserChanges = false;
    this.errorMessage = null;
    this.isLoading = true;

    if (document.type === 'artifact') {
      this.isLoading = false;
      return;
    }

    this.aiLeaseService
      .getAbstractionDocumentFile({
        documentGuid: document.documentGuid ?? undefined,
        documentId: document.documentId,
        fileName: document.fileName,
        mimeType: document.mimeType,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (file) => {
          this.documentSource = file;
          this.errorMessage = null;
          this.isLoading = false;
          if (document.documentGuid) {
            this.loadHighlights(document.documentGuid);
          }
        },
        error: () => {
          this.documentSource = null;
          const fallbackArtifact = this.findTextFallbackOption(document);
          if (fallbackArtifact) {
            this.loadDocumentFile(fallbackArtifact);
            return;
          }

          this.errorMessage = 'Failed to load the selected document.';
          this.isLoading = false;
        },
      });
  }

  private loadHighlights(documentGuid: string): void {
    this.aiLeaseService
      .getDocumentHighlights(documentGuid)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (savedBookmarks) => {
          if (this._viewerHasUserChanges) return;
          this.currentBookmarks = savedBookmarks;
        },
        error: () => { /* non-critical */ },
      });
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
              requestId: this.getRequestId(document),
              requestLabel: this.getRequestLabel(document),
              fileName:
                document.fileName ??
                document.documentFileName ??
                `Document ${document.documentGuid ?? document.documentId ?? ''}`.trim(),
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

      const pipelineArtifact = this.mapPipelineArtifact(document);

      allOptions.push(...baseDocument);
      if (pipelineArtifact) {
        allOptions.push(pipelineArtifact);
      }
      allOptions.push(...artifacts);

      return allOptions;
    }, []);
  }

  private mapArtifact(
    document: AiAbstractionDocument,
    artifact: AiAbstractionDocumentArtifact
  ): DocumentOption | null {
    const artifactKey = artifact.artifactGuid ?? String(artifact.artifactId ?? '');
    if (!artifactKey) {
      return null;
    }

    return {
      key: `artifact:${artifactKey}`,
      type: 'artifact',
      documentGuid: document.documentGuid ?? null,
      documentId: document.documentId ?? 0,
      requestId: this.getRequestId(document),
      requestLabel: this.getRequestLabel(document),
      artifactGuid: artifact.artifactGuid ?? null,
      artifactId: artifact.artifactId,
      fileName: this.buildArtifactLabel(document, artifact),
      artifactType: artifact.artifactType,
      mimeType: artifact.mimeType,
      contentText: artifact.contentText,
      externalStatus: document.externalStatus,
      externalAbstractionStatus: document.externalAbstractionStatus,
      externalStatusDetail: document.externalStatusDetail,
      externalAiOutputJson: document.externalAiOutputJson,
    };
  }

  private buildArtifactLabel(
    document: AiAbstractionDocument,
    artifact: AiAbstractionDocumentArtifact
  ): string {
    const documentName =
      document.fileName ??
      document.documentFileName ??
      `Document ${document.documentGuid ?? document.documentId ?? ''}`.trim();
    const artifactName =
      artifact.displayName?.trim() ||
      artifact.artifactType?.trim() ||
      'Artifact';

    return `${documentName} - ${artifactName}`;
  }

  private mapPipelineArtifact(
    document: AiAbstractionDocument
  ): DocumentOption | null {
    const pipelineContent = this.getPipelineArtifactContent(document);
    if (!pipelineContent) {
      return null;
    }

    const pipelineArtifactGuid =
      document.documentGuid
        ? `pipeline-output:${document.documentGuid}`
        : document.documentId
          ? `pipeline-output:${document.documentId}`
          : null;

    if (!pipelineArtifactGuid) {
      return null;
    }

    const documentName =
      document.fileName ??
      document.documentFileName ??
      `Document ${document.documentGuid ?? document.documentId ?? ''}`.trim();

    return {
      key: `artifact:${pipelineArtifactGuid}`,
      type: 'artifact',
      documentGuid: document.documentGuid ?? null,
      documentId: document.documentId ?? 0,
      requestId: this.getRequestId(document),
      requestLabel: this.getRequestLabel(document),
      artifactGuid: pipelineArtifactGuid,
      fileName: `${documentName} - Pipeline Output`,
      artifactType: 'Pipeline Output',
      mimeType: 'application/json',
      contentText: pipelineContent,
      externalStatus: document.externalStatus,
      externalAbstractionStatus: document.externalAbstractionStatus,
      externalStatusDetail: document.externalStatusDetail,
      externalAiOutputJson: document.externalAiOutputJson,
    };
  }

  private getPipelineArtifactContent(
    document: AiAbstractionDocument
  ): string | null {
    if (document.externalAiOutputJson?.trim()) {
      return document.externalAiOutputJson;
    }

    const statusDetail = document.externalStatusDetail?.trim();
    if (!statusDetail) {
      return null;
    }

    const previewIndex = statusDetail.indexOf('Preview=');
    if (previewIndex < 0) {
      return null;
    }

    const previewText = statusDetail.slice(previewIndex + 'Preview='.length).trim();
    return previewText || null;
  }

  private findTextFallbackOption(
    document: DocumentOption
  ): DocumentOption | null {
    return (
      this.documentOptions.find(
        (option) =>
          option.key !== document.key &&
          option.type === 'artifact' &&
          !!option.contentText &&
          (
            (document.documentGuid && option.documentGuid === document.documentGuid) ||
            (!!document.documentId && option.documentId === document.documentId)
          )
      ) ?? null
    );
  }

  onDocumentDropdownChange(selection: DocumentOption[]): void {
    const selectedDocument = selection?.[0];
    if (!selectedDocument) {
      return;
    }

    this.onDocumentSelectionChange(selectedDocument.key);
  }

  private groupDocumentOptions(
    options: DocumentOption[]
  ): DocumentOptionGroup[] {
    const grouped = new Map<string, DocumentOptionGroup>();

    options.forEach((option) => {
      const existingGroup = grouped.get(option.requestId);
      if (existingGroup) {
        existingGroup.items.push(option);
        return;
      }

      grouped.set(option.requestId, {
        key: option.requestLabel,
        items: [option],
      });
    });

    return Array.from(grouped.values());
  }

  private getRequestId(document: AiAbstractionDocument): string {
    return (
      document.externalRequestId?.trim() ||
      document.externalReferenceId?.trim() ||
      document.documentGuid?.trim() ||
      String(document.documentId ?? 'unknown-request')
    );
  }

  private getRequestLabel(document: AiAbstractionDocument): string {
    const requestId =
      document.externalRequestId?.trim() ||
      document.externalReferenceId?.trim();

    if (requestId) {
      return `Request ${requestId}`;
    }

    const documentName =
      document.fileName?.trim() || document.documentFileName?.trim();
    if (documentName) {
      return documentName;
    }

    return `Request ${document.documentGuid ?? document.documentId ?? 'Unknown'}`;
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
}
