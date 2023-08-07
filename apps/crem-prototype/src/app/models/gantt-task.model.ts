export class GanttTask {
    id: number;
    parentId: number;
    title: string;
    start: Date;
    end: Date;
    progress: number;
    color: String;

	constructor( id, parentId, title, start, end, progress, color ) { 		
		this.id = id;
		this.parentId = parentId;
		this.title = title;
		this.start = start;
		this.end = end;
		this.progress = progress;
		this.color = color;
	}
}

export let ganttTasks : GanttTask[] = [
	// new GanttTask(1, 0, 'USA-GA-Atlanta Renewal', new Date('2019-02-21T05:00:00.000Z'), new Date('2019-07-04T12:00:00.000Z'), 31), 
	// new GanttTask(2, 1, 'Scope', new Date('2019-02-21T05:00:00.000Z'), new Date('2019-02-26T09:00:00.000Z'), 60), 
	// new GanttTask(3, 2, 'Determine project scope', new Date('2019-02-21T05:00:00.000Z'), new Date('2019-02-21T09:00:00.000Z'), 100), 
	// new GanttTask(4, 2, 'Secure project sponsorship', new Date('2019-02-21T10:00:00.000Z'), new Date('2019-02-22T09:00:00.000Z'), 100), 
	// new GanttTask(5, 2, 'Define preliminary resources', new Date('2019-02-22T10:00:00.000Z'), new Date('2019-02-25T09:00:00.000Z'), 60), 
	// new GanttTask(6, 2, 'Secure core resources', new Date('2019-02-25T10:00:00.000Z'), new Date('2019-02-26T09:00:00.000Z'), 0), 
	// new GanttTask(7, 2, 'Scope complete', new Date('2019-02-26T09:00:00.000Z'), new Date('2019-02-26T09:00:00.000Z'), 0), 
	// new GanttTask(8, 1, 'Analysis/Software Requirements', new Date('2019-02-26T10:00:00.000Z'), new Date('2019-03-18T09:00:00.000Z'), 80), 
	// new GanttTask(9, 8, 'Conduct needs analysis', new Date('2019-02-26T10:00:00.000Z'), new Date('2019-03-05T09:00:00.000Z'), 100), 
	// new GanttTask(10, 8, 'Draft preliminary software specifications', new Date('2019-03-05T10:00:00.000Z'), new Date('2019-03-08T09:00:00.000Z'), 100), 
	// new GanttTask(11, 8, 'Develop preliminary budget', new Date('2019-03-08T10:00:00.000Z'), new Date('2019-03-12T09:00:00.000Z'), 100), 
	// new GanttTask(12, 8, 'Review software specifications/budget with team', new Date('2019-03-12T10:00:00.000Z'), new Date('2019-03-12T14:00:00.000Z'), 100), 
	// new GanttTask(13, 8, 'Incorporate feedback on software specifications', new Date('2019-03-13T05:00:00.000Z'), new Date('2019-03-13T14:00:00.000Z'), 70), 
	// new GanttTask(14, 8, 'Develop delivery timeline', new Date('2019-03-14T05:00:00.000Z'), new Date('2019-03-14T14:00:00.000Z'), 0), 
	// new GanttTask(15, 8, 'Obtain approvals to proceed (concept, timeline, budget)', new Date('2019-03-15T05:00:00.000Z'), new Date('2019-03-15T09:00:00.000Z'), 0), 
	// new GanttTask(16, 8, 'Secure required resources', new Date('2019-03-15T10:00:00.000Z'), new Date('2019-03-18T09:00:00.000Z'), 0), 
	// new GanttTask(17, 8, 'Analysis complete', new Date('2019-03-18T09:00:00.000Z'), new Date('2019-03-18T09:00:00.000Z'), 0), 
	// new GanttTask(18, 1, 'Design', new Date('2019-03-18T10:00:00.000Z'), new Date('2019-04-05T14:00:00.000Z'), 80), 
	// new GanttTask(19, 18, 'Review preliminary software specifications', new Date('2019-03-18T10:00:00.000Z'), new Date('2019-03-20T09:00:00.000Z'), 100), 
	// new GanttTask(20, 18, 'Develop functional specifications', new Date('2019-03-20T10:00:00.000Z'), new Date('2019-03-27T09:00:00.000Z'), 100), 
	// new GanttTask(21, 18, 'Develop prototype based on functional specifications', new Date('2019-03-27T10:00:00.000Z'), new Date('2019-04-02T09:00:00.000Z'), 100), 
	// new GanttTask(22, 18, 'Review functional specifications', new Date('2019-04-02T10:00:00.000Z'), new Date('2019-04-04T09:00:00.000Z'), 30), 
	// new GanttTask(23, 18, 'Incorporate feedback into functional specifications', new Date('2019-04-04T10:00:00.000Z'), new Date('2019-04-05T09:00:00.000Z'), 0), 
	// new GanttTask(24, 18, 'Obtain approval to proceed', new Date('2019-04-05T10:00:00.000Z'), new Date('2019-04-05T14:00:00.000Z'), 0), 
	// new GanttTask(25, 18, 'Design complete', new Date('2019-04-05T14:00:00.000Z'), new Date('2019-04-05T14:00:00.000Z'), 0), 
	// new GanttTask(26, 1, 'Development', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-05-07T12:00:00.000Z'), 42), 
	// new GanttTask(27, 26, 'Review functional specifications', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-04-08T14:00:00.000Z'), 100), 
	// new GanttTask(28, 26, 'Identify modular/tiered design parameters', new Date('2019-04-09T05:00:00.000Z'), new Date('2019-04-09T14:00:00.000Z'), 100), 
	// new GanttTask(29, 26, 'Assign development staff', new Date('2019-04-10T05:00:00.000Z'), new Date('2019-04-10T14:00:00.000Z'), 100), 
	// new GanttTask(30, 26, 'Develop code', new Date('2019-04-11T05:00:00.000Z'), new Date('2019-05-01T14:00:00.000Z'), 49), 
	// new GanttTask(31, 26, 'Developer testing (primary debugging)', new Date('2019-04-16T12:00:00.000Z'), new Date('2019-05-07T12:00:00.000Z'), 24), 
	// new GanttTask(32, 26, 'Development complete', new Date('2019-05-07T12:00:00.000Z'), new Date('2019-05-07T12:00:00.000Z'), 0), 
	// new GanttTask(33, 1, 'Testing', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-06-13T12:00:00.000Z'), 23), 
	// new GanttTask(34, 33, 'Develop unit test plans using product specifications', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-04-11T14:00:00.000Z'), 100), 
	// new GanttTask(35, 33, 'Develop integration test plans using product specifications', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-04-11T14:00:00.000Z'), 100), 
	// new GanttTask(36, 33, 'Unit Testing', new Date('2019-05-07T12:00:00.000Z'), new Date('2019-05-28T12:00:00.000Z'), 0), 
	// new GanttTask(37, 36, 'Review modular code', new Date('2019-05-07T12:00:00.000Z'), new Date('2019-05-14T12:00:00.000Z'), 0), 
	// new GanttTask(38, 36, 'Test component modules to product specifications', new Date('2019-05-14T12:00:00.000Z'), new Date('2019-05-16T12:00:00.000Z'), 0), 
	// new GanttTask(39, 36, 'Identify anomalies to product specifications', new Date('2019-05-16T12:00:00.000Z'), new Date('2019-05-21T12:00:00.000Z'), 0), 
	// new GanttTask(40, 36, 'Modify code', new Date('2019-05-21T12:00:00.000Z'), new Date('2019-05-24T12:00:00.000Z'), 0), 
	// new GanttTask(41, 36, 'Re-test modified code', new Date('2019-05-24T12:00:00.000Z'), new Date('2019-05-28T12:00:00.000Z'), 0), 
	// new GanttTask(42, 36, 'Unit testing complete', new Date('2019-05-28T12:00:00.000Z'), new Date('2019-05-28T12:00:00.000Z'), 0), 
	// new GanttTask(43, 33, 'Integration Testing', new Date('2019-05-28T12:00:00.000Z'), new Date('2019-06-13T12:00:00.000Z'), 0), 
	// new GanttTask(44, 43, 'Test module integration', new Date('2019-05-28T12:00:00.000Z'), new Date('2019-06-04T12:00:00.000Z'), 0), 
	// new GanttTask(45, 43, 'Identify anomalies to specifications', new Date('2019-06-04T12:00:00.000Z'), new Date('2019-06-06T12:00:00.000Z'), 0), 
	// new GanttTask(46, 43, 'Modify code', new Date('2019-06-06T12:00:00.000Z'), new Date('2019-06-11T12:00:00.000Z'), 0), 
	// new GanttTask(47, 43, 'Re-test modified code', new Date('2019-06-11T12:00:00.000Z'), new Date('2019-06-13T12:00:00.000Z'), 0), 
	// new GanttTask(48, 43, 'Integration testing complete', new Date('2019-06-13T12:00:00.000Z'), new Date('2019-06-13T12:00:00.000Z'), 0), 
	// new GanttTask(49, 1, 'Training', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-06-10T12:00:00.000Z'), 25), 
	// new GanttTask(50, 49, 'Develop training specifications for end users', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-04-10T14:00:00.000Z'), 100), 
	// new GanttTask(51, 49, 'Develop training specifications for helpdesk support staff', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-04-10T14:00:00.000Z'), 100), 
	// new GanttTask(52, 49, 'Identify training delivery methodology (computer based training, classroom, etc.)', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-04-09T14:00:00.000Z'), 100), 
	// new GanttTask(53, 49, 'Develop training materials', new Date('2019-05-07T12:00:00.000Z'), new Date('2019-05-28T12:00:00.000Z'), 0), 
	// new GanttTask(54, 49, 'Conduct training usability study', new Date('2019-05-28T12:00:00.000Z'), new Date('2019-06-03T12:00:00.000Z'), 0), 
	// new GanttTask(55, 49, 'Finalize training materials', new Date('2019-06-03T12:00:00.000Z'), new Date('2019-06-06T12:00:00.000Z'), 0), 
	// new GanttTask(56, 49, 'Develop training delivery mechanism', new Date('2019-06-06T12:00:00.000Z'), new Date('2019-06-10T12:00:00.000Z'), 0), 
	// new GanttTask(57, 49, 'Training materials complete', new Date('2019-06-10T12:00:00.000Z'), new Date('2019-06-10T12:00:00.000Z'), 0), 
	// new GanttTask(58, 1, 'Documentation', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-05-20T09:00:00.000Z'), 0), 
	// new GanttTask(59, 58, 'Develop Help specification', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-04-08T14:00:00.000Z'), 80), 
	// new GanttTask(60, 58, 'Develop Help system', new Date('2019-04-22T10:00:00.000Z'), new Date('2019-05-13T09:00:00.000Z'), 0), 
	// new GanttTask(61, 58, 'Review Help documentation', new Date('2019-05-13T10:00:00.000Z'), new Date('2019-05-16T09:00:00.000Z'), 0), 
	// new GanttTask(62, 58, 'Incorporate Help documentation feedback', new Date('2019-05-16T10:00:00.000Z'), new Date('2019-05-20T09:00:00.000Z'), 0), 
	// new GanttTask(63, 58, 'Develop user manuals specifications', new Date('2019-04-08T05:00:00.000Z'), new Date('2019-04-09T14:00:00.000Z'), 65), 
	// new GanttTask(64, 58, 'Develop user manuals', new Date('2019-04-22T10:00:00.000Z'), new Date('2019-05-13T09:00:00.000Z'), 0), 
	// new GanttTask(65, 58, 'Review all user documentation', new Date('2019-05-13T10:00:00.000Z'), new Date('2019-05-15T09:00:00.000Z'), 0), 
	// new GanttTask(66, 58, 'Incorporate user documentation feedback', new Date('2019-05-15T10:00:00.000Z'), new Date('2019-05-17T09:00:00.000Z'), 0), 
	// new GanttTask(67, 58, 'Documentation complete', new Date('2019-05-20T09:00:00.000Z'), new Date('2019-05-20T09:00:00.000Z'), 0), 
	// new GanttTask(68, 1, 'Pilot', new Date('2019-03-18T10:00:00.000Z'), new Date('2019-06-24T12:00:00.000Z'), 22), 
	// new GanttTask(69, 68, 'Identify test group', new Date('2019-03-18T10:00:00.000Z'), new Date('2019-03-19T09:00:00.000Z'), 100), 
	// new GanttTask(70, 68, 'Develop software delivery mechanism', new Date('2019-03-19T10:00:00.000Z'), new Date('2019-03-20T09:00:00.000Z'), 100), 
	// new GanttTask(71, 68, 'Install/deploy software', new Date('2019-06-13T12:00:00.000Z'), new Date('2019-06-14T12:00:00.000Z'), 0), 
	// new GanttTask(72, 68, 'Obtain user feedback', new Date('2019-06-14T12:00:00.000Z'), new Date('2019-06-21T12:00:00.000Z'), 0), 
	// new GanttTask(73, 68, 'Evaluate testing information', new Date('2019-06-21T12:00:00.000Z'), new Date('2019-06-24T12:00:00.000Z'), 0), 
	// new GanttTask(74, 68, 'Pilot complete', new Date('2019-06-24T12:00:00.000Z'), new Date('2019-06-24T12:00:00.000Z'), 0), 
	// new GanttTask(75, 1, 'Deployment', new Date('2019-06-24T12:00:00.000Z'), new Date('2019-07-01T12:00:00.000Z'), 0), 
	// new GanttTask(76, 75, 'Determine final deployment strategy', new Date('2019-06-24T12:00:00.000Z'), new Date('2019-06-25T12:00:00.000Z'), 0), 
	// new GanttTask(77, 75, 'Develop deployment methodology', new Date('2019-06-25T12:00:00.000Z'), new Date('2019-06-26T12:00:00.000Z'), 0), 
	// new GanttTask(78, 75, 'Secure deployment resources', new Date('2019-06-26T12:00:00.000Z'), new Date('2019-06-27T12:00:00.000Z'), 0), 
	// new GanttTask(79, 75, 'Train support staff', new Date('2019-06-27T12:00:00.000Z'), new Date('2019-06-28T12:00:00.000Z'), 0), 
	// new GanttTask(80, 75, 'Deploy software', new Date('2019-06-28T12:00:00.000Z'), new Date('2019-07-01T12:00:00.000Z'), 0), 
	// new GanttTask(81, 75, 'Deployment complete', new Date('2019-07-01T12:00:00.000Z'), new Date('2019-07-01T12:00:00.000Z'), 0), 
	// new GanttTask(82, 1, 'Post Implementation Review', new Date('2019-07-01T12:00:00.000Z'), new Date('2019-07-04T12:00:00.000Z'), 0), 
	// new GanttTask(83, 82, 'Document lessons learned', new Date('2019-07-01T12:00:00.000Z'), new Date('2019-07-02T12:00:00.000Z'), 0), 
	// new GanttTask(84, 82, 'Distribute to team members', new Date('2019-07-02T12:00:00.000Z'), new Date('2019-07-03T12:00:00.000Z'), 0), 
	// new GanttTask(85, 82, 'Create software maintenance team', new Date('2019-07-03T12:00:00.000Z'), new Date('2019-07-04T12:00:00.000Z'), 0), 
	// new GanttTask(86, 82, 'Post implementation review complete', new Date('2019-07-04T12:00:00.000Z'), new Date('2019-07-04T12:00:00.000Z'), 0), 
	// new GanttTask(87, 1, 'Software development template complete', new Date('2019-07-04T12:00:00.000Z'), new Date('2019-07-04T12:00:00.000Z'), 0)
];

