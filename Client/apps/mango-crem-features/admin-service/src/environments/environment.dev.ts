class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    adminService: '/v06/WebServices/Mango/AdminService/AdminService.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
