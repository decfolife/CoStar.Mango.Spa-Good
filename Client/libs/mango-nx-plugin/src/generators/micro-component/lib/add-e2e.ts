import { 
  Tree,
} from '@nrwl/devkit';
import type { NormalizeSchema } from './normalize-schema';
import { cypressProjectGenerator } from '@nrwl/cypress';

/**
 * Add E2E Config
 *
 * @param host Nx Devkit Virtual Tree
 * @param options Normalized Schema
 *
 * @returns Function to run to add Cypres config after intial app files have been moved to correct location
 */
export async function addE2e (
  host: Tree,
  options: NormalizeSchema,
) {

  await cypressProjectGenerator(host, {
    ...options,
    name: `${options.name}-e2e`,
    directory: 'mango-crem-features',
    project: options.projectName,
  });

}