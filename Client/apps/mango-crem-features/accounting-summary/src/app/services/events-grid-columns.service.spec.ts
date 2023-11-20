import { TestBed } from '@angular/core/testing';

import { EventsGridColumnsService } from './events-grid-columns.service';

describe('EventsGridColumnsService', () => {
  let service: EventsGridColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsGridColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
