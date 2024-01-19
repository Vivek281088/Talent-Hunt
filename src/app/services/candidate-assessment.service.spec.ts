import { TestBed } from '@angular/core/testing';

import { CandidateAssessmentService } from './candidate-assessment.service';

describe('CandidateAssessmentService', () => {
  let service: CandidateAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
