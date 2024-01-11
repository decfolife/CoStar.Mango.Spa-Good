import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTeamComponent } from './project-team.component';
import { ButtonModule, LoaderModule, ModalModule } from '@mango/ui-shared/lib-ui-elements'
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SearchModule, TextAreaModule } from '@mango/ui-shared/cosmos';
import { DxDataGridModule, DxListModule } from 'devextreme-angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MemberDetailsComponent } from './member-details/member-details.component';

@NgModule({
  declarations: [
    ProjectTeamComponent,
    MemberDetailsComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    LoaderModule,
    ModalModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    SearchModule,
    DxDataGridModule,
    DxListModule,
  ],
  providers: [],
  exports: [ProjectTeamComponent],
})
export class ProjectTeamModule { }
