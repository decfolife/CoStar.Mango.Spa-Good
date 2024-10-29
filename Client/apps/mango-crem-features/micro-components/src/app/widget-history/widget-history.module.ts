import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  ModalModule,
  SimpleGridModule,
} from '@mango/ui-shared/lib-ui-elements';
import { WidgetHistoryComponent } from './modal/widget-history.component';
import { OpenWidgetHistoryModalComponent } from './open-widget-history-modal.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { FormItemService } from '@micro-components/services/form-item.service';
import { DxLoadPanelModule } from 'devextreme-angular';

@NgModule({
  declarations: [WidgetHistoryComponent, OpenWidgetHistoryModalComponent],
  exports: [WidgetHistoryComponent],
  imports: [
    CommonModule,
    ButtonModule,
    DxButtonModule,
    ModalModule,
    DxLoadPanelModule,
    SimpleGridModule,
  ],
  providers: [FormItemService],
})
export class WidgetHistoryModule {
  constructor() {}
}
