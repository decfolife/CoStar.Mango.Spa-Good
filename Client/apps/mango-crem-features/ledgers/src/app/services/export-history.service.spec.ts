import { TestBed } from '@angular/core/testing';

import { AccountingHistoryService } from './accounting-history.service';

describe('AccountingHistoryService', () => {
  let service: AccountingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
