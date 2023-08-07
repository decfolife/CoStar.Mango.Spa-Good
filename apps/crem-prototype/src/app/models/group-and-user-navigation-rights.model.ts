export class GroupAndUserNavigationRightsCenter {
    type: string;
    id: number;
    name: string;
    cacheTable: string;
    details: string;
    coStar: string;
    deals: string;
    strategy: string;
    propertyTaxes: string;
    viewHistory: string;
    securityRights: string;
    files: string;
    notes: string;

	constructor(type, id, name, cacheTable, details, coStar, deals, strategy, propertyTaxes, viewHistory, securityRights, files, notes) {
        this.type = type;
		this.id = id;
		this.name = name;
		this.cacheTable = cacheTable;
        this.details = details;
        this.coStar = coStar;
        this.deals = deals;
        this.strategy = strategy;
		this.propertyTaxes = propertyTaxes;
		this.viewHistory = viewHistory;		
		this.securityRights = securityRights;	
		this.files = files;	
		this.notes = notes;			
	}
}

export let groupAndUserNavigationRightsCenter : GroupAndUserNavigationRightsCenter[] = [
    new GroupAndUserNavigationRightsCenter('user', 1, 'Adams, Samuel','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted'),
    new GroupAndUserNavigationRightsCenter('user', 2, 'Architect, Project','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted'),
    new GroupAndUserNavigationRightsCenter('user', 3, 'Arregetti, Jake','Delete - EXPLICIT USER RIGHT','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Delete - EXPLICIT USER RIGHT','Unrestricted','Unrestricted'),
    new GroupAndUserNavigationRightsCenter('user', 4, 'B, Kristin','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted'),
    new GroupAndUserNavigationRightsCenter('group', 100, 'Acme Brands Portfolio','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted'),
    new GroupAndUserNavigationRightsCenter('group', 101, 'Projects','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted'),
    new GroupAndUserNavigationRightsCenter('group', 102, 'R_Portfolio','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted')
    ]

export class GroupAndUserNavigationRightsLease {
    type: string;
    id: number;
    name: string;
    allocations: string
    leaseTerms: string
    metricsEdit: string
    expenseCalc: string
    salesData: string
    salesReporting: string
    expenses: string;
    expensesInCalendarView: string;
    revenue: string;
    revenueByCalendarView: string;
    taxSettings: string;
    chargeGroups: string;
    aRChargeGroups: string;
    adjRules: string;
    adjRuleHistory: string;
    mtmHoldover: string;
    invoices: string;
    accruals: string;
    accounting: string;
    details: string;
    financials: string;
    subleases: string;
    leaseVerification: string;
    percentRent: string;
    auditTracker: string;
    operatingExpenses: string;
    adam: string;
    metrics: string;
    reminders: string;
    notes: string;
    files: string;
    securityRights: string;
    viewHistory: string;

	constructor(type, id, name, allocations, leaseTerms, metricsEdit, expenseCalc, salesData, salesReporting, expenses, expensesInCalendarView, revenue, revenueByCalendarView, taxSettings, chargeGroups, aRChargeGroups, adjRules, adjRuleHistory, mtmHoldover, invoices, accruals, accounting, details, financials, subleases, leaseVerification, percentRent, auditTracker, operatingExpenses, adam, metrics, reminders, notes, files, securityRights, viewHistory) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.allocations = allocations;
        this.leaseTerms = leaseTerms;
        this.metricsEdit = metricsEdit;
        this.expenseCalc = expenseCalc;
        this.salesData = salesData;
        this.salesReporting = salesReporting;
        this.expenses = expenses;
        this.expensesInCalendarView = expensesInCalendarView;
        this.revenue = revenue;
        this.revenueByCalendarView = revenueByCalendarView;
        this.taxSettings = taxSettings;
        this.chargeGroups = chargeGroups;
        this.aRChargeGroups = aRChargeGroups;
        this.adjRules = adjRules;
        this.adjRuleHistory = adjRuleHistory;
        this.mtmHoldover = mtmHoldover;
        this.invoices = invoices;
        this.accruals = accruals;
        this.accounting = accounting;
        this.details = details;
        this.financials = financials;
        this.subleases = subleases;
        this.leaseVerification = leaseVerification;
        this.percentRent = percentRent;
        this.auditTracker = auditTracker;
        this.operatingExpenses = operatingExpenses;
        this.adam = adam;
        this.metrics = metrics;
        this.reminders = reminders;
        this.notes = notes;
        this.files = files;
        this.securityRights = securityRights;
        this.viewHistory = viewHistory;
	}
}

