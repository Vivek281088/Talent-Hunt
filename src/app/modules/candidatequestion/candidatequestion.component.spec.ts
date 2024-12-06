import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatequestionComponent } from './candidatequestion.component';

describe('CandidatequestionComponent', () => {
  let component: CandidatequestionComponent;
  let fixture: ComponentFixture<CandidatequestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatequestionComponent]
    });
    fixture = TestBed.createComponent(CandidatequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
