import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UtilitiesService } from '@mango/core-shared';
import {
  OAUTH_CLIENT_KEY_QUERY_PARAM,
  OAUTH_CONTACT_ID_QUERY_PARAM,
  OAUTH_REDIRECT_QUERY_PARAM,
} from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link.interface';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MangoNavigationService {
  private subscription$ = new Subscription();
  authorizeUrls: string[] = ['crem/projects/project-tasks'];

  constructor(
    private router: Router,
    private routerLocation: Location,
    private userService: UserService
  ) {}

  handleSpaNavigation(navLink: SharedLeftNavLink, clientKey: string): void {
    //when navLink is the link for a category we need to navigate to the category url
    if (
      !navLink.hasOwnProperty('dynamicName') &&
      navLink.hasOwnProperty('categoryHasFlyOutMenu') &&
      navLink.categoryHasFlyOutMenu
    ) {
      if (navLink.categorySpaUrl) {
        this.router.navigateByUrl(
          `${navLink.categorySpaUrl}${
            navLink.categorySpaQueryParameters
              ? `?${navLink.categorySpaQueryParameters}`
              : ``
          }`
        );
      } else {
        const redirectionUrl = `${environment.cremBaseUrl.replace(
          '[CLIENT]',
          clientKey
        )}${navLink.categoryLinkUrl.startsWith('/') ? '' : '/'}${
          navLink.categoryLinkUrl
        }`;
        this.navigateToUrl(redirectionUrl);
      }

      return;
    }

    // when the linkUrl is an anchor link we need to scroll to the anchor.
    if (navLink.linkUrl.startsWith('#')) {
      this.scrollToAnchor(navLink.linkUrl);
      return;
    }

    if (navLink.spaUrl) {
      this.router.navigateByUrl(
        `${navLink.spaUrl}${
          navLink.spaQueryParameters ? `?${navLink.spaQueryParameters}` : ``
        }`
      );
    } else {
      const redirectionUrl = `${environment.cremBaseUrl.replace(
        '[CLIENT]',
        clientKey
      )}${navLink.linkUrl.startsWith('/') ? '' : '/'}${navLink.linkUrl}`;
      this.navigateToUrl(redirectionUrl);
    }
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  redirectToCentralAuth(includeRedirectUri: boolean = true): void {
    let clientKey = UtilitiesService.getClientKeyFromUrl();
    let caUrl = UtilitiesService.isLocalEnvironment()
      ? environment.CAUrl
      : `${environment.CAUrl}/${clientKey}`;

    const urlParts = this.routerLocation.path().split('?');
    const extraParamsIndex = urlParts.findIndex(
      (urlPart) =>
        urlPart.includes(OAUTH_CLIENT_KEY_QUERY_PARAM) ||
        urlPart.includes(OAUTH_CONTACT_ID_QUERY_PARAM)
    );

    const redirectUri = urlParts
      .filter((urlPart, index) => index !== extraParamsIndex)
      .join('?');

    let url = `${caUrl}?${
      extraParamsIndex !== -1 ? `${urlParts[extraParamsIndex]}&` : ''
    }${OAUTH_REDIRECT_QUERY_PARAM}=${`${window.location.origin}/auth/validate`}`;

    if (includeRedirectUri) {
      url += `?redirect_uri=${encodeURIComponent(redirectUri)}`;
    }

    window.location.href = url;
  }

  redirectToV06Logout(): void {
    let clientKey = UtilitiesService.getClientKeyFromUrl();
    let url = `${environment.cremBaseUrl.replace(
      '[CLIENT]',
      clientKey
    )}/v06/logout.aspx`;
    window.location.href = url;
  }

  redirectToV06Login(authCode: string): void {
    let clientKey = UtilitiesService.getClientKeyFromUrl();
    let url = `${environment.cremBaseUrl.replace(
      '[CLIENT]',
      clientKey
    )}/v06/login.aspx?auth_code=${authCode}&source=spa`;
    window.location.href = url;
  }

  redirectToV06(path: string, params: URLSearchParams): void {
    let clientKey = UtilitiesService.getClientKeyFromUrl();
    let url = `${environment.cremBaseUrl.replace(
      '[CLIENT]',
      clientKey
    )}/v06/${path}?${params.toString()}`;

    if (UtilitiesService.isLocalEnvironment()) {
      console.log(`Faking a redirect to V06 URL: ${url}`);
      return;
    }

    window.location.href = url;
  }

  extractValue(data, key) {
    const rx = new RegExp(key + '=(.*?)\\s+(&|?)');
    const values = rx.exec(data); // or: data.match(rx);
    return values && values[1];
  }

  // This is used because v06 needs a referer header when opening a classic asp page
  navigateToUrl(url) {
    const f = document.createElement('FORM') as HTMLFormElement;
    f.action = url;

    const indexQM = url.indexOf('?');
    if (indexQM >= 0) {
      const params = url.substring(indexQM + 1).split('&');
      for (let i = 0; i < params.length; i++) {
        const keyValuePair = params[i].split('=');
        const input = document.createElement('INPUT') as any;
        input.type = 'hidden';
        input.name = keyValuePair[0];
        input.value = keyValuePair[1];
        f.appendChild(input);
      }
    }

    document.body.appendChild(f);
    f.submit();
  }

  checkUserRights(spaUrl: string, queryParamsStr: string): Observable<boolean> {
    //Check to see if our url is in the authorizeUrls array
    let foundIndex = this.authorizeUrls.findIndex((au) => spaUrl.indexOf(au));
    if (foundIndex < 0) {
      return of(true);
    }

    if (!queryParamsStr.toLowerCase().includes('otid')) {
      return of(true);
    }

    let queryParams = queryParamsStr.toLowerCase().split('&');
    let objType = queryParams
      .find((qp) => qp.indexOf('otid') >= 0)
      .split('=')[1];
    let objId = queryParams.find((qp) => qp.indexOf('oid') >= 0).split('=')[1];

    if (!!objType && !!objId) {
      return this.userService
        .getUserRights(Number(objType), Number(objId), 2)
        .pipe(
          map((res: any) => {
            if (!!res && res.success) {
              return res.data;
            }
          })
        );
    }

    return of(false);
  }

  // scroll to the anchor element ID
  scrollToAnchor(elementId: string) {
    document
      .getElementById(elementId.replace('#', ''))
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
