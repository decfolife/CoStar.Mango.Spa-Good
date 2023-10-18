import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DropdownModule, ButtonModule, LoaderModule, FavoriteIconModule } from '@mango/ui-shared/lib-ui-elements'
import { MatIconModule } from '@angular/material/icon';
import { DxDataGridModule } from 'devextreme-angular';
import { MatMenuModule } from '@angular/material/menu';
import { TeamsComponent } from './teams.component';
import { TeamsRoutingModule } from './teams-routing.module';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { CardsService } from '@project-dashboard/services/cards.service';
import { TeamMembersComponent } from './team-members/team-members.component';

@NgModule({
  declarations: [
    TeamsComponent,
    TeamMembersComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
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
  exports: [TeamsComponent],
})
export class TeamsModule { }
