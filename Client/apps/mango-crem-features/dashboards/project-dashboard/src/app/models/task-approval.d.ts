/**
 * @deprecated This interface is deprecated and should not be used.
 * Please use TaskApproveRejectRequest instead.
 */
export interface TaskApprovalDto {
  taskId: number;
  taskNumber: string;
  transactionId: numner;
  notes: string;
  isApproval: number;
}

export interface TaskApproveRejectRequest {
  projectId: number;
  taskId: number;
  actualStartDate?: Date | null;
  newHours?: number | null;
  userDate?: Date | null;
  isApproval: boolean;
  isProxyApproval: boolean;
  notes?: string | null;
}
