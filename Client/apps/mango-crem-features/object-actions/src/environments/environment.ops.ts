class EnvironmentsCrem {
  production = false;
  name = 'OPS';
  appUrls = {
    objectActions: '/v06/WebServices/Mango/ObjectActions/ObjectActions.asmx/',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
