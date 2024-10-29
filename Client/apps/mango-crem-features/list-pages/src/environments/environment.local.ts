class EnvironmentsCrem {
  production = false;
  name = 'LOCAL';
  appUrls = {
    listpages: 'http://localhost:57539/api/listpage/',
    financials: 'http://localhost:52327/api/',
    header: 'http://localhost:39179/api/',
  };
  isRestful: true;
}

export const environment = new EnvironmentsCrem();
