class EnvironmentsCrem {
  production: false;
  name: 'DEV';
  appUrls: {
    accountingSummary: 'http://service2.dev.corp.virtualpremise.com:8090/accountingsummary/api',
  };

  isRestful:true
}

export const environment = new EnvironmentsCrem();

