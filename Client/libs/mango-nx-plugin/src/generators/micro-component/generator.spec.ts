import { createTreeWithEmptyV1Workspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './generator';
import { MangoNxPluginGeneratorSchema } from './schema';

describe('mango-nx-plugin generator', () => {
  let host: Tree;
  const options: MangoNxPluginGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    host = createTreeWithEmptyV1Workspace();
  });

  it('should run successfully', async () => {
    await generator(host, options);
    const config = readProjectConfiguration(host, 'test');
    expect(config).toBeDefined();
  });
});
