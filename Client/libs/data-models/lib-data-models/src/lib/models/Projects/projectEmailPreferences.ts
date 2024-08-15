export interface ProjectEmailPreferences {
  transactionName: string;    
  transactionAutoEmail: boolean;   //** 1 atuo emails  */
  emailOverdue: boolean;  //** 8 overdue emails */
  emailOnApproval: boolean;  //** 3 approval */
  emailCopyApprover: boolean; //** 11 approver */
  emailOnCompletion: boolean;  //** 5 completion */
  emailOnInitiation: boolean;
  emailIncludeMinors: boolean;  //** 9 subtasks */
  emailFollowDependencies: boolean;  //**Follow Predessors */
  emailFollowSteps: boolean;  //Follow default order
  emailOnFileUpload: boolean;  //** 2 file upload*/
  emailOnMilestoneApproval: boolean; //** 4 mile stone approval */
  emailCopyTeam: boolean;  //** 10 team */
  emailMilestoneCompletionCCTeam: boolean;
  emailOnStart: boolean;
}


export interface PostProjectEmailPreferences {
  projectID: number;
  autoEmail: boolean;
  overdueEmails: boolean;
  onStartEmails: boolean;
  onApproval: boolean;
  copyApprover: boolean;
  includeMinors: boolean;
  onCompletion: boolean;
  onInitiation: boolean;
  followDependencies: boolean;
  followSteps: boolean;
  fileUpload: boolean;
  milestoneApproval: boolean;
  copyTeam: boolean;
  milestoneCompletion: boolean;
}