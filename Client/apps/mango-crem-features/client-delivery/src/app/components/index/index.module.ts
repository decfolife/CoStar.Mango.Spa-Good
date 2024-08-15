import { NgModule} from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientDeliveryService } from '../../services/client-delivery.service';
import { UserMaintenanceService } from '../../../../../user-maintenance/src/app/components/user-maintenance/user-maintenance.service';
import { IndexRoutingModule } from '../index/index-routing.module';

@NgModule({
  declarations: [],
  imports: [
    IndexRoutingModule
  ],
  exports: [RouterModule],
  providers: [
    ClientDeliveryService,
    UserMaintenanceService,
    DatePipe
  ],
})
export class IndexModule { }
