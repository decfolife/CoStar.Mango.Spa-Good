class EnvironmentsCrem {
  production = false;
  name = 'TEST';
  appUrls = {
    objectMaintenance: '/v06/WebServices/Mango/Admin/ObjectMaintenance.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
