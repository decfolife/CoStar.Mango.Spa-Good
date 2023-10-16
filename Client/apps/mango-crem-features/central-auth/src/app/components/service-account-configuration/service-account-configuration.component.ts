import { Component, OnInit } from '@angular/core';
import { StorageService, UserService } from '@mango/core-shared/lib-core-shared';

@Component({
  selector: 'mango-service-account-configuration',
  templateUrl: './service-account-configuration.component.html',
  styleUrls: ['./service-account-configuration.component.scss'],
})
export class ServiceAccountConfigurationComponent implements OnInit{
  public userEmail: string;

  constructor(
    private userService: UserService,
    ) { }


    ngOnInit(): void {
      this.userEmail = this.userService.currentUserValue.email;
    }
  
}
