class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    journalEntryProcessing:
      '/v06/WebServices/Mango/JournalEntryProcessing/JournalEntryProcessing.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
