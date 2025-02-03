class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    objectActions: '/v06/WebServices/Mango/ObjectActions/ObjectActions.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
