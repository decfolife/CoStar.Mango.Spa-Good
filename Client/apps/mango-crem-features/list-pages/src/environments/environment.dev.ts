class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    listpages: '/v06/WebServices/Mango/ListPages/Project.asmx/',
    financials: '/v06/WebServices/Mango/Financials/Financials.asmx/',
    authenticate: '',
    dashboards: '/v06/WebServices/Mango/Dashboards/Project.asmx/',
    taskApproval: '/v06/projects/tasks/ApproveReject.aspx',
    quickSearch: '',
    userService: '',
    formWizard: '/v06/WebServices/Mango/FormsEngine/FormsEngine.asmx/',
    objectActions: '/v06/WebServices/Mango/ObjectActions/ObjectActions.asmx/',
    header: 'http://service2.dev.corp.virtualpremise.com:8090/Header/api/',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
