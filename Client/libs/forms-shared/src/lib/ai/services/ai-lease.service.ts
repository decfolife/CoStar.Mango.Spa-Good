import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Api, ApiResponse } from '@mango/data-models/lib-data-models';
import { UtilitiesService } from '@mango/core-shared';
import { IAIOutput } from '../models/ai-output.model';
import { AiLeaseListItem } from '../models/ai-form.model';
import type { HighlightRange } from 'document-viewer-sdk';

export interface AiAbstractionDetail {
  aiAbstractionId: number;
  buildingId: number;
  buildingName?: string;
  formId?: number;
  formName?: string;
  portfolioId?: number;
  portfolioName?: string;
  premiseId?: number;
  status: 'Pending' | 'Processing' | 'Complete' | 'Error' | 'Cancelled';
  completedDate?: string;
  errorMessage?: string;
  contextJson?: string;
  aiOutputJson?: string;
  aiTenant?: string;
  aiLeaseEndDate?: string;
  reviewedFormData?: string;
  externalJobId?: string;
  externalCustomerId?: string;
  externalJobStatus?: string;
  externalOverallStatus?: string;
  externalResponseJson?: string;
  createdDate: string;
  lastModifiedDate: string;
}

export interface CreateAiAbstractionResponse {
  aiAbstractionId: number;
}

export interface UpdateAiAbstractionStatusRequest {
  aiAbstractionId: number;
  status: 'Pending' | 'Processing' | 'Complete' | 'Error' | 'Cancelled';
  errorMessage?: string;
}

export interface LeaseAbstractionPipelineDocumentInput {
  fileName?: string;
  customerId?: string;
  sourceLeaseId?: string;
  sourceDocumentId?: string;
  leaseType?: string;
  requestorContactId?: string;
  propertyId?: number;
  docGroupId?: string;
  sourceDocType?: string;
  sourceDescription?: string;
  sourceComment?: string;
  sourceExternalIdentifier?: string;
  sourceUploadDate?: string;
}

export interface CreateLeaseAbstractionPipelineJobRequest {
  buildingId: number;
  customerId: string;
  sourceLeaseId?: string;
  jobName?: string;
  isDryRun?: boolean;
  documents?: LeaseAbstractionPipelineDocumentInput[];
  files: File[];
}

export interface LeaseAbstractionPipelineSubmittedDocument {
  fileName: string;
  customerId: string;
  sourceLeaseId?: string;
  sourceDocumentId?: string;
  externalReferenceId: string;
  sourceExternalIdentifier: string;
  s3ObjectKey: string;
}

export interface CreateLeaseAbstractionPipelineJobResponse {
  jobId: string;
  documentCount: number;
  documents: LeaseAbstractionPipelineSubmittedDocument[];
}

export interface AiAbstractionDocument {
  documentId?: number;
  documentGuid?: string;
  artifactId?: number;
  artifactGuid?: string;
  aiAbstractionId?: number;
  fileName?: string;
  documentFileName?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  sortOrder?: number;
  externalReferenceId?: string;
  externalRequestId?: string;
  externalSourceExternalIdentifier?: string;
  externalS3ObjectKey?: string;
  externalStatus?: string;
  externalAbstractionStatus?: string;
  externalStatusDetail?: string;
  externalAiOutputJson?: string;
  artifacts?: AiAbstractionDocumentArtifact[];
  url?: string;
  documentUrl?: string;
}

export interface AiAbstractionDocumentArtifact {
  artifactId?: number;
  artifactGuid?: string;
  displayName?: string;
  artifactType?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  attachmentTypeId?: number;
  contentText?: string;
  url?: string;
}

interface PipelineArtifactCandidate {
  attachmentTypeId: number;
  artifactId?: number;
  artifactGuid?: string;
  artifactType?: string;
  contentText?: string;
  externalReferenceId?: string;
  fileName: string;
  mimeType?: string;
  requestId?: string;
  sourceFileName?: string;
  url?: string;
}

@Injectable({ providedIn: 'root' })
export class AiLeaseService {
  private readonly requestedExternalAttachmentTypeIds = new Set([20, 70]);
  private readonly apiUrl = UtilitiesService.getBaseApiUrl(
    Api.formWizard,
    'http://localhost:5000'
  );

  constructor(private readonly http: HttpClient) {}

