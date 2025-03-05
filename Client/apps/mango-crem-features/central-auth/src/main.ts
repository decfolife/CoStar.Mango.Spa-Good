import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from 'apps/mango/src/environments/environment.local';

import config from 'devextreme/core/config'; 
import { licenseKey } from './license/devextreme-license.js'; 
 
config({ licenseKey });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
