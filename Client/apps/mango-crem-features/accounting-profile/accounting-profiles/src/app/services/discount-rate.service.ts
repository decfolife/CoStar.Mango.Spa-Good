import { Injectable } from '@angular/core';
import {
  EndpointService,
  UtilitiesService,
} from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { DiscountRateProfile } from '../models/discount-rate-profile.model';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable({ providedIn: 'root' })
export class DiscountRateService extends EndpointService {
  discountRateProfilesUrl: string = UtilitiesService.getBaseApiUrl(
    Api.discountRateProfiles
  );
  userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights --Just an arbitrary scale sorry
  isEuroDateFormat = false;

  getDiscountRateProfiles(masterGroupID: number) {
    const url = `${this.discountRateProfilesUrl}/DiscountRateProfiles/GetDiscountRateProfiles/${masterGroupID}`;
    return this.callHttpGet(url, 'getDiscountRateProfiles');
  }

  getDiscountRateProfile(masterGroupId: number, discountRateProfileId: number) {
    const url = `${this.discountRateProfilesUrl}/DiscountRateProfiles/GetDiscountRateProfile/${masterGroupId}/${discountRateProfileId}`;
    return this.callHttpGet(url, 'getDiscountRateProfile');
  }

  getCountries() {
    const url = `${this.discountRateProfilesUrl}/DiscountRateProfiles/GetCountries`;
    return this.callHttpGet(url, 'getCountries');
  }

  getCurrencies() {
    const url = `${this.discountRateProfilesUrl}/DiscountRateProfiles/GetCurrencies`;
    return this.callHttpGet(url, 'getCurrencies');
  }

  archiveDiscountRateProfile(discountRateProfileId: number) {
    const url = `${this.discountRateProfilesUrl}/DiscountRateProfiles/ArchiveDiscountRateProfile`;
    return this.callHttpPost(
      url,
      'archiveDiscountRateProfile',
      discountRateProfileId
    );
  }

  saveDiscountRateProfile(discountRateProfile: DiscountRateProfile) {
    const url = `${this.discountRateProfilesUrl}/DiscountRateProfiles/SaveDiscountRateProfile`;
    return this.callHttpPost(
      url,
      'saveDiscountRateProfile',
      discountRateProfile
    );
  }

  getAssociatedAmortizationSchedules(discountRateProfileId: number) {
    const url = `${this.discountRateProfilesUrl}/DiscountRateProfiles/GetAssociatedAmortizationSchedules/${discountRateProfileId}`;
    return this.callHttpGet(url, 'getAssociatedAmortizationSchedules');
  }
}
