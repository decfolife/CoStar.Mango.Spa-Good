export class MeasureEventSetting {
    id : number;
    portfolio : string;
	measureEvent : string;	
	classificationType : string;
	accountingTermBeginDate : String;
	accountingTermEndDate : String;
	discountRateProfile : String;
	journalEntryProfile : String;
	functionalRate : String;
	manualAssetAdjustment : String;
	comments : String;
	nextWorkflowStatus : String;

	constructor( id, portfolio, measureEvent, classificationType, accountingTermBeginDate, accountingTermEndDate, discountRateProfile, journalEntryProfile, functionalRate, manualAssetAdjustment, comments, nextWorkflowStatus) {
		this.id = id;
		this.portfolio = portfolio;
		this.measureEvent = measureEvent;	
		this.classificationType = classificationType;
		this.accountingTermBeginDate = accountingTermBeginDate;
		this.accountingTermEndDate = accountingTermEndDate;
		this.discountRateProfile = discountRateProfile;
		this.journalEntryProfile = journalEntryProfile;
		this.functionalRate = functionalRate;
		this.manualAssetAdjustment = manualAssetAdjustment;
		this.comments = comments;
		this.nextWorkflowStatus = nextWorkflowStatus;		
	}
}

export let measureEventSettings : MeasureEventSetting[] = [
	// id, portfolio, measureEvent, classificationType, accountingTermBeginDate, accountingTermEndDate, discountRateProfile, journalEntryProfile, functionalRate, manualAssetAdjustment, comments, nextWorkflowStatus
	new MeasureEventSetting(1, "Acme", "Initial", "Finance ASC 842", "Possession Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Prior Comments", "Needs Review"),
	new MeasureEventSetting(2, "Acme", "Renewal", "Finance ASC 842", "Lease Agreement Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Prior Comments", "Needs Review"),
	new MeasureEventSetting(3, "Acme", "Data Correction", "Finance ASC 842", "Prior Term Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Prior Commentss", "Needs Review"),
	new MeasureEventSetting(4, "Acme", "Rent Review (IFRS)", "Finance ASC 842", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Prior Comments", "Needs Review"),
	new MeasureEventSetting(5, "Acme", "CPI Cumulative Cap Reached", "Finance ASC 842", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Prior Comments", "Needs Review"),
	new MeasureEventSetting(6, "Acme", "Other", "Finance ASC 842", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Prior Comments", "Needs Review"),
	new MeasureEventSetting(7, "Acme", "Impairment", "Finance ASC 842", "Direct Entry", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Prior Comments", "Needs Review"),
	new MeasureEventSetting(8, "Acme", "Partial Termination", "Finance ASC 842", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Prior Comments", "Needs Review"),
	new MeasureEventSetting(9, "Acme", "Termination", "Finance ASC 842", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Prior Comments", "Needs Review"),
	new MeasureEventSetting(10, "Acme", "Full Termination", "Finance ASC 842", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Prior Comments", "Needs Review"),

	new MeasureEventSetting(1, "Acme", "Initial", "Operating ASC 842", "Possession Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(2, "Acme", "Renewal", "Operating ASC 842", "Lease Agreement Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(3, "Acme", "Data Correction", "Operating ASC 842", "Prior Term Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]s", "Needs Review"),
	new MeasureEventSetting(4, "Acme", "Rent Review (IFRS)", "Operating ASC 842", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(5, "Acme", "CPI Cumulative Cap Reached", "Operating ASC 842", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(6, "Acme", "Other", "Operating ASC 842", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(7, "Acme", "Impairment", "Operating ASC 842", "Direct Entry", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(8, "Acme", "Partial Termination", "Operating ASC 842", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(9, "Acme", "Termination", "Operating ASC 842", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(10, "Acme", "Full Termination", "Operating ASC 842", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),

	new MeasureEventSetting(1, "Acme", "Initial", "Capital ASC 840", "Possession Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(2, "Acme", "Renewal", "Capital ASC 840", "Lease Agreement Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(3, "Acme", "Data Correction", "Capital ASC 840", "Prior Term Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]s", "Needs Review"),
	new MeasureEventSetting(4, "Acme", "Rent Review (IFRS)", "Capital ASC 840", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(5, "Acme", "CPI Cumulative Cap Reached", "Capital ASC 840", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(6, "Acme", "Other", "Capital ASC 840", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(7, "Acme", "Impairment", "Capital ASC 840", "Direct Entry", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(8, "Acme", "Partial Termination", "Capital ASC 840", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(9, "Acme", "Termination", "Capital ASC 840", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(10, "Acme", "Full Termination", "Capital ASC 840", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),

	new MeasureEventSetting(1, "Acme", "Initial", "Operating ASC 840", "Possession Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(2, "Acme", "Renewal", "Operating ASC 840", "Lease Agreement Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(3, "Acme", "Data Correction", "Operating ASC 840", "Prior Term Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]s", "Needs Review"),
	new MeasureEventSetting(4, "Acme", "Rent Review (IFRS)", "Operating ASC 840", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(5, "Acme", "CPI Cumulative Cap Reached", "Operating ASC 840", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(6, "Acme", "Other", "Operating ASC 840", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(7, "Acme", "Impairment", "Operating ASC 840", "Direct Entry", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(8, "Acme", "Partial Termination", "Operating ASC 840", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(9, "Acme", "Termination", "Operating ASC 840", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(10, "Acme", "Full Termination", "Operating ASC 840", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),

	new MeasureEventSetting(1, "Acme", "Initial", "IFRS 16", "Possession Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(2, "Acme", "Renewal", "IFRS 16", "Lease Agreement Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(3, "Acme", "Data Correction", "IFRS 16", "Prior Term Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]s", "Needs Review"),
	new MeasureEventSetting(4, "Acme", "Rent Review (IFRS)", "IFRS 16", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(5, "Acme", "CPI Cumulative Cap Reached", "IFRS 16", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(6, "Acme", "Other", "IFRS 16", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(7, "Acme", "Impairment", "IFRS 16", "Direct Entry", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(8, "Acme", "Partial Termination", "IFRS 16", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(9, "Acme", "Termination", "IFRS 16", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(10, "Acme", "Full Termination", "IFRS 16", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),

	new MeasureEventSetting(1, "Acme", "Initial", "Operating Lessor", "Possession Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(2, "Acme", "Renewal", "Operating Lessor", "Lease Agreement Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(3, "Acme", "Data Correction", "Operating Lessor", "Prior Term Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(4, "Acme", "Rent Review (IFRS)", "Operating Lessor", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(5, "Acme", "CPI Cumulative Cap Reached", "Operating Lessor", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(6, "Acme", "Other", "Operating Lessor", "Direct Entry", "Direct Entry", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(7, "Acme", "Impairment", "Operating Lessor", "Direct Entry", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(8, "Acme", "Partial Termination", "Operating Lessor", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(9, "Acme", "Termination", "Operating Lessor", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
	new MeasureEventSetting(10, "Acme", "Full Termination", "Operating Lessor", "Current Period Begin Date", "Current Lease Expiration Date", "Use Best Match", "Prior Value", "Direct Entry (Use Prior Discount Rate)", "Prior Adjustment Amount", "Measured Batch [#] by [User] on [Date]", "Needs Review"),
];

