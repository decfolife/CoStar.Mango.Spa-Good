class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    authenticate:
      '/v06/WebServices/Mango/CentralAuthentication/Authentication.asmx',
    bookmarks: '/v06/WebServices/Mango/Bookmarks/Bookmarks.asmx/',
    dashboards: '',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
