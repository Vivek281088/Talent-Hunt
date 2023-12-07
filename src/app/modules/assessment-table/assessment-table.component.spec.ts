import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentTableComponent } from './assessment-table.component';

describe('AssessmentTableComponent', () => {
  let component: AssessmentTableComponent;
  let fixture: ComponentFixture<AssessmentTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentTableComponent]
    });
    fixture = TestBed.createComponent(AssessmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
