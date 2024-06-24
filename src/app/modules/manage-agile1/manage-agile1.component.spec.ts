import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAgile1Component } from './manage-agile1.component';

describe('ManageAgile1Component', () => {
  let component: ManageAgile1Component;
  let fixture: ComponentFixture<ManageAgile1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAgile1Component]
    });
    fixture = TestBed.createComponent(ManageAgile1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
