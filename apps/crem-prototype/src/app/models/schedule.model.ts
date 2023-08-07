export class AccountingSchedule {
    id : Number;
	leaseID : Number;	
	classification : String;
	amortizationProfile : String;
	status : String;
	
	constructor( id,leaseID,classification,amortizationProfile,status) {
		this.id = id;
		this.leaseID = leaseID;
		this.classification = classification;
		this.amortizationProfile = amortizationProfile;		
		this.status = status;
	}
}