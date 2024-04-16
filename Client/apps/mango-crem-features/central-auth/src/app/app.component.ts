import { Component, OnInit } from '@angular/core';
import { CentralAuthFacade } from './+state/facades';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>
  
  constructor(private centralAuthFacade: CentralAuthFacade) {
    this.isLoading$ = this.centralAuthFacade.loading$
  }

  ngOnInit(): void {
    this.centralAuthFacade.appInit()
  }
}
