export interface ProjectTaskInfo {
  taskInfo: TaskDetails;
  files: TaskFileInfo[];
  approvers: ApprovalDetail[];
  notes: TaskCommonNote[];
  subTasks: TaskCommonNote[];
}

export interface  TaskDetails {
  transactionName: string;
  projectMilestoneID: number;
  projectMilestoneParentID: number;
  projectMilestoneStep: number;
  projectMilestoneStepFull: string;
  projectMilestoneName: string;
  projectMilestoneAbbreviation: string;
  projectMilestoneDescription: string;
  projectMilestoneRequired: boolean;
  projectMilestoneDaysToStart: number;
  projectMilestoneAbsoluteDaysToStart: number;
  projectMilestoneDaysToComplete: number; //duration
  isMileMark: boolean;
  projectMilestoneStartDate?: Date;  //targetSTartDate
  projectMilestoneEndDate?: Date;   //targetEndDate
  projectMilestoneCompletedDate?: Date;
  projectMilestoneUserCompletedDate?: Date;
  percentComplete: number;
  workflowStatusID: number;
  isConcurrent: boolean;
  isShrinkable: boolean;
  useEmailApprovals: boolean;
  actualStartDate?: Date;
  workflowName: string;
  taskStatus: TaskStatus;
  indexOrder: number;
  potentialPredecessors: Predecessor[];
  existingPredecessors: Predecessor[];
  availableRoles: AvailableRole[];
  assignedRoles: AssignedRole[];
  workflows: Workflow[];
  subTasks: any[];
  approvalExempt?: boolean;
  requiredApprovers?: number;
}  

export interface TaskFileInfo {
  fileID: number;
  version: number;
  authorId: number;
  authorName: string;
  trackVersion: boolean;
  fileName: string;
  identifier: string;
  description: string;
  comments: string;
  dateUploaded?: Date;
  filePath: string;
  systemName: string;
  isFile: string;
  size: number;
  userFileName: string;
  checkedOut?: Date;
  checkedoutby: string;
  checkOutUserID: number;
  folderDescription: string;
  folderPath: string;
  folderId: number;
  icon: string;
  fullName: string;
}  

export interface  ApprovalDetail {
  contactID: number;
  approvalDate?: Date;
  userApprovalDate?: Date;
  rejectDate?: Date;
  approvalStatus: string;
  projectMilestoneRequired: boolean;
  contactName: string;
  contactEMailAddress: string;
  contactConsolidatedEmails?: boolean;
  emailOn: boolean;
  contactActive: boolean;
  actualStartDate?: Date;
  hoursToDate: string;
  hoursLastUpdated?: Date;
  proxyContactID?: number;
  proxyContactName: string;
  projectMilestoneApprovalID: number;
  //this field is set in the UI and not at the server
  systemDate?: Date;
}

export interface TaskCommonNote {
  commonNote: string;
  creatorID: number;
  commonNoteDateCreated?: Date;
  creator: string;
  commonNoteType: string;
  commonNoteID: number;
  commonNoteTypeID: number;
}

export interface SubTaskInfo {
  projectMilestoneID: number;
  projectID: number;
  projectMilestoneParentID: number;
  projectMilestoneName: string;
  projectMilestoneDescription: string;
  projectMilestoneRequired: boolean;
  projectMilestoneDaysToStart: number; 
  projectMilestoneStepFull: string;
  projectMilestoneDaysToComplete: number;
  projectMilestoneStartDate?: Date;
  projectMilestoneEndDate?: Date;
  projectMilestoneCompletedDate?: Date; 
  isMileMark: boolean;
  isConcurrent: boolean;
  projectMilestoneUserCompletedDate?: Date;
}

export interface Predecessor{
  projectMilestoneID: number;
  projectMilestoneStepFull: string;
  projectMilestoneName: string; 
  projectMilestoneStepFullAndName? : string;
}

export interface AssignedRole {
  projectMilestoneRoleID: number;
  projectMilestoneRole: string;
}

export interface TaskStatus {
  color: string;
  title: string;
}

export interface TaskCompletionDate {
  systemDate?: Date;
  userDate?: Date
}

export interface AvailableRole {
  role: string;
}

export interface Workflow {
  workflowStatusID: number;
  workflowName: string;
}