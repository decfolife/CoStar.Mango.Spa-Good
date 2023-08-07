export class Segment {
    id: number;
    name : string;
    segmentType : string;
    dataset : string;
    query : string;
    objectIDs : string;
	visibility : string;
	createdBy : string;
	lastModified : string;
	dataSet : string;

    constructor(id,name,segmentType,dataset,query,objectIDs,visibility, createdBy, lastModified, dataSet) {		
		this.id = id;	
		this.name = name;
		this.segmentType = segmentType;
		this.dataset = dataset;
		this.query = query;
		this.objectIDs = objectIDs;	
		this.visibility = visibility;
		this.createdBy = createdBy;
		this.lastModified = lastModified;	
		this.dataSet = dataSet;
	}
}

export let segments : Segment[] = [
	new Segment(1, "Overdue Projects - All", "project", "project summary data", null, null, "Everyone", "Jason Trkovsky", "2022-02-14", "Project Summary Data"),
	new Segment(2, "Active Renewal Projects", "project", "project summary data", null, null, "Shared", "Patrick Griffith", "2021-12-31", "Project Summary Data"),
	new Segment(3, "Amazon Projects", "project", "project summary data", null, null, "Shared", "Kent Carpenter", "2021-11-05", "Project Summary Data"),
	new Segment(4, "ADT Projects", "project", "project summary data", null, null, null, null, null, "Project Summary Data"),
	new Segment(5, "Sampson's Projects", "project", "project summary data", null, null, null, null, null, "Project Summary Data"),
	new Segment(10, "lease segment a", "lease", "lease summary data", null, null, null, null, null, "Building and Lease Data"),
	new Segment(11, "lease segment b", "lease", "lease summary data", null, null, null, null, null, "Building and Lease Data"),
	new Segment(12, "lease segment c", "lease", "lease summary data", null, null, null, null, null, "Building and Lease Data"),
	new Segment(13, "lease segment d", "lease", "lease summary data", null, null, null, null, null, "Building and Lease Data"),
	new Segment(14, "lease segment e", "lease", "lease summary data", null, null, null, null, null, "Building and Lease Data"),
];	