import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitiesService } from '@mango/core-shared';
import {
  OAUTH_CLIENT_KEY_QUERY_PARAM,
  OAUTH_CONTACT_ID_QUERY_PARAM,
  OAUTH_REDIRECT_QUERY_PARAM,
} from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link.interface';

@Injectable()
export class MangoNavigationService {
  constructor(private router: Router, private routerLocation: Location) {}

  handleSpaNavigation(navLink: SharedLeftNavLink, clientKey: string): void {
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
      )}/${navLink.linkUrl}`;
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
      : `${environment.CAUrl}${clientKey}`;

    if (!includeRedirectUri) {
      window.location.href = caUrl;
      return;
    }

    const urlParts = this.routerLocation.path().split('?');
    const extraParamsIndex = urlParts.findIndex(
      (urlPart) =>
        urlPart.includes(OAUTH_CLIENT_KEY_QUERY_PARAM) ||
        urlPart.includes(OAUTH_CONTACT_ID_QUERY_PARAM)
    );
    const redirectUri = urlParts
      .filter((urlPart, index) => index !== extraParamsIndex)
      .join('?');
    const url = `${caUrl}?${
      extraParamsIndex !== -1 ? `${urlParts[extraParamsIndex]}&` : ''
    }${OAUTH_REDIRECT_QUERY_PARAM}=${`${
      window.location.origin
    }/auth/validate?redirect_uri=${encodeURIComponent(redirectUri)}`}`;
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

  redirectToV06(path: string, params: URLSearchParams): void {
    let clientKey = UtilitiesService.getClientKeyFromUrl()
    let url = `${environment.cremBaseUrl.replace('[CLIENT]', clientKey)}/v06/${path}?${params.toString()}`

    if (UtilitiesService.isLocalEnvironment()) {
      console.log(`Faking a redirect to V06 URL: ${url}`)
      return
    }

    window.location.href = url
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
}
