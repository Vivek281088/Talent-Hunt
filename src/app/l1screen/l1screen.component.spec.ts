import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L1screenComponent } from './l1screen.component';

describe('L1screenComponent', () => {
  let component: L1screenComponent;
  let fixture: ComponentFixture<L1screenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [L1screenComponent]
    });
    fixture = TestBed.createComponent(L1screenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
