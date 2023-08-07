import { TestBed } from '@angular/core/testing';

import { PortfolioDropdownService } from './portfolio-dropdown.service';

describe('PortfolioDropdownService', () => {
  let service: PortfolioDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
