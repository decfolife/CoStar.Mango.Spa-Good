class EnvironmentsCrem {
  production = false;
  name = 'TEST';
  appUrls = {
    authenticate:
      '/v06/WebServices/Mango/CentralAuthentication/Authentication.asmx',
    bookmarks: '/v06/WebServices/Mango/Bookmarks/Bookmarks.asmx/',
    dashboards: '',
  };
}

export const environment = new EnvironmentsCrem();
