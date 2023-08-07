export class PortfolioProjectType {
    id : number;
    portfolioProjectSettingsId : number;
	projectType : string;
    allowPhaseCompletionWithoutAllTasksComplete : boolean;
    autoCompleteTasksOnPhaseCompletion : boolean;
    requireApprovalNotes : boolean;
    calculateDates : boolean;
    calculateDatesFrom : string;    

	constructor( id, portfolioProjectSettingsId, projectType, allowPhaseCompletionWithoutAllTasksComplete, autoCompleteTasksOnPhaseCompletion, requireApprovalNotes, calculateDates, calculateDatesFrom ) {
		this.id = id;
		this.portfolioProjectSettingsId = portfolioProjectSettingsId;
		this.projectType = projectType;
        this.allowPhaseCompletionWithoutAllTasksComplete = allowPhaseCompletionWithoutAllTasksComplete;
        this.autoCompleteTasksOnPhaseCompletion = autoCompleteTasksOnPhaseCompletion;
        this.requireApprovalNotes = requireApprovalNotes;
        this.calculateDates = calculateDates;
        this.calculateDatesFrom = calculateDatesFrom;
	}
}
 

export let portfolioProjectTypes : PortfolioProjectType[] = [
	new PortfolioProjectType(1, 1, "Acquisition", true, true, false, true, null),
    new PortfolioProjectType(2, 1, "Renewal", true, true, false, true, null),
    new PortfolioProjectType(3, 1, "Disposition", true, true, false, true, null),
    new PortfolioProjectType(4, 1, "Construction", true, true, false, true, null),
    new PortfolioProjectType(5, 1, "Relocation", true, true, false, true, null),
    new PortfolioProjectType(6, 3, "Acquisition", true, true, false, true, null),
    new PortfolioProjectType(7, 3, "Renewal", true, true, false, true, null),
    new PortfolioProjectType(8, 3, "Disposition", true, true, false, true, null),
    new PortfolioProjectType(9, 3, "Construction", true, true, false, true, null),
    new PortfolioProjectType(10, 3, "Relocation", true, true, false, true, null),
];