import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GroupUserHistoryComponent } from './group-user-history.component';
import { GroupUserHistoryService } from './group-user-history.service';
import { UserPreferencesResolver } from '../../shared/resolvers/user-preferences-resolver.service';
import {
  DxDataGridModule,
  DxDropDownBoxModule,
  DxDateBoxModule,
  DxFormModule,
  DxTabPanelModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { ButtonModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { GroupUserNavigationRightsService } from '../group-user-navigation-rights/group-user-navigation-rights.service';
import { UserListResolver } from '../../shared/resolvers/user-list-resolver.service';
import { GroupListResolver } from '../../shared/resolvers/group-list-resolver.service';

@NgModule({
  declarations: [GroupUserHistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxDateBoxModule,
    DxFormModule,
    DropdownModule,
    ButtonModule,
    SearchModule,
    DxTabPanelModule,
    DxLoadPanelModule,
    DxPopupModule,
    DxValidatorModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'Group and User History' },
        component: GroupUserHistoryComponent,
        resolve: {
          userList: UserListResolver,
          groupList: GroupListResolver,
          userPreferences: UserPreferencesResolver,
        },
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [
    DatePipe,
    GroupUserHistoryService,
    GroupUserNavigationRightsService,
  ],
})
export class GroupUserHistoryModule {}
