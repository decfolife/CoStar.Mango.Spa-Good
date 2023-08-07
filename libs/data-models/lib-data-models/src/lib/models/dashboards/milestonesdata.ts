import { Milestone } from "./milestone";

export interface MilestonesData{
  transactionId?: number;
  projectName: string;
  projectType: string;
  projectManager: string;
  projectStatus: string;
  projectDueDate: string;
  daysOverdue?: number;
  milestones?: Milestone[];
}