export let groupAndUserNavigationRightsLease : GroupAndUserNavigationRightsLease[] = [
    new GroupAndUserNavigationRightsLease('user', 1, 'Adams, Samuel','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','View - EXPLICIT GROUP RIGHT - Acme Brands Portfolio','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Delete - EXPLICIT GROUP RIGHT - Acme Brands Portfolio','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted'),
    new GroupAndUserNavigationRightsLease('user', 2, 'Architect, Project','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','View - EXPLICIT GROUP RIGHT - Acme Brands Portfolio','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Delete - EXPLICIT GROUP RIGHT - Acme Brands Portfolio','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted'),
    new GroupAndUserNavigationRightsLease('user', 3, 'Arregetti, Jake','Unrestricted','Unrestricted','Delete - EXPLICIT USER RIGHT','Unrestricted','Unrestricted','View - EXPLICIT GROUP RIGHT - Acme Brands Portfolio','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Delete - EXPLICIT USER RIGHT','Unrestricted','Delete - EXPLICIT USER RIGHT','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Delete - EXPLICIT USER RIGHT','Unrestricted','Unrestricted','Unrestricted','Delete - EXPLICIT USER RIGHT','Unrestricted'),
    new GroupAndUserNavigationRightsLease('user', 4, 'B, Kristin','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','View - EXPLICIT GROUP RIGHT - Acme Brands Portfolio','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Delete - EXPLICIT GROUP RIGHT - Acme Brands Portfolio','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted'),
    new GroupAndUserNavigationRightsLease('group', 100, 'Acme Brands Portfolio','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','View - Explicit','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Delete - Explicit','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted'),
    new GroupAndUserNavigationRightsLease('group', 101, 'Projects','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted'),
    new GroupAndUserNavigationRightsLease('group', 102, 'R_Portfolio','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups','Unrestricted')
]

export class GroupAndUserNavigationRightsMarket {
    type: string;
    id: number;
    name: string;
    market: string;

	constructor(type, id, name, market) {
        this.type = type;
		this.id = id;
		this.name = name;
		this.market = market;		
	}
}

export let groupAndUserNavigationRightsMarket : GroupAndUserNavigationRightsMarket[] = [
    new GroupAndUserNavigationRightsMarket('user', 1, 'Adams, Samuel', 'Unrestricted'),
    new GroupAndUserNavigationRightsMarket('user', 2, 'Architect, Project', 'Unrestricted'),
    new GroupAndUserNavigationRightsMarket('user', 3, 'Arregetti, Jake', 'Unrestricted'),
    new GroupAndUserNavigationRightsMarket('user', 4, 'B, Kristin', 'Unrestricted'),
    new GroupAndUserNavigationRightsMarket('group', 100, 'Acme Brands Portfolio', 'Unrestricted'),
    new GroupAndUserNavigationRightsMarket('group', 101, 'Projects','Unrestricted'),
    new GroupAndUserNavigationRightsMarket('group', 102, 'R_Portfolio', 'Unrestricted')
]


export class GroupAndUserNavigationRightsStore {
    type: string;
    id: string;
    name: string;
    cacheTable: string;
    storeDetails: string;
    coTenancyUse: string;
    workOrders: string;
    permits: string;
    files: string;
    notes: string;
    viewHistory: string;
    securityRights: string

	constructor(type, id, name, cacheTable, storeDetails, coTenancyUse, workOrders, permits, files, notes, viewHistory, securityRights) {
        this.type = type;
		this.id = id;
		this.name = name;
		this.cacheTable = cacheTable;
        this.storeDetails = storeDetails;
        this.coTenancyUse = coTenancyUse;
        this.workOrders = workOrders;
        this.permits = permits;
        this.files = files;
        this.notes = notes;
        this.viewHistory = viewHistory;
        this.securityRights = securityRights;
	}
}

export let groupAndUserNavigationRightsStore : GroupAndUserNavigationRightsStore[] = [
    new GroupAndUserNavigationRightsStore('user', 1, 'Adams, Samuel','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups'),
    new GroupAndUserNavigationRightsStore('user', 2, 'Architect, Project','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups'),
    new GroupAndUserNavigationRightsStore('user', 3, 'Arregetti, Jake','Delete - EXPLICIT USER RIGHT','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Delete - EXPLICIT USER RIGHT'),
    new GroupAndUserNavigationRightsStore('user', 4, 'B, Kristin','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups'),
    new GroupAndUserNavigationRightsStore('user', 100, 'Acme Brands Portfolio','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups'),
    new GroupAndUserNavigationRightsStore('user', 101, 'Projects','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups'),
    new GroupAndUserNavigationRightsStore('user', 102, 'R_Portfolio','Block - Automatically Block Unassigned Groups','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Unrestricted','Block - Automatically Block Unassigned Groups')
]

export class GroupAndUserNavigationRights {
    lease: GroupAndUserNavigationRightsLease[]
    center: GroupAndUserNavigationRightsCenter[]
    market: GroupAndUserNavigationRightsMarket[]
    store: GroupAndUserNavigationRightsStore[]
}

export let groupAndUserNavigationRights : GroupAndUserNavigationRights = {
    lease: groupAndUserNavigationRightsLease,
    center: groupAndUserNavigationRightsCenter,
    market: groupAndUserNavigationRightsMarket,
    store: groupAndUserNavigationRightsStore,
}


