class EnvironmentsCrem {
  production: false;
  name: 'LOCAL';
  appUrls: {
    accountingSummary: 'http://localhost:57539/api',
  };

  isRestful:true
}

export const environment = new EnvironmentsCrem();

