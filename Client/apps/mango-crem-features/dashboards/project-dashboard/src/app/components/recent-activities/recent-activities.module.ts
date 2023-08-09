import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DropdownModule, ButtonModule, LoaderModule, FavoriteIconModule } from '@mango/ui-shared/lib-ui-elements'
import { MatIconModule } from '@angular/material/icon';
import { DxDataGridModule } from 'devextreme-angular';
import { MatMenuModule } from '@angular/material/menu';
import { RecentActivitiesComponent } from './recent-activities.component';
import { RecentActivitiesRoutingModule } from './recent-activities-routing.module';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { CardsService } from '@project-dashboard/services/cards.service';

@NgModule({
  declarations: [
    RecentActivitiesComponent
  ],
  imports: [
    CommonModule,
    RecentActivitiesRoutingModule,
    SearchModule,
    DropdownModule,
    ButtonModule,
    MatIconModule,
    DxDataGridModule,
    MatMenuModule,
    LoaderModule,
    FavoriteIconModule
  ],
  providers: [DashboardService, CardsService],
  exports: [RecentActivitiesComponent],
})
export class RecentActivitiesModule { }
