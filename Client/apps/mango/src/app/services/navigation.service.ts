import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OAUTH_CLIENT_KEY_QUERY_PARAM, OAUTH_CONTACT_ID_QUERY_PARAM, OAUTH_REDIRECT_QUERY_PARAM } from "@mango/data-models/lib-data-models";
import { environment } from "@mangoSpa/src/environments/environment.local";
import { SharedLeftNavLink } from "libs/data-models/lib-data-models/src/lib/models/link";

@Injectable()
export class MangoNavigationService {

  constructor(private router: Router, private routerLocation: Location) { }

  handleSpaNavigation(navLink: SharedLeftNavLink, clientKey: string): void {
    if (navLink.spaUrl) {
      this.router.navigate([navLink.spaUrl])
    } else {
      const baseUrl = environment.cremBaseUrl.replace('[CLIENT]', clientKey)
      const redirectionUrl = `${environment.CAUrl}oauth/authorize?${OAUTH_REDIRECT_QUERY_PARAM}=${baseUrl}/v06/login.aspx?ReturnUrl=${navLink.linkUrl.replace('v06/', '')}`
      window.location.href = redirectionUrl
    }
  }

  navigateHome(): void {
    this.router.navigate(['/'])
  }

  redirectToCentralAuth(): void {
    const urlParts = this.routerLocation.path().split('?')
    const extraParamsIndex = urlParts.findIndex(urlPart => urlPart.includes(OAUTH_CLIENT_KEY_QUERY_PARAM) || urlPart.includes(OAUTH_CONTACT_ID_QUERY_PARAM))
    const redirectUri = urlParts.filter((urlPart, index) => index !== extraParamsIndex).join('?')
    const url = `${environment.CAUrl}oauth/authorize?${extraParamsIndex !== -1 ? `${urlParts[extraParamsIndex]}&` : ''}${OAUTH_REDIRECT_QUERY_PARAM}=${`${window.location.origin}/auth/validate?redirect_uri=${encodeURIComponent(redirectUri)}`}`
    window.location.href = url
  }

  extractValue(data, key) {
    var rx = new RegExp(key + "=(.*?)\\s+(\&|\?)");
    var values = rx.exec(data); // or: data.match(rx);
    return values && values[1];
  }
}