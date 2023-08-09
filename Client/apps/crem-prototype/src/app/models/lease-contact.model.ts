export class LeaseContact {
    id : Number;
    leaseId : Number;
    role : String;
	companyName : String;
	attentionTo : string;
	email : string;
	relatedParty : string;
	phone1 : string;
	phone2 : string;
	address : string;
	notes : string;
	
	constructor(id,leaseId,role,companyName,attentionTo,email,relatedParty,phone1,phone2,address,notes) {
		this.id = id;
		this.leaseId = leaseId;
		this.role = role;
		this.companyName = companyName;
		this.attentionTo = attentionTo;
		this.email = email;
		this.relatedParty = relatedParty;
		this.phone1 = phone1;
		this.phone2 = phone2;
		this.address = address;
		this.notes = notes;
	}
}

export let leaseContacts : LeaseContact[] = [	
	new LeaseContact(1, 143, "Former LL", "Ascent Media Corporation", "Janet McGrath, Controller", "jmcgrath@monitronics.com", null, "972-277-2648", null, "c/o Monitronics International, Inc. P.O. Box 816288 Dallas, TX 75381 United States", null),
	new LeaseContact(1, 143, "Landlord", "Wilcox 2015, LLC", "Demitri Samaha", "dsamaha@ajkhair.com", null, "323-822-2382", "213-500-8464", "828 Sunset Blvd. Suite 211 West Hollywood CA, 90046", "Additional Contact: Norie Lachica nlachica@ajkhair.com")
];



