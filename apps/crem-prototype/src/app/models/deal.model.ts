// Deal is the primary object

export class Deal {
    id : Number;
    dealName : String;
	dealType : String; // New, Renewal, Expansion, Relocation
	dealStage : String; // RFI, Tour, Proposal, LOI, Lease, Completed
	dealDescription : String;
	brokerage : String;
	totalLeaseValue : Number;
	latestActivity : String;
	property : String;
	targetMinSF : Number;
	targetMaxSF : Number;
	targetSpaceType : String;
	targetSpaceClass : String;
	targetMarket : String; // multiselect
	targetSubmarket : String; // multiselect
	targetCommencementDate : String;
	targetMinLeaseTerm : Number;
	targetMaxLeaseTerm : Number;
	tenantBroker : String;
	space : string;
	location : string;
	landlordName : string;
	landlordBroker : string;
	numberOfPeople : number;
	market: string;
	tenant : string;
	tenantContact : string;
	completeDate: string;
	netEffectiveRent : number;
	notes : string;


	// avgMarketRent : String;
	// avgSubmarketRent : String;
	// numberOfPeople : String;
	// currentBuilding : String;
	// currentLease : String;
	// currentRentSFYear : String;
	// currentExpiration : String;
	// currentSF : String;
	// selectedSpace : String;
	// prospectiveSpaces : String; // competitors in OLO world
	// mktDataNumberProspectiveSpaces : String; // market data in OLO world
	// mktDataGrossAskingRent : String;
	// mktDataVacancyRate : String;
	// mktDataAvgMonthsOnMarket : String;
	// leaseCompDeals : String;
	// leaseCompRent : String;
	// leaseCompVacancyRate : String;
	// activityViews : String;
	// activityViewPeerAverage : String;
	// activitySearch : String;
	// activitySearchPeerAverage : String;
	// nearbyTenantsExpiring : String;
	// recentDeals : String;
	

	constructor(id,dealName,dealType,dealStage,dealDescription,brokerage,totalLeaseValue,latestActivity,property,targetMinSF,targetMaxSF,targetSpaceType,targetSpaceClass,targetMarket,targetSubmarket,targetCommencementDate,targetMinLeaseTerm,targetMaxLeaseTerm,tenantBroker,space,location,landlordName,landlordBroker,numberOfPeople, market, tenant, tenantContact, completeDate, netEffectiveRent, notes//,avgMarketRent,avgSubmarketRent,numberOfPeople,currentBuilding,currentLease,currentRentSFYear,currentExpiration,currentSF,selectedSpace,prospectiveSpaces,mktDataNumberProspectiveSpaces,mktDataGrossAskingRent,mktDataVacancyRate,mktDataAvgMonthsOnMarket,leaseCompDeals,leaseCompRent,leaseCompVacancyRate,activityViews,activityViewPeerAverage,activitySearch,activitySearchPeerAverage,nearbyTenantsExpiring,recentDeals
	) {
		this.id = id;
		this.dealName = dealName;
		this.dealType = dealType;
		this.dealStage = dealStage;
		this.dealDescription = dealDescription;
		this.brokerage = brokerage;
		this.totalLeaseValue = totalLeaseValue;
		this.latestActivity = latestActivity;
		this.property = property;
		this.targetMinSF = targetMinSF;
		this.targetMaxSF = targetMaxSF;
		this.targetSpaceType = targetSpaceType;
		this.targetSpaceClass = targetSpaceClass;
		this.targetMarket = targetMarket;
		this.targetSubmarket = targetSubmarket;
		this.targetCommencementDate = targetCommencementDate;
		this.targetMinLeaseTerm = targetMinLeaseTerm;
		this.targetMaxLeaseTerm = targetMaxLeaseTerm;
		this.tenantBroker = tenantBroker;
		this.space = space;
		this.location = location;
		this.landlordName = landlordName;
		this.landlordBroker = landlordBroker;
		this.numberOfPeople = numberOfPeople;
		this.market = market;
		this.tenant = tenant;
		this.tenantContact = tenantContact;
		this.completeDate = completeDate;
		this.netEffectiveRent = netEffectiveRent;
		this.notes = notes;

		// this.avgMarketRent = avgMarketRent;
		// this.avgSubmarketRent = avgSubmarketRent;
		// this.numberOfPeople = numberOfPeople;
		// this.currentBuilding = currentBuilding;
		// this.currentLease = currentLease;
		// this.currentRentSFYear = currentRentSFYear;
		// this.currentExpiration = currentExpiration;
		// this.currentSF = currentSF;
		// this.selectedSpace = selectedSpace;
		// this.prospectiveSpaces = prospectiveSpaces;
		// this.mktDataNumberProspectiveSpaces = mktDataNumberProspectiveSpaces;
		// this.mktDataGrossAskingRent = mktDataGrossAskingRent;
		// this.mktDataVacancyRate = mktDataVacancyRate;
		// this.mktDataAvgMonthsOnMarket = mktDataAvgMonthsOnMarket;
		// this.leaseCompDeals = leaseCompDeals;
		// this.leaseCompRent = leaseCompRent;
		// this.leaseCompVacancyRate = leaseCompVacancyRate;
		// this.activityViews = activityViews;
		// this.activityViewPeerAverage = activityViewPeerAverage;
		// this.activitySearch = activitySearch;
		// this.activitySearchPeerAverage = activitySearchPeerAverage;
		// this.nearbyTenantsExpiring = nearbyTenantsExpiring;
		// this.recentDeals = recentDeals;
		

	}
}

