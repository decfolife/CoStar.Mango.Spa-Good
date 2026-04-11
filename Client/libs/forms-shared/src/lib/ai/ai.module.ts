import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiRoutingModule } from './ai-routing.module';
import { AiListPageModule } from './ai-list-page/ai-list-page.module';
import { AiLeaseFormModule } from './ai-lease-form/ai-lease-form.module';

@NgModule({
  imports: [CommonModule, AiRoutingModule, AiListPageModule, AiLeaseFormModule],
})
export class AiModule {}
