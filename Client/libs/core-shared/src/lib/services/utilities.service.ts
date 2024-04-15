import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable()
export class UtilitiesService {
  public static baseUrl() {
    return document.getElementsByTagName('base')[0].href;
    // return window.location.origin // better?
  }

  public static getClientKeyFromUrl() {
    return window.location.origin.split('.')[0].split('//')[1]
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
    if (environment.name === 'LOCAL' || window.location.origin.includes('localhost')) {
      return true;
    }

    return false;
  }

  // Get the base url for all the APIs
  // When running locally, this is the environment.baseApiUrl
  // Otherwise, all API calls route through the MangoSPA web server
  public static getBaseApiUrl(serviceName: string) {
    if (this.isLocalEnvironment()) {
      //return `http://localhost:3000/api/${serviceName}/api/`
      return `${environment.baseApiUrl}${serviceName}/api/`
    }

    return `${window.location.origin}/api/${serviceName}/api/`
  }

  public static getCremUrl(clientKey: string, env: string, token?: string) {
    let url: string;

    switch (env) {
      case 'STAGE': {
        url = `https://${clientKey}.${env}.costarremanager.com/v06/login.aspx`; 
        break; 
      }
      case 'PROD': { 
        url = `https://${clientKey}.costarremanager.com/v06/login.aspx`; 
        break; 
      }
      case 'LOCAL': { 
        url = `https://${clientKey}.${env}/v06/login.aspx`; 
        break; 
      }
      default: {
        url = `http://${clientKey}.${env}.corp.virtualpremise.com/v06/login.aspx`; 
        break; 
      }
    }

    if (token) {
      url += `?auth_code=${token}`;
    }

    return url;
  }
}
