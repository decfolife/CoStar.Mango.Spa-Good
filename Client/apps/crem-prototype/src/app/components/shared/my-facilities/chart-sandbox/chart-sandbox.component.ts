import { Component, OnInit } from '@angular/core';
export class InflationEntry {
	date: Date; valHigh: number; valLow: number; valHigh2: number; valLow2: number; mydata: number; costar: number; mydataongoing: number; OCCMe: number; OCCP: number; OCCCo: number; OpexMe: number; OpexPHi: number; OpexPLo: number; OpexCo: number; leasessignedpeer: number; leasessignedme: number; leasessignedpcostar: number; leasetermme: number; leasetermpeer: number;
}
export class ongoingRSF {
	ID: string; Apr2020OngoingRSF: string; May2020OngoingRSF: string; Jun2020OngoingRSF: string; Jul2020OngoingRSF: string; Aug2020OngoingRSF: string; Sep2020OngoingRSF: string; Oct2020OngoingRSF: string; Nov2020OngoingRSF: string; Dec2020OngoingRSF: string; Jan2021OngoingRSF: string; Feb2021OngoingRSF: string; Mar2021OngoingRSF: string;
}
export class initialRSF {
	ID: string; Apr2020InitialRSF: string; May2020InitialRSF: string; Jun2020InitialRSF: string; Jul2020InitialRSF: string; Aug2020InitialRSF: string; Sep2020InitialRSF: string; Oct2020InitialRSF: string; Nov2020InitialRSF: string; Dec2020InitialRSF: string; Jan2021InitialRSF: string; Feb2021InitialRSF: string; Mar2021InitialRSF: string;
}
export class occupancyPCT {
	ID: string; Apr2020OccupancyPct: string; May2020OccupancyPct: string; Jun2020OccupancyPct: string; Jul2020OccupancyPct: string; Aug2020OccupancyPct: string; Sep2020OccupancyPct: string; Oct2020OccupancyPct: string; Nov2020OccupancyPct: string; Dec2020OccupancyPct: string; Jan2021OccupancyPct: string; Feb2021OccupancyPct: string; Mar2021OccupancyPct: string;
}
export class opexData {
	ID: string; Apr2020Opex: string; May2020Opex: string; Jun2020Opex: string; Jul2020Opex: string; Aug2020Opex: string; Sep2020Opex: string; Oct2020Opex: string; Nov2020Opex: string; Dec2020Opex: string; Jan2021Opex: string; Feb2021Opex: string; Mar2021Opex: string;
}
export class peerSets {
	peerset: string;
}
export class DashboardHero {
	title: string;
	hero: string;
	sidekick: string;
	subtitle: string;
	helpText: string;
	visible: boolean;

	constructor(title, hero, sidekick, subtitle, helpText, visible) {
		this.title = title;
		this.hero = hero;
		this.sidekick = sidekick;
		this.subtitle = subtitle;
		this.helpText = helpText;
		this.visible = visible;
	}
}
@Component({ selector: 'chart-sandbox', templateUrl: './chart-sandbox.component.html', styleUrls: ['./chart-sandbox.component.scss'] })

