/* eslint-disable */
export default {
  displayName: 'mango',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {},
  reporters: [
    'default',
    [
      '../../node_modules/jest-html-reporter',
      {
        outputPath: './dist/apps/mangospa-test-report/index.html',
        pageTitle: 'Test Report: MangoSPA',
      },
    ],
  ],
  coverageThreshold: {
    global: {
      lines: 10,
      statements: 10,
      functions: 1,
      branches: 0,
    },
  },

  testPathIgnorePatterns: ['environments'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
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
};
