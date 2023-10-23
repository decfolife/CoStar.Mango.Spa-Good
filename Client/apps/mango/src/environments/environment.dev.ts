import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'DEV';
  appUrls = {
    accounting: 'http://mangospa.dev.corp.virtualpremise.com:30080/accountmanagement/api',
    batchAccounting: 'http://mangospa.dev.corp.virtualpremise.com:30080/batchAccounting/api',
    discountRateProfiles: 'http://mangospa.dev.corp.virtualpremise.com:30080/accountingprofiles/api',
    bookmarks: 'http://mangospa.dev.corp.virtualpremise.com:30080/bookmarks/api/',
    listpages: 'http://mangospa.dev.corp.virtualpremise.com:30080/listpages/api/listpage/',
    financials: 'http://mangospa.dev.corp.virtualpremise.com:30080/financials/api/',
    dashboards: 'http://mangospa.dev.corp.virtualpremise.com:30080/dashboards/api/',
    authenticate: 'https://identity.dev.crem.aws.dshrp.com/api',
    authentication: 'https://authentication.dev.crem.aws.dshrp.com/api/',
    authorization: 'http://mangospa.dev.corp.virtualpremise.com:30080/authorization/api/',
    taskApproval: '', 
    reports: 'http://mangospa.dev.corp.virtualpremise.com:30080/reports/api/',
    userMaintenance: 'http://mangospa.dev.corp.virtualpremise.com:30080/userMaintenance/api/',
    portfolioMaintenance: 'http://mangospa.dev.corp.virtualpremise.com:30080/portfolioMaintenance/api/',
    objectMaintenance: 'http://mangospa.dev.corp.virtualpremise.com:30080/objectMaintenance/api/',
    groupMaintenance: 'http://mangospa.dev.corp.virtualpremise.com:30080/groupMaintenance/api/',
    alertsRules: 'http://mangospa.dev.corp.virtualpremise.com:30080/Alerts/api/Alerts',
    alerts: 'http://mangospa.dev.corp.virtualpremise.com:30080/Alerts/api/Alerts',
    accountingService: 'http://mangospa.dev.corp.virtualpremise.com:30080/Accounting/api/Accounting',
    leftNav: 'http://mangospa.dev.corp.virtualpremise.com:30080/leftNav/api/',
    quickSearch: 'http://mangospa.dev.corp.virtualpremise.com:30080/quickSearch/api',
    userService: 'http://mangospa.dev.corp.virtualpremise.com:30080/userService/api',
    formWizard: 'http://mangospa.dev.corp.virtualpremise.com:30080/formWizard/api/',
    objectActions: 'http://mangospa.dev.corp.virtualpremise.com:30080/objectActions/api/',
    header: 'http://mangospa.dev.corp.virtualpremise.com:30080/header/api/',
    inAppDisclosure: 'http://mangospa.dev.corp.virtualpremise.com:30080/inAppDisclosure/api/',
    accountingSummary:"http://mangospa.dev.corp.virtualpremise.com:30080/accountingSummary/api/AccountingSummary/",
    dataSetDictionary: 'http://mangospa.dev.corp.virtualpremise.com:30080/dataSetDictionary/api/',
    projects: 'http://mangospa.dev.corp.virtualpremise.com:30080/projects/api/projects/',
  };
  isRestful = true;
  cremBaseUrl = 'http://[CLIENT].dev.corp.virtualpremise.com';
  CAUrl = 'https://client-alpha.dev.crem.aws.dshrp.com/';
  mangoSpaUrl = 'http://service2.dev.corp.virtualpremise.com:8097/'
}

export const environment = new EnvironmentsCrem();

