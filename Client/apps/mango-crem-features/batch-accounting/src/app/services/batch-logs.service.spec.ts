import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { BatchLogsService } from './batch-logs.service';

describe('BatchLogsService', () => {
  let service: BatchLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });

    service = TestBed.inject(BatchLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Write tests
});
