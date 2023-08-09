import { TaskApprover } from './task-approver.model';

export class Task {
    id : Number;
    taskName : String;
	dueDate : String;
	taskAdded : String;
	projectId : Number;
	projectName : String;
	projectType : String;
	projectStatus : String;
	projectManager : String;
	projectDueDate : String;
	isNew : Boolean;
	isDueSoon : Boolean;
	isOverdue : Boolean;
	assignee : string;
	note : string;
	step : number;
	parentTaskId : number;
	isMilestone : Boolean;
	isRequired : Boolean;
	completeDate : String;
	targetStart : String;
	actualStart : String;
	indexOrder : number;
	fileCount : number;
	noteCount : number;
	isShrinkable : Boolean;
	isConcurrent : Boolean; 
	allowEmailApproval : Boolean;
	percentComplete : number;
	triggerStatus : string;
	description : string; 
	duration : number;
	approvals : string;
	predecessor : string;
	hoursToDate : number;
	approvers : TaskApprover[];
	subTasksComplete : number;
	subTasksIncomplete : number;
	subTaskCompletePct : number;

	constructor(id,taskName,dueDate,taskAdded,projectId,projectName,projectType,projectStatus,projectManager,projectDueDate, isNew, isDueSoon, isOverdue, assignee, note, step, parentTaskId, isMilestone, isRequired, completeDate, targetStart, actualStart, indexOrder, fileCount, noteCount, isShrinkable, isConcurrent, allowEmailApproval, percentComplete, triggerStatus, description, duration, approvals, predecessor, hoursToDate, approvers, subTasksComplete, subTasksIncomplete, subTaskCompletePct ) {
		this.id = id;
		this.taskName = taskName;
		this.dueDate = dueDate;
		this.taskAdded = taskAdded;
		this.projectId = projectId;
		this.projectName = projectName;	
		this.projectType = projectType;
		this.projectStatus = projectStatus;	
		this.projectManager = projectManager;
		this.projectDueDate = projectDueDate;
		this.isNew = isNew;
		this.isDueSoon = isDueSoon;
		this.isOverdue = isOverdue;
		this.assignee = assignee;
		this.note = note;
		this.step = step;
		this.parentTaskId = parentTaskId;
		this.isMilestone = isMilestone;
		this.isRequired = isRequired;
		this.completeDate = completeDate;
		this.targetStart = targetStart;
		this.actualStart = actualStart;
		this.indexOrder = indexOrder;
		this.fileCount = fileCount;
		this.noteCount = noteCount;
		this.isShrinkable = isShrinkable;
		this.isConcurrent = isConcurrent;
		this.allowEmailApproval = allowEmailApproval;
		this.percentComplete = percentComplete;
		this.triggerStatus = triggerStatus;
		this.description = description;
		this.duration = duration;
		this.approvals = approvals;
		this.predecessor = predecessor;
		this.hoursToDate = hoursToDate;
		this.approvers = approvers;
		this.subTasksComplete = subTasksComplete;
		this.subTasksIncomplete = subTasksIncomplete;
		this.subTaskCompletePct = subTaskCompletePct;

	}
}

