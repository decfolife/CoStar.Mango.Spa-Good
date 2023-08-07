class EnvironmentsCrem {
    production = false;
    name = 'OPS';
    appUrls = {
        objectMaintenance: '/v06/WebServices/Mango/Admin/ObjectMaintenance.asmx/'
    };
    isRestful: false;
}

export const environment = new EnvironmentsCrem();