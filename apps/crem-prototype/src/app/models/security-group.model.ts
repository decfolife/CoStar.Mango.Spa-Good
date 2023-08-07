export class SecurityGroup {
	id : number;
	name : string;
    parentGroupId : number;
    isPortfolio : boolean;
    looksUp : boolean;


	constructor(id, name, parentGroupId, isPortfolio, looksUp) {
		this.id = id;
		this.name = name;
		this.parentGroupId = parentGroupId;
        this.isPortfolio = isPortfolio;
        this.looksUp = looksUp;
	}

}

export let securityGroups : SecurityGroup[] = [
	new SecurityGroup(290,"Filler-Group","278",false,false),
    new SecurityGroup(291,"ACME","290",true,false),
    new SecurityGroup(299,"Filler-New Client Name","278",false,false),
    new SecurityGroup(300,"Lease Services","301",false,true),
    new SecurityGroup(301,"Lease Services: Admin","278",false,true),
    new SecurityGroup(306,"ACME Financial","291",false,true),
    new SecurityGroup(2037,"ACME Consumer Products - View Only","291",false,true),
    new SecurityGroup(2045,"FASCO, Inc.","290",true,false),
    new SecurityGroup(2054,"Acme Technology","291",false,true),
    new SecurityGroup(2059,"Filler - DO NOT USE - RESERVED FOR CLIENT PORTFOLIO","278",false,false),
    new SecurityGroup(2060,"DO NOT USE - RESERVED FOR CLIENT PORTFOLIO","2059",true,false),
    new SecurityGroup(2088,"RESERVED FOR CLIENT PORTFOLIO- View Only","2060",false,true),
    new SecurityGroup(2155,"Lease Accounting","2059",false,false),
    new SecurityGroup(2159,"North America","291",false,true),
    new SecurityGroup(2160,"Acme View Only Test 1","291",false,true),
    new SecurityGroup(2170,"Novelis","291",false,true),
    new SecurityGroup(2173,"Test Group1","2037",false,true),
    new SecurityGroup(2174,"Test Group 2 &","306",false,true),
    new SecurityGroup(2175,"Test Group 3","2054",false,true),
    new SecurityGroup(2176,"Test Group 4","2037",false,true),
    new SecurityGroup(2177,"Test Group 5","291",false,true),
    new SecurityGroup(2188,"RS Test Group","306",false,true),
    new SecurityGroup(2191,"Retail Acme","290",true,false),
    new SecurityGroup(2193,"Test GRP 1","2173",false,true),
    new SecurityGroup(2194,"R","2193",false,false),
    new SecurityGroup(2195,"CGC Test","290",false,false),
    new SecurityGroup(2196,"RE Admin","306",false,false),
    new SecurityGroup(2197,"RE Admin","290",false,false),
    new SecurityGroup(2203,"R & D","291",false,false),
    new SecurityGroup(2205,"Financial User","2054",false,false),
    new SecurityGroup(2206,"Acme Technology - View Only","2054",false,false),
    new SecurityGroup(2207,"patrick's","291",false,false),
    new SecurityGroup(2209,"Equipment Lease Admin","291",false,false),
    new SecurityGroup(2210,"RE Lease Admin","291",false,false),
    new SecurityGroup(2215,"Portfolio Training","290",false,true),
    new SecurityGroup(2216,"Portfolio Financials Training","290",false,true),
    new SecurityGroup(2218,"Custom Calendar portfolio","290",true,false),
    new SecurityGroup(2223,"training","291",false,false),
    new SecurityGroup(2226,"Test Group2","2195",false,false),
    new SecurityGroup(2227,"Test Group 1","2191",false,false),
    new SecurityGroup(2228,"Test Group 3","2227",false,false),
    new SecurityGroup(2231,"GGTest","290",false,false),
    new SecurityGroup(2232,"COSTAR TEST System Admin Child GROUP","290",false,false),
    new SecurityGroup(2236,"JJ Security Group Test","291",false,true),
    new SecurityGroup(2240,"Philip Test Portfolio 2","290",true,false),
    new SecurityGroup(2241,"Philip Test Security Group","2240",false,false),
    new SecurityGroup(2242,"Restricted Admin Links Group","291",false,false),
    new SecurityGroup(2257,"MLCPortfolio","290",true,false),
    new SecurityGroup(2258,"MLCPortfolio","290",true,false),
    new SecurityGroup(2263,"test","290",true,false),
    new SecurityGroup(2264,"vfdsa","2263",false,false),
    new SecurityGroup(2265,"MLCPortfolio720","290",true,false),
    new SecurityGroup(2266,"sec mlc 720","2265",false,false),
    new SecurityGroup(2267,"MC720missing","290",true,false),
    new SecurityGroup(2285,"te","290",true,false),
    new SecurityGroup(2286,"__HOPE","290",true,false),
];


	