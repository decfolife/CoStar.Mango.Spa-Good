import { Environment } from '@mango/data-models/lib-data-models';

class EnvironmentsCrem implements Environment {
  production = true;
  name = 'PROD';
  appUrls = {
    accounting: '',
    batchAccounting: '',
    listpages: '',
    financials: '',
    dashboards: '',
    authenticate: '',
    taskApproval: '', // For local testing.
    quickSearch: '',
    userMaintenance:'',
    formWizard: '',
    objectActions: ''
  };
  isRestful = true;
  cremBaseUrl = 'https://[CLIENT].costarremanager.com';
}

export const environment = new EnvironmentsCrem();
