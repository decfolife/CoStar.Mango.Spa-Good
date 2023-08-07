export class Transaction {
    id : number;
    client : string;
	manager : String;
	name : String;
	type : String;
    phase : string;
	status : String;
    internalId : string;
    dueDate : string;
    fileCount : number;
    newActivityCount : number;
    startDate : String;
    template : String;
    team : String;
    country : String;
    state : String;
    market : String;
    submarket : String;
    spaceUse : String;
    buildingClass : String;
    targetSf : number;

	constructor( id, client, manager, name, type, phase, status, internalId, dueDate, fileCount, newActivityCount,startDate,template,team,country,state,market,submarket,spaceUse,buildingClass,targetSf ) {
		this.id = id;
		this.client = client;
		this.manager = manager;
		this.name = name;
		this.phase = phase;
		this.type = type;
		this.status = status;
        this.internalId = internalId;
        this.dueDate = dueDate;
        this.fileCount = fileCount;
        this.newActivityCount = newActivityCount;
        this.startDate = startDate;
        this.template = template;
        this.team = team;
        this.country = country;
        this.state = state;
        this.market = market;
        this.submarket = submarket;
        this.spaceUse = spaceUse;
        this.buildingClass = buildingClass;
        this.targetSf = targetSf;
	}
}
 

