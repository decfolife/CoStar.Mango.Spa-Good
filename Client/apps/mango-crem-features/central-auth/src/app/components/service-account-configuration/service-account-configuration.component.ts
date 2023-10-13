import { Component, ViewChild } from '@angular/core';
import { DBkeys, SettingsService, StorageService, UserService } from '@mango/core-shared/lib-core-shared';
import { CentralAuthError, CentralAuthErrorCodes, ContactRecord, MangoErrorTypes, UNEXPECTED_ERROR_MESSAGE, UserSite } from '@mango/data-models/lib-data-models';
import { CustomerSelectionListComponent } from '../customer-select/customer-selection-list/customer-selection-list.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ContactSelectComponent } from '../contact-select/contact-select.component';
import { Router } from '@angular/router';

@Component({
  selector: 'mango-service-account-configuration',
  templateUrl: './service-account-configuration.component.html',
  styleUrls: ['./service-account-configuration.component.scss'],
})
export class ServiceAccountConfigurationComponent {
  
}
