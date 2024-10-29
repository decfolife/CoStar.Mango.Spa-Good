class EnvironmentsCrem {
  production = false;
  name = 'OPS';
  appUrls = {
    clientDelivery:
      '/v06/WebServices/Mango/ClientDelivery/ClientDelivery.asmx/',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
