import { ClassificationParameters } from './classification-parameter.model';

export class BatchParameter {
  measureEvent: number;

  originalWorkflowStep: number;
  finalWorkflowStep: number;

  workflowComment: string;

  userViewId: number | null;
  listPageId: number | null;

  listOfLeaseIds: string;
  listOfScheduleIds: string;

  classificationParameters: ClassificationParameters[];

  constructor(
    measureEvent: number,
    originalWorkflowStep: number,
    finalWorkflowStep: number,
    workflowComment: string,
    userViewId: number,
    listPageId: number,
    listOfLeaseIds: string,
    listOfScheduleIds: string,
    classificationParameters: ClassificationParameters[]
  ) {
    this.measureEvent = measureEvent;
    this.originalWorkflowStep = originalWorkflowStep;
    this.finalWorkflowStep = finalWorkflowStep;
    this.workflowComment = workflowComment;
    this.userViewId = userViewId;
    this.listPageId = listPageId;
    this.listOfLeaseIds = listOfLeaseIds;
    this.listOfScheduleIds = listOfScheduleIds;
    this.classificationParameters = classificationParameters;
  }
}
