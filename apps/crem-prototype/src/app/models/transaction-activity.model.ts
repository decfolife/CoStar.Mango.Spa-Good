export class TransactionActivity {
    id : number;
    projectId : Number;
	activityType : String;
	performedBy : String;
	performedDate : String;
    performedTime : string;
	description : String;
    parentActivityId : number;
    initials : string;
    replies : TransactionActivity[];

	constructor( id, projectId, activityType, performedBy, performedDate, performedTime, description, parentActivityId, replies ) {
		this.id = id;
		this.projectId = projectId;
		this.activityType = activityType;
		this.performedBy = performedBy;
		this.performedTime = performedTime;
		this.performedDate = performedDate;
		this.description = description;
        this.parentActivityId = parentActivityId;
        this.replies = replies;
        this.initials = performedBy.charAt(0) + performedBy.charAt(performedBy.indexOf(" ") + 1);
	}
}
 

export let transactionActivities : TransactionActivity[] = [
	// ( id, projectId, activityType, performedBy, projectName, projectType, performedDate, description )
	new TransactionActivity(1, 13, "Task Completed", "Kent Carpenter", "2021-11-01", "8:43 AM", '<p>Kent Carpenter completed the task <span class="dx-mention" spellcheck="false" data-marker="#" data-mention-value="Deliver Lease to Landlord for Execution" data-id="547189">#<span contenteditable="false"><span></span>Deliver Lease to Landlord for Execution</span></span>.</p>', 0, []), 
	new TransactionActivity(2, 13, "File Uploaded", "Kent Carpenter", "2021-11-02", "9:15 AM", "Kent Carpenter uploaded a file <b>'Atlanta Construction Analysis.pdf'</b>.", 0, []),
    new TransactionActivity(3, 13, "Message", "Jason Trkovsky", "2021-11-02", "9:15 AM", "Why is this project taking so long?", 0, [
        new TransactionActivity(4, 13, "Message", "Patrick Griffith", "2021-11-02", "9:18 AM", "We're behind primarily on account of the site analysis being delayed by 3 weeks ", 3, []),
        new TransactionActivity(5, 13, "Message", "Kent Carpenter", "2021-11-02", "12:32 PM", "We should be able to expedite some of the remaining tasks to get back on track.", 3, []),
        new TransactionActivity(6, 13, "Message", "Patrick Griffith", "2021-11-02", "12:33 PM", '<p><span class="dx-mention" spellcheck="false" data-marker="@" data-mention-value="Patrick Griffith" data-id="11">﻿<span contenteditable="false"><span>@</span>Patrick Griffith</span>﻿</span> asdfasdf asdf</p>', 3, []),
    ]),
    // new TransactionActivity(4, 13, "Message", "Patrick Griffith", "2021-11-02", "9:18 AM", "We're behind primarily on account of the site analysis being delayed by 3 weeks ", 3, []),
	// new TransactionActivity(1, 13, "Status Updated", "Dan Galenkamp", "Arch Street", "Renewal", "5h", "updated the status to On Track"),
	// new TransactionActivity(2, 13, "Milestone Achieved", "Kent Carpenter", "Arch Street", "Renewal", "6h", "achieved milestone: Project Definition."),
	// new TransactionActivity(1, 13, "Task Overdue", "Elyse Jupiter", "Terminus", "Relocation", "7h", "'Site Analysis' task has become overdue."),
	// new TransactionActivity(2, 13, "Project Completed", "Anne Martinez", "Terminus", "Relocation", "5d", "completed Terminus Relocation project on June 20, 2020."),
	// new TransactionActivity(1, 13, "Project Past Due", "Patrick Griffith", "Indy Financial Center", "New Lease", "5d", "Indy Financial Center New Lease project is past due."),
	// new TransactionActivity(2, 13, "File Uploaded", "Michael Curtis", "Vegas", "Acquisition", "5d", "uploaded a file 'Vegas Site Shortlist.pdf'."),
	// new TransactionActivity(1, 13, "Task Completed", "Michael Curtis", "Vegas", "Acquisition", "5d", "completed the task 'Site Analysis'."),
	// new TransactionActivity(2, 13, "Note Added", "Scott Secor", "Vegas", "Acquisition", "5d", "added a note:  'Have emailed the Chamber of Commerce'."),
	// new TransactionActivity(1, 13, "Status Updated", "Dan Galenkamp", "Phipps Tower", "Renewal", "5d", "updated the status to Behind Schedule."),


];