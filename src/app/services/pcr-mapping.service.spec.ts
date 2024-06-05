import { TestBed } from '@angular/core/testing';

import { PcrMappingService } from './pcr-mapping.service';

describe('PcrMappingService', () => {
  let service: PcrMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcrMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
