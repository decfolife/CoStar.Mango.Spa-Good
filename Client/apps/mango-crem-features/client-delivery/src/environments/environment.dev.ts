class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    clientDelivery:
      '/v06/WebServices/Mango/ClientDelivery/ClientDelivery.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
