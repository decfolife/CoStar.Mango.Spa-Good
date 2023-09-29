import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'TEST';
  appUrls = {
    accounting: 'http://service2.test.corp.virtualpremise.com:8090/accountmanagement/api/accountmanagement',
    batchAccounting: 'http://service2.test.corp.virtualpremise.com:8090/batchaccounting',
    discountRateProfiles: 'http://service2.test.corp.virtualpremise.com:8090/accountingprofiles/api',
    bookmarks: 'http://service2.test.corp.virtualpremise.com:8090/bookmarks/api/bookmarks',
    listpages: 'http://service2.test.corp.virtualpremise.com:8090/listpages/api/listpage/',
    financials: 'http://service2.test.corp.virtualpremise.com:8090/financials/api/',
    dashboards: 'http://service2.test.corp.virtualpremise.com:8090/dashboards/api/',
    authenticate: 'https://identity.tst.crem.aws.dshrp.com/api',
    taskApproval: '', // For local testing.
    reports: 'http://service2.test.corp.virtualpremise.com:8090/reports/api/',
    userMaintenance: 'http://service2.test.corp.virtualpremise.com:8090/UserMaintenance/api/',
    portfolioMaintenance: 'http://service2.test.corp.virtualpremise.com:8090/portfolioMaintenance/api/',
    objectMaintenance: 'http://service2.test.corp.virtualpremise.com:8090/objectMaintenance/api/',
    groupMaintenance: 'http://service2.test.corp.virtualpremise.com:8090/groupMaintenance/api/',
    adminService: 'http://service2.test.corp.virtualpremise.com:8090/adminService/api/',
    accountingService: 'http://service2.test.corp.virtualpremise.com:8090/AccountingService/api/Accounting',
    leftNav: 'http://service2.test.corp.virtualpremise.com:8090/leftNav/api/',
    quickSearch: 'http://service2.test.corp.virtualpremise.com:8090/QuickSearch/api',
    userService: 'http://service2.test.corp.virtualpremise.com:8090/UserService/api',
    formWizard: 'http://service2.test.corp.virtualpremise.com:8090/FormsEngine/api/',
    objectActions: 'http://service2.test.corp.virtualpremise.com:8090/objectActions/api/',
    header: 'http://service2.test.corp.virtualpremise.com:8090/Header/api/',
    alerts: 'http://service2.test.corp.virtualpremise.com:8090/Alerts/api/',
    inAppDisclosure: 'http://service2.test.corp.virtualpremise.com:8090/AccountingService/api/'
  };
  isRestful = true;
  cremBaseUrl = 'http://[CLIENT].test.corp.virtualpremise.com';
  CAUrl = 'https://client-alpha.tst.crem.aws.dshrp.com/';
  mangoSpaUrl = 'http://service2.test.corp.virtualpremise.com:8097/'
}

export const environment = new EnvironmentsCrem();
