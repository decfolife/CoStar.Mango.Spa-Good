import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayBreadcrumbsComponent } from './display-breadcrumbs.component';
import { IconModule } from '@mango/ui-shared/lib-ui-elements';

@NgModule({
  declarations: [DisplayBreadcrumbsComponent],
  imports: [
    CommonModule,
    IconModule,
  ],
  exports: [DisplayBreadcrumbsComponent]
})
export class DisplayBreadcrumbsModule {
}
