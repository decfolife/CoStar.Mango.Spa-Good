export class PortfolioProjectSettings {
    id : number;
    portfolio : string;
	projectStyle : string;
	hasSamePhasesForAllProjectTypes : boolean;
	hasSameSettingsForAllProjectTypes : boolean;
	requireTaskDueDates : boolean;
	requirePhaseDueDates : boolean;
	requireTaskAssignee : boolean;
	anyTeamMemberCanCompleteTassks : boolean;
	anyTeamMemberCanChangePhase : boolean;
	autoCompleteTasksWhenChangingPhase : boolean;
	requireAllTasksCompleteBeforeChangingPhase : boolean;
	requireTaskCompletionComment : boolean;
	requirePhaseCompletionComment : boolean;

	constructor( id, portfolio, projectStyle, hasSamePhasesForAllProjectTypes, hasSameSettingsForAllProjectTypes, requireTaskDueDates, requirePhaseDueDates, requireTaskAssignee, anyTeamMemberCanCompleteTassks, anyTeamMemberCanChangePhase, autoCompleteTasksWhenChangingPhase, requireAllTasksCompleteBeforeChangingPhase, requireTaskCompletionComment, requirePhaseCompletionComment ) {
		this.id = id;
		this.portfolio = portfolio;
		this.projectStyle = projectStyle;
		this.hasSamePhasesForAllProjectTypes = hasSamePhasesForAllProjectTypes;
		this.hasSameSettingsForAllProjectTypes = hasSameSettingsForAllProjectTypes;
		this.requireTaskDueDates = requireTaskDueDates;
		this.requirePhaseDueDates = requirePhaseDueDates;
		this.requireTaskAssignee = requireTaskAssignee;
		this.anyTeamMemberCanCompleteTassks = anyTeamMemberCanCompleteTassks;
		this.anyTeamMemberCanChangePhase = anyTeamMemberCanChangePhase;
		this.autoCompleteTasksWhenChangingPhase = autoCompleteTasksWhenChangingPhase;
		this.requireAllTasksCompleteBeforeChangingPhase = requireAllTasksCompleteBeforeChangingPhase;
		this.requireTaskCompletionComment = requireTaskCompletionComment;
		this.requirePhaseCompletionComment = requirePhaseCompletionComment;		
	}
}
 
export let portfolioProjectSettings : PortfolioProjectSettings[] = [
	new PortfolioProjectSettings(1, "ADT", "Kanban", false, false, false, false, false, false, false, false, false, false, false),
	new PortfolioProjectSettings(1, "ADT", "Waterfall", false, true, false, false, false, false, false, false, false, false, false),
	new PortfolioProjectSettings(1, "Amazon", "Kanban", false, true, false, false, false, false, false, false, false, false, false),
	new PortfolioProjectSettings(1, "Amazon", "Waterfall", false, true, false, false, false, false, false, false, false, false, false),
];

