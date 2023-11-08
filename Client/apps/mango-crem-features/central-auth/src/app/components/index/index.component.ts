import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CentralAuthFacade } from '../../+state/facades';
import { filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'mango-central-auth',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class IndexComponent implements OnInit {

  user$ = this.centralAuthFacade.user$

  constructor(private centralAuthFacade: CentralAuthFacade, private router: Router) { }

  ngOnInit(): void {
    this.user$.pipe(
      filter(user => !!user),
      tap(user => this.router.navigate([user.isServiceAccount ? 'service-account-configuration' : '/customer-selection']))
    ).subscribe()
  }
}
