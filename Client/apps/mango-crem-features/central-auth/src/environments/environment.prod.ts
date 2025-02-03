class EnvironmentsCrem {
  production = true;
  name = 'PROD';
  cremBaseUrl = 'https://[CLIENT].costarremanager.com/';
  CAUrl = 'https://login.costarremanager.com';
  // Only needed for localhost. Otherwise use `${window.location.origin}/api`
  baseApiUrl = 'https://api.costarremanager.com/';
}

export const environment = new EnvironmentsCrem();
