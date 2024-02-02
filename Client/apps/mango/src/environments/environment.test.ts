import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'TEST';
  appUrls = {
    accounting: 'http://mangospa.test.corp.virtualpremise.com:8090/accountmanagement/api',
    batchAccounting: 'http://mangospa.test.corp.virtualpremise.com:30080/batchAccounting/api',
    discountRateProfiles: 'http://mangospa.test.corp.virtualpremise.com:30080/accountingprofiles/api',
    bookmarks: 'http://mangospa.test.corp.virtualpremise.com:30080/bookmarks/api/',
    listpages: 'http://mangospa.test.corp.virtualpremise.com:30080/listpages/api/listpage/',
    financials: 'http://mangospa.test.corp.virtualpremise.com:30080/financials/api/',
    dashboards: 'http://mangospa.test.corp.virtualpremise.com:30080/dashboards/api/',
    identity: 'http://mangospa.test.corp.virtualpremise.com:30080/identity/api',
    authentication: 'http://mangospa.test.corp.virtualpremise.com:30080/authentication/api/',
    authorization: 'http://mangospa.test.corp.virtualpremise.com:30080/authorization/api/',
    taskApproval: '', 
    reports: 'http://mangospa.test.corp.virtualpremise.com:30080/reports/api/',
    userMaintenance: 'http://mangospa.test.corp.virtualpremise.com:30080/userMaintenance/api/',
    portfolioMaintenance: 'http://mangospa.test.corp.virtualpremise.com:30080/portfolioMaintenance/api/',
    objectMaintenance: 'http://mangospa.test.corp.virtualpremise.com:30080/objectMaintenance/api/',
    groupMaintenance: 'http://mangospa.test.corp.virtualpremise.com:30080/groupMaintenance/api/',
    alertsRules: 'http://mangospa.test.corp.virtualpremise.com:30080/Alerts/api/Alerts',
    alerts: 'http://mangospa.test.corp.virtualpremise.com:30080/Alerts/api/Alerts',
    accountingService: 'http://mangospa.test.corp.virtualpremise.com:30080/AccountingDashboard/api/Accounting',
    leftNav: 'http://mangospa.test.corp.virtualpremise.com:30080/leftNav/api/',
    quickSearch: 'http://mangospa.test.corp.virtualpremise.com:30080/quickSearch/api',
    userService: 'http://mangospa.test.corp.virtualpremise.com:30080/userService/api',
    formWizard: 'http://mangospa.test.corp.virtualpremise.com:30080/FormsEngine/api/',
    objectActions: 'http://mangospa.test.corp.virtualpremise.com:30080/objectActions/api/',
    header: 'http://mangospa.test.corp.virtualpremise.com:30080/header/api/',
    inAppDisclosure: 'http://mangospa.test.corp.virtualpremise.com:30080/AccountingDashboard/api/',
    accountingSummary:"http://mangospa.test.corp.virtualpremise.com:30080/AccountingSummary/api/",
    dataSetDictionary: 'http://mangospa.test.corp.virtualpremise.com:30080/reports/api/',
    projects: 'http://mangospa.test.corp.virtualpremise.com:30080/projects/api/projects/',
    tasks:    'http://mangospa.dev.corp.virtualpremise.com:30080/projects/api/tasks/',
  };
  isRestful = true;
  cremBaseUrl = 'http://[CLIENT].test.corp.virtualpremise.com';
  CAUrl = 'http://login.test.corp.virtualpremise.com:30080/';
  mangoSpaUrl = 'http://mangospa.test.corp.virtualpremise.com:30080/'
}

export const environment = new EnvironmentsCrem();
