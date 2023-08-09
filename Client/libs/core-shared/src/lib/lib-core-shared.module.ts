import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {LibDataModelsModule} from '@mango/data-models/lib-data-models'

import {
  AuthGuard,
  JwtService,
  StorageService,
  UserService,
  SettingsService
} from './services';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { SanitizeHtmlPipe } from './pipes';

@NgModule({
  imports: [CommonModule, LibDataModelsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthGuard,
    StorageService,
    UserService,
    JwtService,
    SanitizeHtmlPipe,
    SettingsService
  ],
  declarations: [],
})
export class LibCoreSharedModule extends EnsureModuleLoadedOnceGuard {
  // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: LibCoreSharedModule) {
    super(parentModule);
  }
}
