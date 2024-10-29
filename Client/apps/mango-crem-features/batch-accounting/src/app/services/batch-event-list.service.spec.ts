import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { BatchEventListService } from './batch-event-list.service';

describe('BatchEventListService', () => {
  let service: BatchEventListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });

    service = TestBed.inject(BatchEventListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Write tests
});
