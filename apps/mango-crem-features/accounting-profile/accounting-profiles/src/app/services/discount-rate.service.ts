import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Currency } from '../models/currency.model';
import { DiscountRateAssociatedSchedules } from '../models/discount-rate-schedules.model';
import { DiscountRateProfile } from '../models/discount-rate-profile.model';
import { EndpointService } from '../services/endpoint.service';
import { environment } from '../../../../../../mango/src/environments/environment.local';

@Injectable({ providedIn: 'root', })
export class DiscountRateService extends EndpointService {
  userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights --Just an arbitrary scale sorry
  isEuroDateFormat = false;

  private getDiscountRateProfilesUrl(): string {
    if (environment.isRestful) {
      return `${this.rootUrl()}DiscountRateProfiles`;
    }

    return `${this.rootUrl()}`;
  }

  getDiscountRateProfiles(masterGroupID: number) {
    if (environment.isRestful) {
      const url = `${this.getDiscountRateProfilesUrl()}/GetDiscountRateProfiles/${masterGroupID}`;

      return this.http.get(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getDiscountRateProfiles')),
        );
    }

    const url = `${this.getDiscountRateProfilesUrl()}/GetDiscountRateProfiles`;

    return this.http.post(url, { masterGroupID })
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getDiscountRateProfiles')),
      );
  }

  getDiscountRateProfile(masterGroupId: number,
    discountRateProfileId: number): Observable<DiscountRateProfile> {
    if (environment.isRestful) {
      const url = `${this.getDiscountRateProfilesUrl()}/GetDiscountRateProfile/${masterGroupId}/${discountRateProfileId}`;

      return this.http.get<DiscountRateProfile>(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getDiscountRateProfile')),
        );
    }

    const url = `${this.getDiscountRateProfilesUrl()}/GetDiscountRateProfile`;

    return this.http.post(url, { masterGroupId, discountRateProfileId })
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getDiscountRateProfile')),
      );
  }

  getCountries() {
    if (environment.isRestful) {
      const url = `${this.getDiscountRateProfilesUrl()}/GetCountries`;

      return this.http.get(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getCountries')),
        );
    }

    const url = `${this.getDiscountRateProfilesUrl()}/GetCountries`;

    return this.http.post(url, {})
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getCountries')),
      );
  }

  getCurrencies() {
    if (environment.isRestful) {
      const url = `${this.getDiscountRateProfilesUrl()}/GetCurrencies`;

      return this.http.get<Currency>(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getCurrencies')),
        );
    }

    const url = `${this.getDiscountRateProfilesUrl()}/GetCurrencies`;

    return this.http.post(url, {})
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getCurrencies')),
      );
  }

  archiveDiscountRateProfile(discountRateProfileId: number) {
    if (environment.isRestful) {
      const url = `${this.getDiscountRateProfilesUrl()}/ArchiveDiscountRateProfile`;

      return this.http.post<number>(url, discountRateProfileId, this.httpOptions)
        .pipe(
          map((x) => (x as any)),
          catchError(this.handleError('archiveDiscountRateProfile')),
        );
    }

    const url = `${this.getDiscountRateProfilesUrl()}/ArchiveDiscountRateProfile`;

    return this.http.post(url, { discountRateProfileId })
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('archiveDiscountRateProfile')),
      );
  }

  saveDiscountRateProfile(discountRateProfile: DiscountRateProfile) {
    if (environment.isRestful) {
      const url = `${this.getDiscountRateProfilesUrl()}/SaveDiscountRateProfile`;

      return this.http.post<number>(url, discountRateProfile, this.httpOptions)
        .pipe(
          map((x) => (x as any)),
          catchError(this.handleError('saveDiscountRateProfile')),
        );
    }

    const url = `${this.getDiscountRateProfilesUrl()}/SaveDiscountRateProfile`;

    return this.http.post(url, { discountRateProfile })
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('saveDiscountRateProfile')),
      );
  }

  getAssociatedAmortizationSchedules(discountRateProfileId: number) {
    if (environment.isRestful) {
      const url = `${this.getDiscountRateProfilesUrl()}/GetAssociatedAmortizationSchedules/${discountRateProfileId}`;

      return this.http.get<DiscountRateAssociatedSchedules>(url, this.httpOptions)
        .pipe(
          map((x) => (x as any)),
          catchError(this.handleError('getAssociatedAmortizationSchedules')),
        );
    }

    const url = `${this.getDiscountRateProfilesUrl()}/GetAssociatedAmortizationSchedules`;

    return this.http.post(url, { discountRateProfileId })
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getAssociatedAmortizationSchedules')),
      );
  }
}
