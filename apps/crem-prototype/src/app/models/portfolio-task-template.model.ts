import { PortfolioProjectPhase } from './portfolio-project-phase.model';

export class PortfolioTaskTemplate {
    id : number;
    portfolioProjectSettingsId : number;
	projectTypeId : number;
    projectTypeName : string;
    templateName : string;

	constructor( id, portfolioProjectSettingsId, projectTypeId, projectTypeName, templateName ) {
		this.id = id;
		this.portfolioProjectSettingsId = portfolioProjectSettingsId;
		this.projectTypeId = projectTypeId;
        this.projectTypeName = projectTypeName;
        this.templateName = templateName;	
	}
}
 
export let portfolioTaskTemplates : PortfolioTaskTemplate[] = [
	new PortfolioTaskTemplate(1, 1, 1, "Acquisition", "Acquisition Template A"),
    new PortfolioTaskTemplate(2, 1, 1, "Acquisition", "Acquisition Template B"),
    new PortfolioTaskTemplate(3, 1, 2, "Renewal", "Renewal Template A"),
    new PortfolioTaskTemplate(4, 1, 2, "Renewal", "Renewal Template B"),
    new PortfolioTaskTemplate(5, 1, 3, "Disposition", "Disposition Template A"),
    new PortfolioTaskTemplate(6, 1, 3, "Disposition", "Disposition Template B"),	
];