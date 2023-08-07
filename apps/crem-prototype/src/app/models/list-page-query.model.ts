
export class ListPageQuery {
    id: number;
    name: string;
    category : string;
    isDefault : Boolean;
    isHidden : Boolean;
    objectType : String;

    constructor(id, name, category, isDefault, isHidden, objectType) {
    	this.id = id;
    	this.name = name;
    	this.category = category;
    	this.isDefault = isDefault;
    	this.isHidden = isHidden;
    	this.objectType = objectType;
    }
}

export let listPageQueries : ListPageQuery[] = [
    new ListPageQuery(1, 'Leases by Geography', 'CoStar List Views', false, false, 'lease'),
    new ListPageQuery(2, 'Leases by Hierarchy', 'CoStar List Views', false, false, 'lease'),
    new ListPageQuery(3, 'Lease Critical Dates', 'CoStar List Views', false, false, 'lease'),
    new ListPageQuery(4, 'My Leases', 'My List Views', true, false, 'lease'),
    new ListPageQuery(5, 'My Favorite Leases', 'My List Views', false, false, 'lease'),
    new ListPageQuery(6, "Kelly's Leases", 'Shared List Views', false, false, 'lease'),
    new ListPageQuery(7, "Betsy's Leases", 'Shared List Views', false, true, 'lease'),
    new ListPageQuery(8, "Bill's Favorite Leases", 'Shared List Views', false, false, 'lease'),
    new ListPageQuery(9, "Buildings by Geography", 'CoStar List Views', true, false, 'building'),
    new ListPageQuery(10, "Buildings by Hierarchy", 'CoStar List Views', false, false, 'building'),
    new ListPageQuery(11, "Texas Buildings", 'My List Views', false, false, 'building'),
    new ListPageQuery(53, "California Buildings", 'My List Views', false, false, 'building'),
    new ListPageQuery(12, "Projects I am a Member of", 'CoStar List Views', true, false, 'project'),
    new ListPageQuery(13, "Projects I Manage", 'CoStar List Views', false, false, 'project'),
    new ListPageQuery(14, "I Manage with Overdue Tasks", 'CoStar List Views', false, false, 'project'),
    new ListPageQuery(15, "Projects I Have Access To", 'CoStar List Views', false, false, 'project'),
    new ListPageQuery(16, "Projects By Manager", 'CoStar List Views', false, false, 'project'),
    new ListPageQuery(17, "Projects by Geography", 'CoStar List Views', false, false, 'project'),
    new ListPageQuery(18, "Projects by Type", 'CoStar List Views', false, false, 'project'),
    new ListPageQuery(19, "All Schedules", 'CoStar List Views', true, false, 'accounting'),
    new ListPageQuery(20, "Operating (ASC 842)", 'CoStar List Views', false, false, 'accounting'),
    new ListPageQuery(21, "Finance (ASC 842)", 'CoStar List Views', false, false, 'accounting'),
    new ListPageQuery(22, "IFRS 16", 'CoStar List Views', false, false, 'accounting'),
    new ListPageQuery(23, "Operating Lessor", 'CoStar List Views', false, false, 'accounting'),
    new ListPageQuery(24, "Impairments", 'CoStar List Views', false, false, 'accounting'),
    new ListPageQuery(25, "Terminations", 'CoStar List Views', false, false, 'accounting'),
    new ListPageQuery(26, "All Companies", 'CoStar List Views', true, false, 'company'),
    new ListPageQuery(27, "Customers", 'CoStar List Views', false, false, 'company'),
    new ListPageQuery(28, "Vendors", 'CoStar List Views', false, false, 'company'),
    new ListPageQuery(29, "All People", 'CoStar List Views', true, false, 'contact'),
    new ListPageQuery(30, "Generic Company", 'CoStar List Views', false, false, 'contact'),
    new ListPageQuery(31, "CoStar", 'CoStar List Views', false, false, 'contact'),
    new ListPageQuery(32, "CoStar Reports", 'CoStar List Views', false, false, 'report'),
    new ListPageQuery(33, "My Monthly Reports", 'My List Views', true, false, 'report'),
    new ListPageQuery(32, "Overdue Tasks", 'CoStar List Views', false, false, 'task'),
    new ListPageQuery(33, "Tasks to Approve", 'CoStar List Views', true, false, 'task'),
    new ListPageQuery(43, "Equipment Suppliers", 'CoStar List Views', true, false, 'supplier'),
    new ListPageQuery(44, "Equipment Leases", 'CoStar List Views', true, false, 'equipment'),
    new ListPageQuery(45, "All Deals", 'CoStar List Views', true, false, 'deal'),
    new ListPageQuery(46, "Deals by Brokerage", 'CoStar List Views', false, false, 'deal'),
    new ListPageQuery(47, "Deals by Type", 'CoStar List Views', false, false, 'deal'),
    new ListPageQuery(48, "Deals by Stage", 'CoStar List Views', false, false, 'deal'),
    new ListPageQuery(49, "New York Buildings", 'Shared List Views', false, false, 'building'),
    new ListPageQuery(50, "Southeast Buildings", 'Shared List Views', false, false, 'building'),
    new ListPageQuery(51, "APAC Buildings", 'Shared List Views', false, true, 'building'),
    new ListPageQuery(54, "EMEA Buildings", 'Shared List Views', false, true, 'building'),
];