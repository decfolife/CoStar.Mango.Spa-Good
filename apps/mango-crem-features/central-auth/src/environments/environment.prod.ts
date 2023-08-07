class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    authorize: ''
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();