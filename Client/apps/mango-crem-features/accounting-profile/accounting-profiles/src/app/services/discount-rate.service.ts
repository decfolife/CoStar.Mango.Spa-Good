import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { DiscountRateProfile } from '../models/discount-rate-profile.model';

@Injectable({ providedIn: 'root', })
export class DiscountRateService extends EndpointService {
  userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights --Just an arbitrary scale sorry
  isEuroDateFormat = false;

  getDiscountRateProfiles(masterGroupID: number) {
    const url = `${environment.appUrls.discountRateProfiles}/DiscountRateProfiles/GetDiscountRateProfiles/${masterGroupID}`;
    return this.callHttpGet(url, 'getDiscountRateProfiles')
  }

  getDiscountRateProfile(masterGroupId: number,
    discountRateProfileId: number) {
    const url = `${environment.appUrls.discountRateProfiles}/DiscountRateProfiles/GetDiscountRateProfiles/${masterGroupId}/${discountRateProfileId}`;
    return this.callHttpGet(url, 'getDiscountRateProfile')
  }

  getCountries() {
    const url = `${environment.appUrls.discountRateProfiles}/DiscountRateProfiles/GetCountries`;
    return this.callHttpGet(url, 'getCountries')
  }

  getCurrencies() {
    const url = `${environment.appUrls.discountRateProfiles}/DiscountRateProfiles/GetCurrencies`;
    return this.callHttpGet(url, 'getCurrencies')
  }

  archiveDiscountRateProfile(discountRateProfileId: number) {
    const url = `${environment.appUrls.discountRateProfiles}/DiscountRateProfiles/ArchiveDiscountRateProfile`;
    return this.callHttpPost(url, 'archiveDiscountRateProfile', discountRateProfileId)
  }

  saveDiscountRateProfile(discountRateProfile: DiscountRateProfile) {
    const url = `${environment.appUrls.discountRateProfiles}/DiscountRateProfiles/SaveDiscountRateProfile`;
    return this.callHttpPost(url, 'saveDiscountRateProfile', discountRateProfile)
  }

  getAssociatedAmortizationSchedules(discountRateProfileId: number) {
    const url = `${environment.appUrls.discountRateProfiles}/DiscountRateProfiles/GetAssociatedAmortizationSchedules/${discountRateProfileId}`;
    return this.callHttpGet(url, 'getAssociatedAmortizationSchedules')
  }
}
