import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import { SkeletonModule } from '@mango/ui-shared/lib-ui-elements';
import { PageHeaderComponent } from '@mango/ui-shared/lib-ui-elements';
import { AiListPageComponent } from './ai-list-page.component';
import { FormWizardService } from '@micro-components/services/form-wizard.service';

@NgModule({
  declarations: [AiListPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    DxDataGridModule,
    SkeletonModule,
    PageHeaderComponent,
  ],
  providers: [FormWizardService],
  exports: [AiListPageComponent],
})
export class AiListPageModule {}
