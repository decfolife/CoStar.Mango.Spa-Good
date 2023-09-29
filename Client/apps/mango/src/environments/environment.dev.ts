import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'DEV';
  appUrls = {
    accounting: 'http://service2.dev.corp.virtualpremise.com:8090/accountmanagement/api/',
    batchAccounting: 'http://service2.dev.corp.virtualpremise.com:8090/batchaccounting',
    discountRateProfiles: 'http://service2.dev.corp.virtualpremise.com:8090/accountingprofiles/api/',
    bookmarks: 'http://service2.dev.corp.virtualpremise.com:8090/bookmarks/api/',
    portfolio: 'http://localhost:57586/api/',
    listpages: 'http://service2.dev.corp.virtualpremise.com:8090/listpages/api/listpage/',
    financials: 'http://service2.dev.corp.virtualpremise.com:8090/financials/api/',
    dashboards: 'http://service2.dev.corp.virtualpremise.com:8090/dashboards/api/',
    authenticate: 'https://identity.dev.crem.aws.dshrp.com/api',
    taskApproval: '', // For local testing.
    reports: 'http://service2.dev.corp.virtualpremise.com:8090/reports/api/',
    userMaintenance: 'http://service2.dev.corp.virtualpremise.com:8090/UserMaintenance/api/',
    portfolioMaintenance: 'http://service2.dev.corp.virtualpremise.com:8090/portfolioMaintenance/api/',
    objectMaintenance: 'http://service2.dev.corp.virtualpremise.com:8090/objectMaintenance/api/',
    groupMaintenance: 'http://service2.dev.corp.virtualpremise.com:8090/groupMaintenance/api/',
    adminService: 'http://service2.dev.corp.virtualpremise.com:8090/adminService/api/',
    alertsRules: 'http://service2.dev.corp.virtualpremise.com:8090/Alerts',
    alerts: 'http://service2.dev.corp.virtualpremise.com:8090/Alerts',
    accountingService: 'http://service2.dev.corp.virtualpremise.com:8090/AccountingService/api/Accounting',
    leftNav: 'http://service2.dev.corp.virtualpremise.com:8090/leftnav/api/',
    quickSearch: 'http://service2.dev.corp.virtualpremise.com:8090/QuickSearch/api',
    userService: 'http://service2.dev.corp.virtualpremise.com:8090/UserService/api',
    formWizard: 'http://service2.dev.corp.virtualpremise.com:8090/FormsEngine/api/',
    objectActions: 'http://service2.dev.corp.virtualpremise.com:8090/objectActions/api/',
    header: 'http://service2.dev.corp.virtualpremise.com:8090/Header/api/',
    inAppDisclosure: 'http://service2.dev.corp.virtualpremise.com:8090/AccountingService/api/',
    accountingSummary:"http://service2.dev.corp.virtualpremise.com:8090/AccountingSummary/api/AccountingSummary/"
  };
  isRestful = true;
  cremBaseUrl = 'http://[CLIENT].dev.corp.virtualpremise.com';
  CAUrl = 'https://client-alpha.dev.crem.aws.dshrp.com/';
  mangoSpaUrl = 'http://service2.dev.corp.virtualpremise.com:8097/'
}

export const environment = new EnvironmentsCrem();

