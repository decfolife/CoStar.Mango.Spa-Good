export class LeaseDocumentIndex {
    id : Number;
    leaseId : Number;
    type : String;
	description : String;
	executionDate : string;
	effectiveDate : string;
	comments : string;
	
	constructor(id,leaseId,type,description,executionDate,effectiveDate,comments) {
		this.id = id;
		this.leaseId = leaseId;
		this.type = type;
		this.description = description;
		this.executionDate = executionDate;
		this.effectiveDate = effectiveDate;
		this.comments = comments;
	}
}

export let leaseDocumentIndexes : LeaseDocumentIndex[] = [	
	new LeaseDocumentIndex(1, 143, "Amendment", "1st Amend", "05/28/2020", "05/28/2020", "First Amendment to Lease between Wilcox 2015, LLC (LL) and Caliber Bodyworks, Inc. (T)."),
	new LeaseDocumentIndex(1, 143, "Letter Agreement", "Lease Extension Agreement", "01/31/2020", "05/01/2020", "Lease extended for 2 months (5/1/2020 - 6/30/2020) at current rent."),
	new LeaseDocumentIndex(1, 143, "Letter Agreement", "Lease Extension Agreement", "10/01/2019", "02/01/2020", "Lease extended for 3 months (2/1/2020 - 4/30/2020) at current Rent."),
	new LeaseDocumentIndex(1, 143, "Letter Agreement", "Ltr Agmt 9/25/17", "09/25/2017", "09/25/2017", "Extension of Term 2/1/18 - 1/31/19 at CPI increase over current Base Rent of $10,303.25/month."),
	new LeaseDocumentIndex(1, 143, "Letter Agreement", "Ltr Agmt 11/30/16", "11/30/2016", "11/30/2015", "Exercise of Renewal option 2/1/17 - 1/31/18."),
	new LeaseDocumentIndex(1, 143, "Letter Agreement", "Ltr Agmt 6/3/15", "06/03/2015", "06/03/2015", "Exercise of Renewal option 2/1/16- 1/31/17."),
	new LeaseDocumentIndex(1, 143, "Letter Agreement", "Ltr Agmt 10/6/14", "10/06/2014", "10/06/2014", "Exercise of Renewal option 2/1/15- 1/31/16."),
	new LeaseDocumentIndex(1, 143, "Lease", "Lease", "11/01/2013", "11/01/2013", "Air Commercial Real Estate Association Standard Industrial/ Commercial Single Tenant Lease --NET between Wilcox 2015, LLC (LL) and Caliber Bodyworks Inc. (T)."),
	new LeaseDocumentIndex(1, 143, "Letter Agreement", "Ltr Agmt 11/1/13", "11/01/2013", "11/01/2013", "Exercise of Renewal option 2/1/14- 1/31/15."),
	new LeaseDocumentIndex(1, 143, "Letter", "Ltr 1/30/02", "01/30/2002", "01/30/2002", "Notice of intent to increase rent due to usage."),
];



