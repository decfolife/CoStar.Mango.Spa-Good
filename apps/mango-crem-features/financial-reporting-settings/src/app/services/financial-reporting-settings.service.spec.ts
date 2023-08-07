import { TestBed } from '@angular/core/testing';

import { FinancialReportingServiceService } from './financial-reporting-service.service';

describe('FinancialReportingServiceService', () => {
  let service: FinancialReportingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialReportingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
