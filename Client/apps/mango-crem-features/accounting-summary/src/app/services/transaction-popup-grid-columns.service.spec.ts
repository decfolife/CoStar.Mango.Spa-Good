import { TestBed } from '@angular/core/testing';

import { TransactionPopupGridColumnsService } from './transaction-popup-grid-columns.service';

describe('TransactionPopupGridColumnsService', () => {
  let service: TransactionPopupGridColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionPopupGridColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
