export interface ImpactReportResponse {
  reportID: number;
  reportName: string;
  reportDescription: string;
  lastRun: Date;
  migratedDate: Date;
  reportCreatedBy: string;
  event: string;
  eventDescription: string;
}
