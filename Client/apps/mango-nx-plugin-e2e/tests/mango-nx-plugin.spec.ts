import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('mango-nx-plugin e2e', () => {
  it('should create mango-nx-plugin', async (done) => {
    const plugin = uniq('mango-nx-plugin');
    ensureNxProject('@mango/mango-nx-plugin', 'dist/libs/mango-nx-plugin');
    await runNxCommandAsync(
      `generate @mango/mango-nx-plugin:micro-component ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('mango-nx-plugin');
      ensureNxProject('@mango/mango-nx-plugin', 'dist/libs/mango-nx-plugin');
      await runNxCommandAsync(
        `generate @mango/mango-nx-plugin:micro-component ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('mango-nx-plugin');
      ensureNxProject('@mango/mango-nx-plugin', 'dist/libs/mango-nx-plugin');
      await runNxCommandAsync(
        `generate @mango/mango-nx-plugin:micro-component ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
