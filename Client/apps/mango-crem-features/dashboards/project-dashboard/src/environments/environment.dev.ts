class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    bookmarks: '/v06/WebServices/Mango/Bookmarks/Bookmarks.asmx/',
    dashboards: '/v06/WebServices/Mango/Dashboards/Project.asmx/',
    taskApproval: '/v06/projects/tasks/ApproveReject.aspx',
    leftNav: '/v06/WebServices/Mango/LeftNav/LeftNav.asmx/',
    authenticate: '',
    quickSearch: '',
    userService: '',
    header: '',
    userMaintenance:
      '/v06/WebServices/Mango/UserMaintenance/UserMaintenance.asmx/',
    formWizard: '/v06/WebServices/Mango/FormsEngine/FormsEngine.asmx/',
    objectActions: '/v06/WebServices/Mango/ObjectActions/ObjectActions.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
