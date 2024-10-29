import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DxDataGridModule } from 'devextreme-angular';
import { SharedModule } from '../../shared/shared.module';
import { PortfolioListResolver } from '../../shared/resolvers/portfolio-list-resolver.service';
import { ExchangeRateSetsComponent } from './exchange-rate-sets.component';
import { ExchangeRateSetsService } from './exchange-rate-sets.service';

@NgModule({
  declarations: [ExchangeRateSetsComponent],

  imports: [
    CommonModule,
    DropdownModule,
    DxDataGridModule,
    SearchModule,
    SharedModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'Rate Sets' },
        component: ExchangeRateSetsComponent,
        resolve: { resolvedData: PortfolioListResolver },
      },
      {
        path: ':portfolioId',
        data: { pageTitle: 'Rate Sets' },
        component: ExchangeRateSetsComponent,
        resolve: { resolvedData: PortfolioListResolver },
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [DatePipe, ExchangeRateSetsService],
})
export class ExchangeRateSetsReportModule {}
