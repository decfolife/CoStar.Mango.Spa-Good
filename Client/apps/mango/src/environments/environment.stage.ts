import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'STAGE';
  isRestful = true;
  cremBaseUrl = 'https://[CLIENT].stage.costarremanager.com';
  // Only needed for localhost. Otherwise use `${window.location.origin}/api`
  baseApiUrl = 'http://api.stage.costarremanager.com:30080/';
}

export const environment = new EnvironmentsCrem();
