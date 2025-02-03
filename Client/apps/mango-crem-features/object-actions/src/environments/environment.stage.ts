class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    objectActions: '/v06/WebServices/Mango/ObjectActions/ObjectActions.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