export class ChartSandboxComponent implements OnInit {
	inflationData: InflationEntry[] = [
		{ date: new Date(2020, 3, 1), valHigh: 75, valLow: 30, mydata: 75, valHigh2: 75, valLow2: 30, mydataongoing: 55, costar: 55, OCCMe: 90, OCCP: 75, OCCCo: 78, OpexMe: 55, OpexPHi: 75, OpexPLo: 50, OpexCo: 70, leasessignedpeer: 5, leasessignedme: 1, leasessignedpcostar: 0, leasetermme: 5, leasetermpeer: 5 },
		{ date: new Date(2020, 4, 1), valHigh: 55, valLow: 20, mydata: 0, valHigh2: 75, valLow2: 30, mydataongoing: 55, costar: 55, OCCMe: 90, OCCP: 75, OCCCo: 78, OpexMe: 55, OpexPHi: 75, OpexPLo: 50, OpexCo: 65, leasessignedpeer: 8, leasessignedme: 0, leasessignedpcostar: 0, leasetermme: 0, leasetermpeer: 3 },
		{ date: new Date(2020, 5, 1), valHigh: 75, valLow: 50, mydata: 0, valHigh2: 75, valLow2: 40, mydataongoing: 55, costar: 60, OCCMe: 85, OCCP: 68, OCCCo: 84, OpexMe: 55, OpexPHi: 80, OpexPLo: 55, OpexCo: 65, leasessignedpeer: 32, leasessignedme: 0, leasessignedpcostar: 0, leasetermme: 0, leasetermpeer: 10 },
		{ date: new Date(2020, 6, 1), valHigh: 60, valLow: 12, mydata: 60, valHigh2: 75, valLow2: 40, mydataongoing: 60, costar: 60, OCCMe: 100, OCCP: 70, OCCCo: 80, OpexMe: 60, OpexPHi: 90, OpexPLo: 55, OpexCo: 75, leasessignedpeer: 3, leasessignedme: 2, leasessignedpcostar: 0, leasetermme: 3, leasetermpeer: 10 },
		{ date: new Date(2020, 7, 1), valHigh: 80, valLow: 55, mydata: 65, valHigh2: 75, valLow2: 40, mydataongoing: 60, costar: 62.5, OCCMe: 95, OCCP: 80, OCCCo: 80, OpexMe: 60, OpexPHi: 80, OpexPLo: 55, OpexCo: 70, leasessignedpeer: 5, leasessignedme: 1, leasessignedpcostar: 0, leasetermme: 5, leasetermpeer: 10 },
		{ date: new Date(2020, 8, 1), valHigh: 70, valLow: 60, mydata: 0, valHigh2: 75, valLow2: 40, mydataongoing: 61.5, costar: 64.5, OCCMe: 95, OCCP: 80, OCCCo: 87, OpexMe: 75, OpexPHi: 75, OpexPLo: 65, OpexCo: 70, leasessignedpeer: 12, leasessignedme: 0, leasessignedpcostar: 0, leasetermme: 0, leasetermpeer: 5 },
		{ date: new Date(2020, 9, 1), valHigh: 75, valLow: 50, mydata: 55, valHigh2: 75, valLow2: 45, mydataongoing: 63, costar: 66.5, OCCMe: 95, OCCP: 85, OCCCo: 80, OpexMe: 75, OpexPHi: 80, OpexPLo: 70, OpexCo: 70, leasessignedpeer: 14, leasessignedme: 1, leasessignedpcostar: 0, leasetermme: 3, leasetermpeer: 10 },
		{ date: new Date(2020, 10, 1), valHigh: 75, valLow: 45, mydata: 0, valHigh2: 80, valLow2: 45, mydataongoing: 64.5, costar: 68.5, OCCMe: 95, OCCP: 75, OCCCo: 80, OpexMe: 80, OpexPHi: 70, OpexPLo: 60, OpexCo: 65, leasessignedpeer: 7, leasessignedme: 0, leasessignedpcostar: 0, leasetermme: 0, leasetermpeer: 10 },
		{ date: new Date(2020, 11, 1), valHigh: 80, valLow: 60, mydata: 65, valHigh2: 80, valLow2: 45, mydataongoing: 66, costar: 65.5, OCCMe: 95, OCCP: 80, OCCCo: 85, OpexMe: 80, OpexPHi: 90, OpexPLo: 70, OpexCo: 70, leasessignedpeer: 5, leasessignedme: 2, leasessignedpcostar: 0, leasetermme: 3, leasetermpeer: 5 },
		{ date: new Date(2021, 0, 1), valHigh: 50, valLow: 40, mydata: 0, valHigh2: 75, valLow2: 40, mydataongoing: 66, costar: 55.5, OCCMe: 100, OCCP: 85, OCCCo: 85, OpexMe: 90, OpexPHi: 100, OpexPLo: 65, OpexCo: 70, leasessignedpeer: 9, leasessignedme: 0, leasessignedpcostar: 0, leasetermme: 0, leasetermpeer: 7 },
		{ date: new Date(2021, 1, 1), valHigh: 65, valLow: 55, mydata: 0, valHigh2: 75, valLow2: 40, mydataongoing: 66, costar: 55.5, OCCMe: 85, OCCP: 80, OCCCo: 90, OpexMe: 90, OpexPHi: 95, OpexPLo: 70, OpexCo: 70, leasessignedpeer: 2, leasessignedme: 0, leasessignedpcostar: 0, leasetermme: 0, leasetermpeer: 3 },
		{ date: new Date(2021, 2, 1), valHigh: 50, valLow: 45, mydata: 0, valHigh2: 75, valLow2: 40, mydataongoing: 66, costar: 50.5, OCCMe: 85, OCCP: 80, OCCCo: 90, OpexMe: 80, OpexPHi: 90, OpexPLo: 60, OpexCo: 75, leasessignedpeer: 1, leasessignedme: 0, leasessignedpcostar: 0, leasetermme: 0, leasetermpeer: 5 }
	];
	ongoingrsfdata: ongoingRSF[] = [
		{ ID: "My Lease", Apr2020OngoingRSF: "$55.00", May2020OngoingRSF: "$55.00", Jun2020OngoingRSF: "$55.00", Jul2020OngoingRSF: "$60.00", Aug2020OngoingRSF: "$60.00", Sep2020OngoingRSF: "$61.50", Oct2020OngoingRSF: "$63.00", Nov2020OngoingRSF: "$64.50", Dec2020OngoingRSF: "$66.00", Jan2021OngoingRSF: "$66.00", Feb2021OngoingRSF: "$66.00", Mar2021OngoingRSF: "$66.00" },
		{ ID: "Peer Set", Apr2020OngoingRSF: "$40.00", May2020OngoingRSF: "$40.00", Jun2020OngoingRSF: "$45.00", Jul2020OngoingRSF: "$45.00", Aug2020OngoingRSF: "$47.50", Sep2020OngoingRSF: "$49.50", Oct2020OngoingRSF: "$51.50", Nov2020OngoingRSF: "$53.50", Dec2020OngoingRSF: "$55.50", Jan2021OngoingRSF: "$57.50", Feb2021OngoingRSF: "$59.50", Mar2021OngoingRSF: "$61.50" },
		{ ID: "Costar Research", Apr2020OngoingRSF: "$55.00", May2020OngoingRSF: "$55.00", Jun2020OngoingRSF: "$60.00", Jul2020OngoingRSF: "$60.00", Aug2020OngoingRSF: "$62.50", Sep2020OngoingRSF: "$64.50", Oct2020OngoingRSF: "$66.50", Nov2020OngoingRSF: "$68.50", Dec2020OngoingRSF: "$65.50", Jan2021OngoingRSF: "$55.50", Feb2021OngoingRSF: "$55.50", Mar2021OngoingRSF: "$50.50" },
		{ ID: "Rank", Apr2020OngoingRSF: "1 of 10", May2020OngoingRSF: "1 of 10", Jun2020OngoingRSF: "2 of 10", Jul2020OngoingRSF: "3 of 11", Aug2020OngoingRSF: "3 of 11", Sep2020OngoingRSF: "3 of 11", Oct2020OngoingRSF: "3 of 11", Nov2020OngoingRSF: "3 of 11", Dec2020OngoingRSF: "3 of 11", Jan2021OngoingRSF: "3 of 11", Feb2021OngoingRSF: "3 of 11", Mar2021OngoingRSF: "3 of 11" }];
	initialrsfdata: initialRSF[] = [
		{ ID: "My Lease", Apr2020InitialRSF: "$75.00", May2020InitialRSF: "", Jun2020InitialRSF: "", Jul2020InitialRSF: "$60.00", Aug2020InitialRSF: "$65.00", Sep2020InitialRSF: "", Oct2020InitialRSF: "$55.00", Nov2020InitialRSF: "", Dec2020InitialRSF: "$65.00", Jan2021InitialRSF: "", Feb2021InitialRSF: "", Mar2021InitialRSF: "" },
		{ ID: "Peer Set", Apr2020InitialRSF: "$65.00", May2020InitialRSF: "$70.00", Jun2020InitialRSF: "$70.00", Jul2020InitialRSF: "$50.00", Aug2020InitialRSF: "$55.00", Sep2020InitialRSF: "$55.00", Oct2020InitialRSF: "$60.00", Nov2020InitialRSF: "$65.00", Dec2020InitialRSF: "$70.00", Jan2021InitialRSF: "$90.00", Feb2021InitialRSF: "$75.00", Mar2021InitialRSF: "$70.00" },
		{ ID: "Costar Research", Apr2020InitialRSF: "$55.00", May2020InitialRSF: "$55.00", Jun2020InitialRSF: "$60.00", Jul2020InitialRSF: "$60.00", Aug2020InitialRSF: "$62.50", Sep2020InitialRSF: "$64.50", Oct2020InitialRSF: "$66.50", Nov2020InitialRSF: "$68.50", Dec2020InitialRSF: "$65.50", Jan2021InitialRSF: "$55.50", Feb2021InitialRSF: "$55.50", Mar2021InitialRSF: "$50.50" },
		{ ID: "Rank", Apr2020InitialRSF: "1 of 3", May2020InitialRSF: "", Jun2020InitialRSF: "", Jul2020InitialRSF: "1 of 4", Aug2020InitialRSF: "4 of 5", Sep2020InitialRSF: "", Oct2020InitialRSF: "4 of 4", Nov2020InitialRSF: "", Dec2020InitialRSF: "3 of 4", Jan2021InitialRSF: "", Feb2021InitialRSF: "", Mar2021InitialRSF: "" }
	];
	occupancypctdata: occupancyPCT[] = [
		{ ID: "My Lease", Apr2020OccupancyPct: "90%", May2020OccupancyPct: "90%", Jun2020OccupancyPct: "85%", Jul2020OccupancyPct: "100%", Aug2020OccupancyPct: "95%", Sep2020OccupancyPct: "95%", Oct2020OccupancyPct: "95%", Nov2020OccupancyPct: "95%", Dec2020OccupancyPct: "95%", Jan2021OccupancyPct: "100%", Feb2021OccupancyPct: "85%", Mar2021OccupancyPct: "85%" },
		{ ID: "Peer Set", Apr2020OccupancyPct: "75%", May2020OccupancyPct: "75%", Jun2020OccupancyPct: "68%", Jul2020OccupancyPct: "70%", Aug2020OccupancyPct: "80%", Sep2020OccupancyPct: "80%", Oct2020OccupancyPct: "85%", Nov2020OccupancyPct: "75%", Dec2020OccupancyPct: "80%", Jan2021OccupancyPct: "85%", Feb2021OccupancyPct: "80%", Mar2021OccupancyPct: "80%" },
		{ ID: "Costar Research", Apr2020OccupancyPct: "78%", May2020OccupancyPct: "78%", Jun2020OccupancyPct: "84%", Jul2020OccupancyPct: "80%", Aug2020OccupancyPct: "80%", Sep2020OccupancyPct: "87%", Oct2020OccupancyPct: "80%", Nov2020OccupancyPct: "80%", Dec2020OccupancyPct: "85%", Jan2021OccupancyPct: "85%", Feb2021OccupancyPct: "90%", Mar2021OccupancyPct: "90%" },
		{ ID: "Rank", Apr2020OccupancyPct: "1 of 10", May2020OccupancyPct: "1 of 10", Jun2020OccupancyPct: "2 of 10", Jul2020OccupancyPct: "3 of 11", Aug2020OccupancyPct: "3 of 11", Sep2020OccupancyPct: "3 of 11", Oct2020OccupancyPct: "3 of 11", Nov2020OccupancyPct: "3 of 11", Dec2020OccupancyPct: "3 of 11", Jan2021OccupancyPct: "3 of 11", Feb2021OccupancyPct: "3 of 11", Mar2021OccupancyPct: "3 of 11" }
	];
	opexdata: opexData[] = [
		{ ID: "My Lease", Apr2020Opex: "$55.00", May2020Opex: "$55.00", Jun2020Opex: "$55.00", Jul2020Opex: "$60.00", Aug2020Opex: "$60.00", Sep2020Opex: "$75.00", Oct2020Opex: "$75.00", Nov2020Opex: "$80.50", Dec2020Opex: "$80.00", Jan2021Opex: "$90.00", Feb2021Opex: "$90.00", Mar2021Opex: "$80.00" },
		{ ID: "Peer Set", Apr2020Opex: "$40.00", May2020Opex: "$40.00", Jun2020Opex: "$45.00", Jul2020Opex: "$45.00", Aug2020Opex: "$47.50", Sep2020Opex: "$49.50", Oct2020Opex: "$51.50", Nov2020Opex: "$53.50", Dec2020Opex: "$55.50", Jan2021Opex: "$57.50", Feb2021Opex: "$59.50", Mar2021Opex: "$61.50" },
		{ ID: "Costar Research", Apr2020Opex: "$55.00", May2020Opex: "$55.00", Jun2020Opex: "$60.00", Jul2020Opex: "$60.00", Aug2020Opex: "$62.50", Sep2020Opex: "$64.50", Oct2020Opex: "$66.50", Nov2020Opex: "$68.50", Dec2020Opex: "$65.50", Jan2021Opex: "$55.50", Feb2021Opex: "$55.50", Mar2021Opex: "$50.50" },
		{ ID: "Rank", Apr2020Opex: "1 of 10", May2020Opex: "1 of 10", Jun2020Opex: "2 of 10", Jul2020Opex: "3 of 11", Aug2020Opex: "3 of 11", Sep2020Opex: "3 of 11", Oct2020Opex: "3 of 11", Nov2020Opex: "3 of 11", Dec2020Opex: "3 of 11", Jan2021Opex: "3 of 11", Feb2021Opex: "3 of 11", Mar2021Opex: "3 of 11" }
	];
	peersetdata: peerSets[] = [
		{ peerset: "All North American Office Leases" },
		{ peerset: "Inline Retail under 15,000 Feed NNN Leases" },
		{ peerset: "NNN 5 Star Leases in [This] Market" }
	];
	heros: DashboardHero[] = [
		new DashboardHero('RSF', "$66", "0", "Peer Set $61.50", "Your average RSF is $4.50/SF over the selected peer set.", true),
		new DashboardHero('Occupancy %', "5%", "0", "Peer Set 80%", "Your average Occupancy Percent is 5% more the selected peer set.", true),
		new DashboardHero('Initial RSF', "$65", "- $5", "Last Signing December 2020", "You were $5 under the peer set at your last lease signing", true),
		new DashboardHero('Free Rent', "3 Mos.", null, "Peer Set 3 Mos", "Your average is the same as the selected peer set.", true),
		new DashboardHero('Escalations', "3%", "+.5%", "Peer Set 3.5%", "Your Rent Escalation is 0.5% lower than the selected peer set.", true)
	];
	customizeTooltip = (info: any) => { return { html: "<div><div class='tooltip-header'>" + info.argumentText + "</div>" + "<div class='tooltip-body'><div class='series-name'>" + "<span class='top-series-name'>" + info.points[0].seriesName + "</span>" + ": </div><div class='value-text'>" + "<span class='top-series-value'>$" + info.points[0].valueText + "</span>" + "</div><div class='series-name'>" + "<span class='bottom-series-name'>" + info.points[1].seriesName + "</span>" + ": </div><div class='value-text'>" + "<span class='bottom-series-value'>$" + info.points[1].valueText + "</span>" + "</div></div></div>" }; }
	customizeLabelText = (info: any) => { return info.valueText + "%"; }
	constructor() { }
	ngOnInit() {
	}
	customizeValueAxisText(args) { return "$" + args.valueText; }
	customizeValueAxisText2(args) { return args.valueText + '%'; }
}