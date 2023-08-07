import { TestBed } from '@angular/core/testing';

import { AlertsRulesService } from './alerts-rules.service';

describe('AlertsRulesService', () => {
  let service: AlertsRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
