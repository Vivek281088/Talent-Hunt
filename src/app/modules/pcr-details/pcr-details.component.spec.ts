import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrDetailsComponent } from './pcr-details.component';

describe('PcrDetailsComponent', () => {
  let component: PcrDetailsComponent;
  let fixture: ComponentFixture<PcrDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PcrDetailsComponent]
    });
    fixture = TestBed.createComponent(PcrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
