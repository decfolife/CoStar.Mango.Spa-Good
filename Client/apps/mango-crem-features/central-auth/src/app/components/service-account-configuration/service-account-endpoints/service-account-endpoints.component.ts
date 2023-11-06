import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@mango/core-shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-service-account-endpoints',
  templateUrl: './service-account-endpoints.component.html',
  styleUrls: ['./service-account-endpoints.component.scss'],
})
export class ServiceAccountEndpointsComponent implements OnInit {
  @Input() userEmail: string;
  public endpoints: any;

  subs: Subscription[] = []

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getEndpoints(this.userEmail);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  private getEndpoints(userEmail: string) {
    this.subs.push(
      this.userService.getServiceAccountEndpoints()
      .subscribe(result => {        
        if(result){          
            this.endpoints =  result.endpoints;    
        }
      })
    )
  }
}

