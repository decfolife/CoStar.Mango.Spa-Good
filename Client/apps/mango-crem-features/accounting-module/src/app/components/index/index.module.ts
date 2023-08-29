import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IndexModule } from 'apps/mango-crem-features/list-pages/src/app/components/index.module.hosted';
import { ModuleLeftNavAppComponent } from 'apps/mango-crem-features/micro-components/src/app/module-left-nav/module-left-nav.component';
import { ProjectsDashboardLeftNavService } from 
  'apps/mango-crem-features/micro-components/src/app/services/projects-dashboard-left-nav.service';
import { SharedLeftNavModule } from 'libs/ui-shared/lib-ui-shared/src/lib/shared-left-nav';
import { AppComponent } from '../../app.component';
import { DashboardModule } from '../../components/dashboard/accounting-dashboard.module';
import { IndexComponent } from '../../components/index/index.component';
import { AccountingListpageComponent } from '../../components/listpage/accounting-listpage/accounting-listpage.component';
import { IndexRoutingModule } from './index-routing.module';

// TODO: The 'crem-icon' should be utilized instead of directly using the FontAwesome library.
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ModuleLeftNavAppComponent,
    AccountingListpageComponent,
  ],

  imports: [
    CommonModule,
    IndexRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedLeftNavModule,
    DashboardModule,
    IndexModule
  ],

  providers: [ ProjectsDashboardLeftNavService ]
})

export class IndexMainModule {}

