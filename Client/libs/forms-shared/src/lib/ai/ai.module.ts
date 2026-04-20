import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiRoutingModule } from './ai-routing.module';
import { AiListPageModule } from './ai-list-page/ai-list-page.module';
import { AiLeaseFormModule } from './ai-lease-form/ai-lease-form.module';
import { AiSidebarModule } from './ai-sidebar/ai-sidebar.module';
import { AiDocumentPageComponent } from './ai-document-page/ai-document-page.component';
import { AddAiLeaseModalModule } from 'libs/ui-shared/lib-ui-shared/src/lib/add-ai-lease-modal/add-ai-lease-modal.module';
import { DropdownModule } from '@mango/ui-shared/lib-ui-elements';

@NgModule({
  declarations: [AiDocumentPageComponent],
  imports: [
    CommonModule,
    AiRoutingModule,
    AiListPageModule,
    AiLeaseFormModule,
    AiSidebarModule,
    AddAiLeaseModalModule,
    DropdownModule,
  ],
})
export class AiModule {}
