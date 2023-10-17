import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'TEST';
  appUrls = {
    accounting: 'http://service2.test.corp.virtualpremise.com:8090/accountmanagement/api',
    batchAccounting: 'http://172.20.9.224:30023/batchaccounting',
    discountRateProfiles: 'http://172.20.9.224:30007/accountingprofiles/api',
    bookmarks: 'http://172.20.9.224:30025/api/bookmarks',
    listpages: 'http://172.20.9.224:30001/api/listpage/',
    financials: 'http://172.20.9.224:30043/api/',
    dashboards: 'http://172.20.9.224:30037/api/',
    authenticate: 'https://identity.tst.crem.aws.dshrp.com/api',
    authentication: 'https://authentication.dev.crem.aws.dshrp.com/api/',
    authorization: 'http://172.20.9.224:30055/api/',
    taskApproval: '', 
    reports: 'http://172.20.9.224:30039/api/',
    userMaintenance: 'http://172.20.9.224:30019/api/',
    portfolioMaintenance: 'http://172.20.9.224:30017/api/',
    objectMaintenance: 'http://172.20.9.224:30015/api/',
    groupMaintenance: 'http://172.20.9.224:30013/api/',
    alertsRules: 'http://172.20.9.224:30021/api/Alerts',
    alerts: 'http://172.20.9.224:30021/api/Alerts',
    accountingService: 'http://172.20.9.224:30009/api/Accounting',
    leftNav: 'http://172.20.9.224:30033/api/',
    quickSearch: 'http://172.20.9.224:30053/api',
    userService: 'http://172.20.9.224:30051/api',
    formWizard: 'http://172.20.9.224:30031/api/',
    objectActions: 'http://172.20.9.224:30035/api/',
    header: 'http://172.20.9.224:30045/api/',
    inAppDisclosure: 'http://172.20.9.224:30009/api/',
    accountingSummary:"http://172.20.9.224:30041/api/AccountingSummary/",
    dataSetDictionary: 'http://172.20.9.224:30039/api/',
    projects: 'http://172.20.9.224:30057/api/projects/',
  };
  isRestful = true;
  cremBaseUrl = 'http://[CLIENT].test.corp.virtualpremise.com';
  CAUrl = 'https://client-alpha.tst.crem.aws.dshrp.com/';
  mangoSpaUrl = 'http://service2.test.corp.virtualpremise.com:8097/'
}

export const environment = new EnvironmentsCrem();
