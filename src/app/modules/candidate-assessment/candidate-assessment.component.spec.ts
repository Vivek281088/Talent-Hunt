import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAssessmentComponent } from './candidate-assessment.component';

describe('CandidateAssessmentComponent', () => {
  let component: CandidateAssessmentComponent;
  let fixture: ComponentFixture<CandidateAssessmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateAssessmentComponent]
    });
    fixture = TestBed.createComponent(CandidateAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
