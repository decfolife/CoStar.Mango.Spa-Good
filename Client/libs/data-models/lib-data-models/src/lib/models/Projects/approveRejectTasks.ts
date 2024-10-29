export interface ApproveRejectTasks {
  projectId: number;
  isQuickApproval: boolean;
  approveRejectTasksRequestList: ApproveRejectTaskRequest[];
}

export interface ApproveRejectTaskRequest {
  taskApprovalID: number;
  actualStartDate: Date;
  newHours: number;
  userDate: Date;
  isApproval: boolean;
  isProxyApproval: boolean;
  notes: string;
}
