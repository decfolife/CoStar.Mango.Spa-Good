class EnvironmentsCrem {
  production = false;
  name = 'OPS';
  appUrls = {
    journalEntryProcessing:
      '/v06/WebServices/Mango/JournalEntryProcessing/JournalEntryProcessing.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
