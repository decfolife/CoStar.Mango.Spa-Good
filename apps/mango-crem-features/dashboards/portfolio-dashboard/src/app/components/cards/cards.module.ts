import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CardModule, DropdownModule, LoaderModule, ModalModule, SimpleGridModule } from '@mango/ui-shared/lib-ui-elements';

import { CardsComponent } from './cards.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UpcomingLeaseExpirationsComponent } from '../cards/upcoming-lease-expirations/upcoming-lease-expirations.component';
import { AnnualExpirationRentValueComponent } from './annual-expiration-rent-value/annual-expiration-rent-value.component';
import { CriticalDatesComponent } from './critical-dates/critical-dates.component';
import { LeaseExpirationsComponent } from './lease-expirations/lease-expirations.component';
import { NewLeasesComponent } from './new-leases/new-leases.component';
import { OwnershipTypeComponent } from './ownership-type/ownership-type.component';
import { PortfolioActivityFeedComponent } from './portfolio-activity-feed/portfolio-activity-feed.component';
import { RecentlyArchivedLeasesComponent } from './recently-archived-leases/recently-archived-leases.component';
import { BuildingTypeComponent } from './building-type/building-type.component';
import { StoresByFormatComponent } from './stores-by-format/stores-by-format.component';
import { ExpiringLeasesOptionsGridComponent } from './upcoming-lease-expirations/expiring-leases-options-grid/expiring-leases-options-grid.component';
import { DxChartModule, DxDataGridModule, DxPieChartModule } from 'devextreme-angular';
import { BuildingByStatesComponent } from './building-by-states/building-by-states.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FinancialsAccountingLinksComponent } from './financials-accounting-links/financials-accounting-links.component';

// eslint-disable-next-line max-len
const WARNING = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
@NgModule({
  declarations: [
    CardsComponent, 
    AnnualExpirationRentValueComponent,
    CriticalDatesComponent,
    LeaseExpirationsComponent,
    NewLeasesComponent,
    OwnershipTypeComponent,
    PortfolioActivityFeedComponent,
    RecentlyArchivedLeasesComponent,
    BuildingTypeComponent,
    StoresByFormatComponent,
    UpcomingLeaseExpirationsComponent,
    ExpiringLeasesOptionsGridComponent,
    LeaseExpirationsComponent,
    BuildingByStatesComponent,
    FinancialsAccountingLinksComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    HttpClientModule,
    DropdownModule, 
    LoaderModule, 
    ModalModule, 
    SimpleGridModule,
    CardModule,
    DxChartModule,
    DxDataGridModule,
    DxPieChartModule,
    NgxSkeletonLoaderModule,
    MatSlideToggleModule
  ],
  exports: [CardsComponent],
  providers: [],
  bootstrap: [CardsModule],
})
export class CardsModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // Note that we provide the icon here as a string literal here due to a limitation in
    // Stackblitz. If you want to provide the icon from a URL, you can use:
    // `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
    iconRegistry.addSvgIconLiteral(
      'warning',
      sanitizer.bypassSecurityTrustHtml(WARNING)
    );
  }
}
