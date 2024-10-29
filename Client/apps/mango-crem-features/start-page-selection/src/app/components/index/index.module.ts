import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { CremHeaderModule } from 'libs/ui-shared/lib-ui-shared/src/lib/crem-header/crem-header.module';
import { StartPageService } from '../../services/data.service';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MatCardModule,
    DropdownModule,
    ButtonModule,
    CremHeaderModule,
  ],
  providers: [StartPageService],
})
export class IndexModule {}
