import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MFAComponent } from './mfa.component';

describe('MFAComponent', () => {
  let component: MFAComponent;
  let fixture: ComponentFixture<MFAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MFAComponent]
    });
    fixture = TestBed.createComponent(MFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
