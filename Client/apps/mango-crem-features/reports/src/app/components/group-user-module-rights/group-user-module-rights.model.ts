export class UserModuleRights {
  id: number;
  user: string;
  securityRole: string;
  company: string;
  primaryGroup: string;
  journalEntryExport: string;
  lease: string;
  listPage: string;
  mainHome: string;
  market: string;
  portfolio: string;
  region: string;
  report: string;

  constructor(
    id,
    user,
    securityRole,
    company,
    primaryGroup,
    journalEntryExport,
    lease,
    listPage,
    mainHome,
    market,
    portfolio,
    region,
    report
  ) {
    this.id = id;
    this.user = user;
    this.securityRole = securityRole;
    this.company = company;
    this.primaryGroup = primaryGroup;
    this.journalEntryExport = journalEntryExport;
    this.lease = lease;
    this.listPage = listPage;
    this.mainHome = mainHome;
    this.market = market;
    this.portfolio = portfolio;
    this.region = region;
    this.report = report;
  }
}

export class GroupModuleRights {
  id: number;
  securityGroup: string;
  journalEntryExport: string;
  lease: string;
  listPage: string;
  mainHome: string;
  market: string;
  portfolio: string;
  region: string;
  report: string;

  constructor(
    id,
    securityGroup,
    journalEntryExport,
    lease,
    listPage,
    mainHome,
    market,
    portfolio,
    region,
    report
  ) {
    this.id = id;
    this.securityGroup = securityGroup;
    this.journalEntryExport = journalEntryExport;
    this.lease = lease;
    this.listPage = listPage;
    this.mainHome = mainHome;
    this.market = market;
    this.portfolio = portfolio;
    this.region = region;
    this.report = report;
  }
}

export class UserGroupModuleRights {
  id: number;
  name: string;
  entityTypeId: number;
  securityLevel: string;
  primaryGroup: string;
  company: string;
  securityType: string;
  object: string;
  helpText: string;
  moduleDisplayName: string;
  cssStyle: string;

  constructor(
    id,
    name,
    entityTypeId,
    securityLevel,
    primaryGroup,
    company,
    securityType,
    object,
    helpText,
    moduleDisplayName,
    cssStyle
  ) {
    this.id = id;
    this.name = name;
    this.entityTypeId = entityTypeId;
    this.securityLevel = securityLevel;
    this.primaryGroup = primaryGroup;
    this.company = company;
    this.securityType = securityType;
    this.object = object;
    this.helpText = helpText;
    this.moduleDisplayName = moduleDisplayName;
    this.cssStyle = cssStyle;
  }
}

export interface ModuleRightDataRequest {
  userIds: string;
  groupIds: string;
  moduleIds: string;
}

export let userModuleRights: UserModuleRights[] = [
  new UserModuleRights(
    105,
    'Adams, Samuel',
    'User',
    'Acme Brands',
    'Acme Brands Portfolio',
    'Add',
    'Add',
    'View',
    'Add',
    'Add',
    'Add',
    'Add',
    ''
  ),
  new UserModuleRights(
    33,
    'Analyst, Financial',
    'Admin',
    'National Retail Corp',
    'Acme Brands Portfolio',
    'Add',
    'Add',
    'Delete',
    'Add',
    'Add',
    'Add',
    'Add',
    ''
  ),
  new UserModuleRights(
    44,
    'Architect, Project',
    'User',
    'Architectural Vision',
    'Acme Brands Portfolio',
    'Add',
    'Add',
    'Add',
    'Add',
    'Add',
    'Add',
    'Add',
    ''
  ),
  new UserModuleRights(
    2,
    'Arregetti, Jake',
    'Super User',
    'CoStar Real Estate Manager - (Group)',
    'Acme Brands Portfolio',
    'Add',
    'Add',
    'Add',
    'Add',
    'Add',
    'Add',
    'Add',
    ''
  ),
  new UserModuleRights(
    181,
    'B, Kristin',
    'User',
    'Acme Brands',
    'Acme Brands Portfolio',
    'Add',
    'Add',
    'Add',
    'Add',
    'Add',
    'Add',
    'Add',
    ''
  ),
  new UserModuleRights(
    183,
    'Baleson, Will',
    'Admin',
    'CoStar Real Estate Manager',
    'Region Access Rights',
    '',
    '',
    '',
    '',
    '',
    'Add',
    '',
    ''
  ),
];

export let groupModuleRights: GroupModuleRights[] = [
  new GroupModuleRights(
    310,
    'Acme Brands Portfolio',
    'Add',
    'Add',
    'Delete',
    'View',
    'Add',
    'Add',
    'Add',
    ''
  ),
  new GroupModuleRights(
    466,
    'FASCO Inc',
    '',
    '',
    'Add',
    'Add',
    'Add',
    '',
    '',
    ''
  ),
  new GroupModuleRights(
    446,
    'Region Access Rights',
    '',
    '',
    '',
    '',
    'Add',
    '',
    '',
    ''
  ),
  new GroupModuleRights(
    435,
    'Retail Corporation Vendors',
    '',
    '',
    '',
    '',
    'Add',
    '',
    '',
    ''
  ),
];
