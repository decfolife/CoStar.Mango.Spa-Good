export class Milestone {
    id : number;
    projectId : number;
	name : string;
	status : string;	
	targetDate : string;


	constructor( id, projectId, name, status, targetDate ) {
		this.id = id;
		this.projectId = projectId;
		this.name = name;
		this.status = status;	
		this.targetDate = targetDate;
	}
}

export let projectMilestones : Milestone[] = [
	new Milestone(1, 3, "Approve PAF", "Complete", "6/1/2020"),
	new Milestone(2, 3, "Approve Marketing", "Complete", "6/20/2020"),
	new Milestone(3, 3, "Market Analysis", "Late", "6/25/2020"),
	new Milestone(4, 3, "Engage Resource", "Behind Schedule", "7/1/2020"),
	new Milestone(5, 3, "Negotiate Lease", "Ongoing", "7/20/2020"),
	new Milestone(6, 3, "Sign Lease", "Upcoming", "8/1/2020"),
	new Milestone(7, 3, "Close Out", "Upcoming", "8/15/2020"),

	new Milestone(1, 7, "Approve PAF", "Complete", "6/1/2020"),
	new Milestone(2, 7, "Approve Marketing", "Complete", "6/20/2020"),
	new Milestone(3, 7, "Market Analysis this is a really long task name to test how some user experience works", "Late", "6/25/2020"),
	new Milestone(4, 7, "Engage Resource", "Behind Schedule", "7/1/2020"),
	new Milestone(5, 7, "Negotiate Lease", "Behind Schedule", "7/20/2020"),
	new Milestone(6, 7, "Sign Lease", "Upcoming", "8/1/2020"),
	new Milestone(7, 7, "Close Out", "Upcoming", "8/15/2020"),

	new Milestone(1, 8, "Approve PAF", "Complete", "6/1/2020"),
	new Milestone(2, 8, "Approve Marketing", "Complete", "6/20/2020"),
	new Milestone(3, 8, "Market Analysis", "Complete", "6/25/2020"),
	new Milestone(4, 8, "Engage Resource", "Behind Schedule", "7/1/2020"),
	new Milestone(5, 8, "Negotiate Lease", "Ongoing", "7/20/2020"),
	new Milestone(6, 8, "Sign Lease", "Upcoming", "8/1/2020"),
	new Milestone(7, 8, "Close Out", "Upcoming", "8/15/2020"),

	new Milestone(1, 9, "Approve PAF", "Complete", "6/1/2020"),
	new Milestone(2, 9, "Approve Marketing", "Complete", "6/20/2020"),
	new Milestone(3, 9, "Market Analysis", "Late", "6/25/2020"),
	new Milestone(4, 9, "Engage Resource", "Late", "7/1/2020"),
	new Milestone(5, 9, "Negotiate Lease", "Late", "7/20/2020"),
	new Milestone(6, 9, "Sign Lease", "Upcoming", "8/1/2020"),
	new Milestone(7, 9, "Close Out", "Upcoming", "8/15/2020"),

	new Milestone(1, 10, "Approve PAF", "Complete", "6/1/2020"),
	new Milestone(2, 10, "Approve Marketing", "Complete", "6/20/2020"),
	new Milestone(3, 10, "Market Analysis", "Behind Schedule", "6/25/2020"),
	new Milestone(4, 10, "Engage Resource", "Ongoing", "7/1/2020"),
	new Milestone(5, 10, "Negotiate Lease", "Ongoing", "7/20/2020"),
	new Milestone(6, 10, "Sign Lease", "Upcoming", "8/1/2020"),
	new Milestone(7, 10, "Close Out", "Upcoming", "8/15/2020"),

	new Milestone(1, 12, "Approve PAF", "Complete", "6/1/2020"),
	new Milestone(2, 12, "Approve Marketing", "Complete", "6/20/2020"),
	new Milestone(3, 12, "Market Analysis", "Complete", "6/25/2020"),
	new Milestone(4, 12, "Engage Resource", "Complete", "7/1/2020"),
	new Milestone(5, 12, "Negotiate Lease", "Ongoing", "7/20/2020"),
	new Milestone(6, 12, "Sign Lease", "Upcoming", "8/1/2020"),
	new Milestone(7, 12, "Close Out", "Upcoming", "8/15/2020"),

	new Milestone(1, 13, "Approve PAF", "Complete", "6/1/2020"),
	new Milestone(2, 13, "Approve Marketing", "Complete", "6/20/2020"),
	new Milestone(3, 13, "Market Analysis", "Behind Schedule", "6/25/2020"),
	new Milestone(4, 13, "Engage Resource", "Behind Schedule", "7/1/2020"),
	new Milestone(5, 13, "Negotiate Lease", "Upcoming", "7/20/2020"),
	new Milestone(6, 13, "Sign Lease", "Upcoming", "8/1/2020"),
	new Milestone(7, 13, "Close Out", "Upcoming", "8/15/2020"),

	new Milestone(1, 14, "Approve PAF", "Complete", "6/1/2020"),
	new Milestone(2, 14, "Approve Marketing", "Complete", "6/20/2020"),
	new Milestone(3, 14, "Market Analysis", "Complete", "6/25/2020"),
	new Milestone(4, 14, "Engage Resource", "Complete", "7/1/2020"),
	new Milestone(5, 14, "Negotiate Lease", "Ongoing", "7/20/2020"),
	new Milestone(6, 14, "Sign Lease", "Upcoming", "8/1/2020"),
	new Milestone(7, 14, "Close Out", "Upcoming", "8/15/2020"),

	new Milestone(1, 15, "Approve PAF", "Complete", "6/1/2020"),
	new Milestone(2, 15, "Approve Marketing", "Complete", "6/20/2020"),
	new Milestone(3, 15, "Market Analysis", "Late", "6/25/2020"),
	new Milestone(4, 15, "Engage Resource", "Late", "7/1/2020"),
	new Milestone(5, 15, "Negotiate Lease", "Ongoing", "7/20/2020"),
	new Milestone(6, 15, "Sign Lease", "Upcoming", "8/1/2020"),
	new Milestone(7, 15, "Close Out", "Upcoming", "8/15/2020"),

	new Milestone(1, 16, "Approve PAF", "Complete", "6/1/2020"),
	new Milestone(2, 16, "Approve Marketing", "Complete", "6/20/2020"),
	new Milestone(3, 16, "Market Analysis", "Complete", "6/25/2020"),
	new Milestone(4, 16, "Engage Resource", "Complete", "7/1/2020"),
	new Milestone(5, 16, "Negotiate Lease", "Complete", "7/20/2020"),
	new Milestone(6, 16, "Sign Lease", "Ongoing", "8/1/2020"),
	new Milestone(7, 16, "Close Out", "Upcoming", "8/15/2020"),

	new Milestone(1, 17, "Approve Plan", "Complete", "6/1/2020"),
	new Milestone(2, 17, "Select Vendor", "Complete", "6/20/2020"),
	new Milestone(3, 17, "Demolition", "Complete", "6/25/2020"),
	new Milestone(4, 17, "Construction", "Late", "7/1/2020"),
	new Milestone(5, 17, "Move In", "Upcoming", "7/20/2020"),
	new Milestone(7, 17, "Close Out", "Upcoming", "8/15/2020"),

	new Milestone(1, 18, "Approve Plan", "Complete", "6/1/2020"),
	new Milestone(2, 18, "Select Vendor", "Complete", "6/20/2020"),
	new Milestone(3, 18, "Demolition", "Complete", "6/25/2020"),
	new Milestone(4, 18, "Construction", "Complete", "7/1/2020"),
	new Milestone(5, 18, "Move In", "Ongoing", "7/20/2020"),
	new Milestone(7, 18, "Close Out", "Upcoming", "8/15/2020"),
];