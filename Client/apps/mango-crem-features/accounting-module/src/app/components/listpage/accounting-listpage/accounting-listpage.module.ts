import { CommonModule } from '@angular/common';
import { AccountingListpageComponent } from './accounting-listpage.component';
import { AccountingListpageRoutingModule } from './accounting-listpage-routing.module';
import { IndexModule } from 'apps/mango-crem-features/list-pages/src/app/components/index.module.hosted'
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AccountingListpageComponent
  ],
  imports: [
    CommonModule,
    AccountingListpageRoutingModule,
    IndexModule,

  ],
  providers: [],
  exports: [AccountingListpageComponent],
})
export class AccountingListpageModule { }
