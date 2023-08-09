import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GroupUserBlockedAdminLinksComponent } from './group-user-blocked-admin-links.component';
import { GroupUserBlockedAdminLinksService } from './group-user-blocked-admin-links.service';
import { DxDataGridModule } from 'devextreme-angular';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { ButtonModule } from '@mango/ui-shared/lib-ui-elements';

@NgModule({
  declarations: [
    GroupUserBlockedAdminLinksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DxDataGridModule,
    SearchModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'Group and User Blocked Admin Links' },
        component: GroupUserBlockedAdminLinksComponent
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    DatePipe,
    GroupUserBlockedAdminLinksService
  ]
})
export class GroupUserBlockedAdminLinksModule { }