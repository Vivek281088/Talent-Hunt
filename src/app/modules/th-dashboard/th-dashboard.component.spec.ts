import { ComponentFixture, TestBed } from '@angular/core/testing';

import { THDashboardComponent } from './th-dashboard.component';

describe('THDashboardComponent', () => {
  let component: THDashboardComponent;
  let fixture: ComponentFixture<THDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [THDashboardComponent]
    });
    fixture = TestBed.createComponent(THDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
