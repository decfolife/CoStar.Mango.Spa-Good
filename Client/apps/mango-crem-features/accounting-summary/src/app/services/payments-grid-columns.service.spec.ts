import { TestBed } from '@angular/core/testing';

import { PaymentsGridColumnsService } from './payments-grid-columns.service';

describe('PaymentsGridColumnsService', () => {
  let service: PaymentsGridColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsGridColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
