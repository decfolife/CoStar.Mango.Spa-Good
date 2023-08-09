export class PortfolioActivity {
    id : number;
    objectID : Number;
    objectType : string;
    subType : String;
	objectName : String
	activityType : String;
	performedBy : String;
	performedDate : String;
	description : String;

	constructor( id, objectID, objectType, subType, objectName, activityType, performedBy, performedDate, description ) {
		this.id = id;
		this.objectID = objectID;
		this.objectType = objectType;
		this.activityType = activityType;
		this.performedBy = performedBy;
		this.objectName = objectName;
		this.subType = subType;
		this.performedDate = performedDate;
		this.description = description;
	}
}
 

export let portfolioActivities : PortfolioActivity[] = [
	// ( id, objectID, objectType, subType, objectName, activityType, performedBy, performedDate, description )
	new PortfolioActivity(1, 379, "Lease", "Real Estate", "Charleston", "File Uploaded", "Jason Trkovsky", "5m", "Invoice_1571_from_DJG_Management_LLC.pdf"),
	new PortfolioActivity(1, 379, "Lease", "Real Estate", "Charleston", "Note Added", "Kent Carpenter", "3h", "We got a steal on this lease!"),
	new PortfolioActivity(1, 379, "Lease", "Equipment", "Tesla", "File Uploaded", "Patrick Griffith", "6h", "Tesla_Invoice.pdf"),
	new PortfolioActivity(1, 379, "Lease", "Real Estate", "Bogota", "Note Added", "Jason Trkovsky", "6h", "Let's get this renewal locked down ASAP."),
	new PortfolioActivity(1, 379, "Lease", "Real Estate", "Greensboro", "Note Added", "Alexander Hamilton", "7h", "See attached file for updated floorplan"),
	new PortfolioActivity(1, 379, "Building", "Real Estate", "Greensboro", "Note Added", "Thomas Jefferson", "3d", "Captured some amazing drone footage of the building."),
	new PortfolioActivity(1, 379, "Building", "Real Estate", "Greensboro", "File Uploaded", "Thomas Jefferson", "3d", "greensboro_drone_video.mp4"),	
];