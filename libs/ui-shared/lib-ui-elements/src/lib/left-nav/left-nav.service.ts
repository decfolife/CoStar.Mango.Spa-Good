import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentItem } from './left-nav.component';
import { observable, Observable } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';
import { MatTabBody } from '@angular/material/tabs';

@Injectable()
export class LeftNavService {
  constructor(private http: HttpClient) {}

  public GetMenu() {
    const url = `/v06/WebServices/Mango/Navigation.asmx/GetMenu`;

    console.log(this.http.get<CurrentItem[]>(url));
    return this.http.get<CurrentItem[]>(url);
  }
}
