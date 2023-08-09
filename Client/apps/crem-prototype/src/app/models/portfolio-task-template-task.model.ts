export class PortfolioTaskTemplateTask {
    id : number;
    portfolioTaskTemplateId : number;
    portfolioProjectPhaseId : number;
	taskName : string;
    role : string;
    requireApprovalByAssignee : boolean;
    requireApprovalByAllAssignees : boolean;
    duration : number;

	constructor( id, portfolioTaskTemplateId, portfolioProjectPhaseId, taskName, role, requireApprovalByAssignee, requireApprovalByAllAssignees, duration ) {
		this.id = id;
		this.portfolioTaskTemplateId = portfolioTaskTemplateId;
		this.portfolioProjectPhaseId = portfolioProjectPhaseId;
        this.taskName = taskName;
        this.role = role;
        this.requireApprovalByAssignee = requireApprovalByAssignee;
        this.requireApprovalByAllAssignees = requireApprovalByAllAssignees;
        this.duration = duration;
	}
}
 
export let portfolioTaskTemplateTasks : PortfolioTaskTemplateTask[] = [
	new PortfolioTaskTemplateTask(1, 1, 1, "Project Definition & Due Diligence", "Transaction Manager", true, false, 3),
    new PortfolioTaskTemplateTask(2, 1, 1, "Project Kickoff (PID Approval)", "Transaction Manager", true, false, 3),
    new PortfolioTaskTemplateTask(3, 1, 2, "Market Review & Shortlist", "Transaction Manager", true, false, 3),
    new PortfolioTaskTemplateTask(4, 1, 2, "Prepare & Issue RFP", "Transaction Manager", true, false, 3),
    new PortfolioTaskTemplateTask(5, 1, 2, "Negotiate & Analyze", "Transaction Manager", true, false, 3),
    new PortfolioTaskTemplateTask(6, 1, 2, "Agree Terms & Sign LOI", "Transaction Manager", true, false, 3),
    new PortfolioTaskTemplateTask(7, 1, 3, "Business Case Approval", "Transaction Manager", true, false, 3),
    new PortfolioTaskTemplateTask(8, 1, 4, "Finalize & Execute Agreements", "Transaction Manager", true, false, 3),
    new PortfolioTaskTemplateTask(9, 1, 5, "Feedback & Close out", "Transaction Manager", true, false, 3),
    new PortfolioTaskTemplateTask(10, 1, 5, "Construction", "Transaction Manager", true, false, 3),
];