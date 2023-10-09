import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'LOCAL';
  appUrls = {
    accounting: 'http://localhost:57541/api',
    batchAccounting: 'http://localhost:45381',
    discountRateProfiles: 'http://localhost:57539/api',
    listpages: 'http://localhost:57539/api/listpage/',
    financials: 'http://localhost:52327/api/',
    bookmarks: 'http://localhost:39180/api/',
    dashboards: 'http://localhost:57586/api/',
    portfolio: 'http://localhost:57586/api/',
    taskApproval: '', // For local testing.
    reports: 'http://localhost:64980/api/',
    dataSetDictionary: 'http://localhost:64980/api/',
    authenticate: 'http://localhost:5000/api',
    userMaintenance: 'http://localhost:39179/api/',
    groupMaintenance: 'http://localhost:39180/api/',
    portfolioMaintenance: 'http://localhost:39181/api/',
    objectMaintenance: 'http://localhost:39182/api/',
    alertsRules: 'https://localhost:5001/api/Alerts',
    alerts: 'https://localhost:5001/api/Alerts',
    accountingService: 'http://localhost:39187/api/Accounting',
    inAppDisclosure: 'http://localhost:39187/api/',
    leftNav: 'http://localhost:36786/api/',
    quickSearch: 'http://localhost:41568/api',
    userService: 'http://localhost:41569/api',
    objectActions: 'http://localhost:27287/api/',
    formWizard: 'http://localhost:5000/api/',
    header: 'http://localhost:39179/api/',
    accountingSummary:"http://localhost:5205/api/accountingSummary/"
  };
  isRestful = true;
  cremBaseUrl = 'retaildemo.local';
  CAUrl = 'http://localhost:4200/';
  mangoSpaUrl = 'http://localhost:4201/';
}

export const environment = new EnvironmentsCrem();
