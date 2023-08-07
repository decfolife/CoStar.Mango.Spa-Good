class EnvironmentsCrem {
    production = false;
    name = 'STAGE';
    appUrls = {
        journalEntryProcessing: '/v06/WebServices/Mango/JournalEntryProcessing/JournalEntryProcessing.asmx/'
    };
    isRestful: false;
}

export const environment = new EnvironmentsCrem();