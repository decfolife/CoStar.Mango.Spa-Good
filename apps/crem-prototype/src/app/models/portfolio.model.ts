export class Portfolio {
    id : number;
	name : string;
	propertyCount : Number;	
	leaseCount : Number;
	projectCount : Number;
	scheduleCount : number;
	status : string;	
	lastModified : string

	constructor( id, name, propertyCount, leaseCount, projectCount, scheduleCount, status, lastModified ) {
		this.id = id;
		this.name = name;
		this.propertyCount = propertyCount;	
		this.leaseCount = leaseCount;
		this.projectCount = projectCount;
		this.scheduleCount = scheduleCount;
		this.status = status;
		this.lastModified = lastModified;
	}
}

export let portfolios : Portfolio[] = [
	new Portfolio(1, 'RE Portfolio', 141, 93, 0, 7512, 'Active', '2019-12-11'),
	new Portfolio(2, 'EQ Portfolio', 6, 41, 0, 532, 'Active', '2019-12-11'),
];