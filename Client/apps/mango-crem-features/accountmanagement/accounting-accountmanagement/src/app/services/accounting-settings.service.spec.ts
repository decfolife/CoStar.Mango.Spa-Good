import { TestBed } from '@angular/core/testing';

import { AccountingSettingsService } from './accounting-settings.service';

describe('AccountingSettingsService', () => {
  let service: AccountingSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
