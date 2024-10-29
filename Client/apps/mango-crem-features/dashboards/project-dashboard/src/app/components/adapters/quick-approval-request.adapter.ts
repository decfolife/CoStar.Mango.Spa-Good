import {
  QuickApprovalRequest,
  QuickApprovalUI,
} from './../../models/interfaces/quick-approval.interface';
export const adaptResponseToUI = (approvals): QuickApprovalUI[] => {
  const mappedResponse: QuickApprovalUI[] = approvals.map((approval) => {
    return {
      ...approval,
      actualStartDate: approval.actualStartDate
        ? new Date(approval.actualStartDate)
        : null,
      date: approval.date ? new Date(approval.date) : null,
      actualStartDateExists: !!approval.actualStartDate,
      dateExists: !!approval.date,
      noteExists: !!approval.note,
      selectable:
        approval.approve === 'Approve' && !approval.blockApproval
          ? true
          : false,
      isRowSelected: false,
      note: approval.note,
    };
  });
  return mappedResponse;
};

export const buildQuickApprovalRequest = (
  selectedTasksToApprove: any[]
): QuickApprovalRequest => {
  const mappedRequest: QuickApprovalRequest = {
    isQuickApproval: true,
    approveRejectTasksRequestList: selectedTasksToApprove.map((task) => {
      return {
        taskApprovalID: task.projectMilestoneApprovalID,
        actualStartDate: task.actualStartDate
          ? task.actualStartDate.toISOString()
          : null,
        newHours: task.newHours ? task.newHours : 0,
        userDate: task.date ? task.date.toISOString() : null,
        isApproval: true,
        isProxyApproval: task.isProxy,
        notes: `RE: ${task.taskName} Approved - ${task.note}`,
      };
    }),
  };
  return mappedRequest;
};
