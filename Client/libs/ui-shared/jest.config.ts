/* eslint-disable */
export default {
  displayName: 'ui-shared',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  globals: {},
  reporters: [
    "default",
    [
      "../../node_modules/jest-html-reporter",
      {
        "outputPath": "./dist/storybook/ui-shared-storybook-host/test-report/index.html",
        "pageTitle": "Test Report: ui-shared",
      }
    ]
  ],
  coverageDirectory: '../../../coverage/libs/ui-shared',
  coverageThreshold: {
    global: {
      lines: 10,
      statements: 10,
      functions: 1,
      branches: 0,
    },
  },
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  coverageReporters: ['text', 'text-summary']
};
