import { CardConfig } from '@mango/data-models/lib-data-models';


// IFRS 16 Configuration
export const dashboardId = 6 as number;
export const pendoId = "IFRSAnnualDisclosures" as string;
export const cardData: CardConfig[] = [ // todo: exception handling when data coming from API doesn't match parameters provided
  {
    index: 0,
    id: 'IFRS16-Annual-LeaseCounts',
    name: 'Lease Counts',
    format: {
      type: 'fixedPoint',
      precision: 2,
    },
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
      // Totals
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
    id: 'IFRS16-Annual-AssetBalance',
    name: 'Assets and Liabilities Balances',
    format:  {
      type: 'fixedPoint',
      precision: 2,
    },
    sortingOrder: {
      'ROU Asset Balance - Opening': 1,
      'ROU Asset Balance - Added': 2,
      'ROU Asset Balance - Amortization': 3,
      'ROU Asset Balance - Adjustment': 4,
      'ROU Asset Balance - Closing': 5,

      'Short Term Liability Balance': 6,
      'Long Term Liability Balance': 7,
      'Total Liability Balance': 8,
    },
    fieldTransform: [
      // First Part
      {
        DisclosureClassification: 'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: "ROU Asset Balance - Opening",
        PeriodYear:  'PeriodYear',
        data: 'AssetBalanceOpeningReporting',
      },
      {
        DisclosureClassification: 'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: "ROU Asset Balance - Added",
        PeriodYear:  'PeriodYear',
        data: 'AssetBalanceAddedReporting',
      },
      {
        DisclosureClassification:  'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: "ROU Asset Balance - Amortization",
        PeriodYear: 'PeriodYear',
        data: 'AssetBalanceAmortizationReporting',
      },
      {
        DisclosureClassification:  'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: "ROU Asset Balance - Adjustment",
        PeriodYear: 'PeriodYear',
        data: 'AssetBalanceAdjustmentReporting',
      },
      {
        DisclosureClassification:  'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: "ROU Asset Balance - Closing",
        PeriodYear: 'PeriodYear',
        data: 'AssetBalanceClosingReporting',
      },
      // Second Part
      {
        DisclosureClassification: 'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: "Short Term Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'ShortTermLiabilityClosingReporting',
      },
      {
        DisclosureClassification: 'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: "Long Term Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'LongTermLiabilityClosingReporting',
      },
      {
        DisclosureClassification: 'LeaseTemplate',
        LeaseTemplate: 'LeaseTemplate',
        Display: "Total Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'LiabilityBalanceClosingReporting',
      },
      // Totals: First Part
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: "ROU Asset Balance - Opening",
        PeriodYear:  'PeriodYear',
        data: 'AssetBalanceOpeningReporting',
      },
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: "ROU Asset Balance - Added",
        PeriodYear:  'PeriodYear',
        data: 'AssetBalanceAddedReporting',
      },
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: "ROU Asset Balance - Amortization",
        PeriodYear: 'PeriodYear',
        data: 'AssetBalanceAmortizationReporting',
      },
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: "ROU Asset Balance - Adjustment",
        PeriodYear: 'PeriodYear',
        data: 'AssetBalanceAdjustmentReporting',
      },
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: "ROU Asset Balance - Closing",
        PeriodYear: 'PeriodYear',
        data: 'AssetBalanceClosingReporting',
      },
      // Totals: Second Part
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: "Short Term Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'ShortTermLiabilityClosingReporting',
      },
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: "Long Term Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'LongTermLiabilityClosingReporting',
      },
      {
        DisclosureClassification: 'Total',
        LeaseTemplate: 'Total',
        Display: "Total Liability Balance",
        PeriodYear:  'PeriodYear',
        data: 'LiabilityBalanceClosingReporting',
      },
    ]
  }
];