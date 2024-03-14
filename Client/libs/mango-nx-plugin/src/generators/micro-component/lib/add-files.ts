import { Tree, generateFiles, names, offsetFromRoot } from '@nx/devkit';
import * as path from 'path';
import type { NormalizeSchema } from './normalize-schema';

/**
 * Generates a folder of files based on provided templates.
 *
 * @param host Nx Devkit Virtual Tree
 * @param options Normalized Schema
 *
 */
export function addFiles(host: Tree, options: NormalizeSchema) {
  generateFiles(host, path.join(__dirname, '../files'), options.projectRoot, {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  });

  console.log('\x1b[32mCREATED \x1b[0m folders and files');
}