  createAbstraction(
    formData: FormData
  ): Observable<CreateAiAbstractionResponse> {
    return this.http
      .post<ApiResponse>(
        `${this.apiUrl}AiAbstractions/CreateAiAbstraction`,
        formData,
        {
          headers: { enctype: 'multipart/form-data' },
        }
      )
      .pipe(map((res) => res.data as CreateAiAbstractionResponse));
  }

  /**
   * Separate path for the new lease abstraction pipeline integration.
   * This does not replace the existing AI abstraction table-backed flow.
   * The backend returns an external jobId rather than an aiAbstractionId.
   */
  createLeaseAbstractionPipelineJob(
    request: CreateLeaseAbstractionPipelineJobRequest
  ): Observable<CreateLeaseAbstractionPipelineJobResponse> {
    const formData = new FormData();
    formData.append('buildingId', String(request.buildingId));
    formData.append('customerId', request.customerId);

    if (request.sourceLeaseId) {
      formData.append('sourceLeaseId', request.sourceLeaseId);
    }
    if (request.jobName) {
      formData.append('jobName', request.jobName);
    }
    if (request.isDryRun != null) {
      formData.append('isDryRun', String(request.isDryRun));
    }
    if (request.documents?.length) {
      formData.append('documentsJson', JSON.stringify(request.documents));
    }

    request.files.forEach((file) => formData.append('files', file, file.name));

    return this.http
      .post<ApiResponse>(
        `${this.apiUrl}AiAbstractions/CreateLeaseAbstractionPipelineJob`,
        formData,
        {
          headers: { enctype: 'multipart/form-data' },
        }
      )
      .pipe(
        map((res) => res.data as CreateLeaseAbstractionPipelineJobResponse)
      );
  }

  getLeaseAbstractionPipelineJobDetails(jobId: string): Observable<unknown> {
    return this.http
      .get<ApiResponse>(
        `${this.apiUrl}AiAbstractions/GetLeaseAbstractionPipelineJobDetails`,
        {
          params: { jobId },
        }
      )
      .pipe(map((res) => res.data as unknown));
  }

  getAbstractionById(id: number): Observable<AiAbstractionDetail | null> {
    return this.http
      .get<ApiResponse>(`${this.apiUrl}AiAbstractions/GetAiAbstractionById`, {
        params: { aiAbstractionId: id },
      })
      .pipe(map((res) => (res.data as AiAbstractionDetail) ?? null));
  }

  getAbstractionListByBuilding(
    buildingId: number
  ): Observable<AiAbstractionDetail[]> {
    return this.http
      .get<ApiResponse>(
        `${this.apiUrl}AiAbstractions/GetAiAbstractionsByBuilding`,
        {
          params: { buildingId },
        }
      )
      .pipe(map((res) => res.data as AiAbstractionDetail[]));
  }

  getAbstractionList(): Observable<AiAbstractionDetail[]> {
    return this.http
      .get<ApiResponse>(`${this.apiUrl}AiAbstractions/GetAiAbstractionsList`)
      .pipe(map((res) => res.data as AiAbstractionDetail[]));
  }

  getAbstractionDocuments(
    aiAbstractionId: number
  ): Observable<AiAbstractionDocument[]> {
    return this.http
      .get<ApiResponse>(
        `${this.apiUrl}AiAbstractions/GetAiAbstractionDocuments`,
        {
          params: { aiAbstractionId },
        }
      )
      .pipe(map((res) => (res.data as AiAbstractionDocument[]) ?? []));
  }

  getAbstractionDocumentsWithPipelineArtifacts(
    aiAbstractionId: number
  ): Observable<AiAbstractionDocument[]> {
    return forkJoin({
      documents: this.getAbstractionDocuments(aiAbstractionId),
      detail: this.getAbstractionById(aiAbstractionId).pipe(
        catchError(() => of(null))
      ),
    }).pipe(
      switchMap(({ documents, detail }) => {
        const externalJobId = detail?.externalJobId?.trim();
        if (!externalJobId) {
          return of(documents);
        }

        return this.getLeaseAbstractionPipelineJobDetails(externalJobId).pipe(
          map((jobDetails) =>
            this.mergePipelineArtifactsIntoDocuments(documents, jobDetails)
          ),
          catchError(() => of(documents))
        );
      })
    );
  }

