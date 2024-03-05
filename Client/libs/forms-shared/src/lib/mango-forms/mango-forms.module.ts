import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangoFormsRoutingModule } from './mango-forms-routing.module';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from '../+state/dynamic-forms.reducer';
import { DynamicFormsEffects } from '../+state/dynamic-forms.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MangoFormsRoutingModule,
    EffectsModule.forRoot([]),
    StoreModule.forFeature(
      fromApp.APP_FEATURE_KEY,
      fromApp.dynamicFormsReducer
    ),
    EffectsModule.forFeature([DynamicFormsEffects]),
    StoreDevtoolsModule.instrument(),
  ],
})
export class MangoFormsModule {}
