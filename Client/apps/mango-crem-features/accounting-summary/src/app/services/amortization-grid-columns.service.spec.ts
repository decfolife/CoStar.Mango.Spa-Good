import { TestBed } from '@angular/core/testing';

import { AmortizationGridColumnsService } from './amortization-grid-columns.service';

describe('AmortizationGridColumnsService', () => {
  let service: AmortizationGridColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmortizationGridColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
