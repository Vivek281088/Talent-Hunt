import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDisplayComponent } from './assessment-display.component';

describe('AssessmentDisplayComponent', () => {
  let component: AssessmentDisplayComponent;
  let fixture: ComponentFixture<AssessmentDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentDisplayComponent]
    });
    fixture = TestBed.createComponent(AssessmentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
