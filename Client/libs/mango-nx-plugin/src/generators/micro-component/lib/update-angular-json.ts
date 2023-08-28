import { Tree, updateJson } from '@nrwl/devkit';
import type { NormalizeSchema } from './normalize-schema';

export function updateAngularJson(host: Tree, options: NormalizeSchema) {
  updateJson(host, 'angular.json', (json) => {
    json.projects = json.projects ?? {};
    json.projects[`${options.projectName}`] =
    json.projects[`${options.projectName}`] ?? {};
    json.projects[`${options.projectName}`].architect =
    json.projects[`${options.projectName}`].architect ?? {};
    json.projects[`${options.projectName}`].architect = JSON.parse(`
      {
        "build": {
        "builder": "@angular-devkit/build-angular:browser",
        "options": {
          "outputPath": "dist/apps/mango-crem-features/${options.name}",
          "index": "apps/mango-crem-features/${options.name}/src/index.html",
          "main": "apps/mango-crem-features/${options.name}/src/main.ts",
          "polyfills": "apps/mango-crem-features/${options.name}/src/polyfills.ts",
          "tsConfig": "apps/mango-crem-features/${options.name}/tsconfig.app.json",
          "aot": true,
          "stylePreprocessorOptions": {
            "includePaths": [
              "libs/ui-shared",
              "apps/mango"
            ]
          },
          "assets": [
            "apps/mango-crem-features/${options.name}/src/assets/favicon.ico",
            "apps/mango-crem-features/${options.name}/src/assets"
          ],
          "styles": [
            "node_modules/devextreme/dist/css/dx.common.css",
            "node_modules/devextreme/dist/css/dx.light.css",
            "apps/mango/src/assets/styles/costar-dev-extreme.scss",
            "apps/mango-crem-features/${options.name}/src/styles.scss"
          ],
          "scripts": []
        },
        "configurations": {
          "dev": {
            
          "optimization": {
            "scripts": true,
            "styles": {
              "minify": true,
              "inlineCritical": false
            },
            "fonts": false
          },
            "outputHashing": "none",
            "sourceMap": false,
            "
            "namedChunks": false,
            "aot": true,
            "extractLicenses": true,
            "vendorChunk": false,
            "buildOptimizer": true,
            "fileReplacements": [
              {
                "replace": "apps/mango/src/environments/environment.local.ts",
                "with": "apps/mango-crem-features/${options.name}/src/environments/environment.dev.ts"
              }
            ],
            "budgets": [
              {
                "type": "initial",
                "maximumWarning": "10mb",
                "maximumError": "20mb"
              },
              {
                "type": "anyComponentStyle",
                "maximumWarning": "6kb",
                "maximumError": "1mb"
              }
            ]
          },
          "test": {
            
          "optimization": {
            "scripts": true,
            "styles": {
              "minify": true,
              "inlineCritical": false
            },
            "fonts": false
          },
            "outputHashing": "none",
            "sourceMap": false,
            "
            "namedChunks": false,
            "aot": true,
            "extractLicenses": true,
            "vendorChunk": false,
            "buildOptimizer": true,
            "fileReplacements": [
              {
                "replace": "apps/mango/src/environments/environment.local.ts",
                "with": "apps/mango-crem-features/${options.name}/src/environments/environment.test.ts"
              }
            ],
            "budgets": [
              {
                "type": "initial",
                "maximumWarning": "10mb",
                "maximumError": "20mb"
              },
              {
                "type": "anyComponentStyle",
                "maximumWarning": "6kb",
                "maximumError": "1mb"
              }
            ]
          },
          "ops": {
            
          "optimization": {
            "scripts": true,
            "styles": {
              "minify": true,
              "inlineCritical": false
            },
            "fonts": false
          },
            "outputHashing": "none",
            "sourceMap": false,
            "
            "namedChunks": false,
            "aot": true,
            "extractLicenses": true,
            "vendorChunk": false,
            "buildOptimizer": true,
            "fileReplacements": [
              {
                "replace": "apps/mango/src/environments/environment.local.ts",
                "with": "apps/mango-crem-features/${options.name}/src/environments/environment.ops.ts"
              }
            ],
            "budgets": [
              {
                "type": "initial",
                "maximumWarning": "10mb",
                "maximumError": "20mb"
              },
              {
                "type": "anyComponentStyle",
                "maximumWarning": "6kb",
                "maximumError": "1mb"
              }
            ]
          },
          "stage": {
            
          "optimization": {
            "scripts": true,
            "styles": {
              "minify": true,
              "inlineCritical": false
            },
            "fonts": false
          },
            "outputHashing": "none",
            "sourceMap": false,
            "
            "namedChunks": false,
            "aot": true,
            "extractLicenses": true,
            "vendorChunk": false,
            "buildOptimizer": true,
            "fileReplacements": [
              {
                "replace": "apps/mango/src/environments/environment.local.ts",
                "with": "apps/mango-crem-features/${options.name}/src/environments/environment.stage.ts"
              }
            ],
            "budgets": [
              {
                "type": "initial",
                "maximumWarning": "10mb",
                "maximumError": "20mb"
              },
              {
                "type": "anyComponentStyle",
                "maximumWarning": "6kb",
                "maximumError": "1mb"
              }
            ]
          },
          "prod": {
            
          "optimization": {
            "scripts": true,
            "styles": {
              "minify": true,
              "inlineCritical": false
            },
            "fonts": false
          },
            "outputHashing": "none",
            "sourceMap": false,
            "
            "namedChunks": false,
            "aot": true,
            "extractLicenses": true,
            "vendorChunk": false,
            "buildOptimizer": true,
            "fileReplacements": [
              {
                "replace": "apps/mango/src/environments/environment.local.ts",
                "with": "apps/mango-crem-features/${options.name}/src/environments/environment.prod.ts"
              }
            ],
            "budgets": [
              {
                "type": "initial",
                "maximumWarning": "10mb",
                "maximumError": "20mb"
              },
              {
                "type": "anyComponentStyle",
                "maximumWarning": "6kb",
                "maximumError": "1mb"
              }
            ]
          }
        }
      },
      "serve": {
        "builder": "@angular-devkit/build-angular:dev-server",
        "options": {
          "browserTarget": "${options.projectName}:build"
        },
        "configurations": {
          "production": {
            "browserTarget": "${options.projectName}:build:production"
          }
        }
      },
      "extract-i18n": {
        "builder": "@angular-devkit/build-angular:extract-i18n",
        "options": {
          "browserTarget": "${options.projectName}:build"
        }
      },
        "lint": {
          "builder": "@nrwl/linter:eslint",
          "options": {
            "lintFilePatterns": [
              "apps/mango-crem-features/${options.name}/src/**/*.ts",
              "apps/mango-crem-features/${options.name}/src/**/*.html"
            ]
          }
        },
        "test": {
          "builder": "@nrwl/jest:jest",
          "outputs": [
            "coverage/apps/mango-crem-features/${options.name}"
          ],
          "options": {
            "jestConfig": "apps/mango-crem-features/${options.name}/jest.config.js",
            "passWithNoTests": true
          }
        }
      }
  `);
    return json; // return modified JSON object
  });
  console.log('\x1b[32mUPDATED \x1b[0m angular.json build options');
}
