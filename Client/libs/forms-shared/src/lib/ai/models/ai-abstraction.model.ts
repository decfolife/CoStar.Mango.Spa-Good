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

export interface CreateAiAbstractionResponseDto {
  aiAbstractionId?: number;
  abstractionId?: number;
  AbstractionId?: number;
}

export interface UpdateAiAbstractionStatusRequest {
  aiAbstractionId: number;
  status: 'Pending' | 'Processing' | 'Complete' | 'Error' | 'Cancelled';
  errorMessage?: string;
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

export interface PipelineArtifactCandidate {
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
