import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DropdownModule, ButtonModule, LoaderModule, IconModule, ModalModule, InputComponent } from '@mango/ui-shared/lib-ui-elements'
import { MatIconModule } from '@angular/material/icon';
import { DxDataGridModule, DxDropDownBoxModule, DxListModule } from 'devextreme-angular';
import { MatMenuModule } from '@angular/material/menu';
import { DistributionListsComponent } from './distribution-lists.component';
import { DistributionListsMembersComponent } from './distribution-lists-members/distribution-lists-members.component';
import { AddEditDistributionListComponent} from './add-edit-distribution-list/add-edit-distribution-list.component';
import { DistributionListsService } from './distribution-lists.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedService } from '@reports/shared/services/shared.service';

@NgModule({
  declarations: [
    DistributionListsComponent,
    DistributionListsMembersComponent,
    AddEditDistributionListComponent
  ],

  imports: [
    CommonModule,
    SearchModule,
    DropdownModule,
    ModalModule,
    ButtonModule,
    MatIconModule,
    DxDataGridModule,
    FontAwesomeModule,
    DxDropDownBoxModule,
    DxListModule,
    MatMenuModule,
    LoaderModule,
    InputComponent,
    IconModule,
    RouterModule.forChild([
      {
        path: '',
        component: DistributionListsComponent,
        data: {
          breadCrumb: {
            label: 'Distribution Lists',
            append: true,
            activeLink: 'Distribution Lists',
          },
        },
      },
    ])
  ],
  exports: [DistributionListsComponent, RouterModule],
  providers: [
    DatePipe,
    SharedService,
    DistributionListsService
  ]
})
export class DistributionListsModule { }
