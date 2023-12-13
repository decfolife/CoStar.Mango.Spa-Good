import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { RouterModule } from '@angular/router';
//import { LibCoreSharedModule } from '@mango/core-shared';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListErrorsModule } from './list-errors/list-errors.module';
import { NotFoundModule } from './not-found/not-found.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { CremHeaderModule } from './crem-header/crem-header.module';
import { LibUiElementsModule } from '@mango/ui-shared/lib-ui-elements';
import { EnvInfoChipModule } from './env-info-chip/env-info-chip.module';
import { HeroMetricsContainerModule } from './hero-metrics-container';
import { DashboardFiltersModule } from './dashboard-filters';
import { SharedLeftNavModule } from './shared-left-nav';
import { ShadowFiltersContainerModule } from './shadow-filters-container';
import { CostarSuiteHeaderModule } from './costar-suite-header/costar-suite-header.module';
import { AddBuildingModalModule } from './add-building-modal/add-building-modal.module';
import { MangoDialogModule } from './mango-dialog';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LibDataModelsModule,
    LibUiElementsModule,
    EnvInfoChipModule,
    DashboardFiltersModule,
    HeroMetricsContainerModule,
    ShadowFiltersContainerModule,
    SharedLeftNavModule,
    MangoDialogModule,
    AddBuildingModalModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    ListErrorsModule,
    NotFoundModule,
    ToolbarModule,
    CremHeaderModule,
    CostarSuiteHeaderModule,
    EnvInfoChipModule,
    DashboardFiltersModule,
    HeroMetricsContainerModule,
    ShadowFiltersContainerModule,
    SharedLeftNavModule,
    MangoDialogModule,
    AddBuildingModalModule
  ],
})
export class LibUiSharedModule {}
