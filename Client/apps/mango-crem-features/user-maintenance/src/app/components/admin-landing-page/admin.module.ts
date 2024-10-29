import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminLandingPageComponent } from './admin-landing-page.component';
import { AdminLandingModule } from './admin-landing-routing.module';
import { ObjectActionsModule } from '@micro-components/object-actions/object-actions/object-actions.module';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderModule } from '@mango/ui-shared/lib-ui-elements';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDivider, MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [AdminLandingPageComponent],
  imports: [
    CommonModule,
    AdminLandingModule,
    ObjectActionsModule,
    NgxSkeletonLoaderModule,
    LoaderModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    DevExpressModule,
    SharedModule.forRoot(),
  ],
  providers: [],
})
export class AdminModule {}
