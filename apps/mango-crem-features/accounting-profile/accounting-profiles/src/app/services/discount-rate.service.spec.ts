import { TestBed } from '@angular/core/testing';

import { DiscountRateService } from './discount-rate.service';

describe('DiscountRateServiceService', () => {
  let service: DiscountRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