export let transactions : Transaction[] = [
	// ( id, client, manager, name, type, phase, status, internalId, dueDate )
    new Transaction(38184, "ADT", "Tadd Wisinski", "Bakersfield, CA", "Renewal", "Phase 5: Close - Out", "Active", "CA-0058", "08/29/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38185, "ADT", "Tadd Wisinski", "Lubbock, TX", "Acquisition", "Phase 2: Implementation", "Active", "TX-0066", "08/29/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38186, "ADT", "Kyle Harding", "Evansville, IN", "Renewal", "Phase 3: Approval", "Active", "IN-0007", "08/29/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38235, "ADT", "Meghan Bransteter", "Tallahassee, FL", "Renewal", "Phase 2: Implementation", "Active", "FL-0085", "08/31/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38236, "ADT", "Tadd Wisinski", "Anaheim, CA", "Renewal", "Phase 2: Implementation", "Active", "CA-0025", "11/09/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38238, "ADT", "Meghan Bransteter", "Wichita, KS", "Renewal", "Phase 2: Implementation", "Active", "KS-0008", "07/21/2022", 34, 2,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38240, "ADT", "Tadd Wisinski", "Tempe, AZ", "Acquisition", "N/A", "Active", "AZ-0015", "08/31/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38241, "ADT", "Tadd Wisinski", "Los Angeles, CA", "Renewal", "Phase 1: Project Definition", "Active", "CA-0106", "11/09/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38242, "ADT", "Tadd Wisinski", "Brownsville, TX - Renewal", "Renewal", "N/A", "Active", "TX-0101", "08/31/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38243, "ADT", "Tadd Wisinski", "San Jose, CA", "Renewal", "Phase 2: Implementation", "Active", "CA-0098", "08/31/2022", 34, 12,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38245, "ADT", "Tadd Wisinski", "Boise, ID", "Renewal", "Phase 5: Close - Out", "Active", "ID-0004", "08/31/2022", 34, 10,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38246, "ADT", "Tadd Wisinski", "Portland, ME", "Renewal", "N/A", "Active", "ME-0002", "08/31/2022", 34, 2,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38247, "ADT", "Tadd Wisinski", "Carlsbad, CA", "Renewal", "Phase 1: Project Definition", "Active", "CA-0131", "08/31/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38248, "ADT", "Tadd Wisinski", "Des Moines, IA", "Renewal", "Phase 2: Implementation", "Active", "IA-0004", "08/31/2022", 34, 1,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38252, "ADT", "Tadd Wisinski", "Hollis, NH", "Acquisition", "Phase 2: Implementation", "Active", "NH-0003", "08/31/2022", 34, 5,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38255, "ADT", "Tadd Wisinski", "Beaumont, TX", "Renewal", "N/A", "Active", "TX-0100", "08/31/2022", 34, 6,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38258, "ADT", "Tadd Wisinski", "Ozark, MO", "Renewal", "N/A", "Active", "MO-0013", "08/31/2022", 34, 14,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38260, "ADT", "Tadd Wisinski", "Ballston Lake, NY", "Renewal", "N/A", "Active", "NY-0057", "08/31/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38289, "ADT", "Meghan Bransteter", "Kansas City, MO", "Disposition", "Phase 3: Approval", "Active", "MO-008", "05/13/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38293, "ADT", "Meghan Bransteter", "Severn, MD", "Disposition", "N/A", "Active", "MD-0032", "05/13/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38296, "ADT", "Meghan Bransteter", "Indianapolis, IN - Termination/Contraction", "Disposition", "Phase 2: Implementation", "Active", "IN0022", "05/13/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38297, "ADT", "Meghan Bransteter", "Miami Gardens, FL", "Disposition", "N/A", "Active", "FL-0101", "05/13/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38298, "ADT", "Meghan Bransteter", "Kalamazoo, MI", "Disposition", "N/A", "Active", "MI-0019", "05/13/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38300, "ADT", "Meghan Bransteter", "Columbia, MD", "Disposition", "N/A", "Active", "MD-0033", "05/13/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38303, "ADT", "Meghan Bransteter", "Tampa, FL", "Disposition", "N/A", "Active", "FL-0017", "05/13/2022", 34, 3,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38304, "ADT", "Meghan Bransteter", "Ventura, CA", "Disposition", "N/A", "Active", "CA-0127", "05/13/2022", 34, 8,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38306, "ADT", "Meghan Bransteter", "Hanover, MD", "Disposition", "Phase 2: Implementation", "Active", "MD-0035", "05/13/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38644, "ADT", "Tadd Wisinski", "Greensboro, NC", "Renewal", "N/A", "Active", "NC-0033", "09/16/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38645, "ADT", "Tadd Wisinski", "Biloxi", "Acquisition", "N/A", "Active", "MS-0005", "09/19/2022", 34, 2,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38646, "ADT", "Kyle Harding", "Boca Raton HQ", "Acquisition", "N/A", "Active", "", "11/28/2022", 34, 4,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38687, "ADT", "Tadd Wisinski", "Arlington", "Renewal", "Phase 2: Implementation", "Active", "TX-0091", "11/30/2022", 34, 1,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38768, "ADT", "Tadd Wisinski", "Palm City, FL", "Acquisition", "N/A", "Active", "FL-0102", "09/28/2022", 34, 2,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38796, "ADT", "Tadd Wisinski", "Albany", "Acquisition", "Phase 1: Project Definition", "Active", "NY-0052", "10/03/2022", 34, 7,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38797, "ADT", "Tadd Wisinski", "Houston - Resi", "Acquisition", "N/A", "Active", "TX-0063", "12/12/2022", 34, 12,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38800, "ADT", "Kyle Harding", "Indianapolis 3685", "Acquisition", "N/A", "Active", "IN-0023", "12/12/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38801, "ADT", "Kyle Harding", "Indianapolis 3750", "Acquisition", "N/A", "Active", "IN-0024", "12/12/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39002, "ADT", "Tadd Wisinski", "Totowa", "Acquisition", "Phase 2: Implementation", "Active", "NJ-0020", "12/20/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39017, "ADT", "Tadd Wisinski", "Uniontown", "Acquisition", "Phase 2: Implementation", "Active", "OH-0023", "09/21/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39018, "ADT", "Meghan Bransteter", "Valencia", "Disposition", "N/A", "Active", "CA-0126", "06/29/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39019, "ADT", "Tadd Wisinski", "Indianapolis - Girls School Ave", "Renewal", "Phase 2: Implementation", "Active", "IN-0018", "09/21/2022", 34, 4,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39021, "ADT", "Tadd Wisinski", "Beaverton", "Renewal", "Phase 2: Implementation", "Active", "OR-0006", "12/22/2022", 34, 8,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39120, "ADT", "Tadd Wisinski", "Spokane, WA", "Renewal", "Phase 2: Implementation", "Active", "WA-0004", "10/03/2022", 34, 35,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39124, "ADT", "Meghan Bransteter", "Odenton, MD", "Disposition", "N/A", "Active", "MD-0034", "07/11/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39127, "ADT", "Tadd Wisinski", "Vancouver, WA", "Acquisition", "N/A", "Active", "WA-0025", "10/03/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39128, "ADT", "Tadd Wisinski", "West Monroe, LA", "Renewal", "N/A", "Active", "LA-0025", "10/03/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39129, "ADT", "Tadd Wisinski", "Warwick, RI", "Renewal", "N/A", "Active", "RI-0006", "10/03/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39130, "ADT", "Tadd Wisinski", "Allentown, PA", "Acquisition", "N/A", "Active", "PA-0039", "10/03/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39131, "ADT", "Tadd Wisinski", "Chattanooga, TN", "Acquisition", "N/A", "Active", "TN-0011", "10/03/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39133, "ADT", "Tadd Wisinski", "Omaha, NE", "Acquisition", "N/A", "Active", "NE-0006", "10/03/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39134, "ADT", "Tadd Wisinski", "Goleta, CA", "Acquisition", "N/A", "Active", "CA-0103", "10/03/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39136, "ADT", "Tadd Wisinski", "Palos Verdes", "Renewal", "N/A", "Active", "CA-0078", "10/03/2022", 34, 6,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39137, "ADT", "Tadd Wisinski", "Cody, CA", "Renewal", "N/A", "Active", "CA-0079", "01/25/2022", 34, 7,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39138, "ADT", "Tadd Wisinski", "Jackson, NJ", "Renewal", "N/A", "Active", "NJ-0024", "10/03/2022", 34, 2,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39139, "ADT", "Tadd Wisinski", "Broadview Heights, OH", "Acquisition", "N/A", "Active", "OH-0021", "10/03/2022", 34, 1,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39462, "ADT", "Tadd Wisinski", "Cincinnati, OH", "Renewal", "N/A", "Active", "OH-0032", "10/24/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39464, "ADT", "Tadd Wisinski", "Fayetteville AR", "Renewal", "Phase 1: Project Definition", "Active", "AR-0011", "10/24/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39465, "ADT", "Tadd Wisinski", "Tucson AZ", "Acquisition", "N/A", "Active", "AZ-0010", "10/24/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39466, "ADT", "Tadd Wisinski", "Modesto CA", "Acquisition", "Phase 1: Project Definition", "Active", "CA-0002", "10/24/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39468, "ADT", "Tadd Wisinski", "Fort Wayne IN", "Acquisition", "N/A", "Active", "IN-0015", "10/24/2022", 34, 1,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39469, "ADT", "Tadd Wisinski", "South Bend IN", "Acquisition", "N/A", "Active", "IN-0011", "10/24/2022", 34, 1,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39470, "ADT", "Tadd Wisinski", "Maumee OH", "Acquisition", "N/A", "Active", "OH-0017", "10/24/2022", 34, 2,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39474, "ADT", "Tadd Wisinski", "Moraine OH", "Acquisition", "N/A", "Active", "OH-0030", "10/24/2022", 34, 6,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39476, "ADT", "Tadd Wisinski", "East Peoria IL", "Acquisition", "N/A", "Active", "IL-0037", "10/24/2022", 34, 8,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39477, "ADT", "Tadd Wisinski", "Pearl MS", "Renewal", "Phase 1: Project Definition", "Active", "MS-0001", "10/24/2022", 34, 9,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39478, "ADT", "Tadd Wisinski", "Bridgeville PA", "Acquisition", "N/A", "Active", "PA-0033", "10/24/2022", 34, 14,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39479, "ADT", "Tadd Wisinski", "Corpus Christi TX", "Acquisition", "N/A", "Active", "TX-0092", "10/24/2022", 34, 5,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39480, "ADT", "Tadd Wisinski", "San Antonio TX", "Acquisition", "N/A", "Active", "TX-0096", "10/24/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39485, "ADT", "Tadd Wisinski", "Columbus OH", "Acquisition", "N/A", "Active", "OH-0031", "10/24/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39489, "ADT", "Tadd Wisinski", "East Syracuse NY", "Acquisition", "N/A", "Active", "NY-0055", "10/24/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39521, "ADT", "Tadd Wisinski", "Tulsa OK", "Acquisition", "N/A", "Active", "OK-0008", "10/25/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39528, "ADT", "Tadd Wisinski", "Novi MI", "Acquisition", "N/A", "Active", "MI-0024", "10/25/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39565, "ADT", "Meghan Bransteter", "San Antonio TX", "Disposition", "N/A", "Active", "TX-0096A", "08/04/2022", 34, 7,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39733, "ADT", "Tadd Wisinski", "Eugene OR", "Acquisition", "N/A", "Active", "OR-0010", "11/14/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39735, "ADT", "Tadd Wisinski", "Roanoke VA", "Acquisition", "N/A", "Active", "VA-0032", "11/14/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39736, "ADT", "Tadd Wisinski", "Wichita KS - Parking", "Renewal", "N/A", "Active", "KS-0011", "11/14/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39737, "ADT", "Tadd Wisinski", "Flint, MI", "Acquisition", "N/A", "Active", "MI-0016", "11/14/2022", 34, 0,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39742, "ADT", "Tadd Wisinski", "Poca WV", "Acquisition", "N/A", "Active", "WV-0004", "11/14/2022", 34, 5,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39743, "ADT", "Tadd Wisinski", "Wilkes-Barre PA", "Acquisition", "N/A", "Active", "PA-0034", "11/14/2022", 34, 8,null,null,null,null,null,null,null,null,null,null),
    new Transaction(36181, "Amazon", "Edouard Van Gemert", "AMS13-Acquisition-Expansion-LT (Uber in AMS13)", "Acquisition", "N/A", "Active", "AMS13", "11/30/2021", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(36504, "Amazon", "Kristof Kovacs", "HEMxx Acquisition - Day 1 - LT", "Acquisition", "N/A", "Active", "HEMxx", "01/03/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(36505, "Amazon", "Cordelia Pilz", "HAMxx-Acquisition-Day1-LT", "Acquisition", "N/A", "Active", "HAMxx", "01/03/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(37034, "Amazon", "Magdalena Peberdy", "LYS10-Expansion-NA-SO", "Acquisition", "N/A", "Active", "LYS10", "11/12/2021", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(37035, "Amazon", "Magdalena Peberdy", "TLS10-Expansion-NA-SO", "Acquisition", "N/A", "Active", "TLS10", "11/12/2021", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(37036, "Amazon", "Magdalena Peberdy", "DXBxx-Aquisition-NA-SO-Storage Space", "Acquisition", "N/A", "Active", "DXBxx", "11/12/2021", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(37151, "Amazon", "Edouard Van Gemert", "BCN10-Other-NA-LT-(Leverage next BO )", "Other", "N/A", "Active", "BCN10", "11/04/2021", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(37152, "Amazon", "Edouard Van Gemert", "MAD12-Other-NA-LT-(Leverage next BO)", "Other", "N/A", "Active", "MAD12", "11/04/2021", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38209, "Amazon", "Kristof Kovacs", "LEJxx-Acquisition-Day1-IMO", "Acquisition", "N/A", "Active", "LEJxx", "02/10/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(38262, "Amazon", "Philip Purves", "CWLxx-Acquisition-Day1-LT", "Acquisition", "N/A", "Active", "CWL", "03/11/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39036, "Amazon", "Justyna Jewula", "BER17-Renewal-NA-SO", "Renewal", "N/A", "Active", "BER17", "01/13/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39059, "Amazon", "Cordelia Pilz", "BER1-Renewal-POP-LT-CS", "Renewal", "N/A", "Active", "BER1", "01/17/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39420, "Amazon", "Justyna Jewula", "OXFxx-Acquisition-NA-SO", "Acquisition", "N/A", "Active", "OXFxx", "03/01/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39616, "Amazon", "Kristof Kovacs", "RBAxx Acquisition - Day 1 - SO - Blackcomb", "Acquisition", "N/A", "Active", "RBAxx", "06/09/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39617, "Amazon", "Kristof Kovacs", "BER17 Renewal - N/A - SO", "Renewal", "N/A", "Active", "BER17", "02/21/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39618, "Amazon", "Kristof Kovacs", "BERxx Acquisition - Day 1 - SO - ADS", "Acquisition", "N/A", "Active", "BERxx", "06/09/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
    new Transaction(39620, "Amazon", "Kristof Kovacs", "BCN14 Renewal - N/A - SO", "Renewal", "N/A", "Active", "BCN14", "02/21/2022", 34, 26,null,null,null,null,null,null,null,null,null,null),
];

