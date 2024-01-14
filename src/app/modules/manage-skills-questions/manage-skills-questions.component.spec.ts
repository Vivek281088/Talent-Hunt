import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSkillsQuestionsComponent } from './manage-skills-questions.component';

describe('ManageSkillsQuestionsComponent', () => {
  let component: ManageSkillsQuestionsComponent;
  let fixture: ComponentFixture<ManageSkillsQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageSkillsQuestionsComponent]
    });
    fixture = TestBed.createComponent(ManageSkillsQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
