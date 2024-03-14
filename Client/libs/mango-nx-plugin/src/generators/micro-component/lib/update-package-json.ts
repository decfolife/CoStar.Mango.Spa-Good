import { Tree, updateJson } from '@nx/devkit';
import type { NormalizeSchema } from './normalize-schema';

export function updatePackageJson(host: Tree, options: NormalizeSchema) {
  updateJson(host, 'package.json', (json) => {
    json.scripts[
      `build:dev:microcomponent-${options.name}`
    ] = `ng build ${options.projectName} --configuration=dev && node ./apps/mango-crem-features/${options.name}/build-element.js`;
    json.scripts[
      `build:test:microcomponent-${options.name}`
    ] = `ng build ${options.projectName} --configuration=test && node ./apps/mango-crem-features/${options.name}/build-element.js`;
    json.scripts[
      `build:ops:microcomponent-${options.name}`
    ] = `ng build ${options.projectName} --configuration=ops && node ./apps/mango-crem-features/${options.name}/build-element.js`;
    json.scripts[
      `build:stage:microcomponent-${options.name}`
    ] = `ng build ${options.projectName} --configuration=stage && node ./apps/mango-crem-features/${options.name}/build-element.js`;
    json.scripts[
      `build:prod:microcomponent-${options.name}`
    ] = `ng build ${options.projectName} --configuration=prod && node ./apps/mango-crem-features/${options.name}/build-element.js`;
    return json; // return modified JSON object
  });

  console.log('\x1b[32mUPDATED \x1b[0m package.json build options');
}
