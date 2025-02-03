import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable()
export class UtilitiesService {
  public static baseUrl() {
    return document.getElementsByTagName('base')[0].href;
    // return window.location.origin // better?
  }

  public static getClientKeyFromUrl(localClientKey: string = 'blank') {
    if (this.isLocalEnvironment()) {
      return localClientKey;
    }

    return window.location.origin.split('.')[0].split('//')[1];
  }

  // Parse string to json format
  public static JsonTryParse(value: string) {
    try {
      return JSON.parse(value);
    } catch (e) {
      if (value === 'undefined') {
        return void 0;
      }
      return value;
    }
  }

  // Get trackingId from response header or response body
  // trackingId will be in the body when its an unhandled exception
  public static getTrackingId(response: HttpErrorResponse): string {
    var trackingId = response.headers.get('TrackingId');
    if (!trackingId) {
      trackingId = response.error.trackingId;
    }

    return trackingId;
  }

  public static isLocalEnvironment() {
    if (
      environment.name === 'LOCAL' ||
      window.location.origin.includes('localhost')
    ) {
      return true;
    }

    return false;
  }

  public static isUpperEnvironments() {
    if (environment.name === 'STAGE' || environment.name === 'PROD') {
      return true;
    }

    return false;
  }

  // Get the base url for all the APIs
  // When running locally, this is the environment.baseApiUrl
  // Otherwise, all API calls route through the MangoSPA backend server (BFF)
  public static getBaseApiUrl(serviceName: string, localApiUrl: string = null) {
    if (this.isLocalEnvironment()) {
      if (localApiUrl) {
        return `${localApiUrl}/api/`;
      }
      return `${environment.baseApiUrl}${serviceName}/api/`;
    }

    return `/api/${serviceName}/api/`;
  }

  // Get the base url for the CA backend server (aka Identity API)
  // This function should ONLY be used by CA SPA app.
  public static getCABackendBaseApiUrl() {
    if (this.isLocalEnvironment()) {
      return `${environment.CAUrl}/api`;
    }

    return `/api`;
  }
}
