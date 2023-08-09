import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public static baseUrl() {
    return document.getElementsByTagName('base')[0].href;
  }
  
  constructor() { }
}
