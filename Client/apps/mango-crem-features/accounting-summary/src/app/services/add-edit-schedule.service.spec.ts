import { TestBed } from '@angular/core/testing';

import { AddEditScheduleService } from './add-edit-schedule.service';

describe('AddEditScheduleService', () => {
  let service: AddEditScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEditScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
