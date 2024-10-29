import { TestBed } from '@angular/core/testing';

import { AccountingHistoryColumnsService } from './export-history-columns.service';

describe('AccountingHistoryColumnsService', () => {
  let service: AccountingHistoryColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingHistoryColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
