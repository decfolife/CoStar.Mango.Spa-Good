import { TestBed } from '@angular/core/testing';

import { SchedulePaymentsGridColumnsService } from './schedule-payments-grid-columns.service';

describe('AddEventPaymentsGridColumnsService', () => {
  let service: SchedulePaymentsGridColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulePaymentsGridColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
