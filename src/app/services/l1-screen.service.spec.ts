import { TestBed } from '@angular/core/testing';

import { L1ScreenService } from './l1-screen.service';

describe('L1ScreenService', () => {
  let service: L1ScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(L1ScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
