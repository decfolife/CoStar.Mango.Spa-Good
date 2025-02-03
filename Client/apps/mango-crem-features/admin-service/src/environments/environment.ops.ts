class EnvironmentsCrem {
  production = false;
  name = 'OPS';
  appUrls = {
    adminService: '/v06/WebServices/Mango/AdminService/AdminService.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
