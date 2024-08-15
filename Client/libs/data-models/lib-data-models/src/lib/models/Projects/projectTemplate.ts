export interface ProjectTemplate {
  projectTemplateID: number;
  projectTemplateName: string;
  // projectTemplatePublic: boolean;
  // lastModified: Date;
  // projectTemplateByWorkDays: boolean;
  // creator: string;
}

export interface  ProjectTemplateTask {
  projectTemplateMilestoneID: number;
  projectTemplateID: number;
  projectTemplateMilestoneParentID: number;
  projectTemplateMilestoneStep: number;
  projectTemplateMilestoneStepFull: string;
  projectTemplateMilestoneName: string;
  projectTemplateMilestoneAbbreviation: string;
  projectTemplateMilestoneDescription: null;
  projectTemplateMilestoneRequired: true;
  projectTemplateMilestoneDaysToStart: number;
  projectTemplateMilestoneDaysToComplete: number;
  isMileMark: boolean;
  deleted: boolean;
  lastModifiedBy: number;
  lastModified: Date;
  isConcurrent: false;
  taskSubTasksCount: number;
  predecessors: number;
  fileCount: number;
  isShrinkable: boolean;
  workflowStatusID: number;
  workflowName: string;
  percentComplete: number;
}  