  getAbstractionDocumentUrl(document: AiAbstractionDocument): string | null {
    const explicitUrl = document.url ?? document.documentUrl ?? null;
    if (explicitUrl) {
      return explicitUrl;
    }

    const artifactGuid = document.artifactGuid;
    if (artifactGuid) {
      return `${this.apiUrl}AiAbstractions/GetAiAbstractionDocumentFile?artifactGuid=${artifactGuid}`;
    }

    const documentGuid = document.documentGuid;
    if (!documentGuid) {
      return null;
    }

    return `${this.apiUrl}AiAbstractions/GetAiAbstractionDocumentFile?documentGuid=${documentGuid}`;
  }

  getAbstractionDocumentBlob(
    document: AiAbstractionDocument
  ): Observable<Blob> {
    const documentUrl = this.getAbstractionDocumentUrl(document);
    return this.http.get(documentUrl!, {
      responseType: 'blob',
      headers: {
        'source-app': 'crem-mango',
      },
    });
  }

  getAbstractionDocumentText(
    document: AiAbstractionDocument
  ): Observable<string> {
    return this.getAbstractionDocumentBlob(document).pipe(
      switchMap((blob) => from(blob.text()))
    );
  }

  getAbstractionDocumentFile(
    document: AiAbstractionDocument
  ): Observable<File> {
    const fileName =
      document.fileName ??
      document.documentFileName ??
      `document-${document.documentGuid ?? document.documentId ?? 'unknown'}`;

    return this.getAbstractionDocumentBlob(document).pipe(
      map(
        (blob) =>
          new File([blob], fileName, {
            type: blob.type || document.mimeType || 'application/octet-stream',
          })
      )
    );
  }

  /**
   * Returns the parsed IAIOutput for an abstraction whenever aiOutputJson exists.
   * Calls the backend GetAiAbstractionById endpoint and deserialises aiOutputJson.
   * Returns null if the abstraction has no output yet.
   */
  getLeaseById(id: number): Observable<IAIOutput | null> {
    return this.getAbstractionById(id).pipe(
      map((detail) => {
        if (!detail || !detail.aiOutputJson) {
          return null;
        }
        try {
          return JSON.parse(detail.aiOutputJson) as IAIOutput;
        } catch {
          return null;
        }
      })
    );
  }

  saveReviewedFormData(
    aiAbstractionId: number,
    reviewedFormData: string
  ): Observable<void> {
    return this.http
      .post<ApiResponse>(`${this.apiUrl}AiAbstractions/SaveReviewedFormData`, {
        aiAbstractionId,
        reviewedFormData,
      })
      .pipe(map(() => void 0));
  }

  updateAiAbstractionStatus(
    request: UpdateAiAbstractionStatusRequest
  ): Observable<void> {
    return this.http
      .post<ApiResponse>(
        `${this.apiUrl}AiAbstractions/UpdateAiAbstractionStatus`,
        request
      )
      .pipe(map(() => void 0));
  }

  /**
   * Calls the backend to load form fields + sections, apply AI output mapping,
   * and return field objects with formItemAnswer already populated.
   * The backend handles both fetching form fields and mapping AI values.
   */
  getMappedFormFields(
    aiAbstractionId: number,
    formId: number,
    objectTypeId = 4
  ): Observable<{ fields: any[]; sections: any[] }> {
    return this.http
      .get<ApiResponse>(`${this.apiUrl}AiAbstractions/GetMappedFormFields`, {
        params: { aiAbstractionId, formId, objectTypeId },
      })
      .pipe(map((res) => res.data as { fields: any[]; sections: any[] }));
  }

  getDocumentHighlights(documentGuid: string): Observable<HighlightRange[]> {
    return this.http
      .get<ApiResponse>(`${this.apiUrl}AiAbstractions/GetDocumentHighlights`, {
        params: { documentGuid },
      })
      .pipe(map((res) => (res.data as HighlightRange[]) ?? []));
  }

  saveDocumentHighlights(
    documentGuid: string,
    bookmarks: HighlightRange[]
  ): Observable<void> {
    // Strip non-serialisable DOM node references before sending
    const payload = bookmarks.map(
      ({ startContainer, endContainer, ...rest }) => rest
    );
    return this.http
      .post<ApiResponse>(
        `${this.apiUrl}AiAbstractions/SaveDocumentHighlights`,
        {
          documentGuid,
          highlightsJson: JSON.stringify(payload),
        }
      )
      .pipe(map(() => void 0));
  }

