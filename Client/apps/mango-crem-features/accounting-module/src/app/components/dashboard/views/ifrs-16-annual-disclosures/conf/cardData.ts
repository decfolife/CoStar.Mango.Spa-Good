import { CardConfig } from '@mango/data-models/lib-data-models';


// IFRS 16 Configuration
export const dashboardId: number = 6;
export const pendoId: string = "IFSAnnualDisclosures";
export const cardData: CardConfig[] = [ // todo: exception handling when data coming from API doesn't match parameters provided
  {
    index: 0,
    id: 'LeaseCounts',
    name: 'Lease Counts',
    format: ",###",
    sortingOrder: {
      "Opening Lease Count": 1,
      "- Leases Added": 2,
      "- Leases Expired/Cancelled": 3,
      "Closing Lease Count": 4,
    },
    fieldTransform: [
      {
        DisclosureClassification: 'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: 'Display',
        PeriodYear: 'PeriodYear',
        data: 'OpeningCount',
      },
      {
        DisclosureClassification: 'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: 'Display',
        PeriodYear: 'PeriodYear',
        data: 'AddedCount',
      },
      {
        DisclosureClassification: 'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: 'Display',
        PeriodYear: 'PeriodYear',
        data: 'EndedCount',
      },
      {
        DisclosureClassification: 'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: 'Display',
        PeriodYear: 'PeriodYear',
        data: 'ClosingCount',
      },
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: 'Opening Lease Count',
        PeriodYear: 'PeriodYear',
        data: 'OpeningCount',
      },
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: '- Leases Added',
        PeriodYear: 'PeriodYear',
        data: 'AddedCount',
      },
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: '- Leases Expired/Cancelled',
        PeriodYear: 'PeriodYear',
        data: 'EndedCount',
      },
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: 'Closing Lease Count',
        PeriodYear: 'PeriodYear',
        data: 'ClosingCount',
      },
    ]
  },
  {
    index: 1,
    id: 'AssetBalance',
    name: 'Asset Balance',
    sortingOrder: {

    },
    fieldTransform: [
      { 
        DisclosureClassification:  'ClassificationName',
        Display: "ROU Asset Balance",
        PeriodYear: 'PeriodYear',
        data: 'AssetBalanceClosingReporting',
      },
      { 
        DisclosureClassification: 'ClassificationName',
        Display: "Short Term Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'ShortTermLiabilityClosingReporting',
      },
      { 
        DisclosureClassification: 'ClassificationName',
        Display: "Long Term Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'LongTermLiabilityClosingReporting',
      },
      { 
        DisclosureClassification: 'ClassificationName',
        Display: "Total Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'LiabilityBalanceClosingReporting',
      },
      { 
        DisclosureClassification:  "Total",
        Display: "ROU Asset Balance",
        PeriodYear:  'PeriodYear',
        data: 'AssetBalanceClosingReporting',
      },
      { 
        DisclosureClassification:  "Total",
        Display: "Short Term Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'ShortTermLiabilityClosingReporting',
      },
      { 
        DisclosureClassification:  "Total",
        Display: "Long Term Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'LongTermLiabilityClosingReporting',
      },
      { 
        DisclosureClassification:  "Total",
        Display: "Total Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'LiabilityBalanceClosingReporting',
      }
    ]
  }
];