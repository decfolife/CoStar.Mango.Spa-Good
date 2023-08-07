export class MeasureEventSetting {
	configurationID : number;
	remeasureTypeID: number;
	remeasureTypeName : string;	
	classificationID : string;
	accountingTermBeginDate : String;
	accountingTermEndDate : String;
	journalEntryOption : String;
	manualAdjustmentOption : String;
	commentsOption : String;

	constructor(configurationID, remeasureTypeID, remeasureTypeName, classificationID, accountingTermBeginDate, accountingTermEndDate, journalEntryOption, manualAdjustmentOption, commentsOption ) {
		this.configurationID = configurationID;
		this.remeasureTypeID = remeasureTypeID;
		this.remeasureTypeName = remeasureTypeName;	
		this.classificationID = classificationID;
		this.accountingTermBeginDate = accountingTermBeginDate;
		this.accountingTermEndDate = accountingTermEndDate;
		this.journalEntryOption = journalEntryOption;
		this.manualAdjustmentOption = manualAdjustmentOption;
		this.commentsOption = commentsOption;		
	}
}
