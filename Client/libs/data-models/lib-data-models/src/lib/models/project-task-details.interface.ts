export interface ProjectTaskDetails {
  taskId: number;
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
  taskStatus: TaskStatus;
  fileCount: number;
}

interface TaskStatus {
  color: string;
  title: string;
} 