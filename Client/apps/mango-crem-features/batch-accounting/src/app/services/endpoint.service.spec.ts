import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { EndpointService } from './endpoint.service';

describe('EndpointService', () => {
  let service: EndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(EndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide baseUrl via static method', () => {
    expect(EndpointService.baseUrl()).toEqual('http://localhost:45381');
  });

  it('should map a response to an object', () => {
    const result = service.responseToObject({ d: '{"name":"JSON Object"}' });

    expect(result.name).toEqual('JSON Object');
  });
});
