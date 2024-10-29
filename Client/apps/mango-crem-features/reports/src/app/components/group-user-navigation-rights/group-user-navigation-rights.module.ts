import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { SharedModule } from '../../shared/shared.module';
import { GroupListResolver } from '../../shared/resolvers/group-list-resolver.service';
import { UserListResolver } from '../../shared/resolvers/user-list-resolver.service';
import { GroupUserNavigationRightsComponent } from './group-user-navigation-rights.component';
import { GroupUserNavigationRightsService } from './group-user-navigation-rights.service';
import { ModuleListResolver } from './module-list-resolver.service';
import { ButtonModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';

@NgModule({
  declarations: [GroupUserNavigationRightsComponent],

  imports: [
    CommonModule,
    SharedModule,
    DxDataGridModule,
    SearchModule,
    DropdownModule,
    DxLoadPanelModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'Group and User Navigation Rights' },
        component: GroupUserNavigationRightsComponent,
        resolve: {
          userList: UserListResolver,
          groupList: GroupListResolver,
          moduleList: ModuleListResolver,
        },
      },
      {
        path: 'user/:userId',
        data: { pageTitle: 'Group and User Navigation Rights' },
        component: GroupUserNavigationRightsComponent,
        resolve: {
          userList: UserListResolver,
          groupList: GroupListResolver,
          moduleList: ModuleListResolver,
        },
      },
      {
        path: 'user/:userId/module/:moduleId',
        data: { pageTitle: 'Group and User Navigation Rights' },
        component: GroupUserNavigationRightsComponent,
        resolve: {
          userList: UserListResolver,
          groupList: GroupListResolver,
          moduleList: ModuleListResolver,
        },
      },
      {
        path: 'group/:groupId',
        data: { pageTitle: 'Group and User Navigation Rights' },
        component: GroupUserNavigationRightsComponent,
        resolve: {
          userList: UserListResolver,
          groupList: GroupListResolver,
          moduleList: ModuleListResolver,
        },
      },
      {
        path: 'group/:groupId/module/:moduleId',
        data: { pageTitle: 'Group and User Navigation Rights' },
        component: GroupUserNavigationRightsComponent,
        resolve: {
          userList: UserListResolver,
          groupList: GroupListResolver,
          moduleList: ModuleListResolver,
        },
      },
    ]),
  ],

  exports: [RouterModule],

  providers: [DatePipe, GroupUserNavigationRightsService],
})
export class GroupUserNavigationRightsModule {}
