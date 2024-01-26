export interface ProjectTaskDetails {
  taskName: string;
  step: string;
  isCurrent: boolean;
  targetStartDate: Date;
  targetEndDate: Date;
  daysToStart: number;
  daysToComplete: number;
  isMilestoneRequired: boolean;
  isMileMark: boolean;
  actualStartDate: Date;
  completeDate: Date;
  hoursToDate: number;
  predecessors: number;
  taskSubTasksCount: number;
  approvalsNeeded: number;
  approvalStatus: string;
  projectID: number;
  noteCount: number;
  taskStatus: string;
  fileCount: number;
}