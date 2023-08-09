export class RemeasureParameter {
    Classification: string;
    AccountingTermBeginDate: string;
    AccountingTermEndDate: string;
    JournalEntryProfile: string;
    DiscountRateProfile: string;
    ManualAdjustment: string;
    Comments: string;

    constructor(classification, accountingTermBeginDate, accountingTermEndDate, journalEntryProfile, manualAdjustment, comments, discountRateProfile) {
        this.Classification = classification;
        this.AccountingTermBeginDate = accountingTermBeginDate;
        this.AccountingTermEndDate = accountingTermEndDate;
        this.JournalEntryProfile = journalEntryProfile;
        this.ManualAdjustment = manualAdjustment;
        this.Comments = comments;
        this.DiscountRateProfile = discountRateProfile;
    }
}

export let remeasureParameters: RemeasureParameter[] = [
    new RemeasureParameter("Finance (ASC 842)", "Current Period Begin Date", "Current Lease Expiration Date", "Prior Value", "Prior Adjustment Amount", "Direct Entry", "Use Best Match"),
    new RemeasureParameter("Operating (ASC 842)", "Today", "Current Lease Expiration Date", "JE Profile 1", "Prior Adjustment Amount", "Direct Entry", "Use Best Match"),
    new RemeasureParameter("IFRS 16", "Original Lease Commencement Date", "Prior Term End Date", "Prior Value", "Direct Entry", "Direct Entry", "Use Best Match"),
    new RemeasureParameter("Operating (ASC 842)", "Direct Entry", "Current Lease Expiration Date", "JE Profile 2", "Prior Adjustment Amount", "Direct Entry", "Use Best Match"),
    new RemeasureParameter("Operating (Lessor)", "Lease Agreement Date", "Prior Term End Date", "JE Profile 2", "Prior Adjustment Amount", "Direct Entry", "Use Best Match")
]