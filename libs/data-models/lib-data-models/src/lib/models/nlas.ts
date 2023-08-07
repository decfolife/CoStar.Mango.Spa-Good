
export class ExceptionData {
    exceptionId: number;
    isDismissed: boolean;
    dateInserted: Date;
    isActive: boolean;
    systemLeaseId: number;
    portfolio: string;
    accountingWorkflowStatus: string;
    calculationExceptionID: number;
    calculationExceptionDescription: string;
    calculationExceptionValue: string;
    calculationExceptionInformation: string;
    calculationExceptionType: string;
    calculationExceptionRecommendedAction: string;
    amortizationProfile: string;
    jeStatus: string;
    leaseRecognitionScheduleID: number;
}

export enum PageMode {
    Details = 0,
    Add = 1,
    Edit = 2,
    View = 3
}

export enum RemeasureType {
    Default,
    Remeasure,
    Termination,
    PartialTerminate,
    Impairment,
    RetroAdjust,
    FullTermination
}

export enum ClassificationType {
    Operating = 0,
    Capital = 1,
    Finance842 = 2,
    Operating842 = 3,
    IFRS16 = 4,
    OperatingLessor = 5
}