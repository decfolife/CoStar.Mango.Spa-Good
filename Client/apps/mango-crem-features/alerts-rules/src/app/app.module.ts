import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  DevExtremeModule,
  DxDataGridModule,
  DxFormModule,
  DxPopupModule
} from 'devextreme-angular';

import { AlertsRulesGridComponent } from './alerts-rules-grid/alerts-rules-grid.component';
import { AlertsRulesComponent } from './alerts-rules/alerts-rules.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertsRulesComponent,
    AlertsRulesGridComponent,
  ],
  imports: [
    DevExtremeModule,
    DxDataGridModule,
    DxFormModule,
    DxPopupModule,
    FontAwesomeModule,
    HttpClientModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
