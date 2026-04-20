import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  mimeType?: string;
  attachmentTypeId?: number;
  contentText?: string;
}

@Injectable({ providedIn: 'root' })
export class AiLeaseService {
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

  getAbstractionListByBuilding(buildingId: number): Observable<AiAbstractionDetail[]> {
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

  getAbstractionDocumentUrl(document: AiAbstractionDocument): string | null {
    const explicitUrl = document.url ?? document.documentUrl ?? null;
    if (explicitUrl) {
      return explicitUrl;
    }

    const documentGuid = document.documentGuid;
    if (!documentGuid) {
      return null;
    }

    return `${this.apiUrl}AiAbstractions/GetAiAbstractionDocumentFile?documentGuid=${documentGuid}`;
  }

  getAbstractionDocumentBlob(document: AiAbstractionDocument): Observable<Blob> {
    const documentUrl = this.getAbstractionDocumentUrl(document);
    return this.http.get(documentUrl!, {
      responseType: 'blob',
      headers: {
        'source-app': 'crem-mango',
      },
    });
  }

  getAbstractionDocumentFile(document: AiAbstractionDocument): Observable<File> {
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
    const payload = bookmarks.map(({ startContainer, endContainer, ...rest }) => rest);
    return this.http
      .post<ApiResponse>(`${this.apiUrl}AiAbstractions/SaveDocumentHighlights`, {
        documentGuid,
        highlightsJson: JSON.stringify(payload),
      })
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
}
