class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    clientDelivery:
      '/v06/WebServices/Mango/ClientDelivery/ClientDelivery.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
