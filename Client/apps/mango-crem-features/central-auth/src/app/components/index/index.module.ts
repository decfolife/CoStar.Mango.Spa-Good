import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../guards/auth.guard';
import { IndexComponent } from './index.component';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';
import { CentralAuthHttpInterceptor } from '../../services/http.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { LoginModule } from '../login/login.module';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { ContactSelectModule } from '../contact-select/contact-select.module';
import { CustomerSelectModule } from '../customer-select/customer-select.module';
import { IndexRoutingModule } from './index.routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { ServiceAccountConfigurationModule} from '../service-account-configuration/service-account-configuration.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule, 
    LoginModule,
    IndexRoutingModule, 
    LibUiSharedModule, 
    CustomerSelectModule,
    ContactSelectModule,
    NavbarModule,
    ServiceAccountConfigurationModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-bottom-center',
      progressBar: true,
      closeButton: true,
      tapToDismiss: false,
      disableTimeOut: true,
    }),
    CentralAuthErrorHandler.forRoot(),
    CentralAuthHttpInterceptor.forRoot()
  ],
  exports: [IndexComponent],
  providers: [AuthGuard],
  bootstrap: [IndexComponent],
})
export class IndexModule {}
