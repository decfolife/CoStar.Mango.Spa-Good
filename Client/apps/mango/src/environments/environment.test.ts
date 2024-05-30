import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'TEST';
  isRestful = true;
  cremBaseUrl = 'https://[CLIENT].test.corp.virtualpremise.com';
  CAUrl = 'http://login.test.corp.virtualpremise.com:30080/';
  // Only needed for localhost. Otherwise use `${window.location.origin}/api`
  baseApiUrl = 'http://api.test.corp.virtualpremise.com:30080/'
}

export const environment = new EnvironmentsCrem();
