export interface QuickApprovalUI {
  projectMilestoneApprovalID: number;
  actualStartDateExists: boolean;
  dateExists: boolean;
  noteExists: boolean;
  contactName: string;
  taskName: string;
  approve: string;
  actualStartDate?: string;
  hoursToDate?: number;
  hoursLastUpdated?: string;
  newHours?: number;
  date?: Date;
  note?: string;
  blockApproval?: string;
  isProxy?: boolean;
  isRowSelected: boolean;
}

export interface TaskRequestList {
  taskApprovalID: number;
  actualStartDate?: string;
  newHours?: number;
  userDate?: string;
  isApproval?: boolean;
  isProxyApproval: boolean;
  notes?: string;
}

export interface QuickApprovalRequest {
  isQuickApproval: boolean;
  approveRejectTasksRequestList: TaskRequestList[];
}
