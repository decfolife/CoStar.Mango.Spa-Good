import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'OPS';
  appUrls = {
    accounting: 'http://mangospa.ops.corp.virtualpremise.com:30080/accountmanagement/api',
    batchAccounting: 'http://mangospa.ops.corp.virtualpremise.com:30080/batchAccounting/api',
    discountRateProfiles: 'http://mangospa.ops.corp.virtualpremise.com:30080/accountingprofiles/api',
    bookmarks: 'http://mangospa.ops.corp.virtualpremise.com:30080/bookmarks/api/',
    listpages: 'http://mangospa.ops.corp.virtualpremise.com:30080/listpages/api/listpage/',
    financials: 'http://mangospa.ops.corp.virtualpremise.com:30080/financials/api/',
    dashboards: 'http://mangospa.ops.corp.virtualpremise.com:30080/dashboards/api/',
    identity: 'https://identity.ops.crem.aws.dshrp.com/api',
    authentication: 'https://authentication.ops.crem.aws.dshrp.com/api/',
    authorization: 'http://mangospa.ops.corp.virtualpremise.com:30080/authorization/api/',
    taskApproval: '', 
    reports: 'http://mangospa.ops.corp.virtualpremise.com:30080/reports/api/',
    userMaintenance: 'http://mangospa.ops.corp.virtualpremise.com:30080/userMaintenance/api/',
    portfolioMaintenance: 'http://mangospa.ops.corp.virtualpremise.com:30080/portfolioMaintenance/api/',
    objectMaintenance: 'http://mangospa.ops.corp.virtualpremise.com:30080/objectMaintenance/api/',
    groupMaintenance: 'http://mangospa.ops.corp.virtualpremise.com:30080/groupMaintenance/api/',
    alertsRules: 'http://mangospa.ops.corp.virtualpremise.com:30080/Alerts/api/Alerts',
    alerts: 'http://mangospa.ops.corp.virtualpremise.com:30080/Alerts/api/Alerts',
    accountingService: 'http://mangospa.ops.corp.virtualpremise.com:30080/AccountingDashboard/api/Accounting',
    leftNav: 'http://mangospa.ops.corp.virtualpremise.com:30080/leftNav/api/',
    quickSearch: 'http://mangospa.ops.corp.virtualpremise.com:30080/quickSearch/api',
    userService: 'http://mangospa.ops.corp.virtualpremise.com:30080/userService/api',
    formWizard: 'http://mangospa.ops.corp.virtualpremise.com:30080/FormsEngine/api/',
    objectActions: 'http://mangospa.ops.corp.virtualpremise.com:30080/objectActions/api/',
    header: 'http://mangospa.ops.corp.virtualpremise.com:30080/header/api/',
    inAppDisclosure: 'http://mangospa.ops.corp.virtualpremise.com:30080/AccountingDashboard/api/',
    accountingSummary:"http://mangospa.ops.corp.virtualpremise.com:30080/AccountingSummary/api/",
    dataSetDictionary: 'http://mangospa.ops.corp.virtualpremise.com:30080/reports/api/',
    projects: 'http://mangospa.ops.corp.virtualpremise.com:30080/projects/api/projects/',
    tasks:    'http://mangospa.ops.corp.virtualpremise.com:30080/projects/api/tasks/',
  };
  isRestful = true;
  cremBaseUrl = 'http://[CLIENT].ops.corp.virtualpremise.com';
  CAUrl = 'https://client.tsm.crem.aws.dshrp.com/';
  mangoSpaUrl = 'http://mangospa.ops.corp.virtualpremise.com:30080/';
}

export const environment = new EnvironmentsCrem();
