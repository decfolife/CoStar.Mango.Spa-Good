const { getJestProjects } = require('@nx/jest');

export default {
  coverageReporters: ['text', 'text-summary'],
  displayName: 'mango',
  projects: [
    ...getJestProjects(),
    // Apps
    '<rootDir>/apps/mango',
    '<rootDir>/apps/mango-crem-features',
    // Libs
    '<rootDir>/libs/core-shared',
    '<rootDir>/libs/data-models/lib-data-models',
    '<rootDir>/libs/forms-shared',
    '<rootDir>/libs/mango-nx-plugin',
    // UI Shared
    '<rootDir>/libs/ui-shared/common',
    '<rootDir>/libs/ui-shared/lib-ui-elements',
    '<rootDir>/libs/ui-shared/lib-ui-shared',
  ],
};
