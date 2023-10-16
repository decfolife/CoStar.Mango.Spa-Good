import { Component, OnInit, Input} from '@angular/core';
import { UserService } from '@mango/core-shared';

@Component({
  selector: 'mango-service-account-api-keys',
  templateUrl: './service-account-api-keys.component.html',
  styleUrls: ['./service-account-api-keys.component.scss'],
})
export class ServiceAccountApiKeysComponent implements OnInit {
  @Input() userEmail: string;
  public dateGenerated: Date;
  public expirationDate: Date;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
      this.getAPIKeyInfo();
  }

  private getAPIKeyInfo() {
    this.userService.getServiceAccountApiKeyInfo(this.userEmail)
    .subscribe(result => {        
      if(result){          
          this.dateGenerated =  result.dateGenerated;
          this.expirationDate =  result.expirationDate;        
      }
    })
  }

  generateApiKey(){
    this.userService.generateApiKey(this.userEmail)
    .subscribe(result => {        
      if(result){          
        console.log('ApiKey generated.')
      }
    })
  }
}
