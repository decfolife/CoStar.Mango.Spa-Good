class EnvironmentsCrem {
  production = false;
  name = 'TEST';
  appUrls = {
    clientDelivery:
      '/v06/WebServices/Mango/ClientDelivery/ClientDelivery.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
