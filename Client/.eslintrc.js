const { join } = require('path');
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    project: './tsconfig.base.json',
    sourceType: 'module',
  },
  rules: {
    'rxjs-angular/prefer-composition': [
      'error',
      {
        checkDecorators: ['Component'],
      },
    ],
  },
  root: true,
  ignorePatterns: ['**/*'],
  plugins: ['@nx', 'rxjs-angular'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'off',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nx/typescript'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nx/javascript'],
      rules: {},
    },
  ],
  extends: ['plugin:storybook/recommended'],
};
