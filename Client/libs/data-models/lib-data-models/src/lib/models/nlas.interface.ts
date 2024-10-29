
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

/**
 * Classification Names for Financial Events/Schedules
 *
 * @export
 * @enum {number}
 */
export enum ClassificationTypeName {
  'Operating 840'= 0,
  'Capital (FAS 13)'= 1,
  'Finance (ASC 842)'= 2,
  'Operating (ASC 842)'= 3,
  'IFRS 16'= 4,
  'Operating (Lessor)'= 5,
  'Sales Type (Lessor)'= 6,
}

/**
 * Type Guard for 'ClassificationTypeName'
 *
 * @example
 *   if (isClassificationTypeName(classificationName)) {
 *  switch (classificationName) {
 *    case 'Finance (ASC 842)':
 *      console.log('Handling Finance (ASC 842)');
 *      break;
 *    default:
 *      console.log('Unknown classification');
 *  }
 * @export
 * @param {string} value
 * @return {*}  {value is keyof typeof ClassificationTypeName}
 */
export function isClassificationTypeName(value: string): value is keyof typeof ClassificationTypeName {
  return Object.keys(ClassificationTypeName).includes(value);
}