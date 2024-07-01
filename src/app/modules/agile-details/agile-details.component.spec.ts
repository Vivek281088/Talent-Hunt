import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgileDetailsComponent } from './agile-details.component';

describe('AgileDetailsComponent', () => {
  let component: AgileDetailsComponent;
  let fixture: ComponentFixture<AgileDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgileDetailsComponent]
    });
    fixture = TestBed.createComponent(AgileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
