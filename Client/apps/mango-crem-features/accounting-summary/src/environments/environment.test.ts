class EnvironmentsCrem {
  production: false;
  name: 'TEST';
  appUrls: {
    accountingSummary: 'http://service2.test.corp.virtualpremise.com:8090/accountingsummary/api',
  };

  isRestful:true
}

export const environment = new EnvironmentsCrem();
