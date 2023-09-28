import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { LeaseAlertsModule } from '@micro-components/lease-alerts/lease-alerts.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    SearchModule,
    LeaseAlertsModule,
  ],
  providers: [
  ],
})
export class IndexModule {}
