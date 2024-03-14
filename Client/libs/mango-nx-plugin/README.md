# Generate Custom Micro-component with Nx

The easy micro-component creation is thanks to _generators_ provided by Nx. Generators help to provide consistency and reduce implementation time in boilerplate. At the same time implements the correct patterns and architecture for the application. These schematics come out of the box with the organization and community best practices in place.

To summarize, using Nx _generators_ has the following advantages:

- Development speed
- Reduced boilerplate creation
- Consistency
- Best practices

An Nx workspace is a monorepo ([Read more about Angular & Nx](https://nx.dev/angular-tutoria))

- Using the command line: Check available options using the CLI, `nx --help`
- Using VS Code extension In Visual Studio Code, go to Extensions, search for 'Nx Console' ([Nx Console - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) ) and install.

The whole MangoSpa app is configured in a monorepo fashing and manage by [Nx](https://nx.dev/). The micro-components are apps within the codebase. The list of micro-component can be found at `apps/mango-crem-features/`.

You can also learn Nx at [Official Nx courses by Nrwl ](https://nxplaybook.com/).

## Process Overview

We use Nx custom generators for creating new micro-components. It allows automation, consistency, and compliance. The custom Nx generator will provide the scaffolding needed for having a fully integrated MangoSpa micro-component.

The following tasks are performed by the custom micro-component generator:

1. **Create new micro-component boilerplate** (Eg. `my-new-micro-component`)

   - Create the micro-component with a single entry point: `index` component
   - Create the components using the SCSS guidelines
   - Create `readme.md` for micro-component instructions/description
     - Why exists?
     - What it does?
     - Where it goes?

2. **Add tests suites**

   1. End-2-end testing with Cypress, Eg. `my-new-micro-component-e2e` ([Read More](https://nx.dev/react-tutorial/02-add-e2e-test))
   2. Unit test boilerplate with Jest.

3. **Create the new routes in the main app** (optional)

   - It will create a new route in `app/mango/app-routing.module.ts` and `path: 'crem'`.

4. **Create project configurations** ([Read more](https://nx.dev/reference/project-configuration)): - Add a new project inside `angular.json`: The following parameters will be included as well: - `architect.build.configurations.XX` - `dev` - `test` - `ops` - `stage` - `prod` - `options.stylePreprocessorOptions.includePaths`: - `options.styles`: - `configurations.XX.fileReplacements`: Where `XX` is the environment. - `configurations.XX.budgets`: Where `XX` is the environment. - **Add build scripts in `package.json`:**
   Additional entries are added in `package.json`. Each new parameter corresponds to a `architect.build.configurations...` in `angular.json` — one new build command for each build configuration parameter. I.e. `test`, `ops`, `stage`, and `prod`.

Eg. `"build:dev:microcomponent-my-new-micro-component": "ng build microcomponent-my-new-micro-component --configuration=dev && node ./apps/mango-crem-features/my-new-micro-component/build-element.js"`.

Note that a `dev` line is not included since a build option is not needed for development, for development `serve` is used.

5. **Additional updates in the root folder**
   - `jest.config.js`: Add a line to the array of [projects]((https://jestjs.io/docs/configuration#projects-arraystring--projectconfig). With this configuration, your new micro-component will be included in the list of _applications_ to test as part of your monorepo.
   - `nx.json` ([Read more](https://nx.dev/reference/nx-json))

## Create New Micro-components

Build the plugin and then run micro-component generator:
`> npm run nx build mango-nx-plugin; npm run nx generate ./dist/libs/mango-nx-plugin:micro-component`

## Remove Micro-component

If created, remove the testing suite first, then remove the micro-component:
`nx g @nx/workspace:remove <your-app>-e2e ; nx g @nx/workspace:remove <your-app>`. Additionally, if a routing option was added to MangoSpa, you will need to manually remove it in `./apps/mango/src/app/app-routing.module.ts`.

For a completely manual process discard the changes in Git, or delete the lines in the following files: `./angular.json`, `./tsconfig.json`, `./jest.config.js`, `nx.json`, `./apps/mango/src/app/app-routing.module.ts` and `./apps/mango-crem-features/<your-app>`.
