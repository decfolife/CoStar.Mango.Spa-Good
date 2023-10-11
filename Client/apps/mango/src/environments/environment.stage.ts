import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = false;
  name = 'STAGE';
  appUrls = {
    accounting: '',
    batchAccounting: '',
    listpages: '',
    financials: '',
    dashboards: '',
    authenticate: '',
    authentication: '',
    authorization: '',
    taskApproval: '', // For local testing.
    quickSearch: '',
    userMaintenance:'',
    formWizard:'',
    objectActions: ''
  };
  isRestful = true;
  cremBaseUrl = 'https://[CLIENT].stage.corp.virtualpremise.com';
}

export const environment = new EnvironmentsCrem();