  /**
   * Returns the list of abstractions for a building, mapped to the grid model.
   */
  getLeaseList(): Observable<AiLeaseListItem[]> {
    return this.getAbstractionList().pipe(
      map((items) =>
        items.map((item) => ({
          id: item.aiAbstractionId,
          buildingId: item.buildingId,
          buildingName: item.buildingName ?? undefined,
          formId: item.formId ?? undefined,
          formName: item.formName ?? undefined,
          portfolioId: item.portfolioId ?? undefined,
          portfolioName: item.portfolioName ?? undefined,
          premiseId: item.premiseId ?? undefined,
          status: item.status,
          aiTenant: item.aiTenant ?? undefined,
          aiLeaseEndDate: item.aiLeaseEndDate ?? undefined,
          createdDate: item.createdDate,
          lastModifiedDate: item.lastModifiedDate,
        }))
      )
    );
  }

  private mergePipelineArtifactsIntoDocuments(
    documents: AiAbstractionDocument[],
    jobDetails: unknown
  ): AiAbstractionDocument[] {
    const mergedDocuments = documents.map((document) => ({
      ...document,
      artifacts: [...(document.artifacts ?? [])],
    }));

    const extractedArtifacts = this.extractPipelineArtifacts(jobDetails);
    if (!extractedArtifacts.length) {
      return mergedDocuments;
    }

    extractedArtifacts.forEach((artifact) => {
      const targetDocument = this.findArtifactTargetDocument(
        mergedDocuments,
        artifact
      );

      const mappedArtifact: AiAbstractionDocumentArtifact = {
        artifactId: artifact.artifactId,
        artifactGuid: artifact.artifactGuid,
        attachmentTypeId: artifact.attachmentTypeId,
        artifactType:
          artifact.artifactType ??
          this.getAttachmentTypeLabel(artifact.attachmentTypeId),
        displayName: artifact.fileName,
        mimeType: artifact.mimeType,
        contentText: artifact.contentText,
        url: artifact.url,
      };

      if (targetDocument) {
        if (!this.documentAlreadyHasArtifact(targetDocument, mappedArtifact)) {
          targetDocument.artifacts = [
            ...(targetDocument.artifacts ?? []),
            mappedArtifact,
          ];
        }
        return;
      }

      mergedDocuments.push({
        documentId: 0,
        externalReferenceId: artifact.externalReferenceId,
        fileName:
          artifact.sourceFileName ??
          `Request ${
            artifact.requestId ?? artifact.externalReferenceId ?? 'Attachment'
          }`,
        artifacts: [mappedArtifact],
      });
    });

    return mergedDocuments;
  }

  private extractPipelineArtifacts(
    value: unknown,
    context: Partial<PipelineArtifactCandidate> = {}
  ): PipelineArtifactCandidate[] {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.reduce<PipelineArtifactCandidate[]>(
        (allArtifacts, item) => [
          ...allArtifacts,
          ...this.extractPipelineArtifacts(item, context),
        ],
        []
      );
    }

    if (typeof value !== 'object') {
      return [];
    }

    const record = value as Record<string, unknown>;
    const nextContext: Partial<PipelineArtifactCandidate> = {
      externalReferenceId:
        this.readString(record, [
          'externalReferenceId',
          'externalRefId',
          'sourceExternalIdentifier',
        ]) ?? context.externalReferenceId,
      requestId:
        this.readString(record, ['requestId', 'requestGuid']) ??
        context.requestId,
      sourceFileName:
        this.readString(record, [
          'sourceFileName',
          'documentFileName',
          'fileName',
          'filename',
          'name',
        ]) ?? context.sourceFileName,
    };

    const directArtifact = this.tryMapPipelineArtifact(record, nextContext);
    const nestedArtifacts = Object.values(record).reduce<
      PipelineArtifactCandidate[]
    >(
      (allArtifacts, child) => [
        ...allArtifacts,
        ...this.extractPipelineArtifacts(child, nextContext),
      ],
      []
    );

    const allArtifacts = directArtifact
      ? [directArtifact, ...nestedArtifacts]
      : nestedArtifacts;
    const seen = new Set<string>();

