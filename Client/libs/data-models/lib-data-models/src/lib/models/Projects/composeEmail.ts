export interface ComposeEmailCommand {
  objectId: number; // project id |
  noteTypeId: number;
  ToContactIds: string[];
  body?: string;
  filePath?: string[];
  objectName: string;
  sendUnapprovedTasks: boolean;
  sendFilePath: boolean;
}
