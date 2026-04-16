import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import type { DocumentSource } from 'document-viewer-sdk';
import {
  AiAbstractionDocument,
  AiLeaseService,
} from '../services/ai-lease.service';

interface DocumentOption {
  documentGuid: string | null;
  documentId: number;
  fileName: string;
  mimeType?: string;
}

@Component({
  selector: 'mango-ai-document-page',
  templateUrl: './ai-document-page.component.html',
  styleUrls: ['./ai-document-page.component.scss'],
})
export class AiDocumentPageComponent implements OnInit, OnDestroy {
  documentOptions: DocumentOption[] = [];
  selectedDocumentGuid: string | null = null;
  documentSource: DocumentSource | null = null;
  documentFileName: string | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  private aiAbstractionId: number | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly aiLeaseService: AiLeaseService
  ) {}

  ngOnInit(): void {
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

  onDocumentSelectionChange(documentGuid: string): void {
    if (!documentGuid || documentGuid === this.selectedDocumentGuid) {
      return;
    }

    const document = this.documentOptions.find(
      (item) => item.documentGuid === documentGuid
    );
    if (!document) {
      return;
    }

    this.loadDocumentFile(document);
  }

  private loadDocuments(aiAbstractionId: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.documentSource = null;
    this.documentFileName = null;
    this.documentOptions = [];
    this.selectedDocumentGuid = null;

    this.aiLeaseService
      .getAbstractionDocuments(aiAbstractionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (documents) => {
          const options = this.mapDocuments(documents);
          this.documentOptions = options;

          if (!options.length) {
            this.errorMessage = 'No documents were found for this AI abstraction.';
            this.isLoading = false;
            return;
          }

          const requestedDocumentGuid =
            this.route.snapshot.queryParamMap.get('documentGuid')?.trim() ||
            null;
          const initialDocument =
            options.find((item) => item.documentGuid === requestedDocumentGuid) ??
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
    this.selectedDocumentGuid = document.documentGuid;
    this.documentFileName = document.fileName;
    this.documentSource = null;
    this.errorMessage = null;
    this.isLoading = true;

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
        },
        error: () => {
          this.documentSource = null;
          this.errorMessage = 'Failed to load the selected document.';
          this.isLoading = false;
        },
      });
  }

  private mapDocuments(documents: AiAbstractionDocument[]): DocumentOption[] {
    return documents
      .map((document) => ({
        documentGuid: document.documentGuid ?? null,
        documentId: document.documentId ?? 0,
        fileName:
          document.fileName ??
          document.documentFileName ??
          `Document ${document.documentGuid ?? document.documentId ?? ''}`.trim(),
        mimeType: document.mimeType,
      }))
      .filter((document) => Boolean(document.documentGuid));
  }
}