    return allArtifacts.filter((artifact) => {
      const key = [
        artifact.requestId ?? '',
        artifact.externalReferenceId ?? '',
        artifact.attachmentTypeId,
        artifact.artifactGuid ?? '',
        artifact.url ?? '',
        artifact.fileName,
      ].join('|');

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }

  private tryMapPipelineArtifact(
    record: Record<string, unknown>,
    context: Partial<PipelineArtifactCandidate>
  ): PipelineArtifactCandidate | null {
    const attachmentTypeId = this.readNumber(record, [
      'attachmentTypeId',
      'typeId',
    ]);
    if (
      attachmentTypeId == null ||
      !this.requestedExternalAttachmentTypeIds.has(attachmentTypeId)
    ) {
      return null;
    }

    return {
      attachmentTypeId,
      artifactId: this.readNumber(record, ['artifactId', 'attachmentId']),
      artifactGuid:
        this.readString(record, ['artifactGuid', 'attachmentGuid']) ??
        undefined,
      artifactType:
        this.readString(record, ['artifactType', 'attachmentTypeName']) ??
        this.getAttachmentTypeLabel(attachmentTypeId),
      contentText:
        this.readString(record, ['contentText', 'text', 'content']) ??
        undefined,
      externalReferenceId: context.externalReferenceId,
      fileName:
        this.readString(record, [
          'fileName',
          'filename',
          'displayName',
          'name',
        ]) ?? this.getDefaultAttachmentFileName(attachmentTypeId),
      mimeType:
        this.readString(record, ['mimeType', 'contentType']) ??
        this.getDefaultAttachmentMimeType(attachmentTypeId),
      requestId: context.requestId,
      sourceFileName: context.sourceFileName,
      url:
        this.readString(record, ['url', 'downloadUrl', 'fileUrl']) ?? undefined,
    };
  }

  private findArtifactTargetDocument(
    documents: AiAbstractionDocument[],
    artifact: PipelineArtifactCandidate
  ): AiAbstractionDocument | null {
    const byExternalReference =
      artifact.externalReferenceId &&
      documents.find(
        (document) =>
          document.externalReferenceId?.trim() === artifact.externalReferenceId
      );
    if (byExternalReference) {
      return byExternalReference;
    }

    const byFileName =
      artifact.sourceFileName &&
      documents.find((document) =>
        [document.fileName, document.documentFileName]
          .filter(Boolean)
          .some((name) => name?.trim() === artifact.sourceFileName)
      );
    if (byFileName) {
      return byFileName;
    }

    return documents.length === 1 ? documents[0] : null;
  }

  private documentAlreadyHasArtifact(
    document: AiAbstractionDocument,
    artifact: AiAbstractionDocumentArtifact
  ): boolean {
    return (document.artifacts ?? []).some(
      (existing) =>
        existing.attachmentTypeId === artifact.attachmentTypeId &&
        (existing.displayName?.trim() || '') ===
          (artifact.displayName?.trim() || '')
    );
  }

  private readNumber(
    record: Record<string, unknown>,
    keys: string[]
  ): number | undefined {
    for (const key of keys) {
      const value = record[key];
      if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
      }
      if (
        typeof value === 'string' &&
        value.trim() &&
        !Number.isNaN(Number(value))
      ) {
        return Number(value);
      }
    }

    return undefined;
  }

  private readString(
    record: Record<string, unknown>,
    keys: string[]
  ): string | undefined {
    for (const key of keys) {
      const value = record[key];
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }

    return undefined;
  }

  private getAttachmentTypeLabel(attachmentTypeId: number): string {
    switch (attachmentTypeId) {
      case 20:
        return 'OCR_LIGHTWEIGHT_TEXT';
      case 70:
        return 'VALIDATION_RESULT_JSON';
      default:
        return `Attachment ${attachmentTypeId}`;
    }
  }

  private getDefaultAttachmentFileName(attachmentTypeId: number): string {
    switch (attachmentTypeId) {
      case 20:
        return 'ocr.txt';
      case 70:
        return 'checks.json';
      default:
        return `attachment-${attachmentTypeId}`;
    }
  }

  private getDefaultAttachmentMimeType(attachmentTypeId: number): string {
    switch (attachmentTypeId) {
      case 20:
        return 'text/plain';
      case 70:
        return 'application/json';
      default:
        return 'application/octet-stream';
    }
  }
}
