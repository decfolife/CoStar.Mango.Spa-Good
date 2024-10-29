import {
  AccountingBatch,
  BatchParameter,
  BatchStatus,
  ClassificationParameters,
  MeasureEvent,
  MeasureEventSetting,
} from '.';

describe('models', () => {
  describe('AccountingBatch', () => {
    let accountingBatch: AccountingBatch;
    const now = new Date();
    const batchParam = new BatchParameter(1, 1, 1, '', 1, 1, '', '', []);

    beforeEach(() => {
      accountingBatch = new AccountingBatch(
        1,
        BatchStatus.QueuedForValidation,
        2,
        now,
        1,
        now,
        false,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        batchParam
      );
    });

    it('should have masterGroupId', () => {
      expect(accountingBatch).toHaveProperty('masterGroupId');
      expect(accountingBatch.masterGroupId).toEqual(1);
    });

    it('should have batchStatus', () => {
      expect(accountingBatch).toHaveProperty('batchStatus');
      expect(accountingBatch.batchStatus).toEqual(
        BatchStatus.QueuedForValidation
      );
    });

    it('should have createdBy', () => {
      expect(accountingBatch).toHaveProperty('createdBy');
      expect(accountingBatch.createdBy).toEqual(2);
    });

    it('should have createdOn', () => {
      expect(accountingBatch).toHaveProperty('createdOn');
      expect(accountingBatch.createdOn).toEqual(now);
    });

    it('should have lastModifiedBy', () => {
      expect(accountingBatch).toHaveProperty('lastModifiedBy');
      expect(accountingBatch.lastModifiedBy).toEqual(1);
    });

    it('should have lastModified', () => {
      expect(accountingBatch).toHaveProperty('lastModified');
      expect(accountingBatch.lastModified).toEqual(now);
    });

    it('should have isAutoProcess', () => {
      expect(accountingBatch).toHaveProperty('isAutoProcess');
      expect(accountingBatch.isAutoProcess).toEqual(false);
    });

    it('should have validationStarted', () => {
      expect(accountingBatch).toHaveProperty('validationStarted');
      expect(accountingBatch.validationStarted).toBeNull();
    });

    it('should have validationEnded', () => {
      expect(accountingBatch).toHaveProperty('validationEnded');
      expect(accountingBatch.validationEnded).toBeNull();
    });

    it('should have processStarted', () => {
      expect(accountingBatch).toHaveProperty('processStarted');
      expect(accountingBatch.processStarted).toBeNull();
    });

    it('should have processEnded', () => {
      expect(accountingBatch).toHaveProperty('processEnded');
      expect(accountingBatch.processEnded).toBeNull();
    });

    it('should have validationSuccessTotal', () => {
      expect(accountingBatch).toHaveProperty('validationSuccessTotal');
      expect(accountingBatch.validationSuccessTotal).toBeNull();
    });

    it('should have validationFailureTotal', () => {
      expect(accountingBatch).toHaveProperty('validationFailureTotal');
      expect(accountingBatch.validationFailureTotal).toBeNull();
    });

    it('should have processingSuccessTotal', () => {
      expect(accountingBatch).toHaveProperty('processingSuccessTotal');
      expect(accountingBatch.processingSuccessTotal).toBeNull();
    });

    it('should have processingFailureTotal', () => {
      expect(accountingBatch).toHaveProperty('processingFailureTotal');
      expect(accountingBatch.processingFailureTotal).toBeNull();
    });

    it('should have batchParameter', () => {
      expect(accountingBatch).toHaveProperty('batchParameter');
      expect(accountingBatch.batchParameter).toEqual(batchParam);
    });
  });

  describe('ClassificationParameters', () => {
    let classParam: ClassificationParameters;
    const now = new Date();

    beforeEach(() => {
      classParam = new ClassificationParameters(
        1,
        1,
        null,
        now,
        1,
        null,
        now,
        '',
        null,
        null,
        null,
        null,
        '',
        '',
        null,
        '',
        ''
      );
    });

    it('should have classificationId', () => {
      expect(classParam).toHaveProperty('classificationId');
      expect(classParam.classificationId).toEqual(1);
    });

    it('should have termBeginDateOptionId', () => {
      expect(classParam).toHaveProperty('termBeginDateOptionId');
      expect(classParam.termBeginDateOptionId).toEqual(1);
    });

    it('should have termBeginFormItemId', () => {
      expect(classParam).toHaveProperty('termBeginFormItemId');
      expect(classParam.termBeginFormItemId).toBeNull();
    });

    it('should have termBeginDirectEntry', () => {
      expect(classParam).toHaveProperty('termBeginDirectEntry');

      const newDate = new Date(now);
      newDate.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      expect(classParam.termBeginDirectEntry).toEqual(newDate);
    });

    it('should have termEndDateOptionId', () => {
      expect(classParam).toHaveProperty('termEndDateOptionId');
      expect(classParam.termEndDateOptionId).toEqual(1);
    });

    it('should have termEndFormItemId', () => {
      expect(classParam).toHaveProperty('termEndFormItemId');
      expect(classParam.termEndFormItemId).toBeNull();
    });

    it('should have termEndDirectEntry', () => {
      expect(classParam).toHaveProperty('termEndDirectEntry');

      const newDate = new Date(now);
      newDate.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      expect(classParam.termEndDirectEntry).toEqual(newDate);
    });

    it('should have discountRateProfileOption', () => {
      expect(classParam).toHaveProperty('discountRateProfileOption');
      expect(classParam.discountRateProfileOption).toEqual('');
    });

    it('should have annualRate', () => {
      expect(classParam).toHaveProperty('annualRate');
      expect(classParam.annualRate).toBeNull();
    });

    it('should have annualRateType', () => {
      expect(classParam).toHaveProperty('annualRateType');
      expect(classParam.annualRateType).toBeNull();
    });

    it('should have paymentTiming', () => {
      expect(classParam).toHaveProperty('paymentTiming');
      expect(classParam.paymentTiming).toBeNull();
    });

    it('should have journalEntryProfileId', () => {
      expect(classParam).toHaveProperty('journalEntryProfileId');
      expect(classParam.journalEntryProfileId).toBeNull();
    });

    it('should have journalEntryProfileOption', () => {
      expect(classParam).toHaveProperty('journalEntryProfileOption');
      expect(classParam.journalEntryProfileOption).toEqual('');
    });

    it('should have manualAdjustmentOption', () => {
      expect(classParam).toHaveProperty('manualAdjustmentOption');
      expect(classParam.manualAdjustmentOption).toEqual('');
    });

    it('should have manualAdjustmentDirectEntry', () => {
      expect(classParam).toHaveProperty('manualAdjustmentDirectEntry');
      expect(classParam.manualAdjustmentDirectEntry).toBeNull();
    });

    it('should have commentsOption', () => {
      expect(classParam).toHaveProperty('commentsOption');
      expect(classParam.commentsOption).toEqual('');
    });

    it('should have commentsDirectEntry', () => {
      expect(classParam).toHaveProperty('commentsDirectEntry');
      expect(classParam.commentsDirectEntry).toEqual('');
    });
  });

  describe('MeasureEventSetting', () => {
    const measureEvent: MeasureEvent = {
      remeasureTypeId: 1,
      remeasureTypeName: '',
    };
    let measureEventSetting: MeasureEventSetting;

    beforeEach(() => {
      measureEventSetting = new MeasureEventSetting(
        1,
        '',
        measureEvent,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      );
    });

    it('should have id', () => {
      expect(measureEventSetting).toHaveProperty('id');
      expect(measureEventSetting.id).toEqual(1);
    });

    it('should have portfolio', () => {
      expect(measureEventSetting).toHaveProperty('portfolio');
      expect(measureEventSetting.portfolio).toEqual('');
    });

    it('should have measureEvent', () => {
      expect(measureEventSetting).toHaveProperty('measureEvent');
      expect(measureEventSetting.measureEvent).toEqual(measureEvent);
    });

    it('should have classificationType', () => {
      expect(measureEventSetting).toHaveProperty('classificationType');
      expect(measureEventSetting.classificationType).toEqual('');
    });

    it('should have accountingTermBeginDate', () => {
      expect(measureEventSetting).toHaveProperty('accountingTermBeginDate');
      expect(measureEventSetting.accountingTermBeginDate).toEqual('');
    });

    it('should have accountingTermEndDate', () => {
      expect(measureEventSetting).toHaveProperty('accountingTermEndDate');
      expect(measureEventSetting.accountingTermEndDate).toEqual('');
    });

    it('should have discountRateProfile', () => {
      expect(measureEventSetting).toHaveProperty('discountRateProfile');
      expect(measureEventSetting.discountRateProfile).toEqual('');
    });

    it('should have journalEntryProfile', () => {
      expect(measureEventSetting).toHaveProperty('journalEntryProfile');
      expect(measureEventSetting.journalEntryProfile).toEqual('');
    });

    it('should have functionalRate', () => {
      expect(measureEventSetting).toHaveProperty('functionalRate');
      expect(measureEventSetting.functionalRate).toEqual('');
    });

    it('should have manualAssetAdjustment', () => {
      expect(measureEventSetting).toHaveProperty('manualAssetAdjustment');
      expect(measureEventSetting.manualAssetAdjustment).toEqual('');
    });

    it('should have comments', () => {
      expect(measureEventSetting).toHaveProperty('comments');
      expect(measureEventSetting.comments).toEqual('');
    });

    it('should have nextWorkflowStatus', () => {
      expect(measureEventSetting).toHaveProperty('nextWorkflowStatus');
      expect(measureEventSetting.nextWorkflowStatus).toEqual('');
    });
  });
});
