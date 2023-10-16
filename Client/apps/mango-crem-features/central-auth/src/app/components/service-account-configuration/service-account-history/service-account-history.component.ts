import { Component, Input, OnInit} from '@angular/core';
import { UserService } from '@mango/core-shared';

@Component({
  selector: 'mango-service-account-history',
  templateUrl: './service-account-history.component.html',
  styleUrls: ['./service-account-history.component.scss'],
})
export class ServiceAccountHistoryComponent implements OnInit {
  @Input() userEmail: string;
  public changeHistoryData:any;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getChangeHistory();
  }

  private getChangeHistory() {
    this.userService.getServiceAccountChangeHistory(this.userEmail)
    .subscribe(result => {        
      if(result){          
          this.changeHistoryData =  result;      
      }
    })
  }
}
