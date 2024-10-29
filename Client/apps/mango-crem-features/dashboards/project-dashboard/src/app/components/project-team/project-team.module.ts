import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTeamComponent } from './project-team.component';
import {
  ButtonModule,
  LoaderModule,
  ModalModule,
  TooltipModule,
  ToggleSliderComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SearchModule } from '@mango/ui-shared/cosmos';
import {
  DxDataGridModule,
  DxDropDownBoxModule,
  DxListModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextBoxModule,
  DxDateBoxModule,
  DxValidatorModule,
  DxValidationGroupModule,
} from 'devextreme-angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { AddEditMemberComponent } from './add-edit-member/add-edit-member.component';
import { SaveTeamTemplateComponent } from './save-team-template/save-team-template.component';
import { ImportTeamComponent } from './import-team/import-team.component';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';

@NgModule({
  declarations: [
    ProjectTeamComponent,
    MemberDetailsComponent,
    AddEditMemberComponent,
    SaveTeamTemplateComponent,
    ImportTeamComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    LoaderModule,
    ModalModule,
    TooltipModule,
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
    DxValidatorModule,
    DxValidationGroupModule,
    LibUiSharedModule,
    ToggleSliderComponent,
  ],
  providers: [],
  exports: [ProjectTeamComponent],
})
export class ProjectTeamModule {}
