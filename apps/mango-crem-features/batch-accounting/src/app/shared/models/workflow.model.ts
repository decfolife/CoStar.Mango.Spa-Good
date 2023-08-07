export class WorkflowSettings {
    isApproveOwnChangesEnabled: boolean;
    isCommentsEnabled: boolean;
    isCommentsRequired: boolean;
    isIncrementOneLevelEnforced: boolean;
 };

 export class WorkflowStatus {
    workflowStatusID: number;
    statusOrder: number;
    workflowStatus: string;
    isApprovedStatus: boolean;
    allowScheduleEdit: boolean;
 }