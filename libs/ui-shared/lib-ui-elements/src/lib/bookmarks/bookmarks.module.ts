
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { BookmarksComponent } from './bookmarks.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BookmarksComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    LibDataModelsModule,
    NgxSkeletonLoaderModule,

  ],
  exports: [BookmarksComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookmarksModule {

}
