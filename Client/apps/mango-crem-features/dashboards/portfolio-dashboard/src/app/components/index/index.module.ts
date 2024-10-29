import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardsModule } from '../cards/cards.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { LoaderModule } from '@mango/ui-shared/lib-ui-elements';
import { LibUiElementsModule } from '@mango/ui-shared/lib-ui-elements';
import { PortfolioDashboardService } from '../../services/portfolio-dashboard.service';
import { UserSettingsModule } from '../modal/user-settings/user-settings.module';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    LoaderModule,
    CardsModule,
    UserSettingsModule,
    LibUiSharedModule,
    LibUiElementsModule,
  ],
  providers: [PortfolioDashboardService, PortfolioDataService],
})
export class IndexModule {}
