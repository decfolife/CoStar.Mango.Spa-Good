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
    date?: string;
    note?: string;
    blockApproval?: string;
    isProxy?: boolean;
  }
  
  export interface TaskRequestList {
    taskApprovalID: number;
    actualStartDate: string;
    newHours: number;
    userDate: string;
    isApproval: true;
    isProxyApproval: boolean;
    notes: string;
  }
  
  export interface QuickApprovalRequest {
    isQuickApproval: boolean;
    approveRejectTasksRequestList: TaskRequestList[];
  }