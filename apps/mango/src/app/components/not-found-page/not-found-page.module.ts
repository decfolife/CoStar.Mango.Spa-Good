import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './not-found-page.component';
import { NotFoundPageRoutingModule } from './not-found-page-routing.module';
import { NotFoundModule } from 'libs/ui-shared/lib-ui-shared/src/lib/not-found/not-found.module';


 @NgModule({
     imports: [
        NotFoundPageRoutingModule,
        NotFoundModule
     ],
    declarations: [NotFoundPageComponent],
    exports: [NotFoundPageComponent]
 })
 export class NotFoundPageModule {}
