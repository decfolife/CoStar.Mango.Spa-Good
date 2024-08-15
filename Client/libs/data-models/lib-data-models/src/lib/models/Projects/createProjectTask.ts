export interface  CreateProjectTask {
  taskID: number;
  projectID: number;
  parentID: number;
  step: number;
  daysToStart: number;
  calc: number;
  autoCalc: number;
  isChild: number;
  useEmailApprovals: number;
  name: string;
  description: string;
  required: boolean;
  daysToComplete: number;
  isMileMark: boolean;
  isConcurrent: boolean;
  isShrinkable: boolean;
  workflowStatusID: number;
  percentComplete: number;
  startDate: Date;
  endDate: Date;
  predecessors: number[];
  roles: string[];
  approvalExempt: boolean;
  requiredApprovers: number;
}  
