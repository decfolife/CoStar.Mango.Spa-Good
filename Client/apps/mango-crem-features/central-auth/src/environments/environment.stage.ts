class EnvironmentsCrem {
  production = true;
  name = 'STAGE';
  cremBaseUrl = 'https://[CLIENT].stage.costarremanager.com/';
  CAUrl = 'https://login.stage.costarremanager.com';
  // Only needed for localhost. Otherwise use `${window.location.origin}/api`
  baseApiUrl = 'https://api.stage.costarremanager.com/';
}

export const environment = new EnvironmentsCrem();
