import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAUTH_REDIRECT_QUERY_PARAM } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Subscription } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';

@Component({
  selector: 'mango-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
})
export class ValidateComponent implements OnInit, OnDestroy {

  subs: Subscription[] = []

  constructor(private activatedRoute: ActivatedRoute, private facade: MangoAppFacade) { }

  ngOnInit(): void {
    this.subs.push(this.activatedRoute.queryParams.pipe(
      first(queryParams => !!queryParams),
      map(params => [params.auth_code, params[OAUTH_REDIRECT_QUERY_PARAM]]),
      filter(([authCode, redirectionUri]) => !!authCode),
      map(([authCode, redirectionUri]) => this.facade.oauthAuth(authCode, redirectionUri))
    ).subscribe())
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe)
  }
}
