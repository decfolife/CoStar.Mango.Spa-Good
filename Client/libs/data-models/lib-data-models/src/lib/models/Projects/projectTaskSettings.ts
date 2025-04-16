export interface ProjectTaskSettings {
  projectName: string;
  startDate: Date;
  dueDate: Date;
  calculateDates: boolean;
  calculatedBy: boolean;
  autoCalculate: boolean;
  shiftTimeline: boolean;
  shrinkableCount: number;
  totaldays: number;
  percentComplete: number;
  workflowStatus: string;
  projectAllowTaskNoteOverride: string;
  projectRequiredTaskNotes: boolean;
}


export interface PostProjectTaskSettings {
  projectID: number;
  startDate: Date;
  dueDate: Date;
  calculateDates: boolean;
  calculatedBy: boolean;
  autoCalculate: boolean;
  shiftTimeline: boolean;
  projectRequiredTaskNotes: boolean;
  numOfDaysDifference: number;
}
