import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OAUTH_REDIRECT_QUERY_PARAM } from "@mango/data-models/lib-data-models";
import { environment } from "@mangoSpa/src/environments/environment.local";
import { SharedLeftNavLink } from "libs/data-models/lib-data-models/src/lib/models/link";

@Injectable()
export class MangoNavigationService {

  constructor(private router: Router) { }

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
}