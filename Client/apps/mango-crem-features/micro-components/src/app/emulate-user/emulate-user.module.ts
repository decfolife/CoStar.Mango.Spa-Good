import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmulateUserService } from '../services/emulate-user.service';
import { EmulateUserAppComponent } from './emulate-user.component';
import { SimpleGridModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule, TextFieldModule } from '@mango/ui-shared/cosmos';


@NgModule({
  declarations: [
    EmulateUserAppComponent,
  ],
  exports: [ EmulateUserAppComponent ],
  imports: [
    CommonModule,
    SimpleGridModule,
    SearchModule,
    TextFieldModule,
  ],
  providers: [ EmulateUserService ]
})
export class EmulateUserAppModule {
  constructor() {
  }
}
