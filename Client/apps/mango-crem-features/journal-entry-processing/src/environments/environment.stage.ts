class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    journalEntryProcessing:
      '/v06/WebServices/Mango/JournalEntryProcessing/JournalEntryProcessing.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
