class EnvironmentsCrem {
  production: false;
  name: 'LOCAL';
  appUrls: {
    accountingSummary: 'http://localhost:57539/api',
    listpages: 'http://localhost:57539/api/listpage/',
    alertsRules: 'https://localhost:5001/api/Alerts',
    alerts: 'https://localhost:5001/api/Alerts',
  };

  isRestful:true
}

export const environment = new EnvironmentsCrem();

