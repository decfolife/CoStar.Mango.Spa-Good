class EnvironmentsCrem {
  production = false;
  name = 'TEST';
  appUrls = {
    objectMaintenance: '/v06/WebServices/Mango/Admin/ObjectMaintenance.asmx/',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
