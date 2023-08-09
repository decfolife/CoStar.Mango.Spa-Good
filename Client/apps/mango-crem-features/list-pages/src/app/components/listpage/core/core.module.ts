import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { UtilitiesService } from './services/utilities.service';
import { ListPageService } from './services/listpage.service';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [RouterModule, HttpClientModule],
  declarations: [],
  providers: [
    UtilitiesService,
    ListPageService,
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
