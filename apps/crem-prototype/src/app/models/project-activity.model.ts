export class ProjectActivity {
    id : number;
    projectId : Number;
	activityType : String;
	performedBy : String;
	projectName : String
	projectType : String;
	performedDate : String;
	description : String;

	constructor( id, projectId, activityType, performedBy, projectName, projectType, performedDate, description ) {
		this.id = id;
		this.projectId = projectId;
		this.activityType = activityType;
		this.performedBy = performedBy;
		this.projectName = projectName;
		this.projectType = projectType;
		this.performedDate = performedDate;
		this.description = description;
	}
}
 

export let projectActivities : ProjectActivity[] = [
	// ( id, projectId, activityType, performedBy, projectName, projectType, performedDate, description )
	new ProjectActivity(1, 1, "Task Completed", "Jason Trkovsky", "Atlanta Office", "Construction", "5m", "completed the task 'Perform Analysis'."),
	new ProjectActivity(2, 1, "File Uploaded", "Jason Trkovsky", "Atlanta Office", "Construction", "5m", "uploaded a file 'Atlanta Construction Analysis.pdf'."),
	new ProjectActivity(1, 1, "Status Updated", "Dan Galenkamp", "Arch Street", "Renewal", "5h", "updated the status to On Track"),
	new ProjectActivity(2, 1, "Milestone Achieved", "Kent Carpenter", "Arch Street", "Renewal", "6h", "achieved milestone: Project Definition."),
	new ProjectActivity(1, 1, "Task Overdue", "Elyse Jupiter", "Terminus", "Relocation", "7h", "'Site Analysis' task has become overdue."),
	new ProjectActivity(2, 1, "Project Completed", "Anne Martinez", "Terminus", "Relocation", "5d", "completed Terminus Relocation project on June 20, 2020."),
	new ProjectActivity(1, 1, "Project Past Due", "Patrick Griffith", "Indy Financial Center", "New Lease", "5d", "Indy Financial Center New Lease project is past due."),
	new ProjectActivity(2, 1, "File Uploaded", "Michael Curtis", "Vegas", "Acquisition", "5d", "uploaded a file 'Vegas Site Shortlist.pdf'."),
	new ProjectActivity(1, 1, "Task Completed", "Michael Curtis", "Vegas", "Acquisition", "5d", "completed the task 'Site Analysis'."),
	new ProjectActivity(2, 1, "Note Added", "Scott Secor", "Vegas", "Acquisition", "5d", "added a note:  'Have emailed the Chamber of Commerce'."),
	new ProjectActivity(1, 1, "Status Updated", "Dan Galenkamp", "Phipps Tower", "Renewal", "5d", "updated the status to Behind Schedule."),
	new ProjectActivity(2, 1, "Project At Risk", "Kent Carpenter", "Phipps Tower", "Renewal", "5d", "Phipps Tower Renewal project is At Risk."),
	new ProjectActivity(1, 1, "Task Completed", "Elyse Jupiter", "Infinite Loop", "Construction", "5d", "completed the task 'Vendor Shortlist'."),
	new ProjectActivity(2, 1, "Task Completed", "David Perrins", "Infinite Loop", "Construction", "5d", "uploaded a file 'Infinite Loop Construction Analysis.pdf'."),
	new ProjectActivity(1, 1, "File Uploaded", "David Perrins", "Infinite Loop", "Constructions", "5d", "completed the task 'Perform Analysis'."),
	new ProjectActivity(2, 1, "Milestone Achieved", "Jason Trkovsky", "Palo Alto", "Renovation", "5d", "achieved milestone: Construction Complete."),
	new ProjectActivity(1, 1, "Target End Date Changed", "Jason Trkovsky", "Palo Alto", "Renovation", "5d", "modified the target project end date to July 8, 2020."),
	new ProjectActivity(2, 1, "Project Past Due", "Melanie Coggen", "Austin HQ", "Renewal", "5d", "Austin HQ Renewal project is past due."),
	new ProjectActivity(1, 1, "Status Updated", "Patrick Griffith", "Vegas", "Acquisition", "5d", "updated the status to On Track."),
	new ProjectActivity(2, 1, "Project Completed", "Elyse Jupiter", "Bubb 8", "Disposition", "5d", "completed Bubb 8 Disposition project on June 1, 2020."),
	new ProjectActivity(1, 1, "Task Completed", "Anne Martinez", "Bubb 8", "Disposition", "5d", "completed the task 'Project Closeout'."),
	new ProjectActivity(2, 1, "Milestone Achieved", "Melanie Coggen", "Indy Financial Center", "New Lease", "5d", "achieved milestone: Lease Signed."),
	new ProjectActivity(1, 1, "Task Overdue", "Jason Trkovsky", "Clearwater", "Renewal", "5d", "'Review Lease' task has become overdue."),
	new ProjectActivity(2, 1, "File Uploaded", "Jason Trkovsky", "Clearwater", "Renewal", "5d", "uploaded a file 'LL Lease Proposal - Clearwater.pdf'."),
	new ProjectActivity(1, 1, "Status Updated", "Dan Galenkamp", "Appleton", "Renewal", "5d", "update the status to On Track."),
	new ProjectActivity(2, 1, "Note Added", "Kent Carpenter", "Appleton", "Renewal", "5d", "added a note: 'This is my most favorite project.  The team is crushing it.'"),
];