import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTeamComponent } from './project-team.component';
import { ButtonModule, LoaderModule, ModalModule, TooltipBasicModule } from '@mango/ui-shared/lib-ui-elements';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DxDataGridModule, DxDropDownBoxModule, DxListModule, DxSelectBoxModule, 
         DxCheckBoxModule, DxTextBoxModule, DxDateBoxModule} from 'devextreme-angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { AddEditMemberComponent } from './add-edit-member/add-edit-member.component';
import { MangoDialogService } from '@project-dashboard/services/mango-dialog.service';

@NgModule({
  declarations: [
    ProjectTeamComponent,
    MemberDetailsComponent,
    AddEditMemberComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    LoaderModule,
    ModalModule,
    TooltipBasicModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    SearchModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxListModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxDateBoxModule,
  ],
  providers: [MangoDialogService],
  exports: [ProjectTeamComponent],
})
export class ProjectTeamModule { }
