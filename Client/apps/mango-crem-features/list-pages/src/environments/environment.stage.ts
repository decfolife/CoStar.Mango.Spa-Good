class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    listpages: '/v06/WebServices/Mango/ListPages/Project.asmx/',
    financials: '/v06/WebServices/Mango/Financials/Financials.asmx/',
    authenticate: '',
    dashboards: '/v06/WebServices/Mango/Dashboards/Project.asmx/',
    quickSearch: '',
    taskApproval: '/v06/projects/tasks/ApproveReject.aspx',
    userService: '',
    formWizard: '/v06/WebServices/Mango/FormsEngine/FormsEngine.asmx/',
    objectActions: '/v06/WebServices/Mango/ObjectActions/ObjectActions.asmx/',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
