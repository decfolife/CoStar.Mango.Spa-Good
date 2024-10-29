class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    dashboards: '/v06/WebServices/Mango/Dashboards/Portfolio.asmx/',
    bookmarks: '/v06/WebServices/Mango/Bookmarks/Bookmarks.asmx/',
    taskApproval: '/v06/projects/tasks/ApproveReject.aspx',
    leftNav: '/v06/WebServices/Mango/LeftNav/LeftNav.asmx/',
    authenticate: '',
    quickSearch: '',
    userService: '',
    header: '',
    userMaintenance:
      '/v06/WebServices/Mango/UserMaintenance/UserMaintenance.asmx/',
    formWizard: '/v06/WebServices/Mango/FormsEngine/FormsEngine.asmx/',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
