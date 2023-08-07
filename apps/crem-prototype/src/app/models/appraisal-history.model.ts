export class AppraisalHistory {
    id : number;
	appraisalDate : string;
	appraisalValue : number;	
	appraisalFee : number;
	appraisalCompany : string;
	appraisalCurrency : string;
	notes : string;

	constructor( id, appraisalDate, appraisalValue, appraisalFee, appraisalCompany, appraisalCurrency, notes ) {
		this.id = id;
		this.appraisalDate = appraisalDate;
		this.appraisalValue = appraisalValue;	
		this.appraisalFee = appraisalFee;
		this.appraisalCompany = appraisalCompany;
		this.appraisalCurrency = appraisalCurrency;
		this.notes = notes;
	}
}

export let appraisalHistory : AppraisalHistory[] = [
	new AppraisalHistory(1, '2017-01-01', 100, 500, 'sdf', 'Afghan Afghani', 'dabes'),
	new AppraisalHistory(2, '2011-09-02', 15605000, 2400, 'Oglethorpe and Cannon', 'United States Dollar', 'Reappraised per taxing authority requirements'),
	new AppraisalHistory(3, '2010-05-15', 20110500, 1600, 'Jackson and Cooksey Appraisals', 'United States Dollar', 'Special appraisal to dispute tax assessment'),
];