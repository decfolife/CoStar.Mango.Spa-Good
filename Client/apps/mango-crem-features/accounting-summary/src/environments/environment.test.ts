class EnvironmentsCrem {
  production: false;
  name: 'TEST';
  appUrls: {
    accountingSummary: 'http://service2.test.corp.virtualpremise.com:8090/accountingsummary/api',
    listpages: 'http://service2.test.corp.virtualpremise.com:8090/listpages/api/listpage/',
    alertsRules: 'http://service2.test.corp.virtualpremise.com:8090/Alerts',
    alerts: 'http://service2.test.corp.virtualpremise.com:8090/Alerts',
  };

  isRestful:true
}

export const environment = new EnvironmentsCrem();
