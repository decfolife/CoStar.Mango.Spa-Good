/* eslint-disable */
/** @type {import('@jest/types').Config.InitialOptions} */

export default {
  displayName: 'batch-accounting',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  testPathIgnorePatterns: ['src/environments/'],
  coveragePathIgnorePatterns: ['src/environments/'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../../coverage/apps/batch-accounting',
  coverageReporters: ['html', 'lcov'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: {
    '^.+.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
};
