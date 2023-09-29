class EnvironmentsCrem {
  production: false;
  name: 'PROD';
  appUrls: {
    accountingSummary: '',
    listpages: '',
    alertsRules: '',
    alerts: ''
  };

  isRestful:true
}

export const environment = new EnvironmentsCrem();
