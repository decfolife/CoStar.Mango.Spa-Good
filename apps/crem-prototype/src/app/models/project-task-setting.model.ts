export class ProjectTaskSetting {
    projectId : Number;
	startDate : String;
	dueDate : String;
	calculateDates : Boolean;
	calculateBy : String;
	autoCalculate : Boolean;
	shiftTimeline : Boolean;
    trackHours : Boolean;
    trackActualStart : Boolean;

	constructor( projectId, startDate, dueDate, calculateDates, calculateBy, autoCalculate, shiftTimeline, trackHours, trackActualStart ) {
		this.projectId = projectId;
		this.startDate = startDate;
		this.dueDate = dueDate;
		this.calculateDates = calculateDates;
		this.calculateBy = calculateBy;
		this.autoCalculate = autoCalculate;
		this.shiftTimeline = shiftTimeline;
        this.trackHours = trackHours;
        this.trackActualStart = trackActualStart;
	}
}
 

export let projectTaskSettings : ProjectTaskSetting[] = [
	new ProjectTaskSetting(13, "3/5/2019", "7/9/2020", true, "Calendar Days", false, false, false, false),
];