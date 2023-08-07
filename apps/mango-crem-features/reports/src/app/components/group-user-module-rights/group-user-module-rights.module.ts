import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GroupUserModuleRightsComponent } from './group-user-module-rights.component';
import { GroupUserModuleRightsService } from './group-user-module-rights.service';
import { ModuleListResolver } from './module-list-resolver.service';
import { DxDataGridModule, DxLoadPanelModule, DxTabPanelModule } from 'devextreme-angular';
import { ButtonModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { UserPreferencesResolver } from '../../shared/resolvers/user-preferences-resolver.service';
import { UserListResolver } from '../../shared/resolvers/user-list-resolver.service';
import { GroupListResolver } from '../../shared/resolvers/group-list-resolver.service';

@NgModule({
  declarations: [
    GroupUserModuleRightsComponent
  ],

  imports: [
    CommonModule,
    DropdownModule,
    DxDataGridModule,
    SearchModule,
    SharedModule,
    DxTabPanelModule,
    DxLoadPanelModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'Group and User Module Rights' },
        component: GroupUserModuleRightsComponent,
        resolve: { moduleList: ModuleListResolver, userList: UserListResolver, groupList: GroupListResolver, }
      }
    ])
  ],

  exports: [RouterModule],

  providers: [
    DatePipe,
    GroupUserModuleRightsService
  ]
})
export class GroupUserModuleRightsModule { }