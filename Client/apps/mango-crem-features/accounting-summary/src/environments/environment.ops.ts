class EnvironmentsCrem {
  production: false;
  name: 'OPS';
  appUrls: {
    accountingSummary: 'http://service2.ops.corp.virtualpremise.com:8090/accountingsummary/api',
    listpages: 'http://service2.ops.corp.virtualpremise.com:8094/listpages/api/listpage/',
    alertsRules: 'http://service2.ops.corp.virtualpremise.com:8090/Alerts',
    alerts: 'http://service2.ops.corp.virtualpremise.com:8090/Alerts',
  };
  isRestful:true
}

export const environment = new EnvironmentsCrem();
