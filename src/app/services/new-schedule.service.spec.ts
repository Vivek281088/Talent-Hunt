import { TestBed } from '@angular/core/testing';

import { NewScheduleService } from './new-schedule.service';

describe('NewScheduleService', () => {
  let service: NewScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