export let tasks : Task[] = [
	// new Task(id,taskName,dueDate,taskAdded,projectId,projectName,projectType,projectStatus,projectManager,projectDueDate, isNew, isDueSoon, isOverdue, assignee, 0, null, null, null, null),
	new Task(1,"Submit PIF - Project Initiation Form","5/31/2020","5/19/2020",3,"USA-GA-Atlanta Renewal","Renewal","Active","John Hancock","8/9/2020", true, true, true, 'Jason Trkovsky', null, 2.1, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(2,"Prepare Market Survey","6/15/2020","5/19/2020",3,"USA-GA-Atlanta Renewal","Renewal","Active","John Hancock","8/9/2020", true, false, false, 'Jason Trkovsky', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(3,"Develop Short List of Properties","6/20/2020","5/19/2020",3,"USA-GA-Atlanta Renewal","Renewal","Active","John Hancock","8/9/2020", true, false, false, 'Jason Trkovsky', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(4,"Submit PIF - Project Initiation Form","5/31/2020","5/19/2020",7,"USA-IL-Chicago-Renewal","Renewal","Active","John Hancock","8/9/2020", true, true, true, 'Jason Trkovsky', null, 2.1, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(5,"Prepare Market Survey","6/15/2020","5/19/2020",7,"USA-IL-Chicago-Renewal","Renewal","Active","John Hancock","8/9/2020", true, false, false, 'Jason Trkovsky', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(6,"Develop Short List of Properties","6/20/2020","5/19/2020",7,"USA-IL-Chicago-Renewal","Renewal","Active","John Hancock","8/9/2020", true, false, false, 'Jason Trkovsky', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(7,"Conduct Site Analysis","6/01/2020","5/19/2020",7,"Atlanta Office","Construction","Active","John Hancock","8/9/2020", false, false, true, 'Jason Trkovsky', null, 4, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(8,"Conduct Site Analysis","6/02/2020","5/19/2020",7,"Arch Street","Renewal","Active","John Hancock","8/9/2020", false, false, true, 'Kent Carpenter', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(9,"Conduct Site Analysis","6/03/2020","5/19/2020",7,"Terminus","Relocation","Active","John Hancock","8/9/2020", false, false, true, 'Patrick Griffith', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(10,"Conduct Site Analysis","6/04/2020","5/19/2020",7,"Indy Financial Center","New Lease","Active","John Hancock","8/9/2020", false, false, true, 'Dan Galenkamp', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(11,"Conduct Site Analysis","6/05/2020","5/19/2020",7,"Vegas","Acquisition","Active","John Hancock","8/9/2020", false, false, true, 'Elyse Jupiter', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(12,"Conduct Site Analysis","6/06/2020","5/19/2020",7,"USA-IL-Chicago-Renewal","Renewal","Active","John Hancock","8/9/2020", false, false, true, 'Anne Martinez', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(13,"Conduct Site Analysis","6/07/2020","5/19/2020",7,"USA-IL-Chicago-Renewal","Renewal","Active","John Hancock","8/9/2020", false, false, true, 'David Perrins', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(14,"Conduct Site Analysis","6/08/2020","5/19/2020",7,"USA-IL-Chicago-Renewal","Renewal","Active","John Hancock","8/9/2020", false, false, true, 'Scott Secor', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(15,"Conduct Site Analysis","6/09/2020","5/19/2020",7,"USA-IL-Chicago-Renewal","Renewal","Active","John Hancock","8/9/2020", false, false, true, 'Michael Curtis', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(16,"Conduct Site Analysis","6/10/2020","5/19/2020",7,"USA-IL-Chicago-Renewal","Renewal","Active","John Hancock","8/9/2020", false, false, true, 'Melanie Coggen', null, null, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),
	new Task(17,"Conduct Site Analysis","7/31/2020","5/19/2020",7,"USA-IL-Chicago-Renewal","Renewal","Active","John Hancock","8/9/2020", false, true, false, 'Jason Trkovsky', null, 4, 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),

	new Task(547171,"Phase 1: Project Definition","2019-03-06",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"0","Caitlyn Phillips",null,"1","0",true,true,"2019-03-05","2019-03-05","2019-03-05",1, 2, 3, null, null, null, null, null, null, null, "1 of 1", null, null, [
		new TaskApprover(2, 547171, "Caitlyn Philips", true, false, "3/5/2019", null, null, null, null, null, "Complete", "CP"),
		new TaskApprover(3, 547171, "Jason Trkovsky", true, false, null, null, null, null, null, null, "Complete", "JT"),
	], 1, 0, 100),
	new Task(547172,"Receive PIF from USPS and Assign to TM","2019-03-05",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"0","Caitlyn Phillips",null,"1.1","547171",false,false,"2019-03-05","2019-03-05","2019-03-05",2, 2, 3, null, null, null, null, null, null, null, "1 of 1", null, null, [
		new TaskApprover(4, 547172, "Caitlyn Philips", true, false, "3/5/2019", null, null, null, null, null, "Complete", "CP"),
	], null, null, null),
	new Task(547173,"Phase 2: Implementation","2019-08-05",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"0","Caitlyn Phillips",null,"2","0",true,true,"2019-03-05","2019-03-06","2019-03-05",3, 2, 3, null, null, null, null, null, null, null, "1 of 1", null, null, [
		new TaskApprover(2, 547173, "Caitlyn Philips", true, false, "3/5/2019", null, null, null, null, null, "Complete", "CP"),
		new TaskApprover(3, 547173, "Jason Trkovsky", true, false, null, null, null, null, null, null, "Complete", "JT"),
	], 4, 0, 100),
	new Task(547174,"Run Conflict Check and Communicate with USPS","2019-03-06",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"0","Caitlyn Phillips",null,"2.1","547173",false,false,"2019-03-05","2019-03-06","2019-03-05",4, 2, 3, null, null, null, null, null, null, null, "1 of 1", null, null, [
		new TaskApprover(2, 547173, "Caitlyn Philips", true, false, "3/5/2019", null, null, null, null, null, "Complete", "CP"),
	], null, null, null),
	new Task(547185,"JLL Determines Market Rent Analysis","2019-03-11",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"0","Kasey Hughes",null,"2.2","547173",false,false,"2019-03-11","2019-03-06","2019-03-11",5, 2, 3, null, null, null, null, null, null, null, "1 of 1", null, null, [
		new TaskApprover(2, 547173, "Kasey Hughes", true, false, "3/5/2019", null, null, null, null, null, "Complete", "KH"),
	], null, null, null),
	new Task(547181,"USPS Obtains Appraisal (if applicable)","2019-08-05",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"0","Tiffany Kurniawan",null,"2.3","547173",false,false,"2019-08-05","2019-03-11","2019-08-05",6, 2, 3, null, null, null, null, null, null, null, "1 of 1", null, null, [
		new TaskApprover(2, 547173, "Tiffany Kurniawan", true, false, "3/5/2019", null, null, null, null, null, "Complete", "TK"),
	], null, null, null),
	new Task(547182,"USPS Fair Market Value Determination","2019-08-05",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"0","Tiffany Kurniawan",null,"2.4","547173",false,false,"2019-08-05","2019-08-05","2019-08-05",7, 2, 3, null, null, null, null, null, null, null, "1 of 1", null, null, [
		new TaskApprover(2, 547173, "Tiffany Kurniawan", true, false, "3/5/2019", null, null, null, null, null, "Complete", "TK"),
	], null, null, null),
	new Task(547175,"Phase 3: Negotiation Period","2020-02-17",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"0","Tiffany Kurniawan",null,"3","0",true,true,null,"2019-08-05","2019-08-05",8, 2, 3, null, null, null, null, null, null, null, "1 of 1", null, null, [
		new TaskApprover(2, 547173, "Tiffany Kurniawan", false, false, "3/5/2019", null, null, null, null, null, "Complete", "TK"),
	], 1, 3, 25),
	new Task(547186,"Submit Request for Proposal / Letter of Intent","2019-08-05",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"0","Tiffany Kurniawan",null,"3.1","547175",false,false,"2019-08-05","2019-08-05","2019-08-05",9, 2, 3, null, null, null, null, null, null, null, "1 of 1", null, null, [
		new TaskApprover(2, 547173, "Tiffany Kurniawan", true, false, "3/5/2019", null, null, null, null, null, "Complete", "TK"),
	], null, null, null),
	new Task(547187,"Finalize Terms / Attain Landlord's Best and Final Offer","2019-10-21",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"1","Jake Gibbs",null,"3.2","547175",false,false,null,"2019-08-05",null,10, 2, 3, null, null, null, null, null, null, null, "0 of 1", null, null, [
		new TaskApprover(3, 547171, "Jason Trkovsky", false, false, null, null, null, null, null, null, "Complete", "JT"),
		new TaskApprover(3, 547171, "Geoff Collins", false, false, null, null, null, null, null, null, "Complete", "GC"),
	], null, null, null),
	new Task(547188,"Obtain RES Approval on Lease / RES Email to Proceed","2022-01-06",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,false,"Jake Gibbs",null,"3.3","547175",false,false,null,"2019-10-21",null,11, 2, 3, null, null, null, null, null, null, null, "0 of 1", null, null, [
		new TaskApprover(3, 547171, "Geoff Collins", true, false, null, null, null, null, null, null, "Complete", "GC"),
		new TaskApprover(3, 547171, "Jake Gibbs", false, false, null, null, null, null, null, null, "Complete", "JG"),
	], null, null, null),
	new Task(547189,"Deliver Lease to Landlord for Execution","2022-02-17",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,false,"Jake Gibbs",null,"3.4","547175",false,false,null,"2020-01-06",null,12, 2, 3, null, null, null, null, null, null, null, "0 of 1", null, null, [
		new TaskApprover(3, 547171, "Jake Gibbs", false, false, null, null, null, null, null, null, "Complete", "JG"),
	], null, null, null),
	new Task(547176,"Phase 4: Execution","2020-07-06",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"1","Jake Gibbs",null,"4","0",true,true,null,"2020-02-17",null,13, 2, 3, null, null, null, null, null, null, null, "0 of 1", null, null, [
		new TaskApprover(3, 547171, "Jason Trkovsky", false, false, null, null, null, null, null, null, "Complete", "JT"),
	], 0, 3, 0),
	new Task(547190,"Submit Lease Package to USPS","2020-03-02",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"1","Jake Gibbs",null,"4.1","547176",false,false,null,"2020-02-17",null,14, 2, 3, null, null, null, null, null, null, null, "0 of 1", null, null, [
		new TaskApprover(3, 547171, "Jason Trkovsky", false, false, null, null, null, null, null, null, "Complete", "JT"),
	], null, null, null),
	new Task(547177,"USPS approves Lease package","2020-05-25",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"1","Jake Gibbs",null,"4.2","547176",false,false,null,"2020-03-02",null,15, 2, 3, null, null, null, null, null, null, null, "0 of 1", null, null, [
		new TaskApprover(3, 547171, "Jason Trkovsky", false, false, null, null, null, null, null, null, "Complete", "JT"),
	], null, null, null),
	new Task(547178,"USPS executes Lease","2020-07-06",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"1","Jake Gibbs",null,"4.3","547176",false,false,null,"2020-05-25",null,16, 2, 3, null, null, null, null, null, null, null, "0 of 1", null, null, [
		new TaskApprover(3, 547171, "Jason Trkovsky", false, false, null, null, null, null, null, null, "Complete", "JT"),
	], null, null, null),
	new Task(547179,"Phase 5: Close - Out","2020-07-09",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"1","Jake Gibbs",null,"5","0",true,true,null,"2020-07-06",null,17, 2, 3, null, null, null, null, null, null, null, "0 of 1", null, null, [
		new TaskApprover(3, 547171, "Jason Trkovsky", false, false, null, null, null, null, null, null, "Complete", "JT"),
		new TaskApprover(3, 547171, "Jake Gibbs", false, false, null, null, null, null, null, null, "Complete", "JG"),
		new TaskApprover(2, 547173, "Tiffany Kurniawan", false, false, "3/5/2019", null, null, null, null, null, "Complete", "TK"),
		new TaskApprover(4, 547172, "Caitlyn Philips", false, false, "3/5/2019", null, null, null, null, null, "Complete", "CP"),
	], 0, 3, 0),
	new Task(547180,"Prepare and send commission invoice","2020-07-07",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"1","Jake Gibbs",null,"5.1","547179",false,false,null,"2020-07-06",null,18, 2, 3, null, null, null, null, null, null, null, "0 of 1", null, null, [
		new TaskApprover(3, 547171, "Jason Trkovsky", false, false, null, null, null, null, null, null, "Complete", "JT"),
		new TaskApprover(3, 547171, "Jake Gibbs", false, false, null, null, null, null, null, null, "Complete", "JG"),
	], null, null, null),
	new Task(547183,"Document KPIs (fair market value and lease package quality)","2020-07-08",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"1","Jake Gibbs",null,"5.2","547179",false,false,null,"2020-07-07",null,19, 2, 3, null, null, null, null, null, null, null, "0 of 1", null, null, [
		new TaskApprover(3, 547171, "Jake Gibbs", false, false, null, null, null, null, null, null, "Complete", "JG"),
		new TaskApprover(2, 547173, "Tiffany Kurniawan", false, false, "3/5/2019", null, null, null, null, null, "Complete", "TK"),
	], null, null, null),
	new Task(547184,"Change Transaction Status to Complete in Market","2020-07-09",null,13,"GA, Atlanta, 4707 Ashford Dunwoody Rd (Level 2)","Renewal","Active","Jake Gibbs","2020-07-09",null,null,"1","Jake Gibbs",null,"5.3","547179",false,false,null,"2020-07-08",null,20, 2, 3, null, null, null, null, null, null, null, "0 of 1", null, null, [
		new TaskApprover(4, 547172, "Caitlyn Philips", false, false, "3/5/2019", null, null, null, null, null, "Complete", "CP"),
	], null, null, null),
];