export let deals : Deal[] = [
	// id,dealName,dealType,dealStage,dealDescription,brokerage,totalLeaseValue,latestActivity,propertyId,targetMinSF,targetMaxSF,targetSpaceType,targetSpaceClass,targetMarket,targetSubmarket,targetCommencementDate,targetMinLeaseTerm,targetMaxLeaseTerm,tenantBroker
	new Deal(1, "Upper Manhattan Office", "New", "Proposal", null, "CRESA", 9806637, "Sally Maher shared a Landlord Counter", 660, 150000, 35000, "Office", "A", "East End", "CBD", "3/1/2020", 5, 10, "Rich Rhodes", "5th, 6th Floor East Tower", "East End, CBD", "Akridge", "Michael Katcher", 200, null, null, null, null, null, null),	
	new Deal(2, "DC Headquarters Renewal", "Renewal", "Tour", null, "CBRE", 9806637, "Sally Maher shared a Landlord Counter", 660, 150000, 200000, "Office", "A", "Washington DC", "CBD", "9/1/2020", 5, 10, "Sally Maher", null, null, null, null, null, null, null, null, null, null, null),	
	new Deal(3, "North Buckead Atlanta", "New", "Proposal", null, "Newmark Knight Frank", 2596154, "Tim Marion shared a Landlord Proposal", 696, 10000, 20000, "Office", "A", "Atlanta", "Buckhead", "9/1/2020", 5, 10, "Tim Marion", null, null, null, null, null, null, null, null, null, null, null),	
	new Deal(4, "Boston Renewal", "Renewal", "Proposal", null, "Colliers International", 9806637, "Evan English uploaded a file", 628, 25000, 50000, "Office", "A", "Boston", "Financial District", "9/1/2020", 5, 10, "Evan English", null, null, null, null, null, null, null, null, null, null, null),	
	new Deal(5, "Philadelphia Expansion", "Expansion", "Proposal", null, "Newmark Knight Frank", 450261, "Tim Marion sent a Tenant Counter proposal to landlord", 648, 150000, 200000, "Office", "A", "Philadelphia", "CBD", "9/1/2020", 5, 10, "Tim Marion", null, null, null, null, null, null, null, null, null, null, null),	
	new Deal(6, "Irvine Expansion", "Expansion", "Proposal", null, "Cushman & Wakefield", 450261, "Kurt Richter sent a Tenant Counter proposal to landlord", 648, 150000, 200000, "Office", "A", "Irvine", "CBD", "9/1/2020", 5, 10, "Kurt Richter", null, null, null, null, null, null, null, null, null, null, null),	
	new Deal(7, "Richmond Relocation", "Relocation", "Proposal", null, "Cushman & Wakefield", 450261, "Kurt Richter sent a Tenant Counter proposal to landlord", 648, 150000, 200000, "Office", "A", "Richmond", "CBD", "9/1/2020", 5, 10, "Kurt Richter", null, null, null, null, null, null, null, null, null, null, null),	
	new Deal(8, "Inner Loop Chicago", "Expansion", "Proposal", null, "Cushman & Wakefield", 450261, "Kurt Richter sent a Tenant Counter proposal to landlord", 648, 150000, 200000, "Office", "A", "Chicago", "CBD", "9/1/2020", 5, 10, "Kurt Richter", null, null, null, null, null, null, null, null, null, null, null),	
	new Deal(9, "London Expansion", "Expansion", "Proposal", null, "CBRE", 450261, "Sean Stanley sent a Tenant Counter proposal to landlord", 648, 150000, 200000, "Office", "A", "London", "CBD", "9/1/2020", 5, 10, "Sean Stanley", null, null, null, null, null, null, null, null, null, null, null),	
];
	
// // Prospective spaces are related to a Deal for a Tenant. 
// // A tenant may tour and request info for several prospective spaces and compare them
// // Prospective space is basically like a Competitor on the list on p107 of OLO.
// export class ProspectiveSpace {
// 	id;
// 	landlord;
// 	buildingName;
// 	address1;
// 	suite;
// 	availableSF;

// }

// // Proposals are then related to a Prospective Space for a Tenant.
// // A proposal may only be related to one prospective space
// // Multiple proposals may be related to the prospective space (Tenant Proposal, Landlord Counter, Tenant Counter, etc)
// // Proposals may be created for multiple prospective spaces.
// // Tenant will compare proposals across the prospective spaces as well as compare proposals of a prospective space
// export class Proposal {
// 	id;
// 	version;
// 	prospectiveSpaceId;
// 	createdBy;
// 	createdDate;
// 	term;
// 	baseRent;
// 	freeRent;
// 	opex;
// 	tia;
// }



// // p96-105 - Create Deal - 1.1-1.8.2
// // p107 - Deals - 1.1 Add Terms - Market Data, Competitive Summary, Gross Asking Rent line chart, Recent deals
// 	// all useful info for the tenant to have when pursuing space options
// // p109 - Deals - 1.3 Add Term / Create Proposal
// 	// In OLO, looks like the LL or LL Broker creates a proposal under a deal in order to send to the T?  Is that right?  
// 	// Would the T or T broker create a similar Proposal when selecting a site or is it usually LL driven?
// // p113 - Deals - 1.7 Add Terms - Cash Flow 
// 	// In OLO, there a is a T and LL toggle on the Cash Flow, but didn't see the T perspective
// // p121 - Compare - 1.4 Compare Versions
// 	// In OLO, there a is a T and LL toggle on the compare page, but didn't see the T perspective
// 	// Toggle between comparing Financials and Terms, but also a toggle between Summary and Charts on the Financials compare page



