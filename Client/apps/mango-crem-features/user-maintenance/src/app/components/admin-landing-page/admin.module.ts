import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminLandingPageComponent } from './admin-landing-page.component';
import { AdminLandingModule } from './admin-landing-routing.module';
import { ObjectActionsModule } from '@micro-components/object-actions/object-actions/object-actions.module'

@NgModule({
  declarations: [AdminLandingPageComponent],
  imports: [
    CommonModule,
    AdminLandingModule,
    ObjectActionsModule,
    SharedModule.forRoot(),
  ],
  providers: [
  ],
})
export class AdminModule {}