export let projectTimelineGantt : GanttTask[] = [
	new GanttTask(1000, 0, 'USA-GA-Atlanta Renewal', new Date('2020-02-21T05:00:00.000Z'), new Date('2020-07-04T12:00:00.000Z'), 31, "#D30515"), 
	new GanttTask(1001, 0, 'USA-IL-Chicago Renewal', new Date('2020-03-07T05:00:00.000Z'), new Date('2020-06-04T12:00:00.000Z'), 31, "#D30515"), 
	new GanttTask(1002, 0, 'USA-AZ-Phoenix Relocation', new Date('2020-03-21T05:00:00.000Z'), new Date('2020-08-14T12:00:00.000Z'), 31, "#D30515"), 
	new GanttTask(1003, 0, 'USA-NV-Las Vegas Renewal', new Date('2020-03-21T05:00:00.000Z'), new Date('2020-07-01T12:00:00.000Z'), 31, "#D30515"), 
	new GanttTask(1004, 0, 'Atlanta Increase', new Date('2020-02-21T05:00:00.000Z'), new Date('2020-07-04T12:00:00.000Z'), 31, "#D30515"), 
	new GanttTask(1005, 0, 'USA-IL-Chicago (New Purchase)', new Date('2020-02-28T05:00:00.000Z'), new Date('2020-09-18T12:00:00.000Z'), 31, "#F7E967"), 
	new GanttTask(1006, 0, 'USA-GA-Atlanta (Purchase)', new Date('2020-04-05T05:00:00.000Z'), new Date('2020-09-04T12:00:00.000Z'), 31, "#F7E967"), 
	new GanttTask(1007, 0, 'USA-NY-New York (New Office)', new Date('2020-04-21T05:00:00.000Z'), new Date('2020-08-04T12:00:00.000Z'), 31, "#77B800"), 
	new GanttTask(1008, 0, 'FIN-Helsinki-Helsinki (Office)', new Date('2020-05-04T05:00:00.000Z'), new Date('2020-09-11T12:00:00.000Z'), 31, "#77B800"), 
	new GanttTask(1009, 0, 'CZE-Stredoceský kraj-Kolin (Mfg)', new Date('2020-05-19T05:00:00.000Z'), new Date('2020-09-28T12:00:00.000Z'), 31, "#77B800"), 
	new GanttTask(1010, 0, 'AUS-NSW-Alexandria (Warehouse)', new Date('2020-06-07T05:00:00.000Z'), new Date('2020-10-04T12:00:00.000Z'), 31, "#77B800"), 
	new GanttTask(1011, 0, 'USA-GA-Kennesaw (Office)', new Date('2020-06-21T05:00:00.000Z'), new Date('2020-11-04T12:00:00.000Z'), 31, "#77B800"), 
];

