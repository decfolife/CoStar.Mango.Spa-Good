import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderModule } from '@mango/ui-shared/lib-ui-elements';
import { DashboardService } from '../../services/dashboard.service';
import { CardsService } from '../../services/cards.service';
import { CardsModule } from '../cards/cards.module';
import { UserSettingsModule } from '../modal/user-settings/user-settings.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    LoaderModule,
    CardsModule,
    UserSettingsModule,
    LibUiSharedModule
  ],
  providers: [
    DashboardService,
    CardsService,
  ],
})
export class IndexModule {}
