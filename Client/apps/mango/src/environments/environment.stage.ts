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
    identity: '',
    authentication: '',
    authorization: '',
    taskApproval: '', // For local testing.
    quickSearch: '',
    userMaintenance:'',
    formWizard:'',
    projects:'',
    tasks: '',
    objectActions: ''
  };
  isRestful = true;
  cremBaseUrl = 'https://[CLIENT].stage.corp.virtualpremise.com';
}

export const environment = new EnvironmentsCrem();
