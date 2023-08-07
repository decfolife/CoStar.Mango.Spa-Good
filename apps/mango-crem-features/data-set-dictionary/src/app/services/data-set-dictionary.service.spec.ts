import { TestBed } from '@angular/core/testing';

import { DataSetDictionaryService } from './data-set-dictionary.service';

describe('DataSetDictionaryService', () => {
  let service: DataSetDictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSetDictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
