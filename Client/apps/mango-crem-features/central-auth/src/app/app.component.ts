import { Component, OnInit } from '@angular/core';
import { CentralAuthFacade } from './+state/facades';
import { Observable } from 'rxjs';
import { CentralAuthURLService } from './services/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoading$: Observable<boolean>
  
  constructor(private centralAuthFacade: CentralAuthFacade, private activatedRoute: ActivatedRoute) {
    this.isLoading$ = this.centralAuthFacade.loading$
  }

  ngOnInit(): void {
    this.centralAuthFacade.appInit()
  }
}
