# Micro-component mango-crem-features-data-set-dictionary

## Development

Serve the micro-component using `ng serve mango-crem-features-data-set-dictionary`.

Read more about the development workflow with MangoSpa and CREM at the [CoStar Wiki](https://wiki.costargroup.com/pages/viewpage.action?pageId=781160959).

## Building

For building, the following options are available:

- `npm run build:dev:microcomponent-mango-crem-features-data-set-dictionary`
- `npm run build:test:microcomponent-mango-crem-features-data-set-dictionary`
- `npm run build:ops:microcomponent-mango-crem-features-data-set-dictionary`
- `npm run build:stage:microcomponent-mango-crem-features-data-set-dictionary`
- `npm run build:prod:microcomponent-mango-crem-features-data-set-dictionary`

The built files can be found on `./dis/cremDist/mango-crem-features-data-set-dictionary`.

## Remove Micro-component

If created, remove the testing suite first, then remove the micro-component:
`nx g @nrwl/workspace:remove mango-crem-features-data-set-dictionary-e2e ; nx g @nrwl/workspace:remove mango-crem-features-data-set-dictionary`. Additionally, if a routing option was added to MangoSpa, you will need to manually remove it in `./apps/mango/src/app/app-routing.module.ts`.

For a completely manual process discard the changes in Git, or delete the lines in the following files: `./angular.json`, `./tsconfig.json`, `./jest.config.js`, `nx.json`, `./apps/mango/src/app/app-routing.module.ts` and `./apps/mango-crem-features/mango-crem-features-data-set-dictionary`.
