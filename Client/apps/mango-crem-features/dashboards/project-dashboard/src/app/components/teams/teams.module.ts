import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { ButtonModule, LoaderModule, ModalModule } from '@mango/ui-shared/lib-ui-elements'
import { MatIconModule } from '@angular/material/icon';
import { DxDataGridModule, DxDropDownBoxModule, DxListModule } from 'devextreme-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { TeamsComponent } from './teams.component';
import { TeamsRoutingModule } from './teams-routing.module';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { CardsService } from '@project-dashboard/services/cards.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TeamMembersComponent } from './team-members/team-members.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { TextFieldModule } from '@mango/ui-shared/cosmos';

@NgModule({
  declarations: [
    TeamsComponent,
    TeamMembersComponent,
    AddTeamComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SearchModule,
    ButtonModule,
    MatIconModule,
    DxDataGridModule,
    FontAwesomeModule,
    MatMenuModule,
    MatSlideToggleModule,
    LoaderModule,
    ModalModule,
    DxDropDownBoxModule,
    DxListModule,
    TextFieldModule,
  ],
  providers: [DashboardService, CardsService],
  exports: [TeamsComponent],
})
export class TeamsModule { }
