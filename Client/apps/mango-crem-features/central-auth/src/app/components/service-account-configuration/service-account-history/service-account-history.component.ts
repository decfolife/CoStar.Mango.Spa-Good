import { Component, Input, OnInit} from '@angular/core';
import { UserService } from '@mango/core-shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-service-account-history',
  templateUrl: './service-account-history.component.html',
  styleUrls: ['./service-account-history.component.scss'],
})
export class ServiceAccountHistoryComponent implements OnInit {
  @Input() userEmail: string;
  public changeHistoryData:any;
  
  subs: Subscription[] = []

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getChangeHistory();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  private getChangeHistory() {
    this.subs.push(
      this.userService.getServiceAccountChangeHistory(this.userEmail)
      .subscribe(result => {        
        if(result){          
            this.changeHistoryData =  result;      
        }
      })
    )
  }
}
