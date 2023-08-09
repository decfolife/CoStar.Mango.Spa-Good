export class GroupAndUserRightsHistory {
    type: string;
    id: number;
    name: string;
    changeType: string;
    displayName: string;
    beforeChange: string;
    afterChange: string;
    description: string;
    changeDate: Date;
    changedBy: string;

	constructor(type, id, name, changeType, displayName, beforeChange, afterChange, description, changeDate, changedBy) {
        this.type = type;
		this.id = id;
		this.name = name;
		this.changeType = changeType;
        this.displayName = displayName;
        this.beforeChange = beforeChange;
        this.afterChange = afterChange;
        this.description = description;
		this.changeDate = changeDate;
		this.changedBy = changedBy;				
	}
}

export let groupAndUserRightsHistory : GroupAndUserRightsHistory[] = [
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "Module Changes", "Deal","","Add", "Deal", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "Module Changes", "Store","","Add", "Store", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "Module Changes", "Center","","Add", "Center", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "Module Changes", "Lease","","Add", "Lease", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "Module Changes", "Contact","","Add", "Contact", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "Module Changes", "Financials Module","","View", "Financials Module", "2021-05-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "User Changes", "Financials Module","View","", "Removed due to Module Group Addition", "2021-05-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "Assign Rights", "ETL Templates","Add","", "Removed due to Module Group Addition", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "Module Changes", "Manage Admin Links","Add","", "Removed due to Module Group Addition", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "Module Changes", "Unexport Journal Entry","Add","", "Removed due to Module Group Addition", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "Module Changes", "Unapprove Journal Entry","Add","", "Removed due to Module Group Addition", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 105, "Adams, Samuel", "Module Changes", "Bulk Update Accounting Workflow","Add","", "Removed due to Module Group Addition", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("User", 156, "admin, vpclient", "Module Changes", "Bulk Update Accounting Workflow","Add","", "Removed due to Module Group Addition", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("Group", 310, "Acme Brands Portfolio", "Group Changes", "Sub Group Active","True","False", "Sub Group Deleted willtest4", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("Group", 310, "Acme Brands Portfolio", "Group Changes", "Sub Group Active","True","False", "Sub Group Deleted asdf", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("Group", 310, "Acme Brands Portfolio", "Module Changes", "Financials Module","","Add", "Financials Module", "2021-06-02", "Jake Arregetti"),
    new GroupAndUserRightsHistory("Group", 310, "Acme Brands Portfolio", "Module Changes", "Deal","","Add", "Deal", "2021-06-02", "Jake Arregetti"),
]