/* eslint-disable */
/** @type {import('@jest/types').Config.InitialOptions} */

export default {
  displayName: 'accounting-module',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  testPathIgnorePatterns: ['src/environments/'],
  coveragePathIgnorePatterns: ['src/environments/'],
  globals: {},
  coverageDirectory: '../../../coverage/apps/components/',
  coverageReporters: ['html', 'lcov'],
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
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
};
