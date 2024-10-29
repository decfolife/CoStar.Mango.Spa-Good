import { TestBed } from '@angular/core/testing';

import { AddEventFormService } from './add-event-form.service';

describe('AddEventFormService', () => {
  let service: AddEventFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEventFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
