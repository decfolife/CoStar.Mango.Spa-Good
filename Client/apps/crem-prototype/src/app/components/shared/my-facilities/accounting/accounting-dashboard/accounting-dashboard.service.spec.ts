import { TestBed } from '@angular/core/testing';

import { AccountingDashboardService } from './accounting-dashboard.service';

describe('AccountingDashboardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } })
  );

  it('should be created', () => {
    const service: AccountingDashboardService = TestBed.get(
      AccountingDashboardService
    );
    expect(service).toBeTruthy();
  });
});
