import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = true;
  name = 'PROD';
  isRestful = true;
  cremBaseUrl = 'https://[CLIENT].costarremanager.com';
  CAUrl = 'https://login.costarremanager.com/';
  // Only needed for localhost. Otherwise use `${window.location.origin}/api`
  baseApiUrl = 'http://api.costarremanager.com:30080/';
}

export const environment = new EnvironmentsCrem();
