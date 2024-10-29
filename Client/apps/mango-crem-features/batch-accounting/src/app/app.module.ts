import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';

import {
  DevExtremeModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxFormModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
} from 'devextreme-angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScreenLoaderModule } from '@mango/ui-shared/lib-ui-elements';

import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
import { BatchEventListComponent } from './batch-event-list/batch-event-list.component';
import { BatchLogsComponent } from './batch-logs/batch-logs.component';
// import { ConfigurationService } from './services/configuration.service';
// import { EndpointService } from './services/endpoint.service';
import { ParametersCardComponent } from './batch-event-list/parameters-card/parameters-card.component';
import { ParametersGridComponent } from './batch-event-list/parameters-grid/parameters-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    BatchEventListComponent,
    BatchLogsComponent,
    ParametersCardComponent,
    ParametersGridComponent,
  ],
  imports: [
    // AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DevExtremeModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxFormModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxScrollViewModule,
    DxSelectBoxModule,
    FontAwesomeModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatStepperModule,
    ScreenLoaderModule,
  ],
  // providers: [
  //   ConfigurationService,
  //   {
  //     provide: 'BASE_URL',
  //     useFactory:  EndpointService.baseUrl
  //   },
  // ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });

    customElements.define('mango-ba-root', el);
  }
}