export const marketColumnsmodel = [
    {
    dataField: "type",
    alignment: null,
    visible: true,
    dataType: "string",
    groupIndex : 1
    },
    {
    dataField: "id",
    alignment: null,
    visible: true,
    dataType: "number"
    },
    {
    dataField: "name",
    alignment: null,
    visible: true,
    dataType: "string"
    },
    {
    dataField: "market",
    alignment: null,
    visible: true,
    dataType: "string"
    }
]

export const storeColumnsModel = [
    {
    dataField: "type",
    alignment: null,
    visible: true,
    dataType: "string",
    groupIndex : 1
    },
    {
    dataField: "id",
    alignment: null,
    visible: true,
    dataType: "number"
    },
    {
    dataField: "name",
    alignment: null,
    visible: true,
    dataType: "string"
    },
    {
    dataField: "cacheTable",
    alignment: null,
    visible: true,
    dataType: "string"
    },
    {
    dataField: "storeDetails",
    alignment: null,
    visible: true,
    dataType: "string"
    },
    {
    dataField: "coTenancyUse",
    alignment: null,
    visible: true,
    dataType: "string"
    },
    {
    dataField: "workOrders",
    alignment: null,
    visible: true,
    dataType: "string"
    },
    {
    dataField: "permits",
    alignment: null,
    visible: true,
    dataType: "string"
    },
    {
    dataField: "files",
    alignment: null,
    visible: true,
    dataType: "string"
    },
    {
    dataField: "notes",
    alignment: null,
    visible: true,
    dataType: "string"
    },
    {
    dataField: "viewHistory",
    alignment: null,
    visible: true,
    dataType: "string"
    },
    {
    dataField: "securityRights",
    alignment: null,
    visible: true,
    dataType: "string"
    }
]

export const centerColumnsModel = [
    {
      dataField: "type",
              alignment: null,
              visible: true,
              dataType: "string",
              groupIndex : 1
    },
          {
      dataField: "id",
              alignment: null,
              visible: true,
              dataType: "number"
          },
          {
      dataField: "name",
              alignment: null,
              visible: true,
              dataType: "string"
    },
    {
      dataField: "cacheTable",
              alignment: null,
              visible: true,
              dataType: "string"
          },
          {
              dataField: "details",
              alignment: null,
              visible: true,
              dataType: "string"
          },
          {
      dataField: "coStar",
              alignment: null,
              visible: true,
              dataType: "string"
          },
          {
      dataField: "deals",
              alignment: null,
              visible: true,
              dataType: "string"
          },
          {
      dataField: "strategy",
              alignment: null,
              visible: true,
              dataType: "string"
          },
          {
      dataField: "propertyTaxes",
              alignment: null,
              visible: true,
              dataType: "string"
          },
          {
      dataField: "viewHistory",
              alignment: null,
              visible: true,
              dataType: "string"
          },
          {
      dataField: "securityrights",
              alignment: null,
              visible: true,
              dataType: "string"
          },
          {
      dataField: "files",
              alignment: null,
              visible: true,
              dataType: "string"
          },
          {
      dataField: "notes",
              alignment: null,
              visible: true,
              dataType: "string"
          }
  ];

export const leaseColumnsModel = [
    {
        dataField: "type",
        alignment: null,
        visible: true,
        dataType: "string",
        groupIndex : 1
    },
    {
        dataField: "id",
        alignment: null,
        visible: true,
        dataType: "number"
    },
    {
        dataField: "name",
        alignment: null,
        visible: true,
        dataType: "string"
    },
    {
        dataField: "allocations",
        alignment: null,
        visible: true,
        dataType: "string"
    },
    {
        dataField: "leaseTerms",
        alignment: null,
        visible: true,
        dataType: "string"
    },
    {
        dataField: "metricsEdit",
        alignment: null,
        visible: true,
        dataType: "string"
    },
    {
        dataField: "expenseCalc",
        alignment: null,
        visible: true,
        dataType: "string"
    },
    {
        dataField: "expenseCalc",
        alignment: null,
        visible: true,
        dataType: "string"
    },
    {
        dataField: "salesData",
        alignment: null,
        visible: true,
        dataType: "string"
    },
    {
        dataField: "salesReporting",
        alignment: null,
        visible: true,
        dataType: "string"
    },
    {
      dataField: "expenses",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "expensesInCalendarView",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "revenue",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "revenueByCalendarView",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "taxSettings",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "chargeGroups",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "aRChargeGroups",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "adjRules",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "adjRuleHistory",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "mtmHoldover",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "invoices",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "accruals",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "accounting",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "details",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "financials",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "subleases",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "leaseVerification",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "percentRent",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "auditTracker",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "operatingExpenses",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "adam",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "metrics",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "reminders",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "notes",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "files",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "securityRights",
      alignment: null,
      visible: true,
      dataType: "string"
      },
      {
      dataField: "viewHistory",
      alignment: null,
      visible: true,
      dataType: "string"
      }
];