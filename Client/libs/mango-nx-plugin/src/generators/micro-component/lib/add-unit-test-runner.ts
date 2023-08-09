import type { Tree } from '@nrwl/devkit';
import type { NormalizeSchema } from './normalize-schema';

import { jestProjectGenerator } from '@nrwl/jest';

export async function addUnitTestRunner(host: Tree, options: NormalizeSchema) {

  await jestProjectGenerator(host, {
    project: options.projectName,
    setupFile: 'angular',
    supportTsx: false,
    skipSerializers: true,
  });

}