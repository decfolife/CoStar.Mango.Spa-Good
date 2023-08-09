class EnvironmentsCrem {
    production = false;
    name = 'TEST';
    appUrls = {
        //userMaintenance: 'http://service2.test.corp.virtualpremise.com:8090/UserMaintenance/api/'
        userMaintenance: '/v06/WebServices/Mango/UserMaintenance/UserMaintenance.asmx/',
        reports: '/v06/WebServices/Mango/Reports/Reports.asmx/',
        objectActions: ''
    };
    isRestful: false;
}

export const environment = new EnvironmentsCrem();