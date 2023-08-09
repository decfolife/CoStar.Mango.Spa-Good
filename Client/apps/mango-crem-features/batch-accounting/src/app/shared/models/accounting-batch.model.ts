
import { BatchParameter } from './batch-parameter.model';

export enum BatchStatus {
  Cancelled = 1,
  QueuedForValidation,
  Validating,
  ValidationComplete,
  QueuedforProcessing,
  Processing,
  Complete,
  CompleteWithError,
  Error
}

export class AccountingBatch {
  masterGroupId: number;

  batchStatus: BatchStatus;

  createdBy: number;
  createdOn: Date;

  lastModifiedBy: number;
  lastModified: Date;

  isAutoProcess: boolean;

  validationStarted: Date | null;
  validationEnded: Date | null;

  processStarted: Date | null;
  processEnded: Date | null;

  validationSuccessTotal: number | null;
  validationFailureTotal: number | null;
  processingSuccessTotal: number | null;
  processingFailureTotal: number | null;

  batchParameter: BatchParameter;

  constructor(masterGroupId: number, batchStatus: BatchStatus,
    createdBy: number, createdOn: Date, lastModifiedBy: number, lastModified: Date,
    isAutoProcess: boolean, validationStarted: Date, validationEnded: Date,
    processStarted: Date, processEnded: Date, validationSuccessTotal: number,
    validationFailureTotal: number, processingSuccessTotal: number,
    processingFailureTotal: number, batchParameter: BatchParameter
  ) {
    this.masterGroupId = masterGroupId;
    this.batchStatus = batchStatus;
    this.createdBy = createdBy;
    this.createdOn = createdOn;
    this.lastModifiedBy = lastModifiedBy;
    this.lastModified = lastModified;
    this.isAutoProcess = isAutoProcess;
    this.validationStarted = validationStarted;
    this.validationEnded = validationEnded;
    this.processStarted = processStarted;
    this.processEnded = processEnded;
    this.validationSuccessTotal = validationSuccessTotal;
    this.validationFailureTotal = validationFailureTotal;
    this.processingSuccessTotal = processingSuccessTotal;
    this.processingFailureTotal = processingFailureTotal;
    this.batchParameter = batchParameter;
  }
}
