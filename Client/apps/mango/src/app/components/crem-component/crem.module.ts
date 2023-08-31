import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CremComponent } from './crem-component';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { BookmarksModule, LibUiElementsModule } from '@mango/ui-shared/lib-ui-elements';
import { RouterModule } from '@angular/router';
import { searchResultsModule } from 'apps/mango-crem-features/quick-search/src/app/components/modal/search-results/search-results.module';
import { HeaderModule } from 'libs/ui-shared/lib-ui-shared/src/lib/header';
import { ToolbarModule } from 'libs/ui-shared/lib-ui-shared/src/lib/toolbar';
import { SharedLeftNavModule } from 'libs/ui-shared/lib-ui-shared/src/lib/shared-left-nav';
import {BreadcrumbsComponent} from '../breadcrumbs/breadcrumbs.component'
import { CostarSuiteHeaderModule } from 'libs/ui-shared/lib-ui-shared/src/lib/costar-suite-header/costar-suite-header.module';
import { DisplayBreadcrumbsModule } from 'libs/ui-shared/lib-ui-shared/src/lib/spa-breadcrumbs/display-breadcrumbs/display-breadcrumbs.module';

@NgModule({
  declarations: [CremComponent, BreadcrumbsComponent],
  imports: [
    CommonModule,
    RouterModule,
    LibUiElementsModule,
    LibDataModelsModule,
    HeaderModule,
    CostarSuiteHeaderModule,
    ToolbarModule,
    BookmarksModule,
    searchResultsModule,
    DisplayBreadcrumbsModule,
    SharedLeftNavModule
  ],
  exports: [CremComponent]
})
export class CremModule { }
