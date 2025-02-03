import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromApp from '../+state/dynamic-forms.reducer';
import { DynamicFormsEffects } from '../+state/dynamic-forms.effects';
import { environment } from '@mangoSpa/src/environments/environment.local';

const DEV_MODULES = [];

if (!environment.production) {
  DEV_MODULES.push(
    StoreDevtoolsModule.instrument({
      name: 'MangoSPA',
      maxAge: 25,
      autoPause: true,
    })
  );
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexRoutingModule,
    EffectsModule.forRoot([]),
    StoreModule.forFeature(
      fromApp.APP_FEATURE_KEY,
      fromApp.dynamicFormsReducer
    ),
    EffectsModule.forFeature([DynamicFormsEffects]),
    ...DEV_MODULES,
  ],
})
export class IndexModule {}
