export interface FileUploadSummary {
  totalFilesUploaded: number;
  totalSizeUploaded: number;
  filePath: string;
  untrustedFileName: string;
  errorMessage: string;
}

export enum ETLStatus {
  NotStarted = 0,
  LoadingFiles = 1,
  ExtractedFiles = 2,
  FileValidation = 3,
  MappingTemplate = 4,
}
