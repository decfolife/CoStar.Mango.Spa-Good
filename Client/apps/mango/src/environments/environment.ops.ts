import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'OPS';
  appUrls = {
    accounting: 'http://service2.ops.corp.virtualpremise.com:8094/accountmanagement/api/accountmanagement',
    batchAccounting: 'http://service2.ops.corp.virtualpremise.com:8090/batchaccounting',
    discountRateProfiles: 'http://service2.ops.corp.virtualpremise.com:8094/accountingprofiles/api',
    bookmarks: 'http://service2.ops.corp.virtualpremise.com:8094/bookmarks/api/bookmarks',
    listpages: 'http://service2.ops.corp.virtualpremise.com:8094/listpages/api/listpage/',
    financials:  'http://service2.ops.corp.virtualpremise.com:8094/financials/api/',  
    dashboards: 'http://service2.ops.corp.virtualpremise.com:8094/dashboards/api/',
    authenticate: 'http://service2.ops.corp.virtualpremise.com:8094/authentication/api',
    reports: 'http://service2.ops.corp.virtualpremise.com:8090/reports/api/',
    taskApproval: '', // For local testing.
    userMaintenance: 'http://service2.ops.corp.virtualpremise.com:8090/UserMaintenance/api/',
    portfolioMaintenance: 'http://service2.ops.corp.virtualpremise.com:8090/portfolioMaintenance/api/',
    objectMaintenance: 'http://service2.ops.corp.virtualpremise.com:8090/objectMaintenance/api/',
    groupMaintenance: 'http://service2.ops.corp.virtualpremise.com:8090/groupMaintenance/api/',
    adminService: 'http://service2.ops.corp.virtualpremise.com:8090/adminService/api/',
    leftNav: 'http://service2.ops.corp.virtualpremise.com:8090/leftNav/api/',
    quickSearch: 'http://service2.ops.corp.virtualpremise.com:8090/QuickSearch/api',
    userService: 'http://service2.ops.corp.virtualpremise.com:8090/UserService/api',
    formWizard: 'http://service2.ops.corp.virtualpremise.com:8090/FormsEngine/api/',
    objectActions: 'http://service2.ops.corp.virtualpremise.com:8090/objectActions/api/',
    header: 'http://service2.ops.corp.virtualpremise.com:8090/Header/api/'
  };
  isRestful = true;
  cremBaseUrl = 'http://[CLIENT].ops.corp.virtualpremise.com';
  CAUrl = 'https://client.tsm.crem.aws.dshrp.com/';
}

export const environment = new EnvironmentsCrem();
