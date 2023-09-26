class EnvironmentsCrem {
  production: false;
  name: 'OPS';
  appUrls: {
    accountingSummary: 'http://service2.ops.corp.virtualpremise.com:8090/accountingsummary/api',
  };
  isRestful:true
}

export const environment = new EnvironmentsCrem();
