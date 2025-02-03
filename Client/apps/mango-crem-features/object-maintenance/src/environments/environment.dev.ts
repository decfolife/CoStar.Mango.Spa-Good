class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    objectMaintenance: '/v06/WebServices/Mango/Admin/ObjectMaintenance.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
