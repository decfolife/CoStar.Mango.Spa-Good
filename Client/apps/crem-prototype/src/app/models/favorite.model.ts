export class Favorite {
    id : number;
    objectType : String;
    isFavorite : Boolean;
    isRecent : Boolean;
    name : String;
    path : String;

	constructor( id, objectType, isFavorite, isRecent, name, path ) { 		
		this.id = id;
		this.objectType = objectType; 
		this.isFavorite = isFavorite; 
		this.isRecent = isRecent; 
		this.name = name; 
		this.path = path; 		
	}
}

export let favorites : Favorite[] = [
	new Favorite(1, "Building", true, true, "1331 L Street", "portfolio/property/660"),
	new Favorite(2, "Building", false, true, "1300 Post Oak Blvd.", "portfolio/property/646"),
	new Favorite(3, "Building", true, true, "3438 Peachtree Road", "portfolio/property/682"),
	new Favorite(4, "Building", false, true, "33 Arch Street", "portfolio/property/628"),
	new Favorite(5, "Lease", true, true, "8910 University Center Lane", "portfolio/lease/169"),
	new Favorite(6, "Lease", true, true, "100 Congress Avenue", "portfolio/lease/185"),
	new Favorite(7, "Report", true, true, "Project Summary Report", null),
	new Favorite(8, "Report", true, true, "Active Acquisition Projects", null),
	new Favorite(9, "Report", true, true, "Security Deposit Balances", null),
	new Favorite(10, "Report", true, true, "Project Pipeline Report", null),
	new Favorite(11, "Report", true, true, "Lease Options", null),
	new Favorite(12, "Report", true, true, "Building Utilization Summary", null),
	
];
