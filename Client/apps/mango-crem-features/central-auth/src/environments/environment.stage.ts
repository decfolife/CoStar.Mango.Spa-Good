class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    authorize: ''
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();