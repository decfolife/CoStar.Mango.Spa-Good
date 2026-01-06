export default {
  coverageReporters: ['text', 'text-summary'],
  displayName: 'mango',
  projects: [
    // App
    './apps/mango',
    // Projects
    // './apps/mango-crem-features/accounting-history',
    './apps/mango-crem-features/accounting-module',
    // './apps/mango-crem-features/accounting-profile',
    // './apps/mango-crem-features/accounting-summary',
    // './apps/mango-crem-features/accountingmanagement',
    // './apps/mango-crem-features/admin-service',
    // './apps/mango-crem-features/alerts',
    // './apps/mango-crem-features/alerts-rules',
    // './apps/mango-crem-features/batch-accounting',
    // './apps/mango-crem-features/client-settings',
    // './apps/mango-crem-features/costar-matching',
    // './apps/mango-crem-features/dashboards/portfolio-dashboard',
    // './apps/mango-crem-features/dashboards/project-dashboard',
    // './apps/mango-crem-features/data-set-dictionary',
    // './apps/mango-crem-features/etl',
    // './apps/mango-crem-features/financial-reporting-settings',
    // './apps/mango-crem-features/group-maintenance',
    // './apps/mango-crem-features/journal-entry-processing',
    // './apps/mango-crem-features/ledgers',
    // './apps/mango-crem-features/list-pages',
    // './apps/mango-crem-features/micro-components',
    // './apps/mango-crem-features/object-actions',
    // './apps/mango-crem-features/object-maintenance',
    // './apps/mango-crem-features/object-reactivation',
    // './apps/mango-crem-features/portfolio-maintenance',
    // './apps/mango-crem-features/quick-search',
    // './apps/mango-crem-features/reports',
    // './apps/mango-crem-features/start-page-selection',
    // './apps/mango-crem-features/user-maintenance',
  ],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        outputPath: './dist/apps/mangospa-test-report/index.html',
        pageTitle: 'Test Report: MangoSPA',
      },
    ],
  ],
  transform: {
    '^.+.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        stringifyContentPathRegex: '\\.(html|svg)$',

        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
  coverageThreshold: {
    global: {
      lines: 10,
      statements: 10,
      functions: 1,
      branches: 0,
    },
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
