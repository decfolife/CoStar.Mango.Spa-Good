export interface LogFileDownloadRequest {
  userFileName: string;
  systemFileName: string;
  documentTotalBytes: number;
  oid: number;
  otid: number;
  description: string;
  documentId: string;
  clientKey: string;
}
