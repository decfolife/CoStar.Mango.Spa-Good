/* eslint-disable */
export default {
  displayName: 'mango-crem-features-client-settings',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {},
  coverageDirectory:
    '../../../coverage/apps/mango-crem-features/client-settings',
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
