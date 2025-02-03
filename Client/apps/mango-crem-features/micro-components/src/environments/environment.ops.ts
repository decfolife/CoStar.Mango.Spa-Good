class EnvironmentsCrem {
  production = false;
  name = 'OPS';
  appUrls = {
    alertsRules: '/v06/WebServices/Mango/Alerts/Alerts.asmx',
    alerts: '/v06/WebServices/Mango/Alerts/Alerts.asmx',
    bookmarks: '/v06/WebServices/Mango/Bookmarks/Bookmarks.asmx/',
    dashboards: '/v06/WebServices/Mango/Dashboards/Project.asmx/',
    listpages: '/v06/WebServices/Mango/ListPages/Project.asmx/',
    portfolio: '/v06/WebServices/Mango/Dashboards/Portfolio.asmx/',
    leftNav: '/v06/WebServices/Mango/LeftNav/LeftNav.asmx/',
    userMaintenance:
      '/v06/WebServices/Mango/UserMaintenance/UserMaintenance.asmx/',
    formWizard: '/v06/WebServices/Mango/FormsEngine/FormsEngine.asmx/',
    taskApproval: '',
    authenticate: '',
    quickSearch: '',
    userService: '',
    objectActions: '/v06/WebServices/Mango/ObjectActions/ObjectActions.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
