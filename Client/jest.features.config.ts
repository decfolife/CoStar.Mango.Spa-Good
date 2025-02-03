const { getJestProjects } = require('@nx/jest');
const { baseConfig } = require('./jest.config.ts');

module.exports = {
  ...baseConfig,
  projects: [...getJestProjects()],
};
