import { TestBed } from '@angular/core/testing';

import { AccountingSummaryService } from './accounting-summary.service';

describe('AccountingSummaryService', () => {
  let service: AccountingSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
