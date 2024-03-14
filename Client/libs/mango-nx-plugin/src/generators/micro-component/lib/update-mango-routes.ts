import { Tree, names } from '@nx/devkit';
import type { NormalizeSchema } from './normalize-schema';

export function updateMangoRoute(
  host: Tree,
  options: NormalizeSchema,
  routingFile: string
) {
  const newRoute = `{
    path: '${options.name}',
    loadChildren: () =>
    import(
      '../../../mango-crem-features/${
        options.name
      }/src/app/components/index/index.module'
      ).then((mod) => mod.IndexModule),
      // data: '{ currentSubApp: MangoSubApps.${
        names(options.name).constantName
      }' }
    },
    // @!micro-component-generator: don't delete this line
  `;

  // Get contents
  const fileEntry = host.read(routingFile);
  const contents = fileEntry.toString();

  // Write file: Only write the file if something has changed
  const newContents = contents.replace(
    "// @!micro-component-generator: don't delete this line",
    newRoute
  );

  if (newContents !== contents) {
    host.write(routingFile, newContents);
  }

  console.log(
    '\x1b[32mUPDATED \x1b[0m apps/mango/src/app/app-routing.module.ts with new route'
  );
}
