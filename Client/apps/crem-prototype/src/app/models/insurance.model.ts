export class Insurance {
    id : number;
	date : string;
	premiumClassification : string;	
	buildingInsurableValue : number;
	contentsInsurableValue : number;
	inventoryInsurableValue : number;
	businessInterruptionValue : number;
	totalInsurableValue : number;
	additionalReinsurance : number;
	policyNumber : string;
	policyExpirationDate : string;
	insuranceCompany : string;
	insuranceOccupancy : number;

	constructor( id, date, premiumClassification, buildingInsurableValue, contentsInsurableValue, inventoryInsurableValue, businessInterruptionValue, totalInsurableValue, additionalReinsurance, policyNumber, policyExpirationDate, insuranceCompany, insuranceOccupancy ) {
		this.id = id;
		this.date = date;
		this.premiumClassification = premiumClassification;	
		this.buildingInsurableValue = buildingInsurableValue;
		this.contentsInsurableValue = contentsInsurableValue;
		this.inventoryInsurableValue = inventoryInsurableValue;
		this.businessInterruptionValue = businessInterruptionValue; 
		this.totalInsurableValue = totalInsurableValue;
		this.additionalReinsurance = additionalReinsurance;
		this.policyNumber = policyNumber; 
		this.policyExpirationDate = policyExpirationDate;
		this.insuranceCompany = insuranceCompany;
		this.insuranceOccupancy = insuranceOccupancy;
	}
}

export let insurance : Insurance[] = [
	new Insurance(1, '2012-03-01', '', 20000000, 5000000, 1000000, 3000000, 29000000, 0, '8900732-08-23-GA-101', '2013-02-28', 'State Farm', 1900)
];