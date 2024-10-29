import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { BatchParametersService } from './batch-parameters.service';

describe('BatchParametersService', () => {
  let service: BatchParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });

    service = TestBed.inject(BatchParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Write tests
});
