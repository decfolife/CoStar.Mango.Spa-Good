import {
  addProjectConfiguration,
  readProjectConfiguration,
  formatFiles,
  Tree,
} from '@nrwl/devkit';
import { MangoNxPluginGeneratorSchema } from './schema';

import {
  addFiles,
  addE2e,
  normalizeOptions,
  addUnitTestRunner,
  updatePackageJson,
  updateAngularJson,
  updateMangoRoute,
} from './lib';

/*
 * Main Function
 */
export default async function (
  host: Tree,
  options: MangoNxPluginGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(host, options);
  const mangoSpaRoute = `${readProjectConfiguration(host, 'mango').sourceRoot}/app/app-routing.module.ts`;

  addProjectConfiguration(
    host, 
    normalizedOptions.projectName, 
    {
      root: normalizedOptions.projectRoot,
      projectType: 'application',
      sourceRoot: `${normalizedOptions.projectRoot}/src`,
      targets: {
        build: {
          executor: '@mango/mango-nx-plugin:build',
        },
      },
      tags: normalizedOptions.parsedTags,
    }
  );

  // Create main component
  addFiles(host, normalizedOptions);
  // Add unit Tests
  if(normalizedOptions.addUnitTesting){
    await addE2e(host, normalizedOptions);
  }
  // Create e2e test suite
  if(normalizedOptions.addEnd2EndTesting){
    await addUnitTestRunner(host, normalizedOptions);
  }
  // Add extra build options to Package.json
  updatePackageJson(host, normalizedOptions);

  // Update Angular.json file
  updateAngularJson(host, normalizedOptions);

  // Update MangoSpa routes
  if(normalizedOptions.updateMangoSpaRoute){
    updateMangoRoute(host, normalizedOptions, mangoSpaRoute);
    console.log("\x1b[34mNOTE \x1b[0m If you decide to remove the component, remove it from 'app-routing.module.ts' as well.");
  }

  // Formats all the created or updated files using Prettier
  await formatFiles(host);

}