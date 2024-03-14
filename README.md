# MangoSPA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Docker Testing

To build Mango SPA (using ng build) from your local CLI and having the application served by Docker to mimic a production environment while maintaining speed for testing, follow these steps:

1) Build the client by running ng build from your local CLI.
2) Execute docker-compose -f docker-compose.local.build.yml up -d to serve the application using Docker.
3) Perform another build on your host computer locally by running ng build to test any changes.

### Additional Commands

-  Rebuild a specific container:
`$ docker-compose -f docker-compose.local.build.yml up --build web`
Replace 'web' with the name of the service as described in the docker-compose file.

- Rebuild all the images/services:
`$ docker-compose -f docker-compose.local.build.yml up --build`
Feel free to adapt these commands based on your specific configuration and requirements.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
