import { getWorkspaceLayout, names, Tree } from '@nx/devkit';
import { MangoNxPluginGeneratorSchema } from '../schema';
import { NormalizeSchema } from './normalize-schema';

export function normalizeOptions(
  host: Tree,
  options: MangoNxPluginGeneratorSchema
): NormalizeSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName =
    'mango-crem-features-' +
    projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${
    getWorkspaceLayout(host).appsDir
  }/mango-crem-features/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}
