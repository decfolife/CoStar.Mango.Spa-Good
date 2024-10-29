import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { SharedModule } from '../../shared/shared.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    SharedModule.forRoot(),
    SearchModule,
  ],
  providers: [],
})
export class IndexModule {}
