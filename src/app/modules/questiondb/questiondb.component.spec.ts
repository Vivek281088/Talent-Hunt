import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestiondbComponent } from './questiondb.component';

describe('QuestiondbComponent', () => {
  let component: QuestiondbComponent;
  let fixture: ComponentFixture<QuestiondbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestiondbComponent]
    });
    fixture = TestBed.createComponent(QuestiondbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
