export class ProjectTemplate {
	id : Number;
	name : String;
	projectTypes : String;
	isPublic : Boolean;
	createdBy : String;
	createdDate : String;
	lastUsedDate : String;
	isCalendarDays : Boolean;
	isAutoCalc : Boolean;
	emailAutoEmails : Boolean;	
	emailCopyTeam : Boolean;
	emailOnApproval : Boolean;
	emailCopyApprover : Boolean;
	emailOnMilestoneApproval : Boolean;
	emailOnCompletion : Boolean;
	emailIncludeSubTasks : Boolean;
	emailFollowPredecessors : Boolean;
	emailFollowDefaultOrder : Boolean;
	emailOverdueEmails : Boolean;
	emailOnFileUpload : Boolean;
	emailOnStartEmails : Boolean;
	emailTeamOnMilestoneCompletion : Boolean;

	constructor(id, name, projectTypes, isPublic, createdBy, createdDate, lastUsedDate, isCalendarDays, isAutoCalc, emailAutoEmails, emailCopyTeam, emailOnApproval, emailCopyApprover, emailOnMilestoneApproval, emailOnCompletion, emailIncludeSubTasks, emailFollowPredecessors, emailFollowDefaultOrder, emailOverdueEmails, emailOnFileUpload, emailOnStartEmails, emailTeamOnMilestoneCompletion ) {
		this.id = id;
		this.name = name;
		this.projectTypes = projectTypes;
		this.isPublic = isPublic;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.lastUsedDate = lastUsedDate;
		this.isCalendarDays = isCalendarDays;
		this.isAutoCalc = isAutoCalc;
		this.emailAutoEmails = emailAutoEmails;
		this.emailCopyTeam = emailCopyTeam;
		this.emailOnApproval = emailOnApproval;
		this.emailCopyApprover = emailCopyApprover;
		this.emailOnMilestoneApproval = emailOnMilestoneApproval;
		this.emailOnCompletion = emailOnCompletion;
		this.emailIncludeSubTasks = emailIncludeSubTasks;
		this.emailFollowPredecessors = emailFollowPredecessors;
		this.emailFollowDefaultOrder = emailFollowDefaultOrder;		
		this.emailOverdueEmails = emailOverdueEmails;
		this.emailOnFileUpload = emailOnFileUpload;
		this.emailOnStartEmails = emailOnStartEmails;
		this.emailTeamOnMilestoneCompletion = emailTeamOnMilestoneCompletion;
	}
}

export let projectTemplates : ProjectTemplate[] = [
	// (id, name, projectTypes, isPublic, createdBy, createdDate, lastUsedDate, isCalendarDays, isAutoCalc, emailAutoEmails, emailCopyTeam, emailOnApproval, emailCopyApprover, emailOnMilestoneApproval, emailOnCompletion, emailIncludeSubTasks, emailFollowPredecessors, emailFollowDefaultOrder, emailOverdueEmails, emailOnFileUpload, emailOnStartEmails, emailTeamOnMilestoneCompletion )
	new ProjectTemplate(1, 'New Construction', null, true, 'Jason Trkovsky', '3/1/2020', '4/3/2020', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ),
	new ProjectTemplate(2, 'Intrastate Relocation', null, true, 'Jason Trkovsky', '3/1/2020', '4/3/2020', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ),
	new ProjectTemplate(3, 'International Relocation', null, true, 'Jason Trkovsky', '3/1/2020', '4/3/2020', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ),
	new ProjectTemplate(4, 'Lease Renewal', null, true, 'Jason Trkovsky', '3/1/2020', '4/3/2020', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ),
	new ProjectTemplate(5, 'Building Sale', null, true, 'Jason Trkovsky', '3/1/2020', '4/3/2020', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ),
	new ProjectTemplate(6, 'Early Termination', null, true, 'Jason Trkovsky', '3/1/2020', '4/3/2020', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ),
];


 