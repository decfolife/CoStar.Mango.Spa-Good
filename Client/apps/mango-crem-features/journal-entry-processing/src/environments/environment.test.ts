class EnvironmentsCrem {
  production = false;
  name = 'TEST';
  appUrls = {
    journalEntryProcessing:
      '/v06/WebServices/Mango/JournalEntryProcessing/JournalEntryProcessing.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
