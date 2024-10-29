import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });

    service = TestBed.inject(BaseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have specific public properties', () => {
    expect(service).toHaveProperty('userRights');
    expect(service).toHaveProperty('dateFormatWithTime');
    expect(service).toHaveProperty('dateFormat');
    expect(service).toHaveProperty('dateFormatter');

    expect(service.userRights).toEqual(0);
    expect(service.dateFormatWithTime).toEqual('MM/dd/yyyy hh:mm a');
    expect(service.dateFormat).toEqual('MM/dd/yyyy');

    expect(service.dateFormatter).toHaveProperty('type');
    expect(service.dateFormatter.type).toEqual('MM/dd/yyyy');

    expect(service.dateFormatter).toHaveProperty('parser');
    expect(service.dateFormatter.parser('12/31/2021')).toEqual(
      new Date('12/31/2021')
    );
    expect(service.dateFormatter.parser('31.12.2021')).toEqual(
      new Date('12/31/2021')
    );
  });

  it('should get user rights', () => {
    service.getUserRights().subscribe((res) => {
      expect(res).toEqual(2);
    });

    const req = httpMock.expectOne(
      'http://localhost:45381/api/Base/GetUserRights'
    );
    expect(req.request.method).toBe('GET');

    req.flush(2);
    httpMock.verify();
  });

  it('should get portfolios', () => {
    service.getPortfolios().subscribe((res) => {
      expect(res).toBe('Portfolio');
    });

    const req = httpMock.expectOne(
      'http://localhost:45381/api/Base/GetPortfolios'
    );
    expect(req.request.method).toBe('GET');

    req.flush('Protfolio');
    httpMock.verify();
  });
});
