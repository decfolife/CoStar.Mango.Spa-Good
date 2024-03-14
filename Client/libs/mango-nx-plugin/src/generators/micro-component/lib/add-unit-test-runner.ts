import type { Tree } from '@nx/devkit';
import type { NormalizeSchema } from './normalize-schema';

import { jestProjectGenerator } from '@nx/jest';

export async function addUnitTestRunner(host: Tree, options: NormalizeSchema) {
  await jestProjectGenerator(host, {
    project: options.projectName,
    setupFile: 'angular',
    supportTsx: false,
    skipSerializers: true,
  });
}
