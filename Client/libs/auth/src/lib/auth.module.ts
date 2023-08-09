import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './containers/login';
import { LoginFormComponent } from './components/login-form';
import { LibExternalLibrariesModule } from '@mango/ui-shared/lib-external-libraries';
//import { LibCoreSharedModule } from '@mango/core-shared';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    LibDataModelsModule,
    LibUiSharedModule,
    LibExternalLibrariesModule
  ],
  declarations: [LoginComponent, LoginFormComponent],
  providers: [],
})
export class AuthModule {}
