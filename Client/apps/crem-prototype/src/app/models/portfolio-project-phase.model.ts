import { PortfolioTaskTemplateTask } from './portfolio-task-template-task.model';

export class PortfolioProjectPhase {
    id : number;
    portfolioProjectSettingsId : number;
	phaseName : string;
	sortOrder : number;
    tasks : PortfolioTaskTemplateTask[];

	constructor( id, portfolioProjectSettingsId, phaseName, sortOrder, tasks ) {
		this.id = id;
		this.portfolioProjectSettingsId = portfolioProjectSettingsId;
		this.phaseName = phaseName;
		this.sortOrder = sortOrder;
        this.tasks = tasks;
	}
}
 
export let portfolioProjectPhases : PortfolioProjectPhase[] = [
	new PortfolioProjectPhase(1, 1, "Phase 1: Project Definition", 1, []),
    new PortfolioProjectPhase(2, 1, "Phase 2: Implementation", 2, []),
    new PortfolioProjectPhase(3, 1, "Phase 3: Approval", 3, []),
    new PortfolioProjectPhase(4, 1, "Phase 4: Execution", 4, []),
    new PortfolioProjectPhase(5, 1, "Phase 5: Close - Out", 5, []),

    new PortfolioProjectPhase(6, 3, "Phase 1: Project Definition", 1, []),
    new PortfolioProjectPhase(7, 3, "Phase 2: Implementation", 2, []),
    new PortfolioProjectPhase(8, 3, "Phase 3: Execution & Approval", 3, []),
    new PortfolioProjectPhase(9, 3, "Phase 4: Close Out", 4, []),	
];