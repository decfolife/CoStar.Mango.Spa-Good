import { Component, OnInit } from '@angular/core';
import { CentralAuthFacade } from './+state/facades';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private centralAuthFacade: CentralAuthFacade,) { }

  ngOnInit(): void {
    this.centralAuthFacade.appInit()
  }
}
