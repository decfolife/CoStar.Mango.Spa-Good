class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  isRestful: true;
  cremBaseUrl = 'https://[CLIENT].costarremanager.com/';
  CAUrl = 'https://login.costarremanager.com/';
  // Only needed for localhost. Otherwise use `${window.location.origin}/api`
  baseApiUrl = 'https://api.costarremanager.com:30080/';
}

export const environment = new EnvironmentsCrem();