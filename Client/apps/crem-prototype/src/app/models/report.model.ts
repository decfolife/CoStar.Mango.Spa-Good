import { Tag } from './tag.model';

export class Report {
    id : Number;
    name : String;
    description : String;
	type : String;
	access : String;
	datasetName : String;
	isScheduled : Boolean;
	createdBy : String;
	runCount : String;
	lastRunDate : String;
	lastRunBy : Boolean;
	reportUrl : string;
	isFavorite : Boolean;
	tags : Tag[];

	constructor(id,name,description,type,access,datasetName,isScheduled,createdBy,runCount,lastRunDate,lastRunBy,reportUrl, isFavorite, tags) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.type = type;
		this.access = access;
		this.datasetName = datasetName;				
		this.isScheduled = isScheduled;
		this.createdBy = createdBy;
		this.runCount = runCount;
		this.lastRunDate = lastRunDate;
		this.lastRunBy = lastRunBy;
		this.reportUrl = reportUrl;
		this.isFavorite = isFavorite;
		this.tags = tags;

	}
}

export let reports : Report[] = [
	new Report(1, 'Straight Line Expense Forecast', 'A portfolio view of the monthly deferred amounts where each lease is a row and each column is a monthly deferred amount. Choose a portfolio, System lease status (active or archived leases, null), Amortization profile, starting period and X months out as parameters to project deferred SL amounts for the next X months. This report is specific to the lease accounting classification type of Operating (FAS 13). Supports reporting currency conversions.', 'Financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, true, []),
	new Report(2, 'Security Access Report', 'Generic Security Access Report to show user and group rights', 'system', 'Shared', null, 'No', 'CoStar', 0, null, null, null, true, [new Tag(5, "Security Audit")]),
	new Report(3, 'Security Access by Group', 'Generic Security Access Report to show user and group rights', 'system', 'Shared', null, 'No', 'CoStar', 0, null, null, null, true, []),	
	new Report(5, 'Process Log Entries', 'This report simply dumps the process log entries for a specific log and a given date range.', 'system', 'Shared', null, 'No', 'CoStar', 0, null, null, null, true, []),
	new Report(6, 'Group and User Navigation Rights', 'Group and User Left Navigation Access Rights.', 'system', 'Shared', null, 'No', 'CoStar', 0, null, null, 'GROUP_AND_USER_NAVIGATION_RIGHTS', true, [new Tag(5, "Security Audit")]),
	new Report(7, 'Group and User Module Rights', 'Review the current Group and User Module Rights for the system.', 'system', 'Shared', null, 'No', 'CoStar', 0, null, null, 'GROUP_AND_USER_MODULE_RIGHTS', true, [new Tag(5, "Security Audit")]),
	new Report(8, 'Group and User Rights History', 'Group and User Admin Rights Change History.', 'system', 'Shared', null, 'No', 'CoStar', 0, null, null, 'GROUP_AND_USER_HISTORY', true, [new Tag(5, "Security Audit")]),
	new Report(9, 'Group and User Blocked Admin Links', 'Group and User Blocked Admin Links.', 'system', 'Shared', null, 'No', 'CoStar', 0, null, null, 'GROUP_AND_USER_BLOCKED_ADMIN_LINKS', true, [new Tag(5, "Security Audit")]),
	new Report(10, 'Exchange Rate Sets by Portfolio', 'This report will display the Period Average and Spot rate sets uploaded by portfolio by period.', 'system', 'Shared', null, 'No', 'CoStar', 0, null, null, 'EXCHANGE_RATE_SET', true, []),
	new Report(11, 'CoStar Real Estate Manager Data Dictionary', '', 'system', 'Shared', null, 'No', 'CoStar', 0, null, null, null, true, []),
	new Report(12, 'CoStar Real Estate Manager Change History', 'CoStar Real Estate Manager Change History', 'system', 'Shared', null, 'No', 'CoStar', 0, null, null, null, true, []),
	new Report(13, 'Offline: Batch Project General', '', 'project', 'Shared', null, 'No', 'CoStar', 0, null, null, null, true, []),
	new Report(4, 'Project Summary Report', '', 'project', 'Shared', null, 'No', 'CoStar', 0, null, null, null, true, []),
	new Report(14, 'Percent Rent - Sales Reports Results', 'This report returns the status of sales reports generated using the Lease Sales Reporting report. It can be run at any time to confirm the status of the report delivery', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, true, []),
	new Report(15, 'Percent Rent - Sales Data By Month', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(16, 'Percent Rent - LL Sales Reports (User Selected)', 'This report will generate sales reports and deliver them to fax or email addresses dependent upon the period and store numbers selected or store numbers manually input. If the store number is chosen, the sales report will be sent regardless of the reporting frequency. This report does NOT look at reporting frequency.', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(17, 'Percent Rent - Landlord Sales Reports', 'This report will generate sales reports and deliver them to the fax or email address specified in the Percentage Rent module based on the sales report frequency', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(18, 'Percent Rent - Effective Sales by Period', 'This report is useful for documenting the effective sales per period for an entire portfolio by showing the sales number that will be reported to the Landlord.', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(19, 'Percent Rent - Certified Sales Reports', 'PDF version of the sales report for certifying sales. The report will return leases with lease years ending in the selected period', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(20, 'Offline: Lease Critical Dates Batch Project Upload', '', 'portfolio', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(21, 'Offline Unsubmit Charges', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(22, 'Offline Unexport Charges', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(23, 'Offline Unapprove Charges', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(24, 'Offline Submit Charges', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(25, 'Offline Reverse Journal Entry', 'This Offline report is used to reverse the journal entry processing status from Exported to Approved or from Approved to Scheduled JE status', 'accounting', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, [new Tag(1, "Accounting")]),
	new Report(26, 'Offline Approve Charges', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(27, 'Lease Options', '', 'portfolio', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(28, 'Lease Abstract Report (By Hierarchy)', 'This report produces a single PDF version of the lease abstract for leases in a specific hierarchy or portfolio. Note that can take several minutes to complete.', 'portfolio', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(29, 'Amortization by Lease', 'A detailed view of the amortization schedule for each lease. When exported to excel, each lease amortization schedule appears on its own worksheet with a document map.', 'accounting', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, [new Tag(1, "Accounting"), new Tag(2, "Data Validation")]),
	new Report(30, 'Adv Fin - Variance by Hierarchy', 'Advanced Financials Variance by Hierarchy', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(31, 'Adv Fin - Variance By Account', 'Advanced Financials Variance By Account', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(32, 'Adv Fin - Tenant Statement of Account', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(33, 'Adv Fin - Straight-Line Summary', 'Advanced Financials Straight-line Summary', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(34, 'Adv Fin - Straight-Line Settings History', 'Adv Fin - Straight-Line Settings History', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(35, 'Adv Fin - Straight-Line Exceptions', 'Advanced Financials Exceptions', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(36, 'Adv Fin - Straight-Line Deferred Expense/Income', 'Expense/Income Advanced Financials Deferred Expense/Income', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(37, 'Adv Fin - Straight-Line Amortization by Lease', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(38, 'Adv Fin - Straight-Line Adjustments Journal Entry', 'Advanced Financials Journal Entry', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(39, 'Adv Fin - Straight Line Forecast', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(40, 'Adv Fin - Rent Roll', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(41, 'Adv Fin - Receivables Aging Report', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(42, 'Adv Fin - Monthly Charges by Allocation Center', 'Advanced Financials Charges By Account and Allocation', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(43, 'Adv Fin - Monthly Charges by Account No Totals', 'Advanced Financials Monthly Charges By Account', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(44, 'Adv Fin - Monthly Charges by Account', 'Advanced Financials Monthly Charges By Account', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(45, 'Adv Fin - Monthly Allocations by Lease', 'Advanced Financials Charges By Object Account Allocation', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(46, 'Adv Fin - Invoice Register', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(47, 'Adv Fin - Cash Receipts Summary', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(48, 'Adv Fin - Cash Receipts Detail', '', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(49, 'Adv Fin - Annual Obligation by Account', 'Advanced Financials Annual Obligation By Account is useful for reporting the minimum rent obligation over the next 5 years or more. This report is commonly used for footnotes in SEC reporting.', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(50, 'Accounting Transition Export', 'Lease Accounting Transition Export. This report will allow clients to export out lease data which can then be uploaded via ETL for transitioning to ASC 842.', 'accounting', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(51, 'Accounting Summary', 'This report shows a single period view across a portfolio for a chosen classification. Each row shows the lease record. Each column from the amortization table (i.e. asset balance, liability balance, interest, straight line Expense) is a column in the report.', 'accounting', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, [new Tag(1, "Accounting"), new Tag(2, "Data Validation")]),
	new Report(52, 'Accounting Roll-Forward', 'The Accounting Roll-Forward report shows, on a System Lease ID basis, the Opening and Closing account balances for Assets and Liabilities, based on a report date range (e.g 202001 – 202012) and the reconciling accounts (e.g. “Amortization” and “Adjustments” and “Added leases”) responsible for amortizing and adjusting (i.e. “rolling”) these balances over the reporting range.', 'accounting', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, [new Tag(1, "Accounting")]),
	new Report(53, 'Accounting IFRS 16 Disclosures', 'Lease Accounting IFRS 16 Disclosures. This report provides a 12-month year-over-year portfolio summary of accounting metrics for IFRS 16 finance lease classifications.', 'accounting', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, [new Tag(1, "Accounting")]),
	new Report(54, 'Accounting Forecast', 'The Accounting Forecast version 2 provides the same output as version 1, however, it designed to support a larger dataset. This version of the report will execute in the background and you will receive an email containing a link to the report once processing is complete. The report link will also be made available in the uesr’s contact record in the files page.', 'accounting', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, [new Tag(1, "Accounting")]),
	new Report(55, 'CoStar Match Report', 'Analyze Matched CoStar Locations', 'portfolio', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(56, 'Active Aquisition Projects', 'reportdescription', 'project', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(57, 'Project Pipeline Report', 'reportdescription', 'project', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	new Report(58, 'Weekly WIP Report', 'reportdescription', 'project', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false, []),
	// new Report(58, 'reportname', 'reportdescription', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false),
	// new Report(59, 'reportname', 'reportdescription', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false),
	// new Report(60, 'reportname', 'reportdescription', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false),
	// new Report(61, 'reportname', 'reportdescription', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false),
	// new Report(62, 'reportname', 'reportdescription', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false),
	// new Report(63, 'reportname', 'reportdescription', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false),
	// new Report(64, 'reportname', 'reportdescription', 'financial', 'Shared', null, 'No', 'CoStar', 0, null, null, null, false),

];
