import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'DEV';
  appUrls = {
    accounting: 'http://service2.dev.corp.virtualpremise.com:8090/accountmanagement/api',
    batchAccounting: 'http://172.20.9.224:30022/api',
    discountRateProfiles: 'http://172.20.9.224:30006/api',
    bookmarks: 'http://172.20.9.224:30024/api/bookmarks',
    listpages: 'http://172.20.9.224:30000/api/listpage/',
    financials: 'http://172.20.9.224:30042/api/',
    dashboards: 'http://172.20.9.224:30036/api/',
    authenticate: 'https://identity.dev.crem.aws.dshrp.com/api',
    authentication: 'https://authentication.dev.crem.aws.dshrp.com/api/',
    authorization: 'http://172.20.9.224:30054/api/',
    taskApproval: '', 
    reports: 'http://172.20.9.224:30038/api/',
    userMaintenance: 'http://172.20.9.224:30018/api/',
    portfolioMaintenance: 'http://172.20.9.224:30016/api/',
    objectMaintenance: 'http://172.20.9.224:30014/api/',
    groupMaintenance: 'http://172.20.9.224:30012/api/',
    alertsRules: 'http://172.20.9.224:30020/api/Alerts',
    alerts: 'http://172.20.9.224:30020/api/Alerts',
    accountingService: 'http://172.20.9.224:30008/api/Accounting',
    leftNav: 'http://172.20.9.224:30032/api/',
    quickSearch: 'http://172.20.9.224:30052/api',
    userService: 'http://172.20.9.224:30050/api',
    formWizard: 'http://172.20.9.224:3003./api/',
    objectActions: 'http://172.20.9.224:30034/api/',
    header: 'http://172.20.9.224:30044/api/',
    inAppDisclosure: 'http://172.20.9.224:30008/api/',
    accountingSummary:"http://172.20.9.224:30040/api/AccountingSummary/"
  };
  isRestful = true;
  cremBaseUrl = 'http://[CLIENT].dev.corp.virtualpremise.com';
  CAUrl = 'https://client-alpha.dev.crem.aws.dshrp.com/';
  mangoSpaUrl = 'http://service2.dev.corp.virtualpremise.com:8097/'
}

export const environment = new EnvironmentsCrem();